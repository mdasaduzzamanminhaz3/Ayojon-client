import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  UserRound,
} from "lucide-react";

import MainLayout from "../../main-layout";
import JoinEventButton from "../../../components/Event/join-event-button";
import { IEvent } from "@/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
    const jwtToken = await auth.api.getToken({
        headers:await headers(),
      });

  const response = await fetch(
    `http://localhost:8000/event/${id}`,
    {headers:{
      authorization: `Bearer ${jwtToken?.token}`
    }}
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load event details");
  }

  const event: IEvent | null = await response.json();

  if (!event) {
    notFound();
  }

  const attendeeCount = Array.isArray(event.attendees)
    ? event.attendees.length
    : event.attendees ?? 0;

  return (
    <MainLayout>
      <section className="min-h-screen bg-background py-10">
        <div className="mx-auto max-w-6xl px-4">
          {/* Event Image */}
          <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[420px]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <span className="absolute bottom-5 left-5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
              {event.category}
            </span>
          </div>

          {/* Event Information */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Discover the experience
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {event.title}
              </h1>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <CalendarDays className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <Clock className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <MapPin className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <Users className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Attendees</p>
                    <p className="font-medium">
                      {attendeeCount} / {event.capacity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-foreground">
                  About This Event
                </h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Join Event Card */}
            <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground">
                Join This Event
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Be part of this experience. Join the event and connect with
                other attendees.
              </p>

              <div className="my-6 flex items-center gap-3">
                <UserRound className="text-emerald-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Organizer</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
              </div>

              <JoinEventButton
                event={event}
              />

              <p className="mt-4 text-center text-xs text-muted-foreground">
                {attendeeCount} people have joined this event
              </p>
            </aside>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EventDetailsPage;