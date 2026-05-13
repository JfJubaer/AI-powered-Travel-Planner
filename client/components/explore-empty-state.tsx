"use client";

import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExploreEmptyStateProps {
  onReset?: () => void;
  isSearching?: boolean;
}

export function ExploreEmptyState({ onReset, isSearching }: ExploreEmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-14 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No destinations found</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {isSearching
            ? "Try adjusting your filters or search terms to find more destinations."
            : "Start exploring by searching for a destination or applying filters."}
        </p>
        {onReset && isSearching && (
          <Button variant="outline" onClick={onReset} className="mt-6">
            Reset filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
