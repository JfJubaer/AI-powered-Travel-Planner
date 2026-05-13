import { cn } from "@/lib/utils";

export function StatusPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md bg-accent px-3 py-1 text-xs font-bold text-accent-foreground", className)}>
      {children}
    </span>
  );
}
