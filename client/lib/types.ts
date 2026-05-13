export interface TripDay {
  day: number;
  title: string;
  activities: string[];
  foodSuggestions: string[];
  estimatedCost: number;
  travelTips: string[];
}

export interface ItineraryResult {
  destination: string;
  overview: string;
  estimatedTotal: number;
  currency: string;
  itinerary: TripDay[];
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

export interface Destination {
  _id?: string;
  name: string;
  country: string;
  region: string;
  style: string[];
  budgetLevel: "value" | "balanced" | "premium";
  bestMonths: string[];
  averageDailyCost: number;
  imageUrl: string;
  highlights: string[];
  rating: number;
  safetyScore: number;
  summary: string;
}

export interface DestinationDetails {
  destination: Destination;
  relatedDestinations: Destination[];
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  trend: string;
}

export interface DashboardTrip {
  destination: string;
  style: string;
  estimatedTotal: number;
  durationDays: number;
}

export type Role = "traveler" | "agency" | "admin";
