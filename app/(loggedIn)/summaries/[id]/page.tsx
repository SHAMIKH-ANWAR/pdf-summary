import { getSummaryById } from '@/lib/summary';
import { FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
// import { getSummaryById } from '@/lib/actions/summary-actions';
// import SummaryBadge from '@/components/summary-badge';

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
      <div className="bgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4 p-4">
        <div className="container mx-auto flex flex-col gap-4 p-4">
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
            <div className="relative mt-8 sm:mt-16 lg:mt-24">
              <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"
                style={{
                  maskImage: 'radial-gradient(ellipse at top left, transparent 20%, black 20%)',
                }}
              />
              <div className="relative rounded-md bg-white/90 px-4 py-8 shadow-md backdrop-blur-sm dark:bg-slate-900/90 sm:px-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                  <SummaryBadge wordCount={word_count} />
                </div>
                <div className="relative mt-4 rounded-md border px-4 py-8 dark:border-neutral-800">
                  <FileText className="absolute -top-2 left-2 h-6 w-6 bg-white p-1 text-muted-foreground dark:bg-slate-900" />
                  <pre className="whitespace-pre-wrap text-sm sm:text-base">{summary_text}</pre>
                </div>
                <div className="mt-4 text-sm text-muted-foreground italic">
                  (file_name: {file_name})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}