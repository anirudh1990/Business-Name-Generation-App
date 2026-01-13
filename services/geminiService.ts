
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationResponse } from "../types";

export const generateStartupNames = async (industry: string): Promise<GenerationResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 10 creative, modern, and memorable startup names for the "${industry}" industry. For each name, provide a short, catchy 1-sentence tagline explaining why this name fits the brand.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          names: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.STRING,
                  description: "The creative startup name."
                },
                tagline: {
                  type: Type.STRING,
                  description: "A short catchy tagline."
                }
              },
              required: ["name", "tagline"]
            }
          }
        },
        required: ["names"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response generated");
  }

  return JSON.parse(text) as GenerationResponse;
};
