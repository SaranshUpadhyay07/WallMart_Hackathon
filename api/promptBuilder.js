export function buildPrompt(product) {
  return `
{
  "product": "${product.name}",
  "recommendations": [
    {
      "material": "Mushroom Packaging",
      "eco_score": 95,
      "carbon_footprint": "Very Low",
      "cost_estimate_per_unit": "₹6",
      "durability": "High",
      "suitability_reason": "Custom molded from agricultural waste. Excellent cushioning. 100% compostable.",
      "citations": [
        {
          "source": "Holt et al., Molecules 2012",
          "url": "https://doi.org/10.3390/molecules171112724"
        }
      ]
    }
  ],
  "ai_summary": "Mushroom packaging is the best option for wine glasses based on protection, biodegradability, and CO₂ savings."
}
Return only valid JSON.
`;
}
