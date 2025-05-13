import Card from '@/components/ui/card';
import DeleteButton from './delete-button'; // Assuming this is in the same directory
import Link from 'next/link';

export default function SummaryCard({ summary }: { summary: any }) { // Added type any
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
          <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
            {summary.title}
          </h3>
          <p className="text-sm text-gray-500">2024</p> {/* Hardcoded year, may need to be dynamic */}
        </Link>
      </Card>
    </div>
  );
}
