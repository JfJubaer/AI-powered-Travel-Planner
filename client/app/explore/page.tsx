"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { DestinationCard, DestinationCardSkeleton } from "@/components/destination-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getDestinations } from "@/lib/api";
import type { Destination } from "@/lib/types";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadDestinations = useCallback((filters: { search: string; style: string; budget: string }) => {
    setError("");
    startTransition(async () => {
      try {
        const result = await getDestinations(filters);
        setDestinations(result);
      } catch {
        setError("Destination data is unavailable. Start the API server to load curated places.");
      }
    });
  }, []);

  useEffect(() => {
    loadDestinations({ search: "", style: "", budget: "" });
  }, [loadDestinations]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <StatusPill>Explore destination intelligence</StatusPill>
          <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">Find destinations that fit the trip.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Filter curated places by budget, travel style, region, timing, and practical on-the-ground quality.
          </p>
        </div>
        {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
      </div>

      <Card className="mb-6">
        <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_220px_220px_auto] lg:items-end">
          <div className="grid gap-2">
            <Label>Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Kyoto, Europe, coast" value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Style</Label>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              <option value="">All styles</option>
              <option value="culture">Culture</option>
              <option value="food">Food</option>
              <option value="adventure">Adventure</option>
              <option value="nature">Nature</option>
              <option value="city">City</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Budget</Label>
            <Select value={budget} onChange={(event) => setBudget(event.target.value)}>
              <option value="">Any budget</option>
              <option value="value">Value</option>
              <option value="balanced">Balanced</option>
              <option value="premium">Premium</option>
            </Select>
          </div>
          <Button onClick={() => loadDestinations({ search, style, budget })} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SlidersHorizontal className="h-4 w-4" />}
            Apply
          </Button>
        </CardContent>
      </Card>

      <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {isPending && !destinations.length
          ? Array.from({ length: 8 }).map((_, index) => <DestinationCardSkeleton key={index} />)
          : destinations.map((destination) => (
              <DestinationCard key={`${destination.name}-${destination.country}`} destination={destination} />
            ))}
      </div>

      {!isPending && !destinations.length ? (
        <Card className="mt-6">
          <CardContent className="p-8 text-center">
            <p className="font-semibold">No destinations match those filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a broader style or budget category.</p>
          </CardContent>
        </Card>
      ) : null}
    </main>
  );
}
