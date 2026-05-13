"use client";

import { Zap } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { OverviewCard } from "@/components/dashboard-cards";
import { LineChartComponent, BarChartComponent } from "@/components/dashboard-charts";
import { DataTable } from "@/components/dashboard-table";

const mockAIUsage = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 5800 },
  { name: "Mar", value: 7100 },
  { name: "Apr", value: 9500 },
  { name: "May", value: 12430 },
];

const mockAIModels = [
  { name: "Trip Generation", value: 5200 },
  { name: "Recommendation", value: 3800 },
  { name: "Translation", value: 2100 },
  { name: "Image Analysis", value: 1330 },
];

const mockTopUsers = [
  { id: 1, user: "John Doe", queries: 245, estimatedCost: "$12.25" },
  { id: 2, user: "Jane Smith", queries: 189, estimatedCost: "$9.45" },
  { id: 3, user: "Bob Johnson", queries: 156, estimatedCost: "$7.80" },
  { id: 4, user: "Alice Brown", queries: 132, estimatedCost: "$6.60" },
];

export default function AIUsage() {
  const columns = [
    { key: "user", label: "User" },
    { key: "queries", label: "Queries" },
    { key: "estimatedCost", label: "Estimated Cost" },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@example.com">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Usage Statistics</h1>
          <p className="text-muted-foreground mt-2">Monitor AI query usage and costs</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OverviewCard
            title="Total Queries"
            value="12,430"
            description="This month"
            icon={Zap}
            trend={{ value: 28, isPositive: true }}
          />
          <OverviewCard
            title="Est. Cost"
            value="$621.50"
            description="Monthly cost"
            icon={Zap}
            trend={{ value: 15, isPositive: false }}
          />
          <OverviewCard
            title="Avg. per User"
            value="89.5"
            description="queries per user"
            icon={Zap}
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartComponent data={mockAIUsage} title="AI Queries Over Time" />
          <BarChartComponent data={mockAIModels} title="Queries by Model" />
        </div>

        {/* Top Users */}
        <DataTable 
          columns={columns} 
          data={mockTopUsers} 
          title="Top AI Users" 
          itemsPerPage={10}
        />
      </div>
    </DashboardLayout>
  );
}
