'use client'

import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
}

export const UploadFormInput = forwardRef<HTMLFormElement,UploadFormInputProps>(({onSubmit},ref) =>{
    return(
        <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex justify-end items-center gap-1.5">
            <Input className="" id="file" name="file" accept="application/pdf" type="file" required/>
            <Button className="bg-rose-600">Upload your PDF</Button>
            </div>
            
        </form>
    )
}
)

// export default function FormInput({onSubmit}:UploadFormInputProps){
//     return(
//         <form className="flex flex-col gap-6" onSubmit={onSubmit}>
//             <div className="flex justify-end items-center gap-1.5">
//             <Input className="" id="file" name="file" accept="application/pdf" type="file" required/>
//             <Button className="bg-rose-600">Upload your PDF</Button>
//             </div>
            
//         </form>
//     )
// }

UploadFormInput.displayName = 'UploadFormInput'

export default UploadFormInput