import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IEvent } from "@/types";
import EventCard from "../Event/eventCard";


export default async function UpcomingEvents() {
  const res = await fetch("http://localhost:8000/events/upcoming");
  const events = await res.json();
  return (
    <section className="bg-white py-20 dark:bg-[#101b16]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Discover Events
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
              Explore exciting events happening around you and find
              opportunities to connect with your community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:gap-3 dark:text-emerald-400"
          >
            View All Events
            <ArrowRight size={19} />
          </Link>
        </div>

        {/* shadcn Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-7">
            {events.map((event:IEvent) => (
              <CarouselItem
                key={event.id || event._id}
                className="pl-7 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <EventCard event={event} />

              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <CarouselPrevious className="static translate-y-0 border-gray-300 text-gray-700 hover:bg-emerald-700 hover:text-white dark:border-gray-700 dark:text-white" />

            <CarouselNext className="static translate-y-0 border-gray-300 text-gray-700 hover:bg-emerald-700 hover:text-white dark:border-gray-700 dark:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}