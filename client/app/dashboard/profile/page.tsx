"use client";

import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardLayout role="traveler" userName="John Doe" userEmail="john@example.com">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
        </div>

        {/* Profile Info */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <User size={16} />
                Full Name
              </Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Mail size={16} />
                Email Address
              </Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div className="flex gap-3 pt-4">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Lock size={20} />
            Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Current Password</Label>
              <Input type="password" name="currentPassword" placeholder="Enter your current password" />
            </div>
            <div>
              <Label className="mb-2 block">New Password</Label>
              <Input type="password" name="newPassword" placeholder="Enter new password" />
            </div>
            <div>
              <Label className="mb-2 block">Confirm Password</Label>
              <Input type="password" name="confirmPassword" placeholder="Confirm new password" />
            </div>
            <Button>Update Password</Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-foreground">Receive email notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-foreground">Subscribe to newsletter</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-foreground">Share my profile publicly</span>
            </label>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
