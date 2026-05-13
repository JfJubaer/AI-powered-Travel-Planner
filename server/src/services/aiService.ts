import axios from "axios";
import { fallbackDestinations } from "../data/destinations.js";
import type { TripDay } from "../models/Trip.js";

export interface ItineraryInput {
  destination: string;
  startDate: string;
  durationDays: number;
  travelers: number;
  budget: number;
  style: string;
  pace: string;
  interests: string[];
  role?: "traveler" | "agency" | "admin";
}

export interface RecommendationInput {
  origin: string;
  month: string;
  budget: number;
  travelers: number;
  style: string;
  interests: string[];
}

export interface ItineraryResult {
  destination: string;
  summary: string;
  estimatedTotal: number;
  bestFor: string[];
  itinerary: TripDay[];
  bookingTips: string[];
}

export interface RecommendationResult {
  name: string;
  country: string;
  matchScore: number;
  estimatedDailyCost: number;
  bestMonths: string[];
  why: string;
  highlights: string[];
}

const dayThemes = [
  "Arrival, orientation, and signature neighborhoods",
  "Landmarks, local craft, and relaxed dining",
  "Nature access, scenic routes, and restorative time",
  "Food-led discovery and culture-rich districts",
  "Flexible favorites, final shopping, and farewell views"
];

export async function generateItinerary(input: ItineraryInput): Promise<ItineraryResult> {
  const providerResult = await tryProviderItinerary(input);
  if (providerResult) {
    return providerResult;
  }

  const interests = input.interests.length ? input.interests : ["local food", "culture", "walkable districts"];
  const dailyBudget = Math.max(Math.round(input.budget / Math.max(input.durationDays, 1)), 80);
  const estimatedTotal = Math.round(dailyBudget * input.durationDays * 0.94);

  return {
    destination: input.destination,
    summary: `${input.durationDays} days in ${input.destination} with a ${input.pace} pace, tuned for ${input.style.toLowerCase()} travel and ${interests.slice(0, 3).join(", ")}.`,
    estimatedTotal,
    bestFor: [input.style, input.pace, `${input.travelers} traveler${input.travelers > 1 ? "s" : ""}`],
    itinerary: Array.from({ length: input.durationDays }, (_, index) => {
      const day = index + 1;
      const interest = interests[index % interests.length];
      const theme = dayThemes[index % dayThemes.length];

      return {
        day,
        title: theme,
        morning: `Start with a well-rated ${interest} experience near your base, keeping transit short and the first booking of the day confirmed.`,
        afternoon: `Move into a nearby district for a guided walk, museum, market, or scenic route that matches your ${input.style.toLowerCase()} style.`,
        evening: `Reserve dinner in advance, then finish with a low-friction viewpoint, waterfront walk, tasting room, or live performance.`,
        localTip: `Keep one flexible 90-minute block on day ${day}; ${input.destination} rewards small detours and weather-aware timing.`
      };
    }),
    bookingTips: [
      "Book the first and last nights near reliable transit to reduce arrival friction.",
      "Reserve one anchor experience per day, then leave the surrounding time flexible.",
      `Keep a ${Math.round(input.budget * 0.12)} USD buffer for transfers, weather changes, and standout meals.`
    ]
  };
}

export async function recommendDestinations(input: RecommendationInput): Promise<RecommendationResult[]> {
  const providerResult = await tryProviderRecommendations(input);
  if (providerResult) {
    return providerResult;
  }

  const interests = input.interests.map((interest) => interest.toLowerCase());

  return fallbackDestinations
    .map((destination) => {
      const styleScore = destination.style.some((style) => style.toLowerCase().includes(input.style.toLowerCase())) ? 20 : 8;
      const interestScore = destination.style.filter((style) => interests.includes(style.toLowerCase())).length * 10;
      const budgetScore = input.budget / Math.max(destination.averageDailyCost * input.travelers * 4, 1) >= 1 ? 18 : 6;
      const monthScore = destination.bestMonths.includes(input.month) ? 14 : 6;
      const matchScore = Math.min(98, Math.round(52 + styleScore + interestScore + budgetScore + monthScore));

      return {
        name: destination.name,
        country: destination.country,
        matchScore,
        estimatedDailyCost: destination.averageDailyCost,
        bestMonths: destination.bestMonths,
        why: `${destination.name} fits ${input.style.toLowerCase()} travel with strong ${destination.style.slice(0, 2).join(" and ")} appeal, a ${destination.budgetLevel} cost profile, and a safety score of ${destination.safetyScore}.`,
        highlights: destination.highlights
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
}

async function tryProviderItinerary(input: ItineraryInput): Promise<ItineraryResult | null> {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Return only valid JSON matching this shape: {destination, summary, estimatedTotal, bestFor, itinerary:[{day,title,morning,afternoon,evening,localTip}], bookingTips}."
          },
          {
            role: "user",
            content: `Create a production-quality travel itinerary for: ${JSON.stringify(input)}`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    return content ? (JSON.parse(content) as ItineraryResult) : null;
  } catch (error) {
    console.warn("AI provider itinerary request failed; using local generator.", error);
    return null;
  }
}

async function tryProviderRecommendations(input: RecommendationInput): Promise<RecommendationResult[] | null> {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Return only valid JSON matching this shape: {recommendations:[{name,country,matchScore,estimatedDailyCost,bestMonths,why,highlights}]}."
          },
          {
            role: "user",
            content: `Recommend travel destinations for: ${JSON.stringify(input)}`
          }
        ],
        temperature: 0.65,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    const parsed = content ? (JSON.parse(content) as { recommendations: RecommendationResult[] }) : null;
    return parsed?.recommendations ?? null;
  } catch (error) {
    console.warn("AI provider recommendation request failed; using local recommender.", error);
    return null;
  }
}
