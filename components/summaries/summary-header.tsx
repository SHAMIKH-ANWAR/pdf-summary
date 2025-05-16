export default function SummaryHeader({ title, summary_text, file_name, word_count }) { 
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-700">{summary_text}</p>
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-gray-500" />
        <span className="text-sm text-gray-500">{file_name}</span>
        <span className="text-sm text-gray-500">({word_count} words)</span>
      </div>
    </div>
  );
}