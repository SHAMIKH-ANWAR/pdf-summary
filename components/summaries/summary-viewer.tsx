'use client';

import { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { NavigationControls } from './navigation-controls';
import { ProgressBar } from '@/components/summaries/progress-bar';
import { parseSection } from '@/utils/summary-helpers';
import ContentSection from './content-section';

interface SummaryViewerProps {
  summary: string;
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10'>
      <h2 className='text-3xl lg:text-4xl'>{title}</h2>
    </div>
  );
};

export function SummaryViewer({ summary }: SummaryViewerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = summary.split('\n#').filter(Boolean).map((section) => section.trim()).map(parseSection);
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
          {/* {sections[currentSection] && (
            <CardTitle className="px-4 sm:px-6 text-lg sm:text-xl font-semibold">{sections[currentSection].title}</CardTitle>
          )}
          <CardContent className="px-4 sm:px-6 text-sm sm:text-base text-muted-foreground">
            {sections[currentSection]?.points?.join('\n')}
          </CardContent> */}
          <SectionTitle title={sections[currentSection]?.title || ''}/>
          <ContentSection title={sections[currentSection]?.title || ''} points={sections[currentSection]?.points || []} />
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