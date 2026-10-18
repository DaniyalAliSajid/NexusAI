import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/[0.04] border border-white/5 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export function ToolCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#27272a] bg-[#121215]/80 p-5 backdrop-blur-xl">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-3 w-full rounded" />
        <Skeleton className="mt-2 h-3 w-4/5 rounded" />
        <div className="mt-4 flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#27272a] pt-3.5">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}
