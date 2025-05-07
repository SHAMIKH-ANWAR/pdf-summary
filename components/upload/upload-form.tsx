"use client";

import { set, z } from "zod";
import FormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";

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
      setIsLoading(true)
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast("Something went wrong",{
          description:validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file',
        })
        setIsLoading(false)
        return;
      }
  
      toast("Uploading PDF...",{
          description:'We are uploading your PDF'
      })
  
      console.log(validatedFields)
      const resp = await startUpload([file]);
      if(!resp){
          toast("Something went wrong",{
              description:'Please use a different file'
          })
          return;
      }
      toast("Processing PDF",{description:'Hang tight! Our AI is reading through your document!'});
      const result = await generatePdfSummary(resp);
  
      const {data = null,message = null} = result || {};
  
      if(data){
        formRef.current?.reset();
        //show toast
        if(data.summary){
          //save to db
        }
      }
    } catch (error) {
      console.error('Error Occured',error)
      formRef.current?.reset();
    }
   
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <FormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}
