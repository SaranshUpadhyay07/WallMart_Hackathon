import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "./promptBuilder.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getProductByCode(code) {
  const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
  return products[code];
}

app.post("/api/recommend", async (req, res) => {
  const { itemCode } = req.body;
  const product = getProductByCode(itemCode);
  if (!product) return res.status(404).json({ error: "Item not found" });

  const prompt = buildPrompt(product);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from the response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const data = JSON.parse(text.slice(jsonStart, jsonEnd));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
