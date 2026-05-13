import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Compass, LayoutDashboard, Map, Plane } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Travel Planner",
  description: "AI-powered full-stack travel planning for modern travelers and agencies."
};

const navItems = [
  { href: "/planner", label: "Planner", icon: Plane },
  { href: "/explore", label: "Explore", icon: Map },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen surface-grid">
            <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl">
              <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3 font-semibold">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
                    <Compass className="h-5 w-5" />
                  </span>
                  <span className="hidden text-base sm:inline">AI Travel Planner</span>
                </Link>
                <nav className="hidden items-center gap-1 md:flex">
                  {navItems.map((item) => (
                    <Button key={item.href} asChild variant="ghost" size="sm">
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button asChild className="hidden sm:inline-flex">
                    <Link href="/planner">Generate Trip</Link>
                  </Button>
                </div>
              </div>
              <nav className="grid grid-cols-3 gap-1 border-t border-border/70 px-3 py-2 md:hidden">
                {navItems.map((item) => (
                  <Button key={item.href} asChild variant="ghost" size="sm">
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
