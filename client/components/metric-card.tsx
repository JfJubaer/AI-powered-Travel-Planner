import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ label, value, trend }: { label: string; value: string | number; trend: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="text-3xl font-bold tracking-normal">{value}</p>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
