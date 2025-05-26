import { cn } from "@/lib/utils";

interface Section {
  title: string;
  points: string[];
}

interface ProgressBarProps {
  sections: Section[];
  currentSection: number;
  onSectionSelect: (index: number) => void;
}

export function ProgressBar({
  sections,
  currentSection,
  onSectionSelect,
}: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm pt-4 pb-2 border-b border-rose-50/10">
      <div className="flex gap-1.5 px-4 overflow-hidden">
        {sections.map((_, index) => (
          <div className="h-1.5 flex-1 rounded-full bg-rose-500 overflow-hidden" key={index}>
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full bg-rose-700 transition-all duration-300",
                index === currentSection
                  ? "w-full"
                  : currentSection > index
                  ? "w-full opacity-10"
                  : "w-0"
              )}
              style={{ flexGrow: 1 }}
              onClick={() => onSectionSelect(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
