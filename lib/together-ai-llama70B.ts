// import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// export const generateSummaryFromGemini = async (pdfText: string) => {
//   try {
//     const trimmedText = pdfText.slice(0, 3000); // Limit to ~2000 tokens
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-pro-002",
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 1500,
//       },
//     });

//     const prompt = {
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `${SUMMARY_SYSTEM_PROMPT}\n\nTransform the following document into an engaging, easy-to-read summary using markdown and context-relevant emojis:\n\n${trimmedText}`,
//             },
//           ],
//         },
//       ],
//     };

//     console.log("Prompt size (chars):", prompt.contents[0].parts[0].text.length);


//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     if (!text) {
//       throw new Error("Gemini API response is empty");
//     }

//     return text;
//   } catch (error: any) {
//     if (error?.status === 429) {
//       console.warn("Gemini quota exceeded. Try again later.");
//     }
//     console.error("Gemini API failed", error);
//     throw error;
//   }
// };

import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import Together from "together-ai";

const together = new Together(); // uses TOGETHER_API_KEY from .env

export async function generateSummaryFromLlamaInstruct(pdfText: string) {
  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free", // ✅ Correct model ID
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response?.choices[0]?.message?.content;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}
