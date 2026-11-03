"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Router import kora holo manual redirect er jonno
import {
  ArrowRight,
  CalendarDays,
  Eye,
  EyeOff,
  HeartHandshake,
  ImagePlus,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error state rakha holo

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Age kono error thakle seta reset korbe
    
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // Password match validation
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await authClient.signUp.email({
        email: userData.email as string,
        password: userData.password as string,
        name: userData.name as string,
        image: userData.image as string,
        callbackURL: "/",
      });

      if (error) {
        // Ekhane Better Auth er error message-ti UI te show korbe (jemon: Email already exists)
        setErrorMessage(error.message || "Something went wrong during signup.");
        setLoading(false);
        return;
      }

      console.log("Signup Success:", data);
      
      // Success hole manually redirect kore dibe
      router.push("/");
      
    } catch (err ) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8f4] px-4 py-12 dark:bg-[#0d1510]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-green-200/40 blur-3xl dark:bg-green-900/20" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Brand */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <div className="rounded-xl bg-emerald-800 p-2.5 text-white dark:bg-emerald-600">
            <CalendarDays size={25} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ayojon
          </span>
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <section className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <HeartHandshake size={17} />
              Discover. Connect. Celebrate.
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white">
              Make Every
              <span className="block text-emerald-700 dark:text-emerald-400">
                Moment
              </span>
              Memorable.
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-gray-600 dark:text-gray-400">
              Create your Ayojon account and become part of a community
              where people discover events, build connections, and
              create unforgettable experiences.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                <CalendarDays size={23} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Your next experience starts here
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  One account. Endless possibilities.
                </p>
              </div>
            </div>
          </section>

          {/* Signup Card */}
          <section className="w-full">
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-9 dark:border-gray-800 dark:bg-[#151f18]">
              <div className="mb-7">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  Get Started
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Create an account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Fill in your details to join the Ayojon community.
                </p>
              </div>

              {/* Error Message Alert Box */}
              {errorMessage && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-900"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-900"
                    />
                  </div>
                </div>

                {/* Profile Image URL */}
                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Profile Image URL
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <ImagePlus
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="https://example.com/profile.jpg"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-900"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400">
                    Add a publicly accessible image URL for your profile.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-700"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 accent-emerald-700"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs leading-6 text-gray-500 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  {loading ? "Creating account..." : "Create Account"}
                  {!loading && (
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Ayojon. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}