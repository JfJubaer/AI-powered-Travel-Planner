import type { DestinationDocument } from "../models/Destination.js";

export const fallbackDestinations: DestinationDocument[] = [
  {
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    style: ["culture", "food", "slow travel"],
    budgetLevel: "balanced",
    bestMonths: ["March", "April", "November"],
    averageDailyCost: 185,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Arashiyama bamboo grove", "Gion tea houses", "Fushimi Inari at sunrise"],
    rating: 4.9,
    safetyScore: 97,
    summary: "A refined city for temples, seasonal food, quiet lanes, and deeply intentional days."
  },
  {
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    style: ["city", "coast", "food"],
    budgetLevel: "balanced",
    bestMonths: ["May", "June", "September"],
    averageDailyCost: 145,
    imageUrl: "https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Alfama viewpoints", "Belém pastries", "Sintra day trip"],
    rating: 4.8,
    safetyScore: 91,
    summary: "A bright Atlantic capital with tiled streets, strong food culture, and easy coastal escapes."
  },
  {
    name: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    style: ["adventure", "nature", "road trip"],
    budgetLevel: "premium",
    bestMonths: ["February", "June", "September"],
    averageDailyCost: 285,
    imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Golden Circle", "Blue Lagoon", "Northern lights season"],
    rating: 4.7,
    safetyScore: 98,
    summary: "A clean, compact base for dramatic landscapes, geothermal rituals, and big-sky adventures."
  },
  {
    name: "Medellin",
    country: "Colombia",
    region: "South America",
    style: ["city", "culture", "value"],
    budgetLevel: "value",
    bestMonths: ["January", "July", "August"],
    averageDailyCost: 88,
    imageUrl: "https://images.unsplash.com/photo-1603411057855-5d18b7a1716b?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Comuna 13", "Botero Plaza", "Coffee farm day trip"],
    rating: 4.6,
    safetyScore: 82,
    summary: "A warm mountain city with design-forward neighborhoods, excellent cafes, and strong value."
  },
  {
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    style: ["adventure", "nature", "premium"],
    budgetLevel: "premium",
    bestMonths: ["February", "March", "December"],
    averageDailyCost: 260,
    imageUrl: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Lake Wakatipu", "Milford Sound", "Gibbston Valley"],
    rating: 4.9,
    safetyScore: 96,
    summary: "A polished alpine hub for cinematic landscapes, outdoor adrenaline, and vineyard afternoons."
  },
  {
    name: "Marrakesh",
    country: "Morocco",
    region: "Africa",
    style: ["culture", "markets", "value"],
    budgetLevel: "value",
    bestMonths: ["March", "April", "October"],
    averageDailyCost: 92,
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Medina souks", "Majorelle Garden", "Atlas Mountains"],
    rating: 4.5,
    safetyScore: 84,
    summary: "A sensory, design-rich city for riads, markets, rooftop dinners, and desert-side extensions."
  }
];
