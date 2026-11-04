"use client";

import { useState } from "react";
import {
  Search,
  Users,
  HeartHandshake,
  Music,
  GraduationCap,
  Cake,
  Sparkles,
  CalendarDays,
  BriefcaseBusiness,
  Trophy,
  Gift,
  BookOpen,
  Presentation,
  Gem,
  HandHeart,
} from "lucide-react";

import EventCard from "@/components/Event/eventCard";
import { ICategory, IEvent } from "@/types";

interface EventsClientProps {
  categories: ICategory[];
  events: IEvent[];
}

const iconMap: Record<string, React.ElementType> = {
  Heart: HeartHandshake,
  Cake,
  Gift,
  Gem,
  Users,
  Music,
  GraduationCap,
  BookOpen,
  Presentation,
  Trophy,
  HandHeart,
  BriefcaseBusiness,
  CalendarDays,
};

export default function EventsClient({
  categories,
  events,
}: EventsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All Events" || event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#101813]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        {/* Heading */}
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
          <button
            onClick={() => setSelectedCategory("All Events")}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
              selectedCategory === "All Events"
                ? "border-emerald-800 bg-emerald-800 text-white"
                : "border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-[#151f18] dark:text-gray-300"
            }`}
          >
            <Sparkles size={17} />
            All Events
          </button>

          {categories.map((category) => {
            const Icon = iconMap[category.icon || ""] || Sparkles;
            const isActive = selectedCategory === category.name;

            return (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-emerald-400 dark:border-gray-800 dark:bg-[#151f18] dark:text-gray-300"
                }`}
              >
                <Icon size={17} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
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
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none focus:border-emerald-600 dark:border-gray-800 dark:bg-[#151f18] dark:text-white"
            />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        ) : (
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
              className="mt-6 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
            >
              Show All Events
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
