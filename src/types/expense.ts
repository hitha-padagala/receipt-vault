import { CategoryType } from "@/types/category";

export type PaymentMethod = "Cash" | "Credit Card" | "Debit Card" | "Bank Transfer" | "Wallet" | "Other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  vendor: string;
  category: CategoryType;
  paymentMethod: PaymentMethod;
  notes: string;
  linkedReceiptId: string | null;
  createdAt: string;
  updatedAt: string;
}
