"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "../main-layout";
import {
  CalendarDays,
  MapPin,
  Search,
  Users,
  ArrowUpRight,
  PartyPopper,
  HeartHandshake,
  Music,
  GraduationCap,
  Cake,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const categories = [
  { name: "All Events", icon: Sparkles },
  { name: "Wedding", icon: HeartHandshake },
  { name: "Birthday", icon: Cake },
  { name: "Charity", icon: HeartHandshake },
  { name: "Social", icon: Users },
  { name: "Festival", icon: Music },
  { name: "Education", icon: GraduationCap },
];

const events = [
  {
    id: 1,
    title: "Annual Cultural Festival",
    category: "Festival",
    date: "December 15, 2026",
    location: "Dhaka, Bangladesh",
    attendees: 120,
    image: "/images/events/events.jpg",
    description: "Enjoy music, culture, food, and amazing performances.",
  },
  {
    id: 2,
    title: "Community Charity Program",
    category: "Charity",
    date: "December 20, 2026",
    location: "Chittagong, Bangladesh",
    attendees: 85,
    image: "/images/events/events.jpg",
    description: "Join us to support people in our community.",
  },
  {
    id: 3,
    title: "Birthday Celebration Night",
    category: "Birthday",
    date: "December 22, 2026",
    location: "Dhaka, Bangladesh",
    attendees: 45,
    image: "/images/events/events.jpg",
    description: "Celebrate a special day with friends and family.",
  },
  {
    id: 4,
    title: "Wedding Celebration",
    category: "Wedding",
    date: "December 25, 2026",
    location: "Sylhet, Bangladesh",
    attendees: 150,
    image: "/images/events/events.jpg",
    description: "A beautiful celebration filled with joyful moments.",
  },
  {
    id: 5,
    title: "Developer Community Meetup",
    category: "Social",
    date: "December 27, 2026",
    location: "Dhaka, Bangladesh",
    attendees: 65,
    image: "/images/events/events.jpg",
    description: "Meet new people and share ideas with others.",
  },
  {
    id: 6,
    title: "Creative Learning Workshop",
    category: "Education",
    date: "December 29, 2026",
    location: "Rajshahi, Bangladesh",
    attendees: 55,
    image: "/images/events/events.jpg",
    description: "Learn new skills and explore creative ideas.",
  },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All Events" ||
      event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8faf8] dark:bg-[#101813]">
        {/* Hero Section */}
        <section className="bg-emerald-950 px-5 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-white/10 px-4 py-2 text-sm text-emerald-100">
              <PartyPopper size={16} />
              Discover Amazing Experiences
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Explore Events
              <span className="block text-emerald-400">
                Find Your Next Experience
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-100/80">
              Discover exciting events around you, connect with people,
              and create unforgettable memories with Ayojon.
            </p>

            <Link
              href="/create-event"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Create an Event
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>

        {/* Main Events Section */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          {/* Section Heading */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Find Your Interest
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Choose a category to discover events you love.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-10 flex gap-3 overflow-x-auto pb-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border-emerald-800 bg-emerald-800 text-white shadow-md dark:border-emerald-600 dark:bg-emerald-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-emerald-400 hover:text-emerald-700 dark:border-gray-800 dark:bg-[#151f18] dark:text-gray-300 dark:hover:text-emerald-400"
                  }`}
                >
                  <Icon size={17} />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Search and Results Count */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedCategory}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {filteredEvents.length} events found
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-800 dark:bg-[#151f18] dark:text-white"
              />
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-[#151f18]"
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                      {event.category}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <CalendarDays
                          size={17}
                          className="text-emerald-700 dark:text-emerald-400"
                        />
                        {event.date}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin
                          size={17}
                          className="text-emerald-700 dark:text-emerald-400"
                        />
                        {event.location}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Users
                          size={17}
                          className="text-emerald-700 dark:text-emerald-400"
                        />
                        {event.attendees} interested
                      </div>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-800 hover:text-white dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                    >
                      View Details
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-700 dark:bg-[#151f18]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <Search size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                No Events Found
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                We couldn&apos;t find any events matching your search.
              </p>

              <button
                onClick={() => {
                  setSelectedCategory("All Events");
                  setSearchQuery("");
                }}
                className="mt-6 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 dark:bg-emerald-600"
              >
                Show All Events
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-7xl rounded-3xl bg-emerald-900 px-6 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Have an Event in Mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-100/80">
              Bring people together and create something memorable.
              Start organizing your event with Ayojon.
            </p>
            <Link
              href="/create-event"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Create Your Event
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}