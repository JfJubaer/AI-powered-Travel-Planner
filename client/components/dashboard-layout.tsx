"use client";

import { useAuth } from "@/components/auth-provider";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import type { Role } from "@/lib/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: Role;
  userName?: string;
  userEmail?: string;
}

export function DashboardLayout({ children, role, userName, userEmail }: DashboardLayoutProps) {
  const { user } = useAuth();
  const resolvedRole = user?.role ?? role ?? "traveler";
  const resolvedName = user?.name ?? userName ?? "Guest User";
  const resolvedEmail = user?.email ?? userEmail ?? "guest@example.com";

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar role={resolvedRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userName={resolvedName} userEmail={resolvedEmail} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
