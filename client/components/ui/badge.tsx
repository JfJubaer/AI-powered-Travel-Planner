import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-transparent bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground",
        className
      )}
      {...props}
    />
  );
}
