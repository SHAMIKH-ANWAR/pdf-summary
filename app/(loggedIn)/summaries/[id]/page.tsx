// import BgGradient from "@/components/common/bg-gradient";
// import { SourceInfo } from "@/components/summaries/source-info";
// import {SummaryHeader} from "@/components/summaries/summary-header";
// import { SummaryViewer } from "@/components/summaries/summary-viewer";
// import { getSummaryById } from "@/lib/summary";
// import { FileText } from "lucide-react";
// import { notFound } from "next/navigation";

// type SummaryPageProps = {
//   params: { id: string };
// }

// export default async function SummaryPage({params}: SummaryPageProps) {
//   const { id } =  params;
//   const summary = await getSummaryById(id);

//   if (!summary) {
//     notFound();
//   }

//   // const paramsProp = {
//   //   Promise: Promise<Response>,
//   //   id: String,
//   // };

//   const { title, summary_text, file_name, word_count, created_at,original_file_url } = summary;

//   const readingTime = Math.ceil((word_count || 0) / 200); // Assuming an average reading speed of 200 words per minute

//   return (
//     <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
//       <BgGradient className="from-rose-400 via-orange-300 to-orange-200" />

//       <div className="container mx-auto flex flex-col gap-4">
//         <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-6 lg:py-12 ">
//           <div className="flex flex-col">
//             <SummaryHeader
//               title={title}
//               createdAt={created_at}
//               readingTime={readingTime}
//             />
//           </div>
//           {file_name && (
//             <SourceInfo
//               filename={file_name}
//               title={title}
//               summaryText={summary_text}
//               originalFileUrl={original_file_url}
//               createdAt={created_at}
//             />
//           )}
//           <div className="relative mt-4 sm:mt-8 lg:mt-16">
//             <div
//               className="relative p-4 sm:p-6 lg:p-8
//             bg-white/80 backdrop-blur-md rounded-2xl
//             sm:rounded-3xl shadow-xl border border-rose-100/30
//             transition-all duration-300 hover:shadow-2xl
//             hover:bg-white/90 max-w-4xl mx-auto"
//             >
//               <div
//                 className="absolute inset-0
//               bg-linear-to-br from-rose-50/50 via-orange-50/30
//               to-transparent opacity-50 rounded-2xl
//               sm:rounded-3xl"
//               />

//               <div
//                 className="absolute top-2 sm:top-4
//               right-2 sm:right-4 flex items-center gap-1.5
//               sm:gap-2 text-xs sm:text-sm
//               text-muted-foreground bg-white/90 px-2 sm:px-3
//               py-1 sm:py-1.5 rounded-full shadow-xs"
//               >
//                 <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
//                 {word_count?.toLocaleString()} words
//               </div>

//               <div
//                 className="relative mt-8 sm:mt-6 flex
//               justify-center"
//               >
//                 <SummaryViewer summary={summary_text} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import BgGradient from "@/components/common/bg-gradient"
import { SourceInfo } from "@/components/summaries/source-info"
import { SummaryHeader } from "@/components/summaries/summary-header"
import { SummaryViewer } from "@/components/summaries/summary-viewer"
import { getSummaryById } from "@/lib/summary"
import { FileText } from "lucide-react"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SummaryPage({ params }: PageProps) {
  const { id } = await params
  const summary = await getSummaryById(id)

  if (!id || typeof id !== "string") notFound();


  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at, original_file_url } = summary

  const readingTime = Math.ceil((word_count || 0) / 200) // Assuming an average reading speed of 200 words per minute

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-orange-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-6 lg:py-12">
          <div className="flex flex-col">
            <SummaryHeader title={title} createdAt={created_at} readingTime={readingTime} />
          </div>
          {file_name && (
            <SourceInfo
              filename={file_name}
              title={title}
              summaryText={summary_text}
              originalFileUrl={original_file_url}
              createdAt={created_at}
            />
          )}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div
              className="relative p-4 sm:p-6 lg:p-8
            bg-white/80 backdrop-blur-md rounded-2xl
            sm:rounded-3xl shadow-xl border border-rose-100/30
            transition-all duration-300 hover:shadow-2xl
            hover:bg-white/90 max-w-4xl mx-auto"
            >
              <div
                className="absolute inset-0
              bg-gradient-to-br from-rose-50/50 via-orange-50/30
              to-transparent opacity-50 rounded-2xl
              sm:rounded-3xl"
              />

              <div
                className="absolute top-2 sm:top-4
              right-2 sm:right-4 flex items-center gap-1.5
              sm:gap-2 text-xs sm:text-sm
              text-muted-foreground bg-white/90 px-2 sm:px-3
              py-1 sm:py-1.5 rounded-full shadow-xs"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                {word_count?.toLocaleString()} words
              </div>

              <div
                className="relative mt-8 sm:mt-6 flex
              justify-center"
              >
                <SummaryViewer summary={summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
