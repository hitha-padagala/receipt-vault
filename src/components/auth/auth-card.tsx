"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chrome, Eye, EyeOff, Github, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

type Mode = "login" | "register" | "forgot";

export function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const title =
    mode === "login"
      ? "Welcome back"
      : mode === "register"
        ? "Create your account"
        : "Reset your password";

  const subtitle =
    mode === "login"
      ? "Sign in to manage receipts, warranties, and spending insights."
      : mode === "register"
        ? "Start organizing receipts with a clean, searchable vault."
        : "We'll email password reset instructions to your inbox.";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    window.setTimeout(async () => {
      if (mode === "forgot") {
        setLoading(false);
        setError("Password reset links are mocked in this frontend demo.");
        return;
      }

      if (mode === "register" && name.trim().length < 2) {
        setLoading(false);
        setError("Please enter your full name.");
        return;
      }

      const ok = await login(email, password);
      setLoading(false);

      if (!ok) {
        setError("Use demo@receiptvault.com / demo1234 to sign in.");
        return;
      }

      router.push("/dashboard");
    }, 250);
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-soft">
      <div className="mb-6">
        <div className="text-2xl font-semibold">{title}</div>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {mode !== "forgot" && (
        <div className="space-y-3">
          <Button type="button" variant="outline" className="w-full">
            <Chrome size={16} /> Continue with Google
          </Button>
          <Button type="button" variant="outline" className="w-full">
            <Github size={16} /> Continue with GitHub
          </Button>
        </div>
      )}

      <div className="my-6 h-px bg-border" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "register" && (
          <div>
            <label className="mb-2 block text-sm">Full name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              required
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@company.com"
            required
          />
        </div>

        {mode !== "forgot" && (
          <div>
            <label className="mb-2 block text-sm">Password</label>
            <div className="relative">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        )}

        <Button className="w-full" disabled={loading}>
          {mode === "login"
            ? loading
              ? "Signing in..."
              : "Sign in"
            : mode === "register"
              ? loading
                ? "Creating account..."
                : "Create account"
              : loading
                ? "Sending..."
                : "Send reset link"}
        </Button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-300">
          {error}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm">
        {mode === "login" ? (
          <>
            <Link href="/forgot-password" className="text-indigo-600 hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="text-indigo-600 hover:underline">
              Create account
            </Link>
          </>
        ) : mode === "register" ? (
          <>
            <span className="text-muted-foreground">Already have an account?</span>
            <Link href="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <Link href="/login" className="text-indigo-600 hover:underline">
            Back to sign in
          </Link>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
        <ShieldCheck size={14} /> Demo credentials: demo@receiptvault.com / demo1234
      </div>
    </Card>
  );
}
