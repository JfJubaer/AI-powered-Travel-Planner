"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createItinerary, createRecommendations } from "@/lib/api";
import type { ItineraryResult, RecommendationResult, Role } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StatusPill } from "@/components/status-pill";
import { CalendarDays, Loader2, Sparkles, Wand2 } from "lucide-react";

const plannerSchema = z.object({
  destination: z.string().min(2, "Enter a destination"),
  startDate: z.string().min(4, "Choose a start date"),
  durationDays: z.number().int().min(1).max(21),
  travelers: z.number().int().min(1).max(20),
  budget: z.number().min(200),
  style: z.string().min(2),
  pace: z.string().min(2),
  role: z.enum(["traveler", "agency", "admin"]),
  interestsText: z.string().min(3, "Add at least one interest")
});

const recommendationSchema = z.object({
  origin: z.string().min(2),
  month: z.string().min(3),
  budget: z.number().min(200),
  travelers: z.number().int().min(1).max(20),
  style: z.string().min(2),
  interestsText: z.string().min(3)
});

type PlannerForm = z.infer<typeof plannerSchema>;
type RecommendationForm = z.infer<typeof recommendationSchema>;

function splitInterests(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function PlannerPage() {
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const plannerForm = useForm<PlannerForm>({
    resolver: zodResolver(plannerSchema),
    defaultValues: {
      destination: "Lisbon",
      startDate: "2026-06-15",
      durationDays: 5,
      travelers: 2,
      budget: 2200,
      style: "Food and coast",
      pace: "Balanced",
      role: "traveler",
      interestsText: "neighborhood walks, seafood, viewpoints, day trips"
    }
  });

  const recommendationForm = useForm<RecommendationForm>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      origin: "New York",
      month: "September",
      budget: 2800,
      travelers: 2,
      style: "culture",
      interestsText: "food, walkable districts, nature"
    }
  });

  function onPlanSubmit(values: PlannerForm) {
    setError("");
    startTransition(async () => {
      try {
        const result = await createItinerary({
          ...values,
          role: values.role as Role,
          interests: splitInterests(values.interestsText)
        });
        setItinerary(result);
      } catch {
        setError("The itinerary service is unavailable. Start the API server or check NEXT_PUBLIC_API_URL.");
      }
    });
  }

  function onRecommendSubmit(values: RecommendationForm) {
    setError("");
    startTransition(async () => {
      try {
        const result = await createRecommendations({
          ...values,
          interests: splitInterests(values.interestsText)
        });
        setRecommendations(result);
      } catch {
        setError("The recommendation service is unavailable. Start the API server or check NEXT_PUBLIC_API_URL.");
      }
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <StatusPill>AI itinerary workspace</StatusPill>
          <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">Generate polished travel plans.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Build budget-aware itineraries and destination shortlists from real traveler constraints.
          </p>
        </div>
        {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                Itinerary generator
              </CardTitle>
              <CardDescription>Daily schedule, budget guidance, booking tips, and local pacing.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={plannerForm.handleSubmit(onPlanSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Destination" error={plannerForm.formState.errors.destination?.message}>
                    <Input {...plannerForm.register("destination")} />
                  </Field>
                  <Field label="Start date" error={plannerForm.formState.errors.startDate?.message}>
                    <Input type="date" {...plannerForm.register("startDate")} />
                  </Field>
                  <Field label="Days">
                    <Input type="number" {...plannerForm.register("durationDays", { valueAsNumber: true })} />
                  </Field>
                  <Field label="Travelers">
                    <Input type="number" {...plannerForm.register("travelers", { valueAsNumber: true })} />
                  </Field>
                  <Field label="Budget USD">
                    <Input type="number" {...plannerForm.register("budget", { valueAsNumber: true })} />
                  </Field>
                  <Field label="Role">
                    <Select {...plannerForm.register("role")}>
                      <option value="traveler">Traveler</option>
                      <option value="agency">Agency</option>
                      <option value="admin">Admin</option>
                    </Select>
                  </Field>
                  <Field label="Travel style">
                    <Input {...plannerForm.register("style")} />
                  </Field>
                  <Field label="Pace">
                    <Select {...plannerForm.register("pace")}>
                      <option value="Relaxed">Relaxed</option>
                      <option value="Balanced">Balanced</option>
                      <option value="Packed">Packed</option>
                    </Select>
                  </Field>
                </div>
                <Field label="Interests" error={plannerForm.formState.errors.interestsText?.message}>
                  <Textarea {...plannerForm.register("interestsText")} />
                </Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Generate Itinerary
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Destination recommendation</CardTitle>
              <CardDescription>Ranked matches based on season, budget, interests, and trip style.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={recommendationForm.handleSubmit(onRecommendSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Origin">
                    <Input {...recommendationForm.register("origin")} />
                  </Field>
                  <Field label="Month">
                    <Select {...recommendationForm.register("month")}>
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Budget USD">
                    <Input type="number" {...recommendationForm.register("budget", { valueAsNumber: true })} />
                  </Field>
                  <Field label="Travelers">
                    <Input type="number" {...recommendationForm.register("travelers", { valueAsNumber: true })} />
                  </Field>
                </div>
                <Field label="Style">
                  <Input {...recommendationForm.register("style")} />
                </Field>
                <Field label="Interests">
                  <Textarea {...recommendationForm.register("interestsText")} />
                </Field>
                <Button type="submit" variant="secondary" disabled={isPending}>
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Recommend Destinations
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6">
          <Card className="min-h-[420px]">
            <CardHeader>
              <CardTitle>{itinerary ? itinerary.destination : "Generated itinerary"}</CardTitle>
              <CardDescription>
                {itinerary ? itinerary.summary : "Submit a trip brief to generate a client-ready day-by-day plan."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {itinerary ? (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary text-primary-foreground">${itinerary.estimatedTotal.toLocaleString()} estimate</Badge>
                    {itinerary.bestFor.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {itinerary.itinerary.map((day) => (
                      <div key={day.day} className="rounded-lg border border-border p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                            {day.day}
                          </span>
                          <h3 className="font-bold">{day.title}</h3>
                        </div>
                        <div className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-3">
                          <p><strong className="text-foreground">Morning:</strong> {day.morning}</p>
                          <p><strong className="text-foreground">Afternoon:</strong> {day.afternoon}</p>
                          <p><strong className="text-foreground">Evening:</strong> {day.evening}</p>
                        </div>
                        <p className="mt-3 rounded-md bg-muted p-3 text-sm text-muted-foreground">{day.localTip}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg bg-secondary/15 p-4">
                    <h3 className="font-bold">Booking guidance</h3>
                    <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                      {itinerary.bookingTips.map((tip) => (
                        <p key={tip}>{tip}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid min-h-[280px] place-items-center rounded-lg border border-dashed border-border bg-muted/50 text-center">
                  <div className="max-w-sm px-6">
                    <CalendarDays className="mx-auto h-10 w-10 text-primary" />
                    <p className="mt-4 font-semibold">Your AI itinerary will appear here.</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Use the sample Lisbon brief or enter a new destination.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {recommendations.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Recommended destinations</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {recommendations.map((destination) => (
                  <div key={`${destination.name}-${destination.country}`} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{destination.name}, {destination.country}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{destination.why}</p>
                      </div>
                      <span className="rounded-md bg-accent px-3 py-2 text-sm font-bold text-accent-foreground">{destination.matchScore}%</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {destination.highlights.map((highlight) => (
                        <Badge key={highlight} className="bg-muted text-muted-foreground">{highlight}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
