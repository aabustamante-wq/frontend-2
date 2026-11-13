"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Please accept the terms of the agreement.");
      return;
    }

    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1c1714] px-4 py-10 font-sans">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 blur-[2px]"
      />

      <Card className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md sm:p-10">
        <CardHeader className="items-center space-y-2 p-0 text-center">
          <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#4338ca] text-white shadow-lg">
            <svg className="h-11 w-11" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Create Account
          </CardTitle>
          <CardDescription className="text-xs text-stone-200">
            Register a new account to get started.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-5 p-0 pt-6">
            {error && (
              <div className="rounded-lg border border-red-400/40 bg-red-950/60 px-3 py-2.5 text-center text-xs font-medium text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="username" className="sr-only">
                Username
              </Label>
              <div className="flex items-center border-b border-white/30 pb-1.5 transition-colors focus-within:border-indigo-400">
                <svg
                  className="h-4 w-4 shrink-0 text-stone-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-8 border-0 bg-transparent px-3 text-sm text-white shadow-none placeholder:text-stone-300 focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="flex items-center border-b border-white/30 pb-1.5 transition-colors focus-within:border-indigo-400">
                <svg
                  className="h-4 w-4 shrink-0 text-stone-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-8 border-0 bg-transparent px-3 text-sm text-white shadow-none placeholder:text-stone-300 focus-visible:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-stone-300 transition hover:text-white"
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.5 6.2A10 10 0 0 1 22 12s-4 7-10 7a10 10 0 0 1-5.5-1.7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-center gap-2 pt-1 text-xs text-stone-200 select-none">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-white/40 accent-[#4338ca]"
              />
              <span>I accept the terms of the agreement</span>
            </label>
          </CardContent>

          <div className="flex flex-col gap-4 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-full bg-[#4338ca] text-sm font-semibold text-white shadow-md transition hover:bg-[#3730a3]"
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>

            <p className="text-center text-xs text-stone-200">
              Already have an account?{" "}
              <Link
                href={CONFIG.ROUTES.LOGIN}
                className="font-semibold text-indigo-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}