"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category } from "@/types/category";
import { Expense, PaymentMethod } from "@/types/expense";
import { Receipt } from "@/types/receipt";
import { defaultCategories, seedExpenses, seedReceipts } from "@/data/demo-seed";
import { readStorage, writeStorage } from "@/lib/local-storage";

const STORAGE_KEY = "smart-receipt-expense-manager";

type SortKey = "date" | "amount" | "vendor";

export interface ManagerState {
  receipts: Receipt[];
  expenses: Expense[];
  categories: Category[];
  receiptQuery: string;
  expenseQuery: string;
  categoryFilter: string;
  dateFrom: string;
  dateTo: string;
  amountSort: "asc" | "desc";
  sortKey: SortKey;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setReceiptQuery: (value: string) => void;
  setExpenseQuery: (value: string) => void;
  setCategoryFilter: (value: string) => void;
  setDateRange: (from: string, to: string) => void;
  setAmountSort: (value: "asc" | "desc") => void;
  setSortKey: (value: SortKey) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  addReceipt: (receipt: Receipt) => void;
  updateReceipt: (id: string, patch: Partial<Receipt>) => void;
  deleteReceipt: (id: string) => void;
  addExpense: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => void;
  updateExpense: (id: string, patch: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  duplicateExpense: (id: string) => void;
};

function now() {
  return new Date().toISOString();
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeCategoryName(name: string) {
  return name.trim();
}

export const useManagerStore = create<ManagerState>()(
  persist(
    (set, get) => ({
      receipts: seedReceipts,
      expenses: seedExpenses,
      categories: defaultCategories,
      receiptQuery: "",
      expenseQuery: "",
      categoryFilter: "All",
      dateFrom: "",
      dateTo: "",
      amountSort: "desc",
      sortKey: "date",
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      setReceiptQuery: (value) => set({ receiptQuery: value }),
      setExpenseQuery: (value) => set({ expenseQuery: value }),
      setCategoryFilter: (value) => set({ categoryFilter: value }),
      setDateRange: (from, to) => set({ dateFrom: from, dateTo: to }),
      setAmountSort: (value) => set({ amountSort: value }),
      setSortKey: (value) => set({ sortKey: value }),
      addCategory: (name) => {
        const clean = normalizeCategoryName(name);
        if (!clean) return;
        const exists = get().categories.some((category) => category.name.toLowerCase() === clean.toLowerCase());
        if (exists) return;
        set((state) => ({
          categories: [
            ...state.categories,
            { id: uid("cat"), name: clean, isDefault: false, createdAt: now() },
          ],
        }));
      },
      updateCategory: (id, name) => {
        const clean = normalizeCategoryName(name);
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, name: clean } : category,
          ),
        }));
      },
      deleteCategory: (id) => {
        const category = get().categories.find((item) => item.id === id);
        if (!category || category.isDefault) return;
        set((state) => ({
          categories: state.categories.filter((item) => item.id !== id),
        }));
      },
      addReceipt: (receipt) => set((state) => ({ receipts: [receipt, ...state.receipts] })),
      updateReceipt: (id, patch) =>
        set((state) => ({ receipts: state.receipts.map((receipt) => (receipt.id === id ? { ...receipt, ...patch } : receipt)) })),
      deleteReceipt: (id) => set((state) => ({ receipts: state.receipts.filter((receipt) => receipt.id !== id) })),
      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: uid("exp"), createdAt: now(), updatedAt: now() }, ...state.expenses],
        })),
      updateExpense: (id, patch) =>
        set((state) => ({
          expenses: state.expenses.map((expense) => (expense.id === id ? { ...expense, ...patch, updatedAt: now() } : expense)),
        })),
      deleteExpense: (id) => set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id) })),
      duplicateExpense: (id) => {
        const expense = get().expenses.find((item) => item.id === id);
        if (!expense) return;
        const copy = {
          ...expense,
          id: uid("exp"),
          title: `${expense.title} Copy`,
          createdAt: now(),
          updatedAt: now(),
        };
        set((state) => ({ expenses: [copy, ...state.expenses] }));
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        receipts: state.receipts,
        expenses: state.expenses,
        categories: state.categories,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.setHydrated(true);
      },
    },
  ),
);

export function syncDemoStorage() {
  if (typeof window === "undefined") return;
  writeStorage(STORAGE_KEY, readStorage(STORAGE_KEY, {}));
}
