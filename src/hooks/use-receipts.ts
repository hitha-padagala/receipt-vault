"use client";

import { useMemo } from "react";
import { useManagerStore } from "@/store/manager-store";

export function useReceipts() {
  const receipts = useManagerStore((state) => state.receipts);
  const receiptQuery = useManagerStore((state) => state.receiptQuery);
  const setReceiptQuery = useManagerStore((state) => state.setReceiptQuery);
  const categoryFilter = useManagerStore((state) => state.categoryFilter);
  const setCategoryFilter = useManagerStore((state) => state.setCategoryFilter);
  const dateFrom = useManagerStore((state) => state.dateFrom);
  const dateTo = useManagerStore((state) => state.dateTo);
  const setDateRange = useManagerStore((state) => state.setDateRange);
  const sortKey = useManagerStore((state) => state.sortKey);
  const setSortKey = useManagerStore((state) => state.setSortKey);
  const deleteReceipt = useManagerStore((state) => state.deleteReceipt);
  const updateReceipt = useManagerStore((state) => state.updateReceipt);
  const addReceipt = useManagerStore((state) => state.addReceipt);

  const filteredReceipts = useMemo(() => {
    const query = receiptQuery.trim().toLowerCase();
    return [...receipts]
      .filter((receipt) => {
        const matchesQuery =
          !query ||
          receipt.merchant.toLowerCase().includes(query) ||
          receipt.category.toLowerCase().includes(query) ||
          receipt.ocrText.toLowerCase().includes(query) ||
          receipt.notes.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === "All" || receipt.category === categoryFilter;
        const matchesDateFrom = !dateFrom || receipt.purchaseDate >= dateFrom;
        const matchesDateTo = !dateTo || receipt.purchaseDate <= dateTo;
        return matchesQuery && matchesCategory && matchesDateFrom && matchesDateTo;
      })
      .sort((a, b) => {
        if (sortKey === "amount") return b.amount - a.amount;
        if (sortKey === "vendor") return a.merchant.localeCompare(b.merchant);
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
      });
  }, [categoryFilter, dateFrom, dateTo, receiptQuery, receipts, sortKey]);

  return {
    receipts,
    filteredReceipts,
    receiptQuery,
    setReceiptQuery,
    categoryFilter,
    setCategoryFilter,
    dateFrom,
    dateTo,
    setDateRange,
    sortKey,
    setSortKey,
    addReceipt,
    updateReceipt,
    deleteReceipt,
  };
}
