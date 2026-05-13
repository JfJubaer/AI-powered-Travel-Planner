"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DataTable } from "@/components/dashboard-table";

const mockDestinations = [
  { id: 1, name: "Paris", country: "France", category: "Culture", rating: 4.8, status: "Active" },
  { id: 2, name: "Tokyo", country: "Japan", category: "Culture", rating: 4.9, status: "Active" },
  { id: 3, name: "Bali", country: "Indonesia", category: "Beach", rating: 4.6, status: "Active" },
  { id: 4, name: "New York", country: "USA", category: "City", rating: 4.7, status: "Active" },
  { id: 5, name: "Swiss Alps", country: "Switzerland", category: "Mountain", rating: 4.5, status: "Inactive" },
];

export default function ManageDestinations() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "country", label: "Country" },
    { key: "category", label: "Category" },
    { key: "rating", label: "Rating" },
    { key: "status", label: "Status", render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        value === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}>
        {value}
      </span>
    )},
  ];

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@example.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Destinations</h1>
          <p className="text-muted-foreground mt-2">Add, edit, or remove destinations</p>
        </div>
        <DataTable 
          columns={columns} 
          data={mockDestinations} 
          title="Destinations" 
          itemsPerPage={10}
          onEdit={(dest) => console.log("Edit destination:", dest)}
          onDelete={(dest) => console.log("Delete destination:", dest)}
        />
      </div>
    </DashboardLayout>
  );
}
