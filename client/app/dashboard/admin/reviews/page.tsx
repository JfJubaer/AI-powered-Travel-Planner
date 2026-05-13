"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DataTable } from "@/components/dashboard-table";

const mockReviews = [
  { id: 1, user: "John Doe", destination: "Paris", rating: 5, comment: "Amazing city experience", date: "2024-03-15" },
  { id: 2, user: "Jane Smith", destination: "Tokyo", rating: 4, comment: "Great culture and food", date: "2024-03-10" },
  { id: 3, user: "Bob Johnson", destination: "Bali", rating: 5, comment: "Perfect beach vacation", date: "2024-03-05" },
  { id: 4, user: "Alice Brown", destination: "New York", rating: 3, comment: "Expensive but worth it", date: "2024-02-28" },
];

export default function ManageReviews() {
  const columns = [
    { key: "user", label: "User" },
    { key: "destination", label: "Destination" },
    { key: "rating", label: "Rating", render: (value: number) => (
      <span className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < value ? "text-yellow-400" : "text-gray-300"}>★</span>
        ))}
      </span>
    )},
    { key: "comment", label: "Comment" },
    { key: "date", label: "Date" },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@example.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Reviews</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage user reviews</p>
        </div>
        <DataTable 
          columns={columns} 
          data={mockReviews} 
          title="Reviews" 
          itemsPerPage={10}
          onEdit={(review) => console.log("Edit review:", review)}
          onDelete={(review) => console.log("Delete review:", review)}
        />
      </div>
    </DashboardLayout>
  );
}
