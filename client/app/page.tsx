import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/status-pill";
import { ArrowRight, CalendarDays, DollarSign, Globe2, Sparkles } from "lucide-react";

const commandStats = [
  { label: "AI plans generated", value: "12.8k" },
  { label: "Avg. planning time", value: "3 min" },
  { label: "Curated destinations", value: "180+" }
];

const workflows = [
  "Build a day-by-day itinerary from budget, pace, and interests.",
  "Compare recommended destinations by travel style and season.",
  "Track traveler, agency, and admin metrics from one dashboard."
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div>
          <StatusPill>AI-powered trip operations</StatusPill>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Plan smarter trips with budget-aware AI itineraries.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            AI Travel Planner turns destination ideas into polished travel plans, destination matches, and role-based operating dashboards for travelers and agencies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/planner">
                Start Planning <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/explore">Explore Destinations</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {commandStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-primary/20 bg-card/95 shadow-soft">
          <CardContent className="p-5 sm:p-6">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Trip brief</p>
                  <h2 className="mt-1 text-2xl font-bold">Lisbon, 5 days</h2>
                </div>
                <span className="rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">94% fit</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md bg-muted p-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold">Balanced pace</p>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  <p className="mt-3 text-sm font-semibold">$1.6k budget</p>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <Globe2 className="h-5 w-5 text-accent-foreground" />
                  <p className="mt-3 text-sm font-semibold">Food and coast</p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {workflows.map((workflow, index) => (
                <div key={workflow} className="flex gap-3 rounded-lg border border-border bg-background p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary font-bold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{workflow}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-primary p-5 text-primary-foreground">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5" />
                <p className="font-semibold">Next best action</p>
              </div>
              <p className="mt-3 text-sm leading-6 opacity-90">
                Generate a client-ready itinerary with daily anchors, flexible blocks, booking guidance, and a budget buffer.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
