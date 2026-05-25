export type ReceiptCategory = "Electronics" | "Groceries" | "Medical" | "Fuel" | "Shopping" | "Travel" | "Software";

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  merchant: string;
  amount: number;
  category: ReceiptCategory;
  purchaseDate: string;
  warrantyExpiry: string | null;
  imageUrl: string;
  ocrText: string;
  items: ReceiptItem[];
  tax: number;
  notes: string;
}
