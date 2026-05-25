"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function useInitialAuth() {
  const hydrate = useAuthStore((state) => state.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
