import { Category } from "@/types/category";
import { Expense } from "@/types/expense";
import { Receipt } from "@/types/receipt";

export const defaultCategories: Category[] = [
  "Food",
  "Travel",
  "Fuel",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Education",
  "Utilities",
  "Miscellaneous",
].map((name) => ({
  id: name.toLowerCase(),
  name,
  isDefault: true,
  createdAt: new Date().toISOString(),
}));

export const seedReceipts: Receipt[] = [
  {
    id: "rcpt-1001",
    merchant: "Apex Electronics",
    amount: 249.99,
    category: "Shopping",
    purchaseDate: "2026-05-21",
    warrantyExpiry: "2028-05-21",
    imageUrl: "/uploads/demo-receipt-1.jpg",
    ocrText: "Apex Electronics receipt",
    items: [],
    tax: 19.99,
    notes: "Work laptop accessories",
  },
];

export const seedExpenses: Expense[] = [
  {
    id: "exp-1001",
    title: "Team lunch",
    amount: 86.4,
    date: "2026-05-20",
    vendor: "Urban Bowl",
    category: "Food",
    paymentMethod: "Credit Card",
    notes: "Client sync lunch",
    linkedReceiptId: "rcpt-1001",
    createdAt: "2026-05-20T10:30:00.000Z",
    updatedAt: "2026-05-20T10:30:00.000Z",
  },
];
