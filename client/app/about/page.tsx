import { StatusPill } from "@/components/status-pill";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Globe2, ShieldCheck } from "lucide-react";

const values = [
  {
    title: "Smarter planning",
    description: "AI-generated itineraries balance time, budget, pacing, and traveler interests before a trip reaches the booking stage.",
    icon: BrainCircuit
  },
  {
    title: "Global context",
    description: "Destination intelligence combines seasonality, practical costs, safety signals, and experience quality.",
    icon: Globe2
  },
  {
    title: "Confident decisions",
    description: "Traveler, agency, and admin dashboards make every recommendation easier to compare, adjust, and trust.",
    icon: ShieldCheck
  }
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <StatusPill>About the platform</StatusPill>
      <div className="mt-5 max-w-3xl">
        <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl">Travel planning built for modern teams and travelers.</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          AI Travel Planner helps people move from scattered destination ideas to polished, budget-aware travel plans with less research friction and more confidence.
        </p>
      </div>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} className="glass-surface">
            <CardContent className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <value.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-bold">{value.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
