import { Receipt, ReceiptCategory } from "@/types/receipt";
import { User } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type AuthResponse = {
  success: boolean;
  user: { id: number; email: string; created_at: string };
  token: { access_token: string; token_type: string };
};

type ReceiptResponse = {
  id: number;
  user_id: number;
  merchant: string;
  amount: number;
  category: ReceiptCategory;
  purchase_date: string;
  warranty_expiry: string | null;
  image_url: string;
  ocr_text: string | null;
  created_at: string;
};

type SummaryResponse = {
  success: boolean;
  total_receipts: number;
  total_spending: number;
};

const headers = {
  Accept: "application/json",
};

async function readError(response: Response) {
  const body = await response.json().catch(() => null);
  return body?.detail || body?.message || `Request failed with status ${response.status}`;
}

async function request<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...headers,
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(await readError(response), response.status);
  }

  return response.json() as Promise<T>;
}

function resolveImageUrl(value: string) {
  if (!value) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${API_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function toUser(data: AuthResponse["user"]): User {
  return {
    id: String(data.id),
    name: data.email.split("@")[0],
    email: data.email,
    role: "member",
  };
}

export function toReceipt(data: ReceiptResponse): Receipt {
  return {
    id: String(data.id),
    merchant: data.merchant,
    amount: data.amount,
    category: data.category,
    purchaseDate: data.purchase_date,
    warrantyExpiry: data.warranty_expiry,
    imageUrl: resolveImageUrl(data.image_url),
    ocrText: data.ocr_text ?? "",
    items: [],
    tax: 0,
    notes: "",
  };
}

export async function loginRequest(email: string, password: string) {
  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!response.ok) throw new ApiError(await readError(response), response.status);
  return (await response.json()) as AuthResponse;
}

export async function registerRequest(email: string, password: string) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function meRequest(token: string) {
  return request<AuthResponse["user"]>("/auth/me", undefined, token);
}

export async function listReceiptsRequest(token: string) {
  const data = await request<ReceiptResponse[]>("/receipts", undefined, token);
  return data.map(toReceipt);
}

export async function getReceiptRequest(id: string, token: string) {
  const data = await request<ReceiptResponse>(`/receipts/${id}`, undefined, token);
  return toReceipt(data);
}

export async function deleteReceiptRequest(id: string, token: string) {
  await request<{ success: boolean }>(`/receipts/${id}`, { method: "DELETE" }, token);
  return true;
}

export async function updateReceiptRequest(
  id: string,
  token: string,
  payload: {
    merchant: string;
    amount: number;
    category: ReceiptCategory;
    purchaseDate: string;
    warrantyExpiry?: string | null;
    ocrText?: string | null;
  },
) {
  const data = await request<ReceiptResponse>(
    `/receipts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        merchant: payload.merchant,
        amount: payload.amount,
        category: payload.category,
        purchase_date: payload.purchaseDate,
        warranty_expiry: payload.warrantyExpiry,
        ocr_text: payload.ocrText,
      }),
    },
    token,
  );
  return toReceipt(data);
}

export async function uploadReceiptRequest(
  token: string,
  payload: {
    merchant: string;
    amount: number;
    category: ReceiptCategory;
    purchaseDate: string;
    warrantyExpiry?: string | null;
    ocrText?: string | null;
    file: File;
  },
) {
  const form = new FormData();
  form.set("merchant", payload.merchant);
  form.set("amount", String(payload.amount));
  form.set("category", payload.category);
  form.set("purchase_date", payload.purchaseDate);
  if (payload.warrantyExpiry) form.set("warranty_expiry", payload.warrantyExpiry);
  if (payload.ocrText) form.set("ocr_text", payload.ocrText);
  form.set("file", payload.file);

  const response = await fetch(`${API_BASE_URL}/receipts`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });

  if (!response.ok) throw new ApiError(await readError(response), response.status);
  return toReceipt((await response.json()) as ReceiptResponse);
}

export async function summaryRequest(token: string) {
  return request<SummaryResponse>("/analytics/summary", undefined, token);
}
