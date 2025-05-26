import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";

function HeaderSkeleton() {
  return (
    <div className="flex gap-4 mb-8 justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
          <Skeleton className="h-10 w-48"/>
        </h1>
        <p className="text-gray-600">
          <Skeleton className="h-6 w-96"/>
        </p>
      </div>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 flex flex-col gap-2">
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
}

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-20 to-cyan-200" />
      <section className="container px-10 py-24 mx-auto flex flex-col gap-4">
        <HeaderSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
