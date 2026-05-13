"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Compass, LayoutDashboard, LogOut, Menu, UserRound, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  function closeMenus() {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }

  function login() {
    setIsLoggedIn(true);
    closeMenus();
  }

  function logout() {
    setIsLoggedIn(false);
    closeMenus();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={closeMenus} className="group flex items-center gap-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25 transition-transform duration-200 group-hover:-translate-y-0.5">
            <Compass className="h-5 w-5" />
          </span>
          <span className="text-base tracking-normal">AI Travel Planner</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/10 text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <Button asChild variant="outline">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <div className="relative">
                <Button
                  variant="secondary"
                  onClick={() => setIsProfileOpen((value) => !value)}
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                >
                  <UserRound className="h-4 w-4" />
                  Zubier
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isProfileOpen && "rotate-180")} />
                </Button>
                {isProfileOpen ? (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card p-2 text-card-foreground shadow-soft">
                    <div className="border-b border-border px-3 py-2">
                      <p className="text-sm font-bold">Zubier Ahmed</p>
                      <p className="text-xs text-muted-foreground">Traveler workspace</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={closeMenus}
                      className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={login}>
                Login
              </Button>
              <Button onClick={login}>Register</Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            size="icon"
            variant="outline"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((value) => !value)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileOpen ? (
        <div className="border-t border-border/70 bg-background/95 px-4 py-4 shadow-soft backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mx-auto mt-4 grid max-w-7xl gap-2 border-t border-border pt-4">
            {isLoggedIn ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/dashboard" onClick={closeMenus}>
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="secondary" onClick={() => setIsProfileOpen((value) => !value)}>
                  <UserRound className="h-4 w-4" />
                  Profile
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isProfileOpen && "rotate-180")} />
                </Button>
                {isProfileOpen ? (
                  <div className="rounded-lg border border-border bg-card p-2 shadow-sm">
                    <p className="px-3 py-2 text-sm font-bold">Zubier Ahmed</p>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={login}>
                  Login
                </Button>
                <Button onClick={login}>Register</Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
