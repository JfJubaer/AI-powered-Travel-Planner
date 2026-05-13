import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@/lib/types";
import { MapPin, ShieldCheck, Star } from "lucide-react";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-background/90 text-foreground backdrop-blur">{destination.budgetLevel}</Badge>
          <Badge className="bg-accent text-accent-foreground">{destination.region}</Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">{destination.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {destination.country}
            </p>
          </div>
          <div className="text-right text-sm font-semibold">
            <p className="flex items-center gap-1 text-primary">
              <Star className="h-4 w-4 fill-current" />
              {destination.rating}
            </p>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              {destination.safetyScore}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{destination.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {destination.style.map((style) => (
            <Badge key={style} className="bg-muted text-muted-foreground">
              {style}
            </Badge>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="font-semibold">${destination.averageDailyCost}/day</span>
          <span className="text-muted-foreground">{destination.bestMonths.slice(0, 2).join(" and ")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
