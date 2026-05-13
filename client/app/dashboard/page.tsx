"use client";

import { MapPin, TrendingUp, Zap, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { OverviewCard } from "@/components/dashboard-cards";
import { LineChartComponent, BarChartComponent } from "@/components/dashboard-charts";

const mockTripData = [
  { name: "Jan", value: 2 },
  { name: "Feb", value: 3 },
  { name: "Mar", value: 1 },
  { name: "Apr", value: 4 },
  { name: "May", value: 3 },
];

const mockSpendingData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
];

export default function Dashboard() {
  return (
    <DashboardLayout role="traveler" userName="John Doe" userEmail="john@example.com">
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OverviewCard
            title="Total Trips"
            value="12"
            description="Completed trips"
            icon={MapPin}
            trend={{ value: 20, isPositive: true }}
          />
          <OverviewCard
            title="Destinations Saved"
            value="28"
            description="For future travel"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <OverviewCard
            title="Total Spent"
            value="$18,240"
            description="This year"
            icon={Zap}
            trend={{ value: 12, isPositive: false }}
          />
          <OverviewCard
            title="Friends"
            value="45"
            description="Travel companions"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartComponent data={mockTripData} title="Trips Per Month" />
          <BarChartComponent data={mockSpendingData} title="Monthly Spending" />
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0">
                <div>
                  <p className="text-foreground font-medium">Trip to Paris</p>
                  <p className="text-sm text-muted-foreground">Completed on March 15, 2024</p>
                </div>
                <span className="text-sm font-semibold text-green-600">Completed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
