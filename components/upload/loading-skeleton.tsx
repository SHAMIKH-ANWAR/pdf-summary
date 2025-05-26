import { Card } from "../ui/card";




export default function LoadingSkeleton() {
    return(
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
    )
}