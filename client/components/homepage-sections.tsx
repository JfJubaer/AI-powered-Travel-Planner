"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Building2,
  ChevronDown,
  Clock3,
  Compass,
  Gem,
  Globe2,
  HeartHandshake,
  Mail,
  MapPinned,
  Mountain,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sectionClass = "mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8";
const hoverCard = "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft";

const popularDestinations = [
  { city: "Kyoto", country: "Japan", score: "98%", price: "$185/day", vibe: "Culture and food", accent: "from-blue-500/20 to-teal-500/20" },
  { city: "Lisbon", country: "Portugal", score: "94%", price: "$145/day", vibe: "Coast and cafes", accent: "from-sky-500/20 to-blue-600/20" },
  { city: "Queenstown", country: "New Zealand", score: "96%", price: "$260/day", vibe: "Adventure", accent: "from-teal-500/20 to-slate-900/20" },
  { city: "Marrakesh", country: "Morocco", score: "91%", price: "$92/day", vibe: "Markets and design", accent: "from-blue-400/20 to-teal-400/20" }
];

const categories = [
  { title: "Beach escapes", icon: Plane, trips: "48 trips" },
  { title: "Mountain retreats", icon: Mountain, trips: "35 trips" },
  { title: "Food journeys", icon: Utensils, trips: "62 trips" },
  { title: "City breaks", icon: Building2, trips: "74 trips" },
  { title: "Hidden gems", icon: Gem, trips: "29 trips" },
  { title: "Slow travel", icon: Compass, trips: "41 trips" }
];

const reasons = [
  { title: "AI-native planning", description: "Generate itineraries from travel style, dates, pace, and budget in one workflow.", icon: BrainCircuit },
  { title: "Budget-aware routes", description: "Compare estimated daily costs, trip totals, and realistic booking buffers.", icon: BadgeCheck },
  { title: "Traveler confidence", description: "Use safety, timing, and destination fit signals before choosing a route.", icon: ShieldCheck },
  { title: "Human-friendly edits", description: "Keep plans flexible with anchor activities, local tips, and free-time blocks.", icon: HeartHandshake }
];

const stats = [
  { label: "Trips generated", value: "12.8k" },
  { label: "Destination signals", value: "180+" },
  { label: "Avg. plan time", value: "3 min" },
  { label: "Traveler rating", value: "4.9/5" }
];

const testimonials = [
  {
    quote: "The planner gave me a realistic route instead of a packed checklist. It felt like an expert travel designer reviewed my budget.",
    name: "Nadia Rahman",
    role: "Solo traveler"
  },
  {
    quote: "We use it to draft client proposals faster. The destination matching and trip totals make the first conversation much sharper.",
    name: "Marcus Lee",
    role: "Boutique agency owner"
  },
  {
    quote: "The dashboard makes every saved trip easy to compare. It is clean, fast, and surprisingly practical.",
    name: "Elena Foster",
    role: "Family trip planner"
  }
];

const blogs = [
  { title: "How AI builds a better five-day city itinerary", tag: "AI planning", read: "5 min read" },
  { title: "Budget signals that change your best destination match", tag: "Travel ops", read: "4 min read" },
  { title: "When to choose a relaxed pace over a packed schedule", tag: "Itinerary design", read: "6 min read" }
];

const faqs = [
  {
    question: "Can AI Travel Planner work without an API key?",
    answer: "Yes. The app includes polished fallback itinerary and destination logic for local development, then can use an AI provider when a key is configured."
  },
  {
    question: "Is the planner useful for agencies?",
    answer: "Yes. The dashboard includes agency-focused metrics, proposal-style trip summaries, destination signals, and trip value context."
  },
  {
    question: "Can travelers edit generated plans?",
    answer: "The generated itinerary is structured by day and activity block, which makes it straightforward to adjust, replace, or extend in future workflow screens."
  }
];

export function HomepageSections() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <section className={sectionClass}>
        <SectionHeading eyebrow="Popular destinations" title="AI-ranked places travelers are planning now." />
        {isLoading ? (
          <SkeletonGrid count={4} />
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {popularDestinations.map((destination) => (
              <Card key={destination.city} className={cn("overflow-hidden", hoverCard)}>
                <CardContent className="p-0">
                  <div className={cn("h-32 bg-gradient-to-br", destination.accent)} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold">{destination.city}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{destination.country}</p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">{destination.score}</Badge>
                    </div>
                    <p className="mt-4 text-sm font-semibold">{destination.vibe}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{destination.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className={sectionClass}>
        <Card className="glass-surface overflow-hidden">
          <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Badge className="bg-primary text-primary-foreground">AI trip generator</Badge>
              <h2 className="mt-5 text-3xl font-black tracking-normal sm:text-4xl">Turn a rough idea into a day-by-day travel plan.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Add your destination, budget, dates, pace, and interests. The planner returns daily anchors, local tips, flexible blocks, and booking guidance.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/planner">
                    Generate My Trip <Sparkles className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/explore">Browse destinations</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-5">
              <div className="flex items-center justify-between">
                <p className="font-bold">AI plan preview</p>
                <Clock3 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 space-y-3">
                {["Morning culture walk", "Seafood lunch district", "Sunset viewpoint"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-muted p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className={sectionClass}>
        <SectionHeading eyebrow="Travel categories" title="Choose the kind of trip you want AI to optimize." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className={hoverCard}>
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <category.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.trips}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading eyebrow="Why choose us" title="Planning tools built around real travel decisions." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => (
            <Card key={reason.title} className={hoverCard}>
              <CardContent className="p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <reason.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{reason.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-4 rounded-lg border border-border bg-secondary p-5 text-secondary-foreground shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/8 p-5">
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="mt-2 text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading eyebrow="Testimonials" title="Travelers and teams trust the planning flow." />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className={hoverCard}>
              <CardContent className="p-6">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{testimonial.quote}</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Latest blogs" title="Fresh thinking for AI-assisted travel." />
          <Button asChild variant="outline">
            <Link href="/blog">View all posts</Link>
          </Button>
        </div>
        {isLoading ? (
          <SkeletonGrid count={3} />
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Card key={blog.title} className={hoverCard}>
                <CardContent className="p-6">
                  <Badge className="bg-accent text-accent-foreground">{blog.tag}</Badge>
                  <h3 className="mt-5 text-xl font-bold leading-tight">{blog.title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground">{blog.read}</p>
                  <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80">
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className={sectionClass}>
        <SectionHeading eyebrow="FAQ" title="Answers before you start planning." />
        <div className="mt-8 grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-border bg-card p-5 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {faq.question}
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <Card className="glass-surface">
          <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Badge className="bg-primary text-primary-foreground">Newsletter</Badge>
              <h2 className="mt-5 text-3xl font-black tracking-normal">Get destination ideas and AI planning tips.</h2>
              <p className="mt-3 text-muted-foreground">Monthly travel intelligence, product updates, and practical itinerary design notes.</p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <Input type="email" placeholder="you@example.com" aria-label="Email address" />
              <Button type="submit">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3 font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Globe2 className="h-5 w-5" />
              </span>
              AI Travel Planner
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 opacity-80">AI-powered itineraries, destination recommendations, and planning dashboards for modern travelers.</p>
          </div>
          <FooterLinks title="Platform" links={["Planner", "Explore", "Dashboard"]} />
          <FooterLinks title="Company" links={["About", "Blog", "Contact"]} />
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-center text-sm opacity-75">
          © 2026 AI Travel Planner. Built for smarter trips.
        </div>
      </footer>
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <Badge className="bg-primary/10 text-primary">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-black leading-tight tracking-normal sm:text-4xl">{title}</h2>
    </div>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardContent className="space-y-4 p-5">
            <div className="h-28 animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-2/3 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded-lg bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 grid gap-2">
        {links.map((link) => (
          <Link key={link} href={`/${link === "Planner" ? "planner" : link.toLowerCase()}`} className="text-sm opacity-80 transition-opacity hover:opacity-100">
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}
