"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useExpenses } from "@/hooks/use-expenses";
import { useReceipts } from "@/hooks/use-receipts";
import { useCategories } from "@/hooks/use-categories";
import { Expense, PaymentMethod } from "@/types/expense";
import { formatMoney } from "@/utils/date";
import { useManagerStore } from "@/store/manager-store";

export default function ExpensesPage() {
  const hydrated = useManagerStore((state) => state.hydrated);
  const { filteredExpenses, expenseQuery, setExpenseQuery, amountSort, setAmountSort, addExpense, updateExpense, deleteExpense, duplicateExpense } = useExpenses();
  const { receipts } = useReceipts();
  const { categories, addCategory } = useCategories();
  const [editing, setEditing] = useState<Expense | null>(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    vendor: "",
    category: "Food",
    paymentMethod: "Credit Card" as PaymentMethod,
    notes: "",
    linkedReceiptId: "",
  });

  const clearForm = () => {
    setEditing(null);
    setForm({
      title: "",
      amount: "",
      date: "",
      vendor: "",
      category: "Food",
      paymentMethod: "Credit Card",
      notes: "",
      linkedReceiptId: "",
    });
  };

  const submit = () => {
    if (!hydrated) {
      window.alert("Expenses are still loading. Please wait a moment and try again.");
      return;
    }
    if (!form.title.trim() || !form.vendor.trim() || !form.amount.trim() || !form.date) {
      window.alert("Please enter title, vendor, amount, and date before saving.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      amount: Number(form.amount),
      date: form.date,
      vendor: form.vendor.trim(),
      category: form.category,
      paymentMethod: form.paymentMethod,
      notes: form.notes.trim(),
      linkedReceiptId: form.linkedReceiptId || null,
    };

    if (editing) updateExpense(editing.id, payload);
    else addExpense(payload);

    clearForm();
  };

  const topCategories = useMemo(() => categories.map((category) => category.name), [categories]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Expenses</h1>
          <p className="mt-2 text-muted-foreground">Create, edit, duplicate, and link expenses to saved receipts.</p>
        </div>
        <div className="flex gap-2">
        <Button variant="outline" onClick={() => addCategory("New Category")}>Add category</Button>
          <Button variant="outline" onClick={() => setAmountSort(amountSort === "asc" ? "desc" : "asc")} disabled={!hydrated}>
            Sort {amountSort === "asc" ? "High to low" : "Low to high"}
          </Button>
        </div>
      </div>

      <Card className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
        <Input placeholder="Search vendor, title, notes..." value={expenseQuery} onChange={(e) => setExpenseQuery(e.target.value)} disabled={!hydrated} />
        <Input type="date" value={form.date} onChange={(e) => setForm((current) => ({ ...current, date: e.target.value }))} disabled={!hydrated} />
        <Select value={form.linkedReceiptId} onChange={(e) => setForm((current) => ({ ...current, linkedReceiptId: e.target.value }))} disabled={!hydrated}>
          <option value="">No linked receipt</option>
          {receipts.map((receipt) => <option key={receipt.id} value={receipt.id}>{receipt.merchant}</option>)}
        </Select>
        <Input placeholder="Expense title" value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} disabled={!hydrated} />
        <Input placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm((current) => ({ ...current, amount: e.target.value }))} disabled={!hydrated} />
        <Input placeholder="Vendor" value={form.vendor} onChange={(e) => setForm((current) => ({ ...current, vendor: e.target.value }))} disabled={!hydrated} />
        <Select value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))} disabled={!hydrated}>
          {topCategories.map((category) => <option key={category}>{category}</option>)}
        </Select>
        <Select value={form.paymentMethod} onChange={(e) => setForm((current) => ({ ...current, paymentMethod: e.target.value as PaymentMethod }))} disabled={!hydrated}>
          {["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Wallet", "Other"].map((method) => <option key={method}>{method}</option>)}
        </Select>
        <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))} disabled={!hydrated} />
        <div className="flex gap-2 md:col-span-2 xl:col-span-3">
          <Button onClick={submit} disabled={!hydrated}>{editing ? "Save expense" : "Create expense"}</Button>
          <Button variant="outline" onClick={clearForm}>Clear</Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {!hydrated ? (
          <Card className="p-8 text-center text-muted-foreground">Loading expenses...</Card>
        ) : null}
        {filteredExpenses.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No expenses found. Create one above to start tracking spending.
          </Card>
        ) : (
          filteredExpenses.map((expense) => (
            <Card key={expense.id} className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-semibold">{expense.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {expense.vendor} · {expense.category} · {expense.paymentMethod}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge tone="success">{formatMoney(expense.amount)}</Badge>
                    {expense.linkedReceiptId && <Badge tone="outline">Linked receipt</Badge>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(expense);
                      setForm({
                        title: expense.title,
                        amount: String(expense.amount),
                        date: expense.date,
                        vendor: expense.vendor,
                        category: expense.category,
                        paymentMethod: expense.paymentMethod,
                        notes: expense.notes,
                        linkedReceiptId: expense.linkedReceiptId ?? "",
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => duplicateExpense(expense.id)}>Duplicate</Button>
                  <Button variant="outline" onClick={() => deleteExpense(expense.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
