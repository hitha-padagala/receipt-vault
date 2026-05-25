"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useInitialAuth } from "@/hooks/use-initial-auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  useInitialAuth();

  useEffect(() => {
    if (hydrated && user) router.replace("/dashboard");
  }, [hydrated, router, user]);

  if (hydrated && user) return null;
  return children;
}
