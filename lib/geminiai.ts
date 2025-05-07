import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import {GoogleGenerativeAI} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002",generationConfig:{
      temperature: 0.7,
      maxOutputTokens: 1500,
     
    } });
    const prompt = {
      contents:[{
        role:'user',
        parts:[
          {
            text: SUMMARY_SYSTEM_PROMPT,
           
          },
          {
            text: `${SUMMARY_SYSTEM_PROMPT}\n\n Transform this document into an engaging,easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
          }
        ]
      }]
    };
    const result = await model.generateContent(prompt);
    const response = await result.response;
    if(!response.text()){
      throw new Error("Gemini API response is empty");
    }
    return response.text;
  } catch (error: any) {
  
    console.error("Gemini API failed", error);
    throw error;
  }
};
