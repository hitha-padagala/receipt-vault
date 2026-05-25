"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { useReceiptStore } from "@/store/receipt-store";
import { useEffect, useMemo } from "react";
import { formatMoney, isWarrantyActive } from "@/utils/date";
import { AlertTriangle, ReceiptText, DollarSign, Tags } from "lucide-react";

export default function DashboardPage() {
  const hydrate = useReceiptStore((s) => s.hydrate);
  const receipts = useReceiptStore((s) => s.receipts);
  const loading = useReceiptStore((s) => s.loading);

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
            <div className="text-sm text-muted-foreground">Derived from current mock receipt data</div>
          </div>
          <Badge tone="success">{stats[4].value}</Badge>
        </div>
      </Card>

      <DashboardCharts monthlyExpenses={monthlyExpenses} categoryBreakdown={categoryBreakdown} />
    </div>
  );
}
