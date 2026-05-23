"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categoryBreakdown, monthlyExpenses } from "@/data/mock";

const colors = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#64748b"];

export function DashboardCharts() {
  return (
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
              <defs>
                <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                </linearGradient>
              </defs>
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
                {categoryBreakdown.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
