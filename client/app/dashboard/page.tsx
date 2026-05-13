"use client";

import type { ComponentType } from "react";
import { useEffect, useState, useTransition } from "react";
import { DestinationCard } from "@/components/destination-card";
import { MetricCard } from "@/components/metric-card";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/lib/api";
import type { DashboardMetric, DashboardTrip, Destination, Role } from "@/lib/types";
import { BriefcaseBusiness, Loader2, ShieldCheck, UserRound } from "lucide-react";

const roles: { value: Role; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { value: "traveler", label: "Traveler", icon: UserRound },
  { value: "agency", label: "Agency", icon: BriefcaseBusiness },
  { value: "admin", label: "Admin", icon: ShieldCheck }
];

export default function DashboardPage() {
  const [role, setRole] = useState<Role>("traveler");
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [recentTrips, setRecentTrips] = useState<DashboardTrip[]>([]);
  const [recommendations, setRecommendations] = useState<Destination[]>([]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setError("");
    startTransition(async () => {
      try {
        const result = await getDashboard(role);
        setMetrics(result.metrics);
        setRecentTrips(result.recentTrips);
        setRecommendations(result.recommendations);
      } catch {
        setError("Dashboard data is unavailable. Start the API server to load live metrics.");
      }
    });
  }, [role]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <StatusPill>Role-based dashboard</StatusPill>
          <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">Operate every travel workflow.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Switch roles to view the metrics, saved plans, and destination intelligence each user type needs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map((item) => (
            <Button
              key={item.value}
              variant={role === item.value ? "default" : "outline"}
              onClick={() => setRole(item.value)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {error ? <p className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}

      {isPending && !metrics.length ? (
        <Card>
          <CardContent className="flex items-center justify-center gap-3 p-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading dashboard
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} label={metric.label} value={metric.value} trend={metric.trend} />
            ))}
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card>
              <CardHeader>
                <CardTitle>Recent trip plans</CardTitle>
                <CardDescription>Plans generated from the selected role context.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTrips.map((trip) => (
                  <div key={`${trip.destination}-${trip.style}`} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{trip.destination}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{trip.style}</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">{trip.durationDays} days</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                      <span className="text-muted-foreground">Estimated total</span>
                      <span className="font-bold">${trip.estimatedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating snapshot</CardTitle>
                <CardDescription>Quality signals for planning confidence and destination fit.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Snapshot label="AI confidence" value="High" />
                  <Snapshot label="Budget variance" value="Low" />
                  <Snapshot label="Coverage" value="Global" />
                </div>
                <div className="mt-5 rounded-lg bg-muted p-5">
                  <h3 className="font-bold capitalize">{role} priority</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {role === "traveler" && "Keep the next trip easy to compare, adjust, and book without losing budget clarity."}
                    {role === "agency" && "Turn destination matches into polished client proposals with predictable margins and timing."}
                    {role === "admin" && "Monitor planning quality, destination coverage, and generated trip volume across the platform."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Destination signals</h2>
              <Badge className="bg-accent text-accent-foreground">Curated</Badge>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((destination) => (
                <DestinationCard key={`${destination.name}-${destination.country}`} destination={destination} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}
