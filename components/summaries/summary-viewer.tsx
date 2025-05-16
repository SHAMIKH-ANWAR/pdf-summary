'use client';

import { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { NavigationControls } from './navigation-controls';
import { ProgressBar } from '@/components/summaries/progress-bar';

interface SummaryViewerProps {
  summary: string;
}

export function SummaryViewer({ summary }: SummaryViewerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = summary.split('\n\n').filter(Boolean);
  const totalSections = sections.length;

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const onSectionSelect = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <Card className="relative px-2 sm:px-6 pb-8 border border-rose-500/10">
      <ProgressBar sections={sections} currentSection={currentSection} onSectionSelect={onSectionSelect} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-20 sm:pb-24">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          {sections[currentSection] && (
            <CardTitle className="px-4 sm:px-6 text-lg sm:text-xl font-semibold">{sections[currentSection].split('\n')[0]}</CardTitle>
          )}
          <CardContent className="px-4 sm:px-6 text-sm sm:text-base text-muted-foreground">
            {sections[currentSection]
              ?.split('\n')
              .slice(1)
              .join('\n')}
          </CardContent>
        </div>
      </div>
      <NavigationControls
        currentSection={currentSection}
        totalSections={totalSections}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSectionSelect={onSectionSelect}
      />
    </Card>
  );
}