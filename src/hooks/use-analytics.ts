"use client";

import { useMemo } from "react";
import { useExpenses } from "@/hooks/use-expenses";
import { useReceipts } from "@/hooks/use-receipts";

export function useAnalytics() {
  const { expenses } = useExpenses();
  const { receipts } = useReceipts();

  return useMemo(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const currentMonthExpenses = expenses
      .filter((expense) => expense.date.startsWith(currentMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);
    const largestExpense = expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), expenses[0] ?? null);

    const monthly = new Map<string, number>();
    const categories = new Map<string, number>();
    const vendors = new Map<string, number>();
    const byDay = new Map<string, number>();

    expenses.forEach((expense) => {
      const month = new Date(`${expense.date}T00:00:00`).toLocaleDateString("en-US", { month: "short" });
      monthly.set(month, (monthly.get(month) ?? 0) + expense.amount);
      categories.set(expense.category, (categories.get(expense.category) ?? 0) + expense.amount);
      vendors.set(expense.vendor, (vendors.get(expense.vendor) ?? 0) + expense.amount);
      byDay.set(expense.date, (byDay.get(expense.date) ?? 0) + expense.amount);
    });

    const averageDailySpending =
      expenses.length === 0 ? 0 : totalExpenses / Math.max(1, new Set(expenses.map((expense) => expense.date)).size);

    return {
      totalExpenses,
      currentMonthExpenses,
      totalReceipts: receipts.length,
      largestExpense,
      averageDailySpending,
      monthlyTrend: Array.from(monthly, ([month, value]) => ({ month, value })),
      categoryBreakdown: Array.from(categories, ([name, value]) => ({ name, value })),
      vendorBreakdown: Array.from(vendors, ([vendor, value]) => ({ merchant: vendor, value })).sort((a, b) => b.value - a.value).slice(0, 6),
      recentActivity: [
        ...expenses.slice(0, 3).map((expense) => `Expense recorded: ${expense.title}`),
        ...receipts.slice(0, 3).map((receipt) => `Receipt saved: ${receipt.merchant}`),
      ],
      dailyAverageSeries: Array.from(byDay, ([day, value]) => ({ day, value })),
    };
  }, [expenses, receipts]);
}
