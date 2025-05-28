// "use client";

// import { z } from "zod";
// import { UploadFormInput } from "./upload-form-input";
// import { useUploadThing } from "@/utils/uploadthing";
// import { toast } from "sonner";
// import {
//   generatePdfSummary,
//   generatePdfText,
//   storePdfSummaryAction,
// } from "@/actions/upload-actions";
// import { useRef, useState } from "react";
// // import { title } from "process";
// import { useRouter } from "next/navigation";
// import LoadingSkeleton from "./loading-skeleton";
// import { formatFileNameAsTitle } from "@/utils/format-utils";

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid file" })
//     .refine((file) => file.size <= 24 * 1024 * 1024, {
//       message: "File size must be less than 20MB",
//     })
//     .refine(
//       (file) => file.type.startsWith("application/pdf"),
//       "File must be a PDF"
//     ),
// });

// export default function UploadForm() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: () => {
//       console.log("Uploaded successfully");
//     },
//     onUploadError: (err) => {
//       console.log("error occured while uploading", err);
//     },
//     onUploadBegin: ({ file }) => {
//       console.log("upload has begun for", file);
//     },
//   });
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const formData = new FormData(e.currentTarget);
//       const file = formData.get("file") as File;
//       const validatedFields = schema.safeParse({ file });
//       if (!validatedFields.success) {
//         toast("Something went wrong", {
//           description:
//             validatedFields.error.flatten().fieldErrors.file?.[0] ??
//             "Invalid file",
//         });
//         setIsLoading(false);
//         return;
//       }

//       toast("Uploading PDF...", {
//         description: "We are uploading your PDF",
//       });

//       console.log(validatedFields);
//       const resp = await startUpload([file]);
//       if (!resp) {
//         toast("Something went wrong", {
//           description: "Please use a different file",
//         });
//         return;
//       }
//       toast("Processing PDF", {
//         description: "Hang tight! Our AI is reading through your document!",
//       });
//       // const result = await generatePdfSummary(resp);

//       // if (data) {
//       //show toast processing pdf
//       let storeResult: any;
//       formRef.current?.reset();
//       //show toast

//       const formattedFileName = formatFileNameAsTitle(file.name);
//       const result = await generatePdfText({
//         fileUrl: resp[0].serverData.file.url,
//       });
//       //show toast generating pdf our ai is reading your document
      
//       const summaryResult = await generatePdfSummary({
//         pdfText:result?.data?.pdfText ?? "",
//         fileName: formattedFileName,
//       });

//       //show toast generating pdf summary
      

//       const { data = null, message = null } = summaryResult || {};
      
//       //save to db
//       if (data?.summary) {
//         storeResult = await storePdfSummaryAction({
//           title: formattedFileName,
//           fileUrl: resp[0].serverData.file.url,
//           summary: data.summary,
//           fileName: file.name,
//         });
//         //show taost summary generated successfully
//         formRef.current?.reset();
//         router.push(`/summaries/${storeResult.data.id}`);
//       }
//     } catch (error) {
//       console.error("Error Occured", error);
//       formRef.current?.reset();
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     // <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
//     //   <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />

//     // </div>
//     <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto mt-2">
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center" aria-hidden="true">
//           <div className="w-full border-t border-gray-200 dark:border-gray-800" />
//         </div>
//         <div className="relative flex justify-center ">
//           <span className="bg-background px-3 text-muted-foreground text-sm">
//             Upload PDF
//           </span>
//         </div>
//       </div>
//       <UploadFormInput
//         isLoading={isLoading}
//         ref={formRef}
//         onSubmit={handleSubmit}
//       />
//       {isLoading && (
//         <>
//           <div className="relative">
//             <div
//               className="absolute inset-0 flex items-center"
//               aria-hidden="true"
//             >
//               <div className="w-full border-t border-gray-200 dark:border-gray-800" />
//             </div>
//             <div className="relative flex justify-center">
//               <span className="bg-background px-3 text-muted-foreground text-sm">
//                 Processing
//               </span>
//             </div>
//           </div>
//           <LoadingSkeleton />
//         </>
//       )}
//     </div>
//   );
// }

"use client"

import type React from "react"

import { z } from "zod"
import { UploadFormInput } from "./upload-form-input"
import { useUploadThing } from "@/utils/uploadthing"
import { generatePdfSummary, generatePdfText, storePdfSummaryAction } from "@/actions/upload-actions"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSkeleton from "./loading-skeleton"
import { formatFileNameAsTitle } from "@/utils/format-utils"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), "File must be a PDF"),
})

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully")
    },
    onUploadError: (err) => {
      console.log("error occured while uploading", err)
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
      })
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      const file = formData.get("file") as File
      const validatedFields = schema.safeParse({ file })

      if (!validatedFields.success) {
        toast({
          variant: "destructive",
          title: "Invalid file",
          description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Please check your file and try again.",
        })
        setIsLoading(false)
        return
      }

      // Step 1: Upload PDF
      setCurrentStep("uploading")
      toast({
        title: "Uploading PDF...",
        description: "We're securely uploading your document to our servers.",
      })

      const resp = await startUpload([file])
      if (!resp) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Please try using a different file or check your connection.",
        })
        setIsLoading(false)
        return
      }

      // Step 2: Process PDF text
      setCurrentStep("processing")
      toast({
        title: "Processing PDF",
        description: "Hang tight! Our AI is reading through your document.",
      })

      const formattedFileName = formatFileNameAsTitle(file.name)
      const result = await generatePdfText({
        fileUrl: resp[0].serverData.file.url,
      })

      if (!result?.data?.pdfText) {
        toast({
          variant: "destructive",
          title: "Processing failed",
          description: "We couldn't extract text from your PDF. Please try a different file.",
        })
        setIsLoading(false)
        return
      }

      // Step 3: Generate summary
      setCurrentStep("summarizing")
      toast({
        title: "Generating summary",
        description: "Our AI is analyzing your document and creating a comprehensive summary.",
      })

      const summaryResult = await generatePdfSummary({
        pdfText: result.data.pdfText,
        fileName: formattedFileName,
      })

      const { data = null } = summaryResult || {}

      // Step 4: Save to database
      if (data?.summary) {
        setCurrentStep("saving")
        toast({
          title: "Saving your summary",
          description: "Almost done! We're saving your summary to your account.",
        })

        const storeResult = await storePdfSummaryAction({
          title: formattedFileName,
          fileUrl: resp[0].serverData.file.url,
          summary: data.summary,
          fileName: file.name,
        })

        // Step 5: Success and redirect
        toast({
          variant: "default",
          title: "Summary generated successfully!",
          description: "Your document has been summarized and is ready to view.",
          className: "bg-green-50 border-green-200",
        })

        formRef.current?.reset()
        router.push(`/summaries/${storeResult?.data?.id}`)
      } else {
        toast({
          variant: "destructive",
          title: "Summary generation failed",
          description: "We couldn't generate a summary for your document. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error Occurred", error)
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again later.",
      })
      formRef.current?.reset()
    } finally {
      setIsLoading(false)
      setCurrentStep(null)
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto mt-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">Upload PDF</span>
        </div>
      </div>
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
      {isLoading && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm flex items-center gap-2">
                {currentStep === "uploading" && "Uploading"}
                {currentStep === "processing" && "Processing"}
                {currentStep === "summarizing" && "Generating Summary"}
                {currentStep === "saving" && "Saving Summary"}
                {!currentStep && "Processing"}
                <Loader2 className="h-3 w-3 animate-spin" />
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  )
}
