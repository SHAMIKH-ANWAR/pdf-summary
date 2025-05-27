import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const trimmedText = pdfText.slice(0, 3000); // Limit to ~2000 tokens
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SUMMARY_SYSTEM_PROMPT}\n\nTransform the following document into an engaging, easy-to-read summary using markdown and context-relevant emojis:\n\n${trimmedText}`,
            },
          ],
        },
      ],
    };

    console.log("Prompt size (chars):", prompt.contents[0].parts[0].text.length);


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Gemini API response is empty");
    }

    return text;
  } catch (error: any) {
    if (error?.status === 429) {
      console.warn("Gemini quota exceeded. Try again later.");
    }
    console.error("Gemini API failed", error);
    throw error;
  }
};
