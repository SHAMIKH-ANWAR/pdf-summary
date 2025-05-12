"use client";

import { z } from "zod";
import FormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { title } from "process";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const[isLoading,setIsLoading] = useState(false);
    const {startUpload,routeConfig} = useUploadThing('pdfUploader',{
        onClientUploadComplete:() =>{
            console.log("Uploaded successfully");
        },
        onUploadError: (err) =>{
            console.log('error occured while uploading',err);
        },
        onUploadBegin: ({file}) =>{
            console.log('upload has begun for',file)
        }
    })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      console.log("File selected for upload:", file);

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
        toast("Something went wrong", {
          description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      toast("Uploading PDF...", {
        description: "We are uploading your PDF",
      });

      const resp = await startUpload([file]);
      console.log("Upload response:", resp);
      if (!resp) {
        console.error("File upload failed.");
        toast("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document!",
      });

      const result = await generatePdfSummary(resp);
      console.log("Summary generation result:", result);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        formRef.current?.reset();
        if (data.summary) {
          console.log("Saving summary to database:", {
            title: data.title,
            fileUrl: resp[0].serverData.file.url,
            summary: data.summary,
            fileName: file.name,
          });
          storeResult = await storePdfSummaryAction({
            title: data.title,
            fileUrl: resp[0].serverData.file.url,
            summary: data.summary,
            fileName: file.name,
          });
          console.log("Database save result:", storeResult);
          formRef.current?.reset();
        }
      }
    } catch (error) {
      console.error("Error occurred during upload process:", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <FormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}
