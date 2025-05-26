"use client";

import { z } from "zod";
import { UploadFormInput } from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
// import { title } from "process";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully");
    },
    onUploadError: (err) => {
      console.log("error occured while uploading", err);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast("Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      toast("Uploading PDF...", {
        description: "We are uploading your PDF",
      });

      console.log(validatedFields);
      const resp = await startUpload([file]);
      if (!resp) {
        toast("Something went wrong", {
          description: "Please use a different file",
        });
        return;
      }
      toast("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document!",
      });
      const result = await generatePdfSummary(resp);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        formRef.current?.reset();
        //show toast
        if (data.summary) {
          //save to db
          storeResult = await storePdfSummaryAction({
            title: data.title,
            fileUrl: resp[0].serverData.file.url,
            summary: data.summary,
            fileName: file.name,
          });
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
        }
      }
    } catch (error) {
      console.error("Error Occured", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    // <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
    //   <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />

    // </div>
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto mt-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center ">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}/>
        {isLoading && (
          <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton/>
          </>)}
    </div>
  );
}
