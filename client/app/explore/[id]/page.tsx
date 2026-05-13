"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DestinationCard } from "@/components/destination-card";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDestinationDetails } from "@/lib/api";
import type { DestinationDetails } from "@/lib/types";
import { ArrowLeft, CalendarRange, Compass, MapPin, ShieldCheck, Star, WalletCards } from "lucide-react";

export default function DestinationDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [details, setDetails] = useState<DestinationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Destination not found.");
      setLoading(false);
      return;
    }

    let isActive = true;

    const run = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getDestinationDetails(id);

        if (isActive) {
          setDetails(data);
        }
      } catch {
        if (isActive) {
          setError("We couldn't load this destination right now.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (loading) {
    return <DestinationDetailsSkeleton />;
  }

  if (error || !details) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-semibold">Destination unavailable</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              {error || "The page you're looking for could not be found."}
            </p>
            <Button asChild className="mt-6">
              <Link href="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to explore
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const { destination, relatedDestinations } = details;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="-ml-3">
          <Link href="/explore">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to explore
          </Link>
        </Button>
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_360px] lg:items-start">
        <div className="space-y-8">
          <div>
            <StatusPill>Destination details</StatusPill>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{destination.name}</h1>
              <Badge className="bg-accent text-accent-foreground">{destination.region}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {destination.country}
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current text-primary" />
                {destination.rating.toFixed(1)} rating
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                {destination.safetyScore}/100 safety score
              </span>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{destination.summary}</p>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-soft">
            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
              <Image
                src={destination.imageUrl}
                alt={`${destination.name}, ${destination.country}`}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <SectionHeading eyebrow="Overview" title="Why travelers pick this destination" />
                <div className="mt-5 flex flex-wrap gap-2">
                  {destination.style.map((style) => (
                    <Badge key={style} className="bg-muted text-muted-foreground">
                      {style}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {destination.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl border border-border/70 bg-muted/45 px-4 py-3 text-sm">
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <SectionHeading eyebrow="Trip facts" title="Core planning signals" />
                <div className="mt-5 grid gap-4">
                  <QuickFact icon={WalletCards} label="Average daily cost" value={`$${destination.averageDailyCost}`} />
                  <QuickFact icon={CalendarRange} label="Best months" value={destination.bestMonths.join(", ")} />
                  <QuickFact icon={Compass} label="Budget level" value={destination.budgetLevel} />
                </div>
              </CardContent>
            </Card>
          </div>

          {relatedDestinations.length ? (
            <section>
              <SectionHeading eyebrow="Related destinations" title="Similar places worth comparing" />
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedDestinations.map((relatedDestination) => (
                  <DestinationCard
                    key={relatedDestination._id ?? `${relatedDestination.name}-${relatedDestination.country}`}
                    destination={relatedDestination}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24">
          <Card className="overflow-hidden border-primary/15 shadow-soft">
            <div className="relative h-40">
              <Image
                src={destination.imageUrl}
                alt={`${destination.name} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Plan this trip</p>
                <p className="mt-2 text-2xl font-black">{destination.name}</p>
              </div>
            </div>
            <CardContent className="space-y-5 p-5">
              <div className="grid gap-3">
                <QuickFact icon={MapPin} label="Country" value={destination.country} />
                <QuickFact icon={ShieldCheck} label="Safety score" value={`${destination.safetyScore}/100`} />
                <QuickFact icon={Star} label="Rating" value={destination.rating.toFixed(1)} />
              </div>

              <div className="rounded-[1.25rem] bg-muted/45 p-4">
                <p className="text-sm font-semibold">Good fit if you want</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  A {destination.budgetLevel} trip with strong {destination.style[0]} appeal and a clear mix of signature highlights.
                </p>
              </div>

              <Button asChild className="w-full">
                <Link href="/planner">Build an itinerary</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/explore">Compare more destinations</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

function QuickFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.15rem] border border-border/70 px-4 py-4">
      <span className="rounded-xl bg-primary/10 p-2 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-6">{value}</p>
      </div>
    </div>
  );
}

function DestinationDetailsSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-12 w-72 animate-pulse rounded bg-muted" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_360px]">
          <div className="space-y-6">
            <div className="aspect-[16/10] animate-pulse rounded-[1.5rem] bg-muted" />
            <div className="grid gap-6 xl:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-[1.5rem] bg-muted" />
              ))}
            </div>
          </div>
          <div className="h-[28rem] animate-pulse rounded-[1.5rem] bg-muted" />
        </div>
      </div>
    </main>
  );
}
