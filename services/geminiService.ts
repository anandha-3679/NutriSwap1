
import { GoogleGenAI, Type } from "@google/genai";
import { HealthGoal, SwapResult } from "../types";

export const fetchAiSwap = async (food: string, goal: HealthGoal): Promise<SwapResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Suggest a healthier food alternative for "${food}" with the specific goal of being "${goal}". 
  Provide exactly one suggestion with a one-sentence explanation.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          originalFood: { type: Type.STRING },
          suggestedSwap: { type: Type.STRING },
          explanation: { type: Type.STRING },
        },
        required: ["originalFood", "suggestedSwap", "explanation"]
      },
      systemInstruction: "You are NutriSwap, a world-class nutrition expert. Your goal is to provide accurate, helpful, and concise food alternatives based on user preferences. Always return JSON."
    }
  });

  try {
    const data = JSON.parse(response.text);
    return {
      ...data,
      goal
    };
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate a swap suggestion.");
  }
};
