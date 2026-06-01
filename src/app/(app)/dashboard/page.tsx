"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowUpRight, CalendarDays, CreditCard, ReceiptText, Wallet } from "lucide-react";
import { formatMoney } from "@/utils/date";
import { ExpenseChart, CategoryPieChart, MerchantBarChart } from "@/components/charts/chart-widgets";
import { useAnalytics } from "@/hooks/use-analytics";

export default function DashboardPage() {
  const router = useRouter();
  const analytics = useAnalytics();

  const cards = [
    { label: "Total Expenses", value: formatMoney(analytics.totalExpenses), icon: Wallet },
    { label: "Current Month Expenses", value: formatMoney(analytics.currentMonthExpenses), icon: CalendarDays },
    { label: "Total Receipts", value: String(analytics.totalReceipts), icon: ReceiptText },
    { label: "Largest Expense", value: analytics.largestExpense ? formatMoney(analytics.largestExpense.amount) : formatMoney(0), icon: CreditCard },
    { label: "Average Daily Spending", value: formatMoney(analytics.averageDailySpending), icon: ArrowUpRight },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-900 p-6 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-white/70">Smart workspace</div>
            <h2 className="mt-2 text-2xl font-semibold">Smart Receipt & Expense Manager</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Manage receipts, expenses, categories, and reports in one local-first SaaS dashboard.
            </p>
          </div>
          <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20" onClick={() => router.push("/upload")}>
            Upload receipt
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="success">Demo mode</Badge>
          <Badge tone="outline">Local storage</Badge>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <Icon size={16} className="text-indigo-600" />
              </div>
              <div className="mt-2 text-2xl font-semibold">{item.value}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5 xl:col-span-2">
          <div className="text-lg font-semibold">Recent activity</div>
          <div className="mt-4 space-y-3">
            {analytics.recentActivity.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3">
                <AlertTriangle size={16} className="text-sky-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 xl:col-span-2">
          <div className="text-lg font-semibold">Expense distribution</div>
          <div className="mt-4 h-64">
            <MerchantBarChart data={analytics.vendorBreakdown} />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart data={analytics.monthlyTrend} />
        <CategoryPieChart data={analytics.categoryBreakdown} />
      </div>
    </div>
  );
}
