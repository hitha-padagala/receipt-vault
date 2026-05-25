"use client";

import { create } from "zustand";
import { login as loginApi, logout as logoutApi } from "@/services/auth";
import { User } from "@/types/user";
import { getStoredUser } from "@/services/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  hydrated: false,
  hydrate: () => set({ user: getStoredUser(), hydrated: true }),
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
  logout: async () => {
    await logoutApi();
    set({ user: null, error: null });
  },
}));
