import { User } from "@/types/user";
import { loginRequest, meRequest, registerRequest, toUser } from "@/services/backend-api";

const AUTH_KEY = "receipt-vault-auth";
const TOKEN_KEY = "receipt-vault-token";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export async function login(email: string, password: string) {
  const result = await loginRequest(email, password);
  const user = toUser(result.user);
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, result.token.access_token);
  }
  return user;
}

export async function register(email: string, password: string) {
  const result = await registerRequest(email, password);
  const user = toUser(result.user);
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, result.token.access_token);
  }
  return user;
}

export async function refreshStoredUser() {
  const token = getStoredToken();
  if (!token) return null;
  const user = await meRequest(token);
  const normalized = toUser(user);
  if (typeof window !== "undefined") localStorage.setItem(AUTH_KEY, JSON.stringify(normalized));
  return normalized;
}

export async function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
  return null;
}
