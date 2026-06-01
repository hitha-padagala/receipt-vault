"use client";

import { useMemo } from "react";
import { useManagerStore } from "@/store/manager-store";

export function useExpenses() {
  const expenses = useManagerStore((state) => state.expenses);
  const expenseQuery = useManagerStore((state) => state.expenseQuery);
  const setExpenseQuery = useManagerStore((state) => state.setExpenseQuery);
  const categoryFilter = useManagerStore((state) => state.categoryFilter);
  const setCategoryFilter = useManagerStore((state) => state.setCategoryFilter);
  const dateFrom = useManagerStore((state) => state.dateFrom);
  const dateTo = useManagerStore((state) => state.dateTo);
  const setDateRange = useManagerStore((state) => state.setDateRange);
  const amountSort = useManagerStore((state) => state.amountSort);
  const setAmountSort = useManagerStore((state) => state.setAmountSort);
  const deleteExpense = useManagerStore((state) => state.deleteExpense);
  const updateExpense = useManagerStore((state) => state.updateExpense);
  const addExpense = useManagerStore((state) => state.addExpense);
  const duplicateExpense = useManagerStore((state) => state.duplicateExpense);

  const filteredExpenses = useMemo(() => {
    const query = expenseQuery.trim().toLowerCase();
    return [...expenses]
      .filter((expense) => {
        const matchesQuery =
          !query ||
          expense.title.toLowerCase().includes(query) ||
          expense.vendor.toLowerCase().includes(query) ||
          expense.category.toLowerCase().includes(query) ||
          expense.notes.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === "All" || expense.category === categoryFilter;
        const matchesDateFrom = !dateFrom || expense.date >= dateFrom;
        const matchesDateTo = !dateTo || expense.date <= dateTo;
        return matchesQuery && matchesCategory && matchesDateFrom && matchesDateTo;
      })
      .sort((a, b) => (amountSort === "asc" ? a.amount - b.amount : b.amount - a.amount));
  }, [amountSort, categoryFilter, dateFrom, dateTo, expenseQuery, expenses]);

  return {
    expenses,
    filteredExpenses,
    expenseQuery,
    setExpenseQuery,
    categoryFilter,
    setCategoryFilter,
    dateFrom,
    dateTo,
    setDateRange,
    amountSort,
    setAmountSort,
    addExpense,
    updateExpense,
    deleteExpense,
    duplicateExpense,
  };
}
