import express from "express";
import { GoogleGenAI  } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI (process.env.GEMINI_API_KEY);

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "You are an expert in sustainable packaging and environmental impact assessment.\n\nGiven a product with the following details:\n- Item Code: 12345\n- Product Type: cosmetics\n- Weight: 200 grams\n- Dimensions: 12cmX12cmX12cm (L x W x H)\n\nYour task is to recommend the best 2 sustainable packaging option based on:\n- Low carbon footprint\n- Cost-effectiveness\n- Recyclability or biodegradability\n\nReturn your answer in the following in json format:\n\n---\n*🌿 Recommended Packaging:*  \n{{PACKAGING_TYPE}} (e.g., Recycled cardboard box with paper filler)\n\n*📉 Estimated Carbon Footprint:*  \n{{CARBON_EMISSION}} kg CO₂ per unit\n\n*💰 Estimated Cost:*  \n₹{{COST}} per unit\n\n*♻ Eco Score (1–100):*  \n{{SCORE}} (based on emissions, cost, and sustainability)\n\n*📚 Reasoning:*  \n{{WHY_THIS_IS_GOOD}}\n\n*🔗 Citation/Source:*  \n{{CITATION}}\n---\n\nOnly suggest real and commonly available packaging materials in India. Keep it concise and user-friendly.",
    });
    let responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json(JSON.parse(responseText.replace(/```json|```/g, "").trim()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
