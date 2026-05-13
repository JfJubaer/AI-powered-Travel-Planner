export interface TripDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  localTip: string;
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

export interface Destination {
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
