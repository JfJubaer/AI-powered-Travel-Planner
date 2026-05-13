"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  MapPin,
  LayoutDashboard,
  Star,
  Zap,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  role: "traveler" | "agency" | "admin";
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const { toast } = useToast();

  const userNavItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/my-trips", label: "My Trips", icon: MapPin },
    { href: "/dashboard/saved-destinations", label: "Saved Destinations", icon: MapPin },
    { href: "/dashboard/profile", label: "Profile Settings", icon: Settings },
  ];

  const adminNavItems = [
    { href: "/dashboard/admin", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/admin/destinations", label: "Manage Destinations", icon: MapPin },
    { href: "/dashboard/admin/reviews", label: "Manage Reviews", icon: Star },
    { href: "/dashboard/admin/ai-usage", label: "AI Usage", icon: Zap },
    { href: "/dashboard/profile", label: "Settings", icon: Settings },
  ];

  const navItems = role === "admin" ? adminNavItems : userNavItems;

  function handleLogout() {
    logout();
    setIsMobileOpen(false);
    toast({
      variant: "info",
      title: "Signed out",
      description: "Your dashboard session has ended."
    });
    router.push("/");
  }

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-background border border-border"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={cn(
          "fixed md:relative z-30 h-screen w-64 bg-background border-r border-border transition-all duration-300",
          isMobileOpen ? "left-0" : "-left-64 md:left-0"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8 mt-12 md:mt-0">
            <h2 className="text-xl font-bold text-foreground">
              {role === "admin" ? "Admin Panel" : "My Dashboard"}
            </h2>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
