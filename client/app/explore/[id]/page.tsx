"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DestinationGallery } from "@/components/destination-gallery";
import { DestinationCard } from "@/components/destination-card";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDestinationDetails } from "@/lib/api";
import type { DestinationDetails } from "@/lib/types";
import {
  ArrowLeft,
  CalendarRange,
  Compass,
  Loader2,
  MapPin,
  ShieldCheck,
  Star,
  WalletCards,
} from "lucide-react";

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

        if (!isActive) {
          return;
        }

        setDetails(data);
      } catch {
        if (!isActive) {
          return;
        }

        setError("We couldn't load this destination right now.");
      } finally {
        if (!isActive) {
          return;
        }

        setLoading(false);
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [id]);

  const averageReviewRating = useMemo(() => {
    if (!details?.reviews.length) {
      return 0;
    }

    const total = details.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / details.reviews.length;
  }, [details]);

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

  const {
    destination,
    galleryImages,
    budgetDetails,
    bestTimeToVisit,
    reviews,
    travelTips,
    relatedDestinations,
  } = details;

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
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                {destination.name}
              </h1>
              <Badge className="bg-accent text-accent-foreground">
                {destination.region}
              </Badge>
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
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {destination.summary}
            </p>
          </div>

          <DestinationGallery
            images={galleryImages}
            destinationName={destination.name}
          />

          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <SectionHeading
                  eyebrow="Overview"
                  title="What makes this destination work"
                />
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {destination.name} combines {destination.style.slice(0, 2).join(" and ")} strengths
                  with a {destination.budgetLevel} cost profile, making it a strong fit
                  for travelers who want a trip that feels curated rather than packed.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {destination.style.map((style) => (
                    <Badge key={style} className="bg-muted text-muted-foreground">
                      {style}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {destination.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-border/70 bg-muted/45 px-4 py-3 text-sm"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <SectionHeading
                  eyebrow="Budget details"
                  title={`How ${destination.averageDailyCost}/day usually breaks down`}
                />
                <div className="mt-5 space-y-4">
                  <BudgetLine label="Stay" value={budgetDetails.stay} />
                  <BudgetLine label="Food" value={budgetDetails.food} />
                  <BudgetLine label="Transport" value={budgetDetails.transport} />
                  <BudgetLine label="Experiences" value={budgetDetails.experiences} />
                </div>
                <div className="mt-6 rounded-2xl bg-primary/8 px-4 py-4 text-sm leading-7 text-muted-foreground">
                  {budgetDetails.note}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <SectionHeading
                eyebrow="Best time to visit"
                title="When the trip feels most rewarding"
              />
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {bestTimeToVisit.map((season) => (
                  <div
                    key={`${season.label}-${season.months}`}
                    className="rounded-[1.25rem] border border-border/70 bg-card px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {season.label}
                    </p>
                    <p className="mt-3 text-lg font-bold">{season.months}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {season.reason}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <SectionHeading
                  eyebrow="Ratings and reviews"
                  title="What travelers are saying"
                />
                <div className="mt-5 flex flex-wrap items-end gap-5 rounded-[1.25rem] border border-border/70 bg-muted/40 p-5">
                  <div>
                    <p className="text-4xl font-black tracking-tight">
                      {averageReviewRating.toFixed(1)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Average of {reviews.length} recent traveler reviews
                    </p>
                  </div>
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.round(averageReviewRating)
                            ? "fill-current"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={`${review.author}-${review.date}`}
                      className="rounded-[1.25rem] border border-border/70 bg-card px-5 py-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold">{review.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {review.tripType} . {formatReviewDate(review.date)}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          <Star className="h-4 w-4 fill-current" />
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <SectionHeading
                  eyebrow="Travel tips"
                  title="Small moves that improve the trip"
                />
                <div className="mt-6 space-y-4">
                  {travelTips.map((tip) => (
                    <div
                      key={tip.title}
                      className="rounded-[1.25rem] border border-border/70 bg-card px-5 py-5"
                    >
                      <p className="font-bold">{tip.title}</p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <section>
            <SectionHeading
              eyebrow="Related destinations"
              title="Similar places worth comparing"
            />
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedDestinations.map((relatedDestination) => (
                <DestinationCard
                  key={`${relatedDestination.name}-${relatedDestination.country}`}
                  destination={relatedDestination}
                />
              ))}
            </div>
          </section>
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
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                  Plan this trip
                </p>
                <p className="mt-2 text-2xl font-black">{destination.name}</p>
              </div>
            </div>
            <CardContent className="space-y-5 p-5">
              <div className="grid gap-3">
                <QuickFact
                  icon={WalletCards}
                  label="Average daily cost"
                  value={`$${destination.averageDailyCost}`}
                />
                <QuickFact
                  icon={CalendarRange}
                  label="Best months"
                  value={destination.bestMonths.slice(0, 2).join(" and ")}
                />
                <QuickFact
                  icon={Compass}
                  label="Travel style"
                  value={destination.style.slice(0, 2).join(" + ")}
                />
              </div>

              <div className="rounded-[1.25rem] bg-muted/45 p-4">
                <p className="text-sm font-semibold">Ideal for travelers who want</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  A {destination.budgetLevel} destination with strong {destination.style[0]}
                  appeal, dependable safety signals, and a clear mix of signature
                  highlights plus easy filler days.
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

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function BudgetLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-border/70 px-4 py-4">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{value}</p>
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
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6">{value}</p>
      </div>
    </div>
  );
}

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] animate-pulse rounded-2xl bg-muted"
                />
              ))}
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 animate-pulse rounded-[1.5rem] bg-muted"
                />
              ))}
            </div>
          </div>
          <div className="h-[28rem] animate-pulse rounded-[1.5rem] bg-muted" />
        </div>
      </div>
    </main>
  );
}
