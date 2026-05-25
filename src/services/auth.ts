import { fakeApi } from "@/services/api";
import { mockUser } from "@/mock/receipts";
import { User } from "@/types/user";

const AUTH_KEY = "receipt-vault-auth";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export async function login(email: string, password: string) {
  return fakeApi(() => {
    if (email.toLowerCase() !== "demo@receiptvault.com" || password !== "demo1234") {
      throw new Error("Invalid demo credentials.");
    }
    if (typeof window !== "undefined") localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    return mockUser;
  });
}

export async function logout() {
  return fakeApi(() => {
    if (typeof window !== "undefined") localStorage.removeItem(AUTH_KEY);
    return null;
  }, { failRate: 0 });
}
