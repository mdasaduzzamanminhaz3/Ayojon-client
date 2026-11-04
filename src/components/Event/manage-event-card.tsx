
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IEvent } from "@/types";
import { CalendarDays, Clock, MapPin, Pencil, Trash2 } from "lucide-react";

interface ManageEventCardProps {
  event: IEvent;
}

const ManageEventCard = ({ event }: ManageEventCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">

      {/* Event Image */}
      <div className="relative h-48 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Event Information */}
      <div className="space-y-3 p-5">

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {event.category}
          </span>

          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">
            {event.status}
          </span>
        </div>

        <h2 className="text-xl font-bold">
          {event.title}
        </h2>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays size={17} />
          <span>{event.date}</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={17} />
          <span>{event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={17} />
          <span>{event.location}</span>
        </div>


{/* Actions */}
<div className="flex gap-3 border-t border-border pt-4">

  <Link
    href={`/manage-events/edit/${event._id}`}
    className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:shadow-md dark:bg-emerald-600 dark:hover:bg-emerald-500"
  >
    <Pencil
      size={16}
      className="transition-transform duration-200 group-hover:-rotate-12"
    />
    Edit Event
  </Link>

  <button
    type="button"
    className="group flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
  >
    <Trash2
      size={16}
      className="transition-transform duration-200 group-hover:scale-110"
    />
    Delete
  </button>

</div>

      </div>
    </div>
  );
};

export default ManageEventCard;
