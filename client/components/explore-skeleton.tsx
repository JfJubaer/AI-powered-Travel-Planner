"use client";

import { Card, CardContent } from "@/components/ui/card";

export function DestinationSkeletonCard() {
  return (
    <Card className="flex min-h-[460px] flex-col overflow-hidden">
      <div className="h-48 animate-pulse bg-muted" />
      <CardContent className="flex flex-1 flex-col space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="h-6 w-32 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="h-7 w-14 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-16 animate-pulse rounded-lg bg-muted" />
          <div className="h-7 w-20 animate-pulse rounded-lg bg-muted" />
          <div className="h-7 w-14 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="mt-auto space-y-4 pt-2">
          <div className="h-px bg-border" />
          <div className="h-5 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ExplorePageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-5 w-44 animate-pulse rounded bg-muted" />
        <div className="h-10 w-80 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
      </div>
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <DestinationSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
