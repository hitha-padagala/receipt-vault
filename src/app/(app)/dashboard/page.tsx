import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { summaryCards, monthlyExpenses, categoryBreakdown, receipts, recentActivity } from "@/data/mock";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const colors = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#64748b"];

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
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Monthly expenses</div>
              <div className="text-sm text-muted-foreground">Cash flow trend across the last six months</div>
            </div>
            <Badge tone="success">Live mock data</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyExpenses}>
                <defs><linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#fillExpense)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-4">
            <div className="text-lg font-semibold">Categories</div>
            <div className="text-sm text-muted-foreground">Spending distribution</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={3}>
                  {categoryBreakdown.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 p-5">
          <div className="mb-4 text-lg font-semibold">Recent receipts</div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Merchant</th><th>Amount</th><th>Category</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => <tr key={r.merchant} className="border-t border-border"><td className="px-4 py-3 font-medium">{r.merchant}</td><td>{r.amount}</td><td>{r.category}</td><td>{r.date}</td><td><Badge tone={r.status as any}>{r.warranty}</Badge></td></tr>)}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-lg font-semibold">Recent activity</div>
          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => <div key={item} className="rounded-xl bg-muted p-3 text-sm">{item}</div>)}
          </div>
        </Card>
      </div>
    </div>
  );
}
