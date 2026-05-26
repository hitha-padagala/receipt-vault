"use client";

import { create } from "zustand";
import { login as loginApi, logout as logoutApi, refreshStoredUser, register as registerApi } from "@/services/auth";
import { User } from "@/types/user";
import { getStoredUser } from "@/services/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  hydrated: false,
  hydrate: async () => {
    const stored = getStoredUser();
    if (stored) {
      set({ user: stored, hydrated: true });
      return;
    }
    const refreshed = await refreshStoredUser().catch(() => null);
    set({ user: refreshed, hydrated: true });
  },
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await loginApi(email, password);
      set({ user, loading: false });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Login failed.", loading: false });
      return false;
    }
  },
  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await registerApi(email, password);
      set({ user, loading: false });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Registration failed.", loading: false });
      return false;
    }
  },
  logout: async () => {
    await logoutApi();
    set({ user: null, error: null });
  },
}));
