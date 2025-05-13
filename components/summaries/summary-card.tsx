import {Card} from '@/components/ui/card';
import DeleteButton from './delete-button';
import Link from 'next/link';
import { FileText } from 'lucide-react'; // Added import

interface Summary { // Added interface for better type safety
  id: string;
  original_file_url: string;
  title: string | null;
  created_at: string;
  summary_text: string; // Added summary text
}

const SummaryHeader = ({ fileUrl, title, createdAt }: { fileUrl: string; title: string | null; createdAt: string }) => {
    return (
        <div className="flex items-start gap-2 sm:gap-4">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
            <div className="flex-1 min-w-0">
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
                    {title}
                </h3>
                <p className="text-sm text-gray-500">{createdAt}</p>
            </div>
        </div>
    );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
        <div>
          <SummaryHeader 
            fileUrl={summary.original_file_url}
            title={summary.title}
            createdAt={summary.created_at}
          />
          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
          </p>
          <div className="mt-2"> {/* Added a div for the date, for spacing */}
             <p className="text-sm text-gray-500">{summary.created_at}</p> {/* Changed to use summary.created_at */}
          </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
