import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const events = [
  {
    id: 1,
    title: "Community Charity Program",
    category: "Charity",
    date: "December 15, 2026",
    location: "Dhaka, Bangladesh",
    attendees: "120+",
    image: "/images/events/events.jpg",
  },
  {
    id: 2,
    title: "Annual Cultural Festival",
    category: "Festival",
    date: "December 20, 2026",
    location: "Chittagong, Bangladesh",
    attendees: "250+",
    image: "/images/events/events.jpg",
  },
  {
    id: 3,
    title: "Community Networking Meetup",
    category: "Social",
    date: "December 25, 2026",
    location: "Sylhet, Bangladesh",
    attendees: "80+",
    image: "/images/events/events.jpg",
  },
  {
    id: 4,
    title: "Wedding Celebration",
    category: "Wedding",
    date: "December 28, 2026",
    location: "Dhaka, Bangladesh",
    attendees: "300+",
    image: "/images/events/events.jpg",
  },
  {
    id: 5,
    title: "Birthday Celebration",
    category: "Birthday",
    date: "January 05, 2027",
    location: "Rajshahi, Bangladesh",
    attendees: "90+",
    image: "/images/events/events.jpg",
  },
];

export default function UpcomingEvents() {
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
            {events.map((event) => (
              <CarouselItem
                key={event.id}
                className="pl-7 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">

                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white">
                      {event.category}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                      {event.title}
                    </h3>

                    <div className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                      <p className="flex items-center gap-3">
                        <CalendarDays size={17} className="shrink-0 text-emerald-600" />
                        {event.date}
                      </p>

                      <p className="flex items-center gap-3">
                        <MapPin size={17} className="shrink-0 text-emerald-600" />
                        {event.location}
                      </p>

                      <p className="flex items-center gap-3">
                        <Users size={17} className="shrink-0 text-emerald-600" />
                        {event.attendees} Interested
                      </p>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-700 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                    >
                      View Event
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
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