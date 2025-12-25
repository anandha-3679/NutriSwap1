
import { GoogleGenAI, Type } from "@google/genai";
import { HealthGoal, SwapResult, UserCategory } from "../types";

export const fetchAiSwap = async (
  food: string, 
  goals: HealthGoal[], 
  category: UserCategory
): Promise<SwapResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const goalsStr = goals.join(", ");
  const prompt = `Suggest a healthier food alternative for "${food}" for a person in the "${category}" category. 
  The swap must satisfy these goals: ${goalsStr}. 
  Also provide a simple recipe for exactly ONE PORTION of the suggested alternative. 
  Ensure the explanation is specifically tailored to why this is good for a ${category}.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          originalFood: { type: Type.STRING },
          suggestedSwap: { type: Type.STRING },
          explanation: { type: Type.STRING },
          recipe: {
            type: Type.OBJECT,
            properties: {
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    amount: { type: Type.STRING }
                  },
                  required: ["item", "amount"]
                }
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              prepTime: { type: Type.STRING }
            },
            required: ["ingredients", "steps", "prepTime"]
          }
        },
        required: ["originalFood", "suggestedSwap", "explanation", "recipe"]
      },
      systemInstruction: "You are NutriSwap Pro. You specialize in age-appropriate nutrition swaps. Kids need fun/accessible textures, adults need efficiency/balance, and elderly users need easy-to-digest/nutrient-dense options. Always provide a single-portion recipe. Return JSON."
    }
  });

  try {
    const data = JSON.parse(response.text);
    return {
      ...data,
      goals,
      category
    };
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate a personalized swap suggestion.");
  }
};
