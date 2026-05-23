"use client";

import { Card } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const colors = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#64748b"];

export function ExpenseChart({ data }: { data: { month: string; value: number }[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 text-lg font-semibold">Expense trends</div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs><linearGradient id="trend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#trend)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function CategoryPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 text-lg font-semibold">Spending by category</div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={4}>
              {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function MerchantBarChart({ data }: { data: { merchant: string; value: number }[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 text-lg font-semibold">Top merchants</div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
            <XAxis dataKey="merchant" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
