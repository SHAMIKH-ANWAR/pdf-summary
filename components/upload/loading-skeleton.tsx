import { Card } from "../ui/card";




export default function LoadingSkeleton() {
    return(
         <Card className="relative px-2 sm:px-6 pb-8 border border-rose-500/10">
      <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm pt-4 pb-2 border-b border-rose-50/10">
            <div className="flex gap-1.5 px-4 overflow-hidden">
              {[1,2,3].map((_, index) => (
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