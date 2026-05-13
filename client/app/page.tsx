import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomepageSections } from "@/components/homepage-sections";
import { StatusPill } from "@/components/status-pill";
import { ArrowDown, ArrowRight, CalendarDays, DollarSign, Globe2, MapPinned, Sparkles } from "lucide-react";

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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.18),rgba(20,184,166,0.10),rgba(15,23,42,0.08))] bg-[length:200%_200%] animate-[gradientShift_14s_ease-in-out_infinite]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background" />
        <div className="relative mx-auto grid min-h-[66vh] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div>
            <StatusPill>AI-powered trip planning</StatusPill>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Build your perfect trip with AI in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Tell the planner your budget, dates, pace, and interests. AI Travel Planner creates a day-by-day itinerary, destination matches, and booking-ready guidance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/planner">
                  Plan My Trip <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/explore">Explore Destinations</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[360px]">
            <Card className="glass-surface absolute right-0 top-4 w-full max-w-md animate-[floatCard_7s_ease-in-out_infinite]">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">AI trip brief</p>
                    <h2 className="mt-1 text-2xl font-bold">Lisbon, 5 days</h2>
                  </div>
                  <span className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/25">94% fit</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-muted p-3">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">Balanced pace</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-sm font-semibold">$1.6k budget</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <Globe2 className="h-5 w-5 text-secondary dark:text-primary" />
                    <p className="mt-3 text-sm font-semibold">Food and coast</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-surface absolute bottom-8 left-0 w-[88%] max-w-sm animate-[floatCard_8s_ease-in-out_infinite_0.8s]">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold">AI recommendation</p>
                    <p className="text-sm text-muted-foreground">Sintra day trip after morning forecast clears</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-surface absolute bottom-0 right-8 hidden w-56 animate-[floatCard_6s_ease-in-out_infinite_1.2s] sm:block">
              <CardContent className="p-4">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <MapPinned className="h-4 w-4 text-primary" />
                  Next stop
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Alfama viewpoints before dinner</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Link
          href="#travel-workflow"
          aria-label="Scroll to travel workflow"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-background/80 p-3 text-muted-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:text-primary md:inline-flex"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </Link>
      </section>

      <section id="travel-workflow" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {commandStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 glass-surface">
          <CardContent className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-3">
              {workflows.map((workflow, index) => (
                <div key={workflow} className="flex gap-3 rounded-lg border border-border bg-background p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary font-bold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{workflow}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-secondary p-5 text-secondary-foreground shadow-sm">
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
      <HomepageSections />
    </main>
  );
}
