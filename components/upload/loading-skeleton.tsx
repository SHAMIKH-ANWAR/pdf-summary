import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <Card className="relative px-2 sm:px-6 pb-8 border border-rose-500/10">
      <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm pt-4 pb-2 border-b border-rose-50/10">
        <div className="flex gap-1.5 px-4 overflow-hidden">
          {[1, 2, 3].map((_, index) => (
            <div
              className="h-1.5 flex-1 rounded-full bg-rose-500 overflow-hidden"
              key={index}
            >
              <div
                key={index}
                className={`h-1.5 rounded-full bg-rose-700 transition-all duration-300`}
                style={{ flexGrow: 1 }}
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
          {/* <SectionTitle title={sections[currentSection]?.title || ''}/> */}
          <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
          <Skeleton className="h-12 w-3/4 mx-auto bg-rose-500/10"/>
          </div>
          <div className="space-y-4">
      <div className="prose prose-lg max-w-none">
        {[1,2,3].map((_, index) => (
          <div className="group relative bg-linear-to-br from-gray-500 to-gray-600/[0.03] p-4 rounded-2xl border border-gray-500/10" key={`numbered-${index}`}>
            <div className="relative flex gap-4 items-center">
                <div className="fle">

                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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
