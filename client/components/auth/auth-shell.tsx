import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const trustSignals = [
  {
    title: "Smarter trip planning",
    description: "Save itineraries, compare destinations, and keep every planning detail in one workspace.",
    icon: Sparkles
  },
  {
    title: "Traveler and admin access",
    description: "Move between user and admin experiences without a disconnected flow.",
    icon: UsersRound
  },
  {
    title: "Protected sessions",
    description: "Validated forms, local session persistence, and a ready path for OAuth handoff.",
    icon: ShieldCheck
  }
];

interface AuthShellProps {
  badge: string;
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLabel: string;
  children: React.ReactNode;
}

export function AuthShell({ badge, title, description, footerText, footerLink, footerLabel, children }: AuthShellProps) {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(20,184,166,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.05),transparent_55%)]" />
      <div className="absolute left-8 top-24 h-52 w-52 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-12 right-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <section className="flex flex-col justify-center">
          <Badge className="w-fit bg-primary/12 text-primary">{badge}</Badge>
          <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
            Designed to make your next sign-in feel like part of the product.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            AI Travel Planner gives travelers and admins one polished front door into trip planning, destination research, and smarter travel operations.
          </p>

          <div className="mt-8 grid gap-4">
            {trustSignals.map((signal) => (
              <Card key={signal.title} className="glass-surface">
                <CardContent className="flex gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <signal.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold">{signal.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Link href="/explore" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
            Explore destinations first <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="flex items-center">
          <Card className="glass-surface w-full overflow-hidden border-white/60 shadow-soft dark:border-white/10">
            <CardContent className="p-0">
              <div className="border-b border-border/70 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.12),transparent)] px-6 py-6 sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
                    <Compass className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">AI Travel Planner</p>
                    <p className="text-lg font-bold">{title}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
              </div>

              <div className="px-6 py-6 sm:px-8 sm:py-8">
                {children}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  {footerText}{" "}
                  <Link href={footerLink} className="font-semibold text-primary transition-colors hover:text-primary/80">
                    {footerLabel}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
