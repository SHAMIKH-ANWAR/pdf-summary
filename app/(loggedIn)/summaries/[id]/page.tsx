import BgGradient from '@/components/common/bg-gradient';
import SummaryHeader from '@/components/summaries/summary-header';
import { getSummaryById } from '@/lib/summary';
import { FileText } from 'lucide-react';
import { notFound } from 'next/navigation';


interface SummaryPageProps {
  params: { id: string };
}

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { id } = params;
  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const paramsProp = {
    Promise: Promise<Response>,
    id: String,
  };

  const { title, summary_text, file_name, word_count } = summary;

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/10 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader title={title}/>
          </div>
          {file}
        </div>
      </div>
    </div>
  );
}