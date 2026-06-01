"use client";

import { useManagerStore } from "@/store/manager-store";
import { Receipt, ReceiptCategory } from "@/types/receipt";

type ReceiptSortKey = "purchaseDate" | "amount" | "merchant";

interface ReceiptState {
  receipts: Receipt[];
  selectedReceipt: Receipt | null;
  loading: boolean;
  error: string | null;
  search: string;
  category: ReceiptCategory | "All";
  sort: ReceiptSortKey;
  view: "table" | "grid";
  page: number;
  pageSize: number;
  uploadProgress: number;
  uploadError: string | null;
  hydrate: () => Promise<void>;
  setSearch: (value: string) => void;
  setCategory: (value: ReceiptCategory | "All") => void;
  setSort: (value: ReceiptSortKey) => void;
  setView: (value: "table" | "grid") => void;
  setPage: (value: number) => void;
  fetchReceipt: (id: string) => Promise<void>;
  upload: (payload: {
    file: File;
    merchant: string;
    amount: number;
    category: ReceiptCategory;
    purchaseDate: string;
    warrantyExpiry?: string | null;
    ocrText?: string | null;
  }) => Promise<void>;
  removeReceipt: (id: string) => Promise<void>;
  updateReceipt: (
    id: string,
    payload: {
      merchant: string;
      amount: number;
      category: ReceiptCategory;
      purchaseDate: string;
      warrantyExpiry?: string | null;
      ocrText?: string | null;
    },
  ) => Promise<void>;
}

export function useReceiptStore<T>(selector: (state: ReceiptState) => T): T;
export function useReceiptStore(): ReceiptState;
export function useReceiptStore<T>(selector?: (state: ReceiptState) => T) {
  const receipts = useManagerStore((state) => state.receipts);
  const selectedReceipt = receipts[0] ?? null;
  const search = useManagerStore((state) => state.receiptQuery);
  const category = useManagerStore((state) => state.categoryFilter) as ReceiptCategory | "All";
  const sort = useManagerStore((state) => state.sortKey === "vendor" ? "merchant" : state.sortKey === "amount" ? "amount" : "purchaseDate") as ReceiptSortKey;
  const view = "table" as const;
  const page = 1;
  const pageSize = 6;
  const uploadProgress = 0;
  const uploadError = null;
  const setSearch = useManagerStore((state) => state.setReceiptQuery);
  const setCategory = useManagerStore((state) => state.setCategoryFilter);
  const setSortKeyStore = useManagerStore((state) => state.setSortKey);
  const removeReceipt = useManagerStore((state) => state.deleteReceipt);
  const updateReceiptStore = useManagerStore((state) => state.updateReceipt);
  const addReceipt = useManagerStore((state) => state.addReceipt);

  const state: ReceiptState = {
    receipts,
    selectedReceipt,
    loading: false,
    error: null,
    search,
    category,
    sort,
    view,
    page,
    pageSize,
    uploadProgress,
    uploadError,
    hydrate: async () => Promise.resolve(),
    setSearch,
    setCategory,
    setSort: (value) => {
      if (value === "merchant") {
        setSortKeyStore("vendor");
        return;
      }
      if (value === "amount") {
        setSortKeyStore("amount");
        return;
      }
      setSortKeyStore("date");
    },
    setView: () => undefined,
    setPage: () => undefined,
    fetchReceipt: async () => Promise.resolve(),
    upload: async (payload) => {
      addReceipt({
        id: `rcpt-${Math.random().toString(36).slice(2, 10)}`,
        merchant: payload.merchant,
        amount: payload.amount,
        category: payload.category,
        purchaseDate: payload.purchaseDate,
        warrantyExpiry: payload.warrantyExpiry ?? null,
        imageUrl: URL.createObjectURL(payload.file),
        ocrText: payload.ocrText ?? "",
        items: [],
        tax: 0,
        notes: "",
      });
    },
    removeReceipt: async (id) => {
      removeReceipt(id);
    },
    updateReceipt: async (id, payload) => {
      updateReceiptStore(id, {
        merchant: payload.merchant,
        amount: payload.amount,
        category: payload.category,
        purchaseDate: payload.purchaseDate,
        warrantyExpiry: payload.warrantyExpiry ?? null,
        ocrText: payload.ocrText ?? "",
      });
    },
  };

  return selector ? selector(state) : state;
}

export function getFilteredReceipts(state: ReceiptState) {
  return [...state.receipts].sort((a, b) => {
    if (state.sort === "merchant") return a.merchant.localeCompare(b.merchant);
    if (state.sort === "amount") return b.amount - a.amount;
    return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
  });
}
