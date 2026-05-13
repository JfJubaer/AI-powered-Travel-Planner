"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";

const mockDestinations = [
  { id: 1, name: "Paris, France", category: "Culture", rating: 4.8, saved: "2024-01-15" },
  { id: 2, name: "Bali, Indonesia", category: "Beach", rating: 4.6, saved: "2024-02-20" },
  { id: 3, name: "Tokyo, Japan", category: "Culture", rating: 4.9, saved: "2024-03-10" },
  { id: 4, name: "Maldives", category: "Beach", rating: 4.7, saved: "2024-03-25" },
  { id: 5, name: "Swiss Alps", category: "Mountain", rating: 4.5, saved: "2024-04-05" },
];

export default function SavedDestinations() {
  return (
    <DashboardLayout role="traveler" userName="John Doe" userEmail="john@example.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Destinations</h1>
          <p className="text-muted-foreground mt-2">Your favorite places to visit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDestinations.map((destination) => (
            <Card key={destination.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{destination.category}</p>
                </div>
                <Heart className="text-red-500 fill-red-500" size={24} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{destination.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Saved on {destination.saved}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
