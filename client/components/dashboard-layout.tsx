"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "traveler" | "agency" | "admin";
  userName: string;
  userEmail: string;
}

export function DashboardLayout({ children, role, userName, userEmail }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userName={userName} userEmail={userEmail} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
