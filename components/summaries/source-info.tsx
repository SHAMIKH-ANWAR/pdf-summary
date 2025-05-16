import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

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
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
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
