"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/use-analytics";
import { formatMoney } from "@/utils/date";

export default function ReportsPage() {
  const analytics = useAnalytics();

  const exportCsv = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Expenses", analytics.totalExpenses],
      ["Current Month Expenses", analytics.currentMonthExpenses],
      ["Total Receipts", analytics.totalReceipts],
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "smart-receipt-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Reports</h1>
          <p className="mt-2 text-muted-foreground">Monthly and yearly reporting built from local browser data.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>Print report</Button>
          <Button onClick={exportCsv}>Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">Total expenses<div className="mt-2 text-2xl font-semibold">{formatMoney(analytics.totalExpenses)}</div></Card>
        <Card className="p-5">Current month<div className="mt-2 text-2xl font-semibold">{formatMoney(analytics.currentMonthExpenses)}</div></Card>
        <Card className="p-5">Total receipts<div className="mt-2 text-2xl font-semibold">{analytics.totalReceipts}</div></Card>
        <Card className="p-5">Average daily spend<div className="mt-2 text-2xl font-semibold">{formatMoney(analytics.averageDailySpending)}</div></Card>
      </div>
    </div>
  );
}
