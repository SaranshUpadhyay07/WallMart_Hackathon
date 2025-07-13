import express from "express";
import { GoogleGenAI  } from "@google/genai";
import dotenv from "dotenv";
import products from "./products.js";
dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI (process.env.GEMINI_API_KEY);

app.post("/package", async (req, res) => {
  const items = req.body.items; // [{ item_code, quantity }]
  try {
    const productDetails = items.map(item => {
      const product = products.find(p => p.item_code === item.item_code);
      if (product) {
        return { ...product, quantity: item.quantity };
      }
      return null;
    }).filter(Boolean);

    if (productDetails.length === 0) {
      return res.status(404).json({ error: "No valid products found." });
    }

    // Create readable list of all products
    const productListText = productDetails.map(p =>
        `- Item Code: ${p.item_code}, Name: ${p.product_name}, Qty: ${p.quantity}, Type: ${p.product_type}, ` +
        `Weight: ${p.weight_grams}g, Dimensions: ${p.dimensions_cm.length}x${p.dimensions_cm.width}x${p.dimensions_cm.height} cm`
    ).join("\n");

    // ✅ One prompt for all items
    const prompt = `
You are an expert in sustainable packaging optimization.

Here is a list of products to be shipped together:
${productListText}

Your task is to recommend the **2–3 most efficient sustainable packaging strategies** for this group, focusing on:
- Grouping items efficiently **by type**
- Reducing carbon footprint
- Cost-effectiveness
- Recyclability or biodegradability

Apply these strict rules:
- Never pack **electronics** in the same group as **food**
- Pack **food** only in **breathable, natural materials** (e.g., paper, jute, cloth)
- Group by **item categories** (e.g., "Cosmetics + Jewelry") instead of item names or codes
- Use **real, common packaging materials in India**
- Keep 'packaging_type' short and clear (e.g., "Jute bag", "Recycled box with molded pulp")
- Keep 'why_this_is_good' to just **1–2 short lines**

Return your response in this JSON format:

[
  {
    "group_description": "Grouped item categories (e.g., Cosmetics + Jewelry)",
    "packaging_type": "Short packaging name only",
    "estimated_total_footprint_kg": 2.5,
    "eco_score": 90,
    "why_this_is_good": "One or two-line reason max"
  },
  {
    ...
  }
]
`;


    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const parsedResponse = JSON.parse(cleanedText);

    res.json(parsedResponse);
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Something went wrong with AI response." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
