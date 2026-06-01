"use client";

import { useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { ReceiptCard } from "@/components/receipts/receipt-card";
import { ReceiptTable } from "@/components/receipts/receipt-table";
import { useReceiptStore } from "@/store/receipt-store";
import { useReceipts } from "@/hooks/use-receipts";
import { ReceiptCategory } from "@/types/receipt";
import { Grid2x2, Table2 } from "lucide-react";

const categories: (ReceiptCategory | "All")[] = ["All", "Electronics", "Groceries", "Medical", "Fuel", "Shopping", "Travel", "Software"];

export default function ReceiptsPage() {
  const hydrate = useReceiptStore((s) => s.hydrate);
  const removeReceipt = useReceiptStore((s) => s.removeReceipt);
  const state = useReceiptStore();
  const { filteredReceipts } = useReceipts();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const totalPages = Math.max(1, Math.ceil(filteredReceipts.length / state.pageSize));
  const pageItems = filteredReceipts.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Receipts</h1>
          <p className="mt-2 text-muted-foreground">Search, sort, and review your receipt archive.</p>
        </div>
        <div className="flex gap-2">
          <Badge tone={state.view === "table" ? "success" : "outline"} className="gap-1">
            <Table2 size={14} /> Table
          </Badge>
          <Badge tone={state.view === "grid" ? "success" : "outline"} className="gap-1">
            <Grid2x2 size={14} /> Grid
          </Badge>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Input placeholder="Search merchant or category" value={state.search} onChange={(e) => state.setSearch(e.target.value)} />
          <Select value={state.category} onChange={(e) => state.setCategory(e.target.value as ReceiptCategory | "All")}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          <Select value={state.sort} onChange={(e) => state.setSort(e.target.value as "purchaseDate" | "amount" | "merchant")}>
            <option value="purchaseDate">Newest first</option>
            <option value="amount">Highest amount</option>
            <option value="merchant">Merchant A-Z</option>
          </Select>
          <Select value={state.view} onChange={(e) => state.setView(e.target.value as "table" | "grid")}>
            <option value="table">Table view</option>
            <option value="grid">Grid view</option>
          </Select>
        </div>
      </Card>

      {state.loading && filteredReceipts.length === 0 ? (
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      ) : filteredReceipts.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">No receipts matched your filters.</Card>
      ) : (
        <>
          {state.view === "table" ? (
            <ReceiptTable
              receipts={pageItems}
              onDelete={(receipt) => {
                if (window.confirm(`Delete receipt from ${receipt.merchant}? This cannot be undone.`)) {
                  void removeReceipt(receipt.id);
                }
              }}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((receipt) => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  onDelete={(item) => {
                    if (window.confirm(`Delete receipt from ${item.merchant}? This cannot be undone.`)) {
                      void removeReceipt(item.id);
                    }
                  }}
                />
              ))}
            </div>
          )}
          <Pagination page={state.page} totalPages={totalPages} onPageChange={state.setPage} />
        </>
      )}
    </div>
  );
}
