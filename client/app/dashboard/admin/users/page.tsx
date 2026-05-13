"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DataTable } from "@/components/dashboard-table";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "traveler", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "agency", status: "Active", joined: "2024-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "traveler", status: "Inactive", joined: "2023-12-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "traveler", status: "Active", joined: "2024-03-05" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "admin", status: "Active", joined: "2023-11-20" },
];

export default function ManageUsers() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        value === "admin" ? "bg-purple-100 text-purple-800" :
        value === "agency" ? "bg-blue-100 text-blue-800" :
        "bg-gray-100 text-gray-800"
      }`}>
        {value}
      </span>
    )},
    { key: "status", label: "Status", render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        value === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        {value}
      </span>
    )},
    { key: "joined", label: "Joined" },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@example.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
          <p className="text-muted-foreground mt-2">View and manage all users</p>
        </div>
        <DataTable 
          columns={columns} 
          data={mockUsers} 
          title="Users" 
          itemsPerPage={10}
          onEdit={(user) => console.log("Edit user:", user)}
          onDelete={(user) => console.log("Delete user:", user)}
        />
      </div>
    </DashboardLayout>
  );
}
