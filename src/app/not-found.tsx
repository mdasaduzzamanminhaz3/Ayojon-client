
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Compass,
  Home,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-rose-50 px-5 py-16 dark:bg-[#110d10]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl dark:bg-rose-950/30" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-pink-200/50 blur-3xl dark:bg-pink-950/20" />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Logo / Brand */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-rose-700 dark:text-rose-500"
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

              <span className="text-2xl font-extrabold tracking-tight text-gray-800">
                Ayo<span className="text-rose-400">jon</span>
              </span>
        </Link>

        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center">

          <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-300 dark:border-rose-900" />

          <div className="flex h-36 w-36 rotate-[-8deg] items-center justify-center rounded-[2rem] border border-rose-200 bg-white shadow-2xl shadow-rose-700/10 dark:border-rose-900 dark:bg-[#21151c]">
            <PartyPopper
              size={76}
              strokeWidth={1.5}
              className="text-rose-700 dark:text-rose-400"
            />
          </div>

          <Sparkles
            size={28}
            className="absolute right-0 top-5 text-rose-500"
          />

          <Sparkles
            size={20}
            className="absolute bottom-5 left-0 text-pink-500"
          />

          <span className="absolute -right-3 bottom-7 rounded-full bg-rose-700 px-3 py-1 text-xs font-bold text-white shadow-lg">
            Oops!
          </span>
        </div>

        {/* 404 Number */}
        <h1 className="text-8xl font-black tracking-tighter text-rose-700 sm:text-9xl dark:text-rose-500">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
          Looks like this event has ended or the page you&apos;re looking for
          doesn&apos;t exist. Let&apos;s get you back to something amazing!
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-700/20 transition hover:-translate-y-1 hover:bg-rose-800 sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-7 py-3.5 text-sm font-semibold text-rose-700 transition hover:-translate-y-1 hover:border-rose-700 hover:bg-rose-50 sm:w-auto dark:border-rose-900 dark:bg-[#21151c] dark:text-rose-400 dark:hover:bg-rose-950/40"
          >
            Explore Events
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="mt-14 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <Compass size={16} className="text-rose-600" />
          <span>Every great memory starts with Ayojon.</span>
        </div>

      </div>
    </main>
  );
}
