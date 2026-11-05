"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, XCircle } from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface IJoinedEvent {
  _id?: string;
  eventId: string;
  title: string;
  category: string;
  image: string;
  date: string;
  time: string;
  location: string;
  joinedDate: string;
}

const JoinedEventCard = ({ event }: { event: IJoinedEvent }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log("Event image:", event.image);
  const handleCancel = async () => {
    try {
      setLoading(true);
      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Could not cancel this event");
        return;
      }

      toast.success("Event cancelled successfully!");
      router.refresh();
    } catch (error) {
      console.error("Cancel event error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative h-52">
        <Image
          src={event?.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />

        <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
          {event.category}
        </span>
      </div>

      <div className="p-5">
        <h2 className="line-clamp-1 text-xl font-bold text-foreground">
          {event.title}
        </h2>

        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="text-rose-600" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={17} className="text-rose-600" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="text-rose-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Joined on: {new Date(event.joinedDate).toLocaleDateString()}
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/events/${event.eventId}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            View Event
          </Link>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950"
          >
            <XCircle size={16} />
            {loading ? "Cancelling..." : "Cancel"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default JoinedEventCard;
