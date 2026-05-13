import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPinned, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section>
        <StatusPill>Contact</StatusPill>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal sm:text-5xl">Plan a smarter travel workflow.</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Reach out for agency workflows, AI itinerary tooling, or destination recommendation integrations.
        </p>
        <div className="mt-8 grid gap-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-bold">hello@aitravelplanner.app</p>
                <p className="text-sm text-muted-foreground">Product and partnership inquiries</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <MapPinned className="h-5 w-5 text-accent" />
              <div>
                <p className="font-bold">Remote-first travel platform</p>
                <p className="text-sm text-muted-foreground">Built for global travelers and agencies</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="glass-surface">
        <CardContent className="grid gap-5 p-6">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label>Message</Label>
            <Textarea placeholder="Tell us what kind of travel planning workflow you want to build." />
          </div>
          <Button asChild>
            <Link href="/planner">
              <Send className="h-4 w-4" />
              Start with a trip plan
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
