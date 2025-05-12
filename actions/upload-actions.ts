"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";

export async function generatePdfSummary(uploadResponse: {
  serverData: { userId: string; file: { url: string; name: string } };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];
  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText)
    let summary;
    try {
        const summary = await generateSummaryFromOpenAI(pdfText);
        console.log({summary})
    } catch (error) {
        console.log(error)
        //call gemini api to generate summary
        if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
            try {
              summary = await generateSummaryFromGemini(pdfText);
            } catch (geminiError) {
              console.error('Gemini API failed after openAI quote exceeded',geminiError)
              throw new Error('Failed to generate summary with availiable AI providers')
            }
          }
    }

    if(!summary){
        return {
            success:false,
            message:'failed to generate summary',
            data:null
        }
    }

    return {
      success: true,
      message: "Summary generated successfuly",
      data: {
        summary,
      },
    };

  } catch (err) {
    return {
        success:false,
        message:'File upload failed',
        data:null
    }
  }
}

export function savePdfSummaryToDb() {
  try {
    const sql = await getDbConnection()
    await sql`INSERT INTO pdf_summaries(user_id,original_file_url,summary_text,title,file_name) VALUES ()`;
  } catch (error) {
    console.log("Error saving PDF summary to DB:", error)
    throw error;
  }
}

export async function storePdfSummaryAction(){
  let savePdfSummary;
  try {
    const {userId} = await auth();
    if(!userId){
      return{
        success:false,
        message:'User not found',
       
      }
    }
    savePdfSummary = await savePdfSummaryToDb();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error saving PDF summary',
      
    }
  }
}