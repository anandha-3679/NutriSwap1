
import { GoogleGenAI, Type } from "@google/genai";
import { HealthGoal, SwapResult, UserCategory, UserProfile } from "../types";

const MODEL_NAME = "gemini-3-flash-preview";

export const fetchAgenticSwap = async (
  prompt: string,
  profile: UserProfile,
  imageData?: string // Base64 image data
): Promise<SwapResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const allergyCtx = profile.allergies.length > 0 ? `STRICTLY AVOID: ${profile.allergies.join(", ")}.` : "";
  const goalCtx = `User Goals: ${profile.goals.join(", ")}.`;
  const categoryCtx = `User is a ${profile.category}.`;

  const contents: any[] = [{ text: prompt }];
  if (imageData) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData.split(',')[1] || imageData
      }
    });
  }

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: { parts: contents.map(c => typeof c === 'string' ? { text: c } : c) },
    config: {
      thinkingConfig: { thinkingBudget: 2000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          originalFood: { type: Type.STRING },
          suggestedSwap: { type: Type.STRING },
          explanation: { type: Type.STRING, description: "A friendly summary for the user." },
          reasoning: { type: Type.STRING, description: "Internal agentic reasoning explaining the nutritional trade-offs and how it meets specific profile constraints." },
          estimatedPrice: { type: Type.STRING },
          macros: {
            type: Type.OBJECT,
            properties: {
              original: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER }
                },
                required: ["calories", "protein", "carbs", "fats"]
              },
              swap: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER }
                },
                required: ["calories", "protein", "carbs", "fats"]
              }
            },
            required: ["original", "swap"]
          },
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
        required: ["originalFood", "suggestedSwap", "explanation", "reasoning", "macros", "recipe"]
      },
      systemInstruction: `You are NutriSwap Agentic AI. 
      CONTEXT: ${categoryCtx} ${goalCtx} ${allergyCtx}
      YOUR ROLE: Find the best food alternative based on the user's request. 
      IF AN IMAGE IS PROVIDED: Identify the food in the image first.
      REASONING: Explain your logic step-by-step in the 'reasoning' field. 
      MACROS: Provide realistic estimated macronutrients.
      CONSTRAINTS: Never suggest foods containing their allergies.`
    }
  });

  try {
    const data = JSON.parse(response.text);
    return {
      ...data,
      id: crypto.randomUUID(),
      goals: profile.goals,
      category: profile.category
    };
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("The agent was unable to finalize its reasoning. Please try a different query.");
  }
};
