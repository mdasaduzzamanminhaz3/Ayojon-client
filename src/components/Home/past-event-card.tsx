import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

interface IPastEvent {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image?: string;
  status: string;
}

interface PastEventCardProps {
  event: IPastEvent;
}

const PastEventCard = ({ event }: PastEventCardProps) => {
  const imageUrl =
    typeof event.image === "string" && event.image.trim() !== ""
      ? event.image
      : "/images/events/events.jpg";

  const formattedDate = new Date(
    `${event.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <Link
      href={`/events/${event._id}`}
      className="group w-[280px] shrink-0 sm:w-[340px]"
    >
      <div className="relative h-[220px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[260px]">
        <Image
          src={imageUrl}
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
          {formattedDate}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={15} className="text-emerald-600" />
          {event.location}
        </div>
      </div>
    </Link>
  );
};

export default PastEventCard;