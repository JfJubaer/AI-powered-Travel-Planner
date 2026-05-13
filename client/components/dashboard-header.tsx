"use client";

import { useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

export function DashboardHeader({ userName, userEmail, userAvatar }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
          <ChevronDown size={20} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg">
            <div className="p-4 border-b border-border">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            <div className="p-2 space-y-1">
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                <User size={16} />
                Profile
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
