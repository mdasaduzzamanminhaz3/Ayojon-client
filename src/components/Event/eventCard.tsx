import { IEvent } from '@/types';
import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EventCard = ({ event }: { event: IEvent }) => {
    
  return (
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
                      href={`/events/${event._id || event.id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-700 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                    >
                      View Event
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
    );
};

export default EventCard;