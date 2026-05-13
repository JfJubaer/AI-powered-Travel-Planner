import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Register | AI Travel Planner",
  description: "Create an AI Travel Planner account for traveler or admin access."
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
