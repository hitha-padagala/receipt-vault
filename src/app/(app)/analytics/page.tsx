"use client";

import { useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useReceiptStore } from "@/store/receipt-store";
import { formatMoney } from "@/utils/date";
import { ExpenseChart, CategoryPieChart, MerchantBarChart } from "@/components/charts/chart-widgets";

export default function AnalyticsPage() {
  const hydrate = useReceiptStore((s) => s.hydrate);
  const receipts = useReceiptStore((s) => s.receipts);
  const loading = useReceiptStore((s) => s.loading);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const analytics = useMemo(() => {
    const monthlyMap = new Map<string, number>();
    const categoryMap = new Map<string, number>();
    const merchantMap = new Map<string, number>();

    receipts.forEach((receipt) => {
      const month = new Date(receipt.purchaseDate).toLocaleDateString("en-US", { month: "short" });
      monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + receipt.amount);
      categoryMap.set(receipt.category, (categoryMap.get(receipt.category) ?? 0) + receipt.amount);
      merchantMap.set(receipt.merchant, (merchantMap.get(receipt.merchant) ?? 0) + receipt.amount);
    });

    return {
      monthlyTrend: Array.from(monthlyMap, ([month, value]) => ({ month, value })),
      categoryTrend: Array.from(categoryMap, ([name, value]) => ({ name, value })),
      merchantTrend: Array.from(merchantMap, ([merchant, value]) => ({ merchant, value })).sort((a, b) => b.value - a.value).slice(0, 5),
    };
  }, [receipts]);

  if (loading && receipts.length === 0) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  }

  if (receipts.length === 0) {
    return <Card className="p-6 text-muted-foreground">No receipt data available for analytics yet.</Card>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Analytics</h1>
        <p className="mt-2 text-muted-foreground">Charts are generated from live receipt records in the backend.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Spending", formatMoney(receipts.reduce((sum, receipt) => sum + receipt.amount, 0))],
          ["Average receipt", formatMoney(receipts.reduce((sum, receipt) => sum + receipt.amount, 0) / receipts.length)],
          ["Receipts", String(receipts.length)],
          ["Top category", analytics.categoryTrend[0]?.name ?? "N/A"],
        ].map(([label, value]) => (
          <Card key={label} className="bg-gradient-to-br from-card to-indigo-50 p-5 dark:to-indigo-950/30">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-2 text-2xl font-semibold">{value}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart data={analytics.monthlyTrend.length ? analytics.monthlyTrend : [{ month: "N/A", value: 0 }]} />
        <CategoryPieChart data={analytics.categoryTrend.length ? analytics.categoryTrend : [{ name: "N/A", value: 0 }]} />
      </div>

      <MerchantBarChart data={analytics.merchantTrend.length ? analytics.merchantTrend : [{ merchant: "N/A", value: 0 }]} />
    </div>
  );
}
