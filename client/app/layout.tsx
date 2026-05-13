import type { Metadata } from "next";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "AI Travel Planner",
  description: "AI-powered full-stack travel planning for modern travelers and agencies."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen surface-grid">
            <SiteNavbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
