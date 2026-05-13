import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "How AI turns a loose travel idea into a bookable itinerary",
    category: "AI planning",
    date: "May 2026",
    summary: "A practical look at how budget, pace, season, and traveler interests can shape better day-by-day plans."
  },
  {
    title: "Choosing destinations with cost and timing signals",
    category: "Destination strategy",
    date: "April 2026",
    summary: "Why the best destination match is rarely only about price, and how seasonality changes the recommendation."
  },
  {
    title: "What agencies need from an AI travel dashboard",
    category: "Operations",
    date: "March 2026",
    summary: "Client proposals, trip value, conversion signals, and planning quality all belong in the same operating view."
  }
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <StatusPill>Travel intelligence journal</StatusPill>
      <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl">Ideas for better AI-assisted travel planning.</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Product notes, planning strategy, and destination thinking for travelers and travel teams.
          </p>
        </div>
      </div>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.title} className="transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-3">
                <Badge className="bg-accent text-accent-foreground">{post.category}</Badge>
                <span className="text-xs font-semibold text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="mt-5 text-xl font-bold leading-tight">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.summary}</p>
              <Link href="/planner" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80">
                Try it in planner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
