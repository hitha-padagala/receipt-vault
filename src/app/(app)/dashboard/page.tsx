"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { useReceiptStore } from "@/store/receipt-store";
import { useEffect, useMemo } from "react";
import { formatMoney, isWarrantyActive } from "@/utils/date";
import { AlertTriangle, ReceiptText, DollarSign, Tags } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const hydrate = useReceiptStore((s) => s.hydrate);
  const receipts = useReceiptStore((s) => s.receipts);
  const loading = useReceiptStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const stats = useMemo(() => {
    const totalReceipts = receipts.length;
    const totalSpending = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
    const warrantyAlerts = receipts.filter((receipt) => receipt.warrantyExpiry && !isWarrantyActive(receipt.warrantyExpiry)).length;
    const categoriesTracked = new Set(receipts.map((receipt) => receipt.category)).size;
    const monthlySpending = receipts
      .filter((receipt) => receipt.purchaseDate.startsWith("2026-05"))
      .reduce((sum, receipt) => sum + receipt.amount, 0);

    return [
      { label: "Total receipts", value: totalReceipts, icon: ReceiptText },
      { label: "Total spending", value: formatMoney(totalSpending), icon: DollarSign },
      { label: "Warranty alerts", value: warrantyAlerts, icon: AlertTriangle },
      { label: "Categories tracked", value: categoriesTracked, icon: Tags },
      { label: "Monthly spending", value: formatMoney(monthlySpending), icon: DollarSign },
    ];
  }, [receipts]);

  const monthlyExpenses = useMemo(() => {
    const buckets = new Map<string, number>();
    receipts.forEach((receipt) => {
      const month = new Date(receipt.purchaseDate).toLocaleDateString("en-US", { month: "short" });
      buckets.set(month, (buckets.get(month) ?? 0) + receipt.amount);
    });
    return Array.from(buckets, ([month, value]) => ({ month, value }));
  }, [receipts]);

  const categoryBreakdown = useMemo(() => {
    const buckets = new Map<string, number>();
    receipts.forEach((receipt) => {
      buckets.set(receipt.category, (buckets.get(receipt.category) ?? 0) + receipt.amount);
    });
    return Array.from(buckets, ([name, value]) => ({ name, value }));
  }, [receipts]);

  if (loading && receipts.length === 0) {
    return <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />)}</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-900 p-6 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-white/70">Profile</div>
            <h2 className="mt-2 text-2xl font-semibold">{user?.name ?? "Your profile"}</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Manage your account identity, review your email, and jump into the full profile page for a cleaner view of your account details.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">{user?.role ?? "member"}</Badge>
            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => router.push("/profile")}
            >
              Open profile
            </Button>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Email</div>
            <div className="mt-2 font-medium">{user?.email ?? "Not signed in"}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Account ID</div>
            <div className="mt-2 font-medium">{user?.id ?? "-"}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Status</div>
            <div className="mt-2 font-medium">Active</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <Icon size={16} className="text-indigo-600" />
              </div>
              <div className="mt-2 text-3xl font-semibold">{item.value}</div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Monthly spending</div>
            <div className="text-sm text-muted-foreground">Derived from the live receipt data in your database</div>
          </div>
          <Badge tone="success">{stats[4].value}</Badge>
        </div>
      </Card>

      <DashboardCharts monthlyExpenses={monthlyExpenses} categoryBreakdown={categoryBreakdown} />
    </div>
  );
}
