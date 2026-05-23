import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { summaryCards, receipts, recentActivity } from "@/data/mock";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <Card key={item.label} className="p-5">
            <div className="text-sm text-muted-foreground">{item.label}</div>
            <div className="mt-2 text-3xl font-semibold">{item.value}</div>
            <div className="mt-2 text-sm text-emerald-600">{item.delta}</div>
          </Card>
        ))}
      </div>

      <DashboardCharts />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 p-5">
          <div className="mb-4 text-lg font-semibold">Recent receipts</div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Merchant</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{r.merchant}</td>
                    <td>{r.amount}</td>
                    <td>{r.category}</td>
                    <td>{r.date}</td>
                    <td>
                      <Badge tone={r.status as "default" | "success" | "warning" | "outline"}>{r.warranty}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-lg font-semibold">Recent activity</div>
          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <div key={item} className="rounded-xl bg-muted p-3 text-sm">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
