"use client";

import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createItinerary, getApiErrorMessage } from "@/lib/api";
import type { ItineraryResult } from "@/lib/types";
import { useToast } from "@/components/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { StatusPill } from "@/components/status-pill";
import { CalendarDays, Copy, Loader2, MapPinned, Sparkles, Wand2, WalletCards } from "lucide-react";

const plannerSchema = z.object({
  destination: z.string().min(2, "Enter a destination."),
  budget: z.number().min(200, "Budget should be at least 200 USD."),
  durationDays: z.number().int().min(1, "Trip must be at least 1 day.").max(21, "Keep itineraries to 21 days or fewer."),
  style: z.string().min(2, "Choose a travel style.")
});

type PlannerForm = z.infer<typeof plannerSchema>;

const travelStyles = ["Relaxed luxury", "Culture and food", "Adventure", "Family-friendly", "Romantic escape", "Budget explorer"];

export default function PlannerPage() {
  const { toast } = useToast();
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const plannerForm = useForm<PlannerForm>({
    resolver: zodResolver(plannerSchema),
    defaultValues: {
      destination: "Lisbon",
      budget: 2200,
      durationDays: 5,
      style: "Culture and food"
    }
  });

  const totalDailyAverage = useMemo(() => {
    if (!itinerary?.itinerary.length) {
      return 0;
    }

    return Math.round(itinerary.estimatedTotal / itinerary.itinerary.length);
  }, [itinerary]);

  function onPlanSubmit(values: PlannerForm) {
    setError("");

    startTransition(async () => {
      try {
        const result = await createItinerary(values);
        setItinerary(result);
      } catch (submissionError) {
        setError(getApiErrorMessage(submissionError, "Unable to generate itinerary right now."));
        setItinerary(null);
      }
    });
  }

  async function handleCopy() {
    if (!itinerary) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formatItineraryForClipboard(itinerary));
      toast({
        variant: "success",
        title: "Copied itinerary",
        description: "Your AI-generated trip plan is on the clipboard."
      });
    } catch {
      toast({
        variant: "error",
        title: "Copy failed",
        description: "Clipboard access is unavailable in this browser."
      });
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <StatusPill>AI itinerary generator</StatusPill>
          <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">Build a trip plan with OpenAI.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Enter a destination, budget, trip length, and travel style to generate a day-by-day itinerary with activities, food ideas, cost estimates, and practical travel tips.
          </p>
        </div>
        {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <Card className="glass-surface h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Trip brief
            </CardTitle>
            <CardDescription>Keep the brief focused and the itinerary will come back cleaner.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={plannerForm.handleSubmit(onPlanSubmit)}>
              <Field label="Destination" error={plannerForm.formState.errors.destination?.message}>
                <Input placeholder="Kyoto" {...plannerForm.register("destination")} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Budget (USD)" error={plannerForm.formState.errors.budget?.message}>
                  <Input type="number" {...plannerForm.register("budget", { valueAsNumber: true })} />
                </Field>

                <Field label="Number of days" error={plannerForm.formState.errors.durationDays?.message}>
                  <Input type="number" {...plannerForm.register("durationDays", { valueAsNumber: true })} />
                </Field>
              </div>

              <Field label="Travel style" error={plannerForm.formState.errors.style?.message}>
                <Select {...plannerForm.register("style")}>
                  {travelStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </Select>
              </Field>

              <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {isPending ? "Generating itinerary..." : "Generate itinerary"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <section>
          <Card className="overflow-hidden border-primary/15 shadow-soft">
            <div className="border-b border-border/70 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.10),transparent)] px-6 py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Generated result</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                    {itinerary ? itinerary.destination : "Your itinerary will appear here"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {itinerary ? itinerary.overview : "Submit a brief to generate a polished, mobile-friendly trip plan backed by the OpenAI API."}
                  </p>
                </div>
                <Button variant="outline" onClick={handleCopy} disabled={!itinerary}>
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            <CardContent className="p-6">
              {isPending ? (
                <div className="grid min-h-[480px] place-items-center rounded-[1.5rem] border border-dashed border-border bg-muted/35 text-center">
                  <div className="max-w-md px-6">
                    <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                    <p className="mt-4 text-lg font-semibold">Generating your itinerary</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      The AI is balancing activities, food suggestions, and spend across each day.
                    </p>
                  </div>
                </div>
              ) : itinerary ? (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <MetricChip icon={WalletCards} label="Estimated total" value={`${itinerary.currency} ${itinerary.estimatedTotal.toLocaleString()}`} />
                    <MetricChip icon={CalendarDays} label="Trip length" value={`${itinerary.itinerary.length} days`} />
                    <MetricChip icon={MapPinned} label="Avg. daily spend" value={`${itinerary.currency} ${totalDailyAverage.toLocaleString()}`} />
                  </div>

                  <div className="space-y-4">
                    {itinerary.itinerary.map((day) => (
                      <Card key={day.day} className="border-border/70 shadow-none">
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-4">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                                {day.day}
                              </span>
                              <div>
                                <h3 className="text-lg font-bold">{day.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Estimated spend: {itinerary.currency} {day.estimatedCost.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <Badge className="w-fit bg-primary/10 text-primary">Day {day.day}</Badge>
                          </div>

                          <div className="mt-5 grid gap-5 lg:grid-cols-3">
                            <DetailGroup title="Activities" items={day.activities} />
                            <DetailGroup title="Food suggestions" items={day.foodSuggestions} />
                            <DetailGroup title="Travel tips" items={day.travelTips} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid min-h-[480px] place-items-center rounded-[1.5rem] border border-dashed border-border bg-muted/35 text-center">
                  <div className="max-w-md px-6">
                    <Sparkles className="mx-auto h-10 w-10 text-primary" />
                    <p className="mt-4 text-lg font-semibold">Ready to plan</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Start with a destination and budget, then let the AI build a day-by-day plan you can review and copy.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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

function MetricChip({
  icon: Icon,
  label,
  value
}: {
  icon: typeof WalletCards;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-border/70 bg-card px-4 py-4">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
          <p className="mt-1 text-sm font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function DetailGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.25rem] bg-muted/40 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <p key={item} className="text-sm leading-6 text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function formatItineraryForClipboard(itinerary: ItineraryResult) {
  return [
    `${itinerary.destination} itinerary`,
    itinerary.overview,
    `Estimated total: ${itinerary.currency} ${itinerary.estimatedTotal}`,
    "",
    ...itinerary.itinerary.flatMap((day) => [
      `Day ${day.day}: ${day.title}`,
      `Activities: ${day.activities.join("; ")}`,
      `Food: ${day.foodSuggestions.join("; ")}`,
      `Estimated cost: ${itinerary.currency} ${day.estimatedCost}`,
      `Tips: ${day.travelTips.join("; ")}`,
      ""
    ])
  ].join("\n");
}
