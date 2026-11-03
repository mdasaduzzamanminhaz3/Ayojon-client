
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CalendarDays,
  HeartHandshake,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const {data, error} = await authClient.signIn.email({
        email: userData.email as string,
         password: userData.password as string
        });
    if (error) {
      console.error("Login error:", error);
    } else {
      console.log("Login successful:", data);
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#f8faf8] px-5 py-12 dark:bg-[#101b16]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-emerald-800 p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-950/50 blur-3xl" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2">
              <CalendarDays size={28} />
              <span className="text-2xl font-extrabold">Ayojon</span>
            </Link>
          </div>

          <div className="relative">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <HeartHandshake size={38} />
            </div>

            <h2 className="text-4xl font-extrabold leading-tight">
              Every Event
              <br />
              Starts With
              <br />
              <span className="text-emerald-300">A Connection.</span>
            </h2>

            <p className="mt-5 max-w-sm leading-7 text-emerald-100">
              Sign in to discover exciting events, connect with people,
              and create unforgettable memories.
            </p>
          </div>

          <p className="relative text-sm text-emerald-200">
            © {new Date().getFullYear()} Ayojon. All rights reserved.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 md:hidden"
            >
              <CalendarDays size={27} />
              <span className="text-2xl font-extrabold">Ayojon</span>
            </Link>

            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to Ayojon
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Welcome back! Please enter your details to access
                your account.
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

                <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-800">
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
                    className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-800">
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="text-gray-400 transition hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-emerald-700"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Sign In
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Create an account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
