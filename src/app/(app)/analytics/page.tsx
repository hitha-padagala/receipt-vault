import { Card } from "@/components/ui/card";
import { monthlyExpenses, categoryBreakdown } from "@/data/mock";
import { ExpenseChart, CategoryPieChart, MerchantBarChart } from "@/components/charts/chart-widgets";

export default function AnalyticsPage() {
  const merchants = [
    { merchant: "Amazon", value: 5200 },
    { merchant: "Apex", value: 4200 },
    { merchant: "CloudNine", value: 3200 },
    { merchant: "Nova Travel", value: 2500 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Analytics</h1>
        <p className="mt-2 text-muted-foreground">Interactive spending insights with monthly comparisons and merchant intelligence.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Month over month", "+12.2%"],
          ["Average receipt", "$142.30"],
          ["Top category", "Travel"],
          ["Recurring vendors", "18"],
        ].map(([label, value]) => (
          <Card key={label} className="bg-gradient-to-br from-card to-indigo-50 p-5 dark:to-indigo-950/40">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-2 text-2xl font-semibold">{value}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart data={monthlyExpenses} />
        <CategoryPieChart data={categoryBreakdown} />
      </div>
      <MerchantBarChart data={merchants} />
    </div>
  );
}
