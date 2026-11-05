"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";

import PastEventCard from "./past-event-card";

interface IPastEvent {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image?: string;
  status: string;
}

const PastEventsGallery = () => {
  const [pastEvents, setPastEvents] = useState<IPastEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/past`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch past events");
        }

        const data: IPastEvent[] = await res.json();

        setPastEvents(data);
      } catch (error) {
        console.error("Past events fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  return (
    <section className="overflow-hidden bg-[#f8faf8] py-20 dark:bg-[#101B16] sm:py-24">
      {/* Section Header */}
      <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
            <Images size={16} />
            Our Memories
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Moments That
            <span className="text-rose-700 dark:text-rose-400">
              {" "}
              Bring Us Together.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">
            Every event leaves behind a beautiful memory. Take a look at the
            moments we&apos;ve shared as a community.
          </p>
        </div>

        <Link
          href="/events?status=completed"
          className="group inline-flex w-fit items-center gap-2 rounded-xl bg-rose-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-500"
        >
          Explore All Events
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>

      {/* Events Marquee */}
      <div className="relative overflow-hidden">
        {/* Side Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8faf8] to-transparent dark:from-[#101B16] sm:w-24" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8faf8] to-transparent dark:from-[#101B16] sm:w-24" />

        {loading ? (
          <p className="py-12 text-center text-muted-foreground">
            Loading past events...
          </p>
        ) : pastEvents.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No past events available yet.
          </p>
        ) : (
          <div className="flex w-max animate-past-events-marquee gap-7 px-4 py-3 hover:[animation-play-state:paused]">
            {[...pastEvents, ...pastEvents].map((event, index) => (
              <PastEventCard key={`${event._id}-${index}`} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Label */}
      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-center gap-3 px-6">
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />

        <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Memories Worth Sharing
        </p>

        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>
    </section>
  );
};

export default PastEventsGallery;
