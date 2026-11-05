import React from "react";
import Image from "next/image";
import { IEvent } from "@/types";
import { CalendarDays, Clock, MapPin, Trash2 } from "lucide-react";
import EditEventModal from "./edit-event-modal";
import DeleteEventButton from "./delete-event-button";

interface ManageEventCardProps {
  event: IEvent;
}

const ManageEventCard = ({ event }: ManageEventCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">
      {/* Event Image - Added `relative h-48 w-full` */}
      <div className="relative h-48 w-full">
        <Image
          src={
            event.image && event.image.trim() !== ""
              ? event.image
              : "/placeholder.png"
          }
          alt={event.title}
          fill
          className="object-cover" // Image overflow/stretch fix korar jonno eta khub dorkari
        />
      </div>

      {/* Event Information */}
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
            {event.category}
          </span>

          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">
            {event.status}
          </span>
        </div>

        <h2 className="text-xl font-bold">{event.title}</h2>

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
          <EditEventModal event={event} />

          <DeleteEventButton eventId={event._id || event.id} />
        </div>
      </div>
    </div>
  );
};

export default ManageEventCard;
