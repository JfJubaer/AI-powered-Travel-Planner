"use client";

import { Users, MapPin, Star, Zap } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { OverviewCard } from "@/components/dashboard-cards";
import { LineChartComponent, BarChartComponent, PieChartComponent } from "@/components/dashboard-charts";

const mockUserGrowth = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 280 },
  { name: "May", value: 350 },
];

const mockDestinationStats = [
  { name: "Beach", value: 245 },
  { name: "Mountain", value: 180 },
  { name: "City", value: 320 },
  { name: "Culture", value: 210 },
];

const mockReviewDistribution = [
  { name: "5 Stars", value: 450 },
  { name: "4 Stars", value: 320 },
  { name: "3 Stars", value: 120 },
  { name: "2 Stars", value: 45 },
  { name: "1 Star", value: 25 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@example.com">
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OverviewCard
            title="Total Users"
            value="1,234"
            description="Active users"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <OverviewCard
            title="Total Destinations"
            value="456"
            description="Listed destinations"
            icon={MapPin}
            trend={{ value: 8, isPositive: true }}
          />
          <OverviewCard
            title="Total Reviews"
            value="3,456"
            description="User reviews"
            icon={Star}
            trend={{ value: 25, isPositive: true }}
          />
          <OverviewCard
            title="AI Queries"
            value="12,430"
            description="This month"
            icon={Zap}
            trend={{ value: 45, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartComponent data={mockUserGrowth} title="User Growth Over Time" />
          <BarChartComponent data={mockReviewDistribution} title="Review Distribution" />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PieChartComponent data={mockDestinationStats} title="Destinations by Category" />
        </div>
      </div>
    </DashboardLayout>
  );
}
