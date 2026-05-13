"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DataTable } from "@/components/dashboard-table";

const mockTrips = [
  { id: 1, destination: "Paris", startDate: "2024-03-15", duration: "7 days", status: "Completed", budget: "$2,500" },
  { id: 2, destination: "Tokyo", startDate: "2024-06-20", duration: "10 days", status: "Upcoming", budget: "$3,800" },
  { id: 3, destination: "Barcelona", startDate: "2024-02-10", duration: "5 days", status: "Completed", budget: "$1,800" },
  { id: 4, destination: "New York", startDate: "2024-08-05", duration: "8 days", status: "Planning", budget: "$2,200" },
];

export default function MyTrips() {
  const columns = [
    { key: "destination", label: "Destination" },
    { key: "startDate", label: "Start Date" },
    { key: "duration", label: "Duration" },
    { key: "status", label: "Status", render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        value === "Completed" ? "bg-green-100 text-green-800" :
        value === "Upcoming" ? "bg-blue-100 text-blue-800" :
        "bg-yellow-100 text-yellow-800"
      }`}>
        {value}
      </span>
    )},
    { key: "budget", label: "Budget" },
  ];

  return (
    <DashboardLayout role="traveler" userName="John Doe" userEmail="john@example.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground mt-2">Manage and track all your trips</p>
        </div>
        <DataTable columns={columns} data={mockTrips} title="Your Trips" itemsPerPage={5} />
      </div>
    </DashboardLayout>
  );
}
