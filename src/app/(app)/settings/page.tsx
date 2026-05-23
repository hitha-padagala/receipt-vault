import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-muted-foreground">Profile, notifications, exports, and security controls.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="text-lg font-semibold">Profile settings</div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div>Avatar, name, email, and organization preferences.</div>
            <Button variant="outline">Edit profile</Button>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-lg font-semibold">Notification settings</div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div>Warranty reminders, upload confirmations, and monthly digest.</div>
            <Button variant="outline">Manage notifications</Button>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-lg font-semibold">Theme toggle</div>
          <div className="mt-4"><ThemeSwitcher /></div>
        </Card>
        <Card className="p-5">
          <div className="text-lg font-semibold">Export data</div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div>Export CSV, JSON, or PDF receipt summaries.</div>
            <Button variant="outline">Export vault data</Button>
          </div>
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
