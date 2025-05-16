import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export function SourceInfo({
  filename,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  filename: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: Date;
}) {
  return (
    <div className="flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {filename}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" asChild>
          <ExternalLink href={originalFileUrl} target="_blank">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </ExternalLink>
        </Button>
        <DownloadButtonSummary
          title={title}
          summaryText={summaryText}
          fileName={filename}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}