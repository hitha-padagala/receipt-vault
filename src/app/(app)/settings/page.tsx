"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-muted-foreground">Profile, notifications, exports, and security settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="text-lg font-semibold">Profile settings</div>
          <div className="mt-4 space-y-4">
            <Input value={user?.name ?? ""} readOnly placeholder="Name" />
            <Input value={user?.email ?? ""} readOnly placeholder="Email" />
            <Textarea defaultValue="Manage your Receipt Vault profile and organization details." />
            <Button variant="outline">Save profile</Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-lg font-semibold">Notification settings</div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div>Warranty reminders</div>
            <div>Receipt upload confirmations</div>
            <div>Monthly spending digest</div>
            <Button variant="outline">Manage notifications</Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-lg font-semibold">Theme toggle</div>
          <div className="mt-4">
            <ThemeSwitcher />
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-lg font-semibold">Export data</div>
          <div className="mt-4 text-sm text-muted-foreground">Export your receipt archive as CSV, JSON, or PDF later.</div>
          <Button className="mt-4" variant="outline">Export mock data</Button>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="text-lg font-semibold">Security settings</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Button variant="outline">Change password</Button>
            <Button variant="outline">Enable 2FA</Button>
            <Button variant="outline">Session management</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
