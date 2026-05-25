"use client";

import { LayoutDashboard, ReceiptText, Upload, LineChart, Settings, Search, Menu, Bell, Plus, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useInitialAuth } from "@/hooks/use-initial-auth";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/receipts", label: "Receipts", icon: ReceiptText },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const logout = useAuthStore((state) => state.logout);
  useInitialAuth();

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, router, user]);

  return (
    <div className="page-shell min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className={cn("fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-background/90 p-4 backdrop-blur xl:static xl:translate-x-0", open ? "translate-x-0" : "-translate-x-full xl:translate-x-0")}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Receipt Vault</div>
              <div className="text-xs text-muted-foreground">Digital receipt intelligence</div>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  pathname === href && "bg-muted text-foreground",
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 p-4 text-white">
            <div className="text-sm font-medium">Quick upload</div>
            <div className="mt-1 text-sm/6 text-white/80">Capture receipts instantly from anywhere.</div>
            <Button
              type="button"
              className="mt-4 w-full bg-white text-slate-900 hover:bg-white/90"
              onClick={() => router.push("/upload")}
            >
              <Plus size={16} /> Upload receipt
            </Button>
          </div>
          <div className="mt-8">
            <Button
              type="button"
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
            >
              <LogOut size={16} /> Sign out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-4 lg:px-6">
              <Button variant="ghost" className="xl:hidden" onClick={() => setOpen((v) => !v)}>
                <Menu size={16} />
              </Button>
              <div className="relative max-w-xl flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  className="pl-9"
                  placeholder="Search receipts, merchants, categories..."
                />
              </div>
              <ThemeSwitcher />
              <Button variant="outline" className="hidden sm:inline-flex">
                <Bell size={16} /> Alerts
              </Button>
              <Button variant="gradient">
                <Plus size={16} /> Add receipt
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
