"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePdfText({ fileUrl }: { fileUrl: string }) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File URL is required",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log(pdfText);
    // let summary;

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to extract text from PDF",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfuly",
      data: {
        // title: formattedFileName,
        pdfText,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

export async function generatePdfSummary({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) {
  // if (!uploadResponse) {
  //   return {
  //     success: false,
  //     message: "File upload failed",
  //     data: null,
  //   };
  // }
  // const {
  //   serverData: {
  //     userId,
  //     file: { url: pdfUrl, name: fileName },
  //   },
  // } = uploadResponse[0];
  // if (!pdfUrl) {
  //   return {
  //     success: false,
  //     message: "File upload failed",
  //     data: null,
  //   };
  // }
  try {
    // const pdfText = await fetchAndExtractPdfText(pdfUrl);
    // console.log(pdfText)
    let summary;
    try {
      const summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      //call gemini api to generate summary
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API failed after openAI quote exceeded",
            geminiError
          );
          throw new Error(
            "Failed to generate summary with availiable AI providers"
          );
        }
      }
      return {
        success: false,
        message: "failed to generate summary",
        data: null,
      };
    }

    if(!summary){
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      }
    }

    // const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfuly",
      data: {
        title: fileName,
        summary,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

export async function savePdfSummaryToDb({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  try {
    const sql = await getDbConnection();
    const [savedSummary] =
      await sql`INSERT INTO pdf_summaries(user_id,original_file_url,summary_text,title,file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id,summary_text`;
    return savedSummary;
  } catch (error) {
    console.log("Error saving PDF summary to DB:", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummaryToDb({
      userId,
      fileName,
      fileUrl,
      summary,
      title,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
      title: savedSummary.title,
      summary: savedSummary.summary_text,
      fileUrl: savedSummary.original_file_url,
    },
  };
}
