"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(
          error.message || "Invalid email or password. Please try again.",
        );
        return;
      }
      toast.success('Login successful!')
      setSuccessMessage("Login successful! Redirecting...");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#f8faf8] px-5 py-12 dark:bg-[#101B16]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-rose-800 p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-rose-950/50 blur-3xl" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl border-2 border-primary/20 bg-background shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Image
                  className="h-full w-full object-cover object-center"
                  src="/images/ayojon-logo.png"
                  height={44}
                  width={44}
                  alt="Ayojon Logo"
                  priority
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Ayo<span className="text-rose-400">jon</span>
              </span>
            </Link>
          </div>

          <div className="relative">

            <h2 className="text-4xl font-extrabold leading-tight">
              Every Event
              <br />
              Starts With
              <br />
              <span className="text-rose-300">A Connection.</span>
            </h2>

            <p className="mt-5 max-w-sm leading-7 text-rose-100">
              Sign in to discover exciting events, connect with people, and
              create unforgettable memories.
            </p>
          </div>

          <p className="relative text-sm text-rose-200">
            © {new Date().getFullYear()} Ayojon. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-rose-700 dark:text-rose-400 md:hidden"
            >
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border-2 border-primary/20 bg-background shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Image
                  className="h-full w-full object-cover object-center"
                  src="/images/ayojon-logo.png"
                  height={44}
                  width={44}
                  alt="Ayojon Logo"
                  priority
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Ayo<span className="text-rose-400">jon</span>
              </span>
            </Link>

            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to Ayojon
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Welcome back! Please enter your details to access your account.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-rose-600 focus-within:ring-2 focus-within:ring-rose-600/10 dark:border-gray-700 dark:bg-gray-800">
                  <Mail size={18} className="text-gray-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="h-full w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-rose-700 hover:underline dark:text-rose-400"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-rose-600 focus-within:ring-2 focus-within:ring-rose-600/10 dark:border-gray-700 dark:bg-gray-800">
                  <Lock size={18} className="text-gray-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="h-full w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-gray-400 transition hover:text-rose-700 dark:hover:text-rose-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>


              {/* Error Message */}
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <p>{successMessage}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-700 font-semibold text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-rose-700 hover:underline dark:text-rose-400"
              >
                Create an account
              </Link>
            </p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99]"
            >
              <FcGoogle />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
