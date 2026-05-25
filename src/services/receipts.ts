import { fakeApi } from "@/services/api";
import { mockReceipts } from "@/mock/receipts";
import { Receipt } from "@/types/receipt";

let receipts = [...mockReceipts];

export async function getReceipts() {
  return fakeApi(() => receipts.map((r) => ({ ...r })), { failRate: 0.03 });
}

export async function getReceiptById(id: string) {
  return fakeApi(() => receipts.find((r) => r.id === id) ?? null, { failRate: 0.03 });
}

export async function uploadReceipt(payload: { fileName: string; fileType: string; previewUrl: string }) {
  return fakeApi(() => {
    const next: Receipt = {
      id: `rcpt_${Date.now()}`,
      merchant: payload.fileName.replace(/\.[^.]+$/, ""),
      amount: Number((Math.random() * 300 + 20).toFixed(2)),
      category: "Shopping",
      purchaseDate: new Date().toISOString().slice(0, 10),
      warrantyExpiry: null,
      imageUrl: payload.previewUrl,
      ocrText: `${payload.fileName}\nOCR extracted mock text`,
      tax: Number((Math.random() * 20).toFixed(2)),
      notes: "Uploaded via mock frontend workflow.",
      items: [{ name: "Uploaded item", quantity: 1, price: Number((Math.random() * 300 + 20).toFixed(2)) }],
    };
    receipts = [next, ...receipts];
    return next;
  }, { failRate: 0.02 });
}

export async function deleteReceipt(id: string) {
  return fakeApi(() => {
    receipts = receipts.filter((r) => r.id !== id);
    return true;
  }, { failRate: 0.02 });
}
