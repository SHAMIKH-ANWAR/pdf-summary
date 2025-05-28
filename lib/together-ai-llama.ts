import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import Together from "together-ai";

const together = new Together(); // uses TOGETHER_API_KEY from .env

export async function generateSummaryFromDeepSeek(pdfText: string) {
  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.2-3B-Instruct-Turbo", // ✅ Correct model ID
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


// export async function generateSummaryFromOpenAI(pdfText: string) {
//   try {
//     console.log("pdfText", pdfText);
//     // Call Hugging Face summarization model API (free tier available with rate limits)
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer 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`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: pdfText,
//           parameters: { max_length: 500, do_sample: false },
//         }),
//       }
//     );

//     // ✅ Parse JSON correctly
//     const data = await response.json();

//     console.log("huggingface response", data);

//     // ✅ Extract actual summary
//     const rawSummary =
//       Array.isArray(data) && data[0]?.summary_text
//         ? data[0].summary_text
//         : "Summary unavailable.";

//     // Now format rawSummary into your SUMMARY_SYSTEM_PROMPT structure
//     // For demo, you can inject the summary into the "- ✨ One-sentence summary of the document" part
//     // You might want to build more sophisticated formatting or NLP to extract highlights etc.

//     const formattedSummary = `
// # 📌 Engaging Summary of Your Document
// - ✨ ${rawSummary}
// - 🧠 Key insight (optional)

// ## 🗂️ Document Info
// - 📄 Type: PDF
// - 🎯 Audience: General

// ## 💡 Highlights
// - 🔑 Highlight 1
// - 🔑 Highlight 2
// - 🔑 Highlight 3

// ## 🧭 Why It Matters
// - 💥 This document provides valuable insights that impact real-world scenarios.

// ## 🧵 Main Takeaways
// - 🔍 Insight
// - 💪 Strength
// - 🎯 Outcome

// ## 💼 Pro Tips
// - 🛠️ Practical tip
// - 💎 Useful idea
// - 📈 Actionable advice

// ## 🧠 Key Terms
// - 📘 Term 1: Simple meaning
// - 📗 Term 2: Simple meaning

// ## 🏁 Final Thought
// - 🧠 Most important takeaway
// `;

//     return rawSummary;
//   } catch (error: any) {
//     if (error.message === "RATE_LIMIT_EXCEEDED") {
//       throw new Error("RATE_LIMIT_EXCEEDED");
//     }
//     throw error;
//   }
// }
