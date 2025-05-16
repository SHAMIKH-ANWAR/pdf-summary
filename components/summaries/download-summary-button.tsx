import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export function DownloadButtonSummary({
  title,
  summaryText,
  fileName,
  createdAt,
}: {
  title: string;
  summaryText: string;
  fileName: string;
  createdAt: Date;
}) {
  const handleDownload = () => {
    const summaryContent = `# ${title}\n\n${summaryText}`;
    const originalFilename = `${fileName}`;
    const generatedOn = `Generated on: ${new Date(createdAt).toLocaleDateString()}`;
    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.${originalFilename
      .split('.')
      .pop()}`;
      document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button size="sm" className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50" onClick={handleDownload}>
      <FileDown className="h-4 w-4 mr-1" />
      Download Summary
    </Button>
  );
}