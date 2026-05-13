import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDestinationHref } from "@/lib/destinations";
import type { Destination } from "@/lib/types";
import { ArrowRight, MapPin, Star, WalletCards } from "lucide-react";

export function DestinationCard({ destination, detailsHref }: { destination: Destination; detailsHref?: string }) {
  const href = detailsHref ?? getDestinationHref(destination);

  return (
    <Card className="flex h-full min-h-[460px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-48 shrink-0 bg-muted">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-background/90 text-foreground backdrop-blur">{destination.budgetLevel}</Badge>
          <Badge className="bg-accent text-accent-foreground">{destination.region}</Badge>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-bold">{destination.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {destination.country}
            </p>
          </div>
          <p className="flex shrink-0 items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-sm font-bold text-primary">
            <Star className="h-4 w-4 fill-current" />
            {destination.rating}
          </p>
        </div>
        <p className="mt-4 min-h-[72px] text-sm leading-6 text-muted-foreground">{destination.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {destination.style.slice(0, 3).map((style) => (
            <Badge key={style} className="bg-muted text-muted-foreground">
              {style}
            </Badge>
          ))}
        </div>
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
            <span className="flex items-center gap-2 font-bold">
              <WalletCards className="h-4 w-4 text-accent" />
              ${destination.averageDailyCost}/day
            </span>
            <span className="text-muted-foreground">{destination.bestMonths.slice(0, 2).join(" and ")}</span>
          </div>
          <Button asChild className="mt-4 w-full" variant="outline">
            <Link href={href}>
              View Details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function DestinationCardSkeleton() {
  return (
    <Card className="flex h-full min-h-[460px] flex-col overflow-hidden">
      <div className="h-48 shrink-0 animate-pulse bg-muted" />
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="h-6 w-32 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="h-7 w-14 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="mt-5 flex gap-2">
          <div className="h-7 w-16 animate-pulse rounded-lg bg-muted" />
          <div className="h-7 w-20 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="mt-auto space-y-4 pt-5">
          <div className="h-px bg-border" />
          <div className="h-5 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
