
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Images,
} from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Winter Clothing Distribution",
    category: "Charity",
    date: "January 10, 2026",
    location: "Dhaka, Bangladesh",
    image: "/images/events/events.jpg",
  },
  {
    id: 2,
    title: "Annual Cultural Festival",
    category: "Festival",
    date: "February 15, 2026",
    location: "Chittagong, Bangladesh",
    image: "/images/events/events.jpg",
  },
  {
    id: 3,
    title: "Community Food Donation",
    category: "Volunteer",
    date: "March 05, 2026",
    location: "Sylhet, Bangladesh",
    image: "/images/events/events.jpg",
  },
  {
    id: 4,
    title: "Community Meetup",
    category: "Social",
    date: "April 12, 2026",
    location: "Dhaka, Bangladesh",
    image: "/images/events/events.jpg",
  },
  {
    id: 5,
    title: "Birthday Celebration",
    category: "Birthday",
    date: "May 20, 2026",
    location: "Rajshahi, Bangladesh",
    image: "/images/events/events.jpg",
  },
  {
    id: 6,
    title: "Wedding Celebration",
    category: "Wedding",
    date: "June 18, 2026",
    location: "Dhaka, Bangladesh",
    image: "/images/events/events.jpg",
  },
];

type PastEvent = (typeof pastEvents)[number];

function EventCard({ event }: { event: PastEvent }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group w-[280px] shrink-0 sm:w-[340px]"
    >
      <div className="relative h-[220px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[260px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="340px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          {event.category}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white">
          Completed
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="mb-1 text-xs font-medium text-emerald-300">
            Ayojon Memories
          </p>

          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-white">
            {event.title}
          </h3>
        </div>

        <span className="absolute bottom-5 right-5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-emerald-700 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </span>
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CalendarDays size={15} className="text-emerald-600" />
          {event.date}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={15} className="text-emerald-600" />
          {event.location}
        </div>
      </div>
    </Link>
  );
}

export default function PastEventsGallery() {
  return (
    <section className="overflow-hidden bg-[#f8faf8] py-20 dark:bg-[#101b16] sm:py-24">
      {/* Section Header */}
      <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Images size={16} />
            Our Memories
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Moments That
            <span className="text-emerald-700 dark:text-emerald-400">
              {" "}Bring Us Together.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">
            Every event leaves behind a beautiful memory. Take a look
            at the moments we've shared as a community.
          </p>
        </div>

        <Link
          href="/events?status=completed"
          className="group inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Explore All Events
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>

      {/* Continuous Event Marquee */}
      <div className="relative overflow-hidden">
        {/* Side Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8faf8] to-transparent dark:from-[#101b16] sm:w-24" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8faf8] to-transparent dark:from-[#101b16] sm:w-24" />

        <div className="flex w-max animate-past-events-marquee gap-7 px-4 py-3 hover:[animation-play-state:paused]">
          {[...pastEvents, ...pastEvents].map((event, index) => (
            <EventCard
              key={`${event.id}-${index}`}
              event={event}
            />
          ))}
        </div>
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
}
