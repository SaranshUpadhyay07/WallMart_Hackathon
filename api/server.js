import express from "express";
import { GoogleGenAI  } from "@google/genai";
import dotenv from "dotenv";
import products from "./products.js";
import userRoutes from './routes/user.js';
dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI (process.env.GEMINI_API_KEY);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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

Your task is to:
- First, group the products efficiently by **item category** (e.g., "Cosmetics + Jewelry", "Food", etc.)
- Then, for **each group**, recommend the **2–3 most sustainable and cost-effective packaging options**

Focus on:
- Reducing carbon footprint
- Grouping as many items as possible
- Recyclability or biodegradability
- Realistic costs (common packaging types in India)

Strict rules:
- Never pack **electronics** in the same group as **food**
- Pack **food** only in **breathable, natural materials** (e.g., paper, jute, cloth)
- Use **real, commonly available packaging materials in India**
- Keep 'packaging_type' short and realistic (e.g., "Jute bag", "Corrugated box")
- Keep 'why_this_is_good' to **just 1–2 short lines**
- Each group must have **at least 2 packaging options**, showing trade-offs in **eco_score, footprint, and cost**

Return your answer strictly in this JSON format:

[
  {
    "group_description": "Grouped item categories (e.g., Cosmetics + Jewelry)",
    "group_items": "name of items in this group, e.g., Face Cream Jar, Silver Earrings",
    "packaging_type": "Short packaging name only",
    "estimated_total_footprint_kg": 2.5,
    "eco_score": 90,
    "cost": real world price in INR,
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

app.use('/user', userRoutes);

import connectDB from "./db/connect.js";

async function start() {
  try {
    await connectDB(process.env.mongodb);
    console.log("DB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error("Startup Error:", err);
  }
}

start();
