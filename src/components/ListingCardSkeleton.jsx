import React from "react";

export default function ListingCardSkeleton() {
  return (
    <div className="h-[480px] flex flex-col bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-slate-200 dark:bg-slate-700" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col p-5">
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mb-3" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mb-4" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
        </div>

        {/* Meta Info Skeleton */}
        <div className="space-y-2.5 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
          </div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="p-5 pt-0">
        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    </div>
  );
}
