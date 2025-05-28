// app/summaries/[id]/loading.tsx

import React from 'react';
import { FileText } from 'lucide-react';

function HeaderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-8 w-32 rounded-full bg-white/80" />
        <div className="ml-auto flex items-center gap-3">
          <div className="h-5 w-40 rounded-full bg-white/80" />
        </div>
      </div>
      <div className="h-8 w-32 sm:w-64 rounded-full bg-white/80" />
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className={`h-4 ${i % 2 === 0 ? 'w-full' : 'w-11/12'} bg-white/80 rounded-full`}
        />
      ))}
    </div>
  );
}

function LoadingSummary() {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <div className="container mx-auto flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100/30">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <HeaderSkeleton />
            <div className="my-6 h-2 bg-white/80 rounded-full" />
            <div className="flex items-center mb-6">
              <FileText className="w-4 h-4 mr-2 text-white/80" />
              <div className="h-4 w-48 bg-white/80 rounded-full" />
            </div>
            <div className="mt-8">
              <div className="h-6 w-64 mx-auto bg-white/80 rounded-full mb-8" />
              <ContentSkeleton />
            </div>
            <div className="flex items-center justify-between mt-8">
              <div className="h-10 w-10 rounded-full bg-white/80" />
              <div className="flex items-center gap-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-white/80" />
                ))}
              </div>
              <div className="h-10 w-10 rounded-full bg-white/80" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-400 via-rose-300 to-orange-200 opacity-50 rounded-3xl" />
    </div>
  );
}

export default LoadingSummary;
