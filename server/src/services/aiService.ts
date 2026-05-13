import axios from "axios";
import { fallbackDestinations } from "../data/destinations.js";

export interface ItineraryInput {
  destination: string;
  durationDays: number;
  budget: number;
  style: string;
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
  overview: string;
  estimatedTotal: number;
  currency: string;
  itinerary: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  foodSuggestions: string[];
  estimatedCost: number;
  travelTips: string[];
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

export async function generateItinerary(
  input: ItineraryInput,
): Promise<ItineraryResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured on the server.");
  }

  console.log("🎯 Generating itinerary for:", {
    destination: input.destination,
    duration: input.durationDays,
    budget: input.budget,
  });

  // Use environment flag to skip OpenAI
  if (process.env.SKIP_OPENAI === "true") {
    console.log("⚠️ SKIP_OPENAI=true, using local generator");
    return generateLocalItinerary(input);
  }

  return tryProviderItinerary(input);
}

export async function recommendDestinations(
  input: RecommendationInput,
): Promise<RecommendationResult[]> {
  const providerResult = await tryProviderRecommendations(input);
  if (providerResult) {
    return providerResult;
  }

  const interests = input.interests.map((interest) => interest.toLowerCase());

  return fallbackDestinations
    .map((destination) => {
      const styleScore = destination.style.some((style) =>
        style.toLowerCase().includes(input.style.toLowerCase()),
      )
        ? 20
        : 8;
      const interestScore =
        destination.style.filter((style) =>
          interests.includes(style.toLowerCase()),
        ).length * 10;
      const budgetScore =
        input.budget /
          Math.max(destination.averageDailyCost * input.travelers * 4, 1) >=
        1
          ? 18
          : 6;
      const monthScore = destination.bestMonths.includes(input.month) ? 14 : 6;
      const matchScore = Math.min(
        98,
        Math.round(52 + styleScore + interestScore + budgetScore + monthScore),
      );

      return {
        name: destination.name,
        country: destination.country,
        matchScore,
        estimatedDailyCost: destination.averageDailyCost,
        bestMonths: destination.bestMonths,
        why: `${destination.name} fits ${input.style.toLowerCase()} travel with strong ${destination.style.slice(0, 2).join(" and ")} appeal, a ${destination.budgetLevel} cost profile, and a safety score of ${destination.safetyScore}.`,
        highlights: destination.highlights,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
}

async function tryProviderItinerary(
  input: ItineraryInput,
): Promise<ItineraryResult> {
  try {
    console.log("📡 Calling OpenAI API...");

    const requestPayload = {
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a premium travel planner AI. Create practical, realistic itineraries that are specific, balanced, and budget-aware. Always respond with valid JSON only, no additional text.",
        },
        {
          role: "user",
          content: `Create a ${input.durationDays}-day itinerary for ${input.destination} with a total budget of $${input.budget} USD and a travel style of ${input.style}. 

Return ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "destination": "${input.destination}",
  "overview": "Brief overview of the destination and trip",
  "estimatedTotal": ${input.budget},
  "currency": "USD",
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "activities": ["activity 1", "activity 2"],
      "foodSuggestions": ["restaurant 1", "restaurant 2"],
      "estimatedCost": 100,
      "travelTips": ["tip 1", "tip 2"]
    }
  ]
}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    };

    console.log("📝 Request model:", requestPayload.model);
    const response = await withRetry(
      async () => {
        return await axios.post(
          "https://api.openai.com/v1/chat/completions",
          requestPayload,
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 25000,
          },
        );
      },
      3,
      2000,
    );

    console.log("✅ OpenAI response received");
    console.log("📊 Response status:", response.status);
    console.log("📊 Choices count:", response.data?.choices?.length);

    const content = response.data?.choices?.[0]?.message?.content;
    console.log("📝 Raw content length:", content?.length);

    if (!content) {
      throw new Error(
        "OpenAI returned empty response. Response data: " +
          JSON.stringify(response.data),
      );
    }

    console.log("🔄 Parsing JSON response...");
    let parsed: ItineraryResult;

    try {
      parsed = JSON.parse(content) as ItineraryResult;
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      console.error("📄 Failed to parse content:", content.substring(0, 500));
      throw new Error(
        `Failed to parse OpenAI response: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
      );
    }

    if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
      throw new Error(
        `Invalid itinerary structure from OpenAI. Got: ${JSON.stringify(Object.keys(parsed))}`,
      );
    }

    console.log(
      "✨ Itinerary generated successfully with",
      parsed.itinerary.length,
      "days",
    );
    return parsed;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ AI provider itinerary request failed:", errorMessage);

    if (axios.isAxiosError(error)) {
      console.error("🔴 API Error Status:", error.response?.status);
      console.error("🔴 API Error Data:", error.response?.data);

      if (error.response?.status === 401) {
        throw new Error(
          "OpenAI API key is invalid or expired. Please check your OPENAI_API_KEY.",
        );
      }
      if (error.response?.status === 429) {
        throw new Error(
          "OpenAI API rate limit exceeded. Please try again in a moment.",
        );
      }
    }

    // Fall back to local generator
    console.log("🔄 Falling back to local itinerary generator...");
    return generateLocalItinerary(input);
  }
}

function generateLocalItinerary(input: ItineraryInput): ItineraryResult {
  const dailyCost = Math.floor(input.budget / input.durationDays);

  const activities: Record<string, string[]> = {
    "culture and food": [
      `Explore the local culture and museums in ${input.destination}`,
      "Visit local restaurants and try traditional cuisine",
      "Take a food tour or cooking class",
      "Explore historic neighborhoods",
      "Visit local markets and cafes",
    ],
    adventure: [
      `Outdoor activities and hiking near ${input.destination}`,
      "Water sports or beach activities",
      "Extreme sports or adventure tours",
      "Explore natural landscapes",
      "Rock climbing or mountaineering",
    ],
    "relaxed luxury": [
      `Luxury spa and wellness at top ${input.destination} resorts`,
      "Fine dining experiences",
      "Shopping and boutiques",
      "Luxury hotel amenities",
      "Scenic relaxation activities",
    ],
    "family-friendly": [
      `Family-friendly attractions in ${input.destination}`,
      "Parks and playgrounds",
      "Interactive museums",
      "Family restaurants",
      "Local attractions suitable for children",
    ],
  };

  const style = input.style.toLowerCase();
  const styleActivities = activities[style] || activities["culture and food"];

  const itinerary = Array.from({ length: input.durationDays }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1}: Explore ${input.destination}`,
    activities: [
      styleActivities[i % styleActivities.length],
      styleActivities[(i + 1) % styleActivities.length],
    ],
    foodSuggestions: [
      "Local restaurant recommendation",
      "Street food or cafe nearby",
    ],
    estimatedCost: dailyCost,
    travelTips: [
      "Check local weather and dress appropriately",
      "Use local transportation",
      "Respect local customs and culture",
    ],
  }));

  return {
    destination: input.destination,
    overview: `A wonderful ${input.durationDays}-day trip to ${input.destination} with a ${input.style.toLowerCase()} travel style. Total budget: $${input.budget}.`,
    estimatedTotal: input.budget,
    currency: "USD",
    itinerary,
  };
}

async function tryProviderRecommendations(
  input: RecommendationInput,
): Promise<RecommendationResult[] | null> {
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
              "Return only valid JSON matching this shape: {recommendations:[{name,country,matchScore,estimatedDailyCost,bestMonths,why,highlights}]}.",
          },
          {
            role: "user",
            content: `Recommend travel destinations for: ${JSON.stringify(input)}`,
          },
        ],
        temperature: 0.65,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      },
    );

    const content = response.data?.choices?.[0]?.message?.content;
    const parsed = content
      ? (JSON.parse(content) as { recommendations: RecommendationResult[] })
      : null;
    return parsed?.recommendations ?? null;
  } catch (error) {
    console.warn(
      "AI provider recommendation request failed; using local recommender.",
      error,
    );
    return null;
  }
}

function extractResponseText(response: unknown) {
  if (!response || typeof response !== "object") {
    return "";
  }

  const output = (response as { output?: unknown[] }).output;

  if (!Array.isArray(output)) {
    return "";
  }

  const texts = output.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const content = (item as { content?: unknown[] }).content;

    if (!Array.isArray(content)) {
      return [];
    }

    return content
      .filter(
        (entry): entry is { type?: string; text?: string } =>
          !!entry &&
          typeof entry === "object" &&
          (entry as { type?: string }).type === "output_text",
      )
      .map((entry) => entry.text ?? "")
      .filter(Boolean);
  });

  return texts.join("\n").trim();
}

const itinerarySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    destination: { type: "string" },
    overview: { type: "string" },
    estimatedTotal: { type: "number" },
    currency: { type: "string" },
    itinerary: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          day: { type: "integer" },
          title: { type: "string" },
          activities: {
            type: "array",
            minItems: 2,
            items: { type: "string" },
          },
          foodSuggestions: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },
          estimatedCost: { type: "number" },
          travelTips: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },
        },
        required: [
          "day",
          "title",
          "activities",
          "foodSuggestions",
          "estimatedCost",
          "travelTips",
        ],
      },
    },
  },
  required: [
    "destination",
    "overview",
    "estimatedTotal",
    "currency",
    "itinerary",
  ],
} as const;

// utils/retry.ts
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Only retry on rate limit errors
      if (
        error.response?.status === 429 ||
        error.message?.includes("rate limit")
      ) {
        const delay = initialDelay * Math.pow(2, i); // Exponential backoff
        console.log(
          `Rate limited. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }

  throw lastError!;
}
