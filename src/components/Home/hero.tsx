"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7faf7] py-16 dark:bg-[#101B16] lg:py-24">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl dark:bg-rose-500/10" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl dark:bg-rose-500/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left content */}
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Discover. Connect. Celebrate.
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Bring People
            <span className="block text-rose-700 dark:text-rose-400">
              Together
            </span>
            Through Every Event.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg">
            Discover amazing events, create memorable gatherings, and connect
            with people who share your interests. Every occasion starts with
            Ayojon.
          </p>

          {/* Action buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-700 px-7 py-4 font-semibold text-white shadow-lg shadow-rose-700/20 transition hover:-translate-y-1 hover:bg-rose-800"
            >
              Explore Events
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-800 transition hover:-translate-y-1 hover:border-rose-600 hover:text-rose-700 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-rose-500 dark:hover:text-rose-400"
            >
              Create an Event
            </Link>
          </div>

          {/* Small stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-200 pt-7 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <CalendarDays size={19} />
                <span className="text-xl font-bold">Events</span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Every occasion
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <Users size={19} />
                <span className="text-xl font-bold">People</span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Build connections
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <MapPin size={19} />
                <span className="text-xl font-bold">Places</span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Find gatherings
              </p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-rose-200/50 dark:bg-rose-900/30" />

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src="/images/hero-event.jpg"
              alt="People enjoying a community event together"
              width={800}
              height={900}
              priority
              className="h-[400px] w-full object-cover sm:h-[500px]"
            />

            {/* Floating event card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:bg-gray-900/90">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                    COMMUNITY & CONNECTION
                  </p>
                  <h3 className="mt-1 font-bold text-gray-900 dark:text-white">
                    Make Every Moment Count
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Find your next memorable gathering.
                  </p>
                </div>
                <div className="rounded-xl bg-rose-100 p-3 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                  <Users size={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
