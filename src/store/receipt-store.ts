"use client";

import { create } from "zustand";
import { Receipt, ReceiptCategory } from "@/types/receipt";
import { deleteReceipt, getReceiptById, getReceipts, uploadReceipt } from "@/services/receipts";

type SortKey = "purchaseDate" | "amount" | "merchant";

interface ReceiptState {
  receipts: Receipt[];
  selectedReceipt: Receipt | null;
  loading: boolean;
  error: string | null;
  search: string;
  category: ReceiptCategory | "All";
  sort: SortKey;
  view: "table" | "grid";
  page: number;
  pageSize: number;
  uploadProgress: number;
  uploadError: string | null;
  hydrate: () => Promise<void>;
  setSearch: (value: string) => void;
  setCategory: (value: ReceiptCategory | "All") => void;
  setSort: (value: SortKey) => void;
  setView: (value: "table" | "grid") => void;
  setPage: (value: number) => void;
  fetchReceipt: (id: string) => Promise<void>;
  upload: (file: File) => Promise<void>;
  removeReceipt: (id: string) => Promise<void>;
}

export const useReceiptStore = create<ReceiptState>((set, get) => ({
  receipts: [],
  selectedReceipt: null,
  loading: false,
  error: null,
  search: "",
  category: "All",
  sort: "purchaseDate",
  view: "table",
  page: 1,
  pageSize: 6,
  uploadProgress: 0,
  uploadError: null,
  hydrate: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getReceipts();
      set({ receipts: data, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to load receipts.", loading: false });
    }
  },
  setSearch: (value) => set({ search: value, page: 1 }),
  setCategory: (value) => set({ category: value, page: 1 }),
  setSort: (value) => set({ sort: value }),
  setView: (value) => set({ view: value }),
  setPage: (value) => set({ page: value }),
  fetchReceipt: async (id) => {
    set({ loading: true, error: null });
    try {
      const receipt = await getReceiptById(id);
      set({ selectedReceipt: receipt, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to load receipt.", loading: false });
    }
  },
  upload: async (file) => {
    set({ uploadProgress: 10, uploadError: null });
    try {
      const previewUrl = URL.createObjectURL(file);
      const timer = window.setInterval(() => {
        set((state) => ({ uploadProgress: Math.min(state.uploadProgress + 18, 92) }));
      }, 180);
      const receipt = await uploadReceipt({ fileName: file.name, fileType: file.type, previewUrl });
      window.clearInterval(timer);
      set((state) => ({ receipts: [receipt, ...state.receipts], uploadProgress: 100 }));
      window.setTimeout(() => set({ uploadProgress: 0 }), 700);
    } catch (error) {
      set({ uploadError: error instanceof Error ? error.message : "Upload failed.", uploadProgress: 0 });
    }
  },
  removeReceipt: async (id) => {
    await deleteReceipt(id);
    set((state) => ({ receipts: state.receipts.filter((receipt) => receipt.id !== id) }));
  },
}));

export function getFilteredReceipts(state: ReceiptState) {
  const query = state.search.trim().toLowerCase();
  const filtered = state.receipts.filter((receipt) => {
    const matchesQuery =
      !query ||
      receipt.merchant.toLowerCase().includes(query) ||
      receipt.category.toLowerCase().includes(query);
    const matchesCategory = state.category === "All" || receipt.category === state.category;
    return matchesQuery && matchesCategory;
  });

  return [...filtered].sort((a, b) => {
    if (state.sort === "merchant") return a.merchant.localeCompare(b.merchant);
    if (state.sort === "amount") return b.amount - a.amount;
    return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
  });
}
