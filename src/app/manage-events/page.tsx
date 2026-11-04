
import React from "react";
import MainLayout from "../main-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IEvent } from "@/types";
import ManageEventCard from "@/components/Event/manage-event-card";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const ManageEvents = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  const token = await getTokenFromServer();
  const res = await fetch(
    `http://localhost:8000/my-events/${(user.email)}`,
    {headers:{
      authorization: `Bearer ${token}`
    }}
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your events");
  }

  const events: IEvent[] = await res.json();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Manage My Events
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage all the events you have created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="rounded-md bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
          >
            + Create Event
          </Link>
        </div>

        {/* Events */}
        {events.length === 0 ? (
          <div className="rounded-xl border p-10 text-center">
            <h2 className="text-xl font-semibold">
              No Events Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              You have not created any events yet.
            </p>

            <Link
              href="/create-event"
              className="mt-5 inline-block rounded-md bg-green-600 px-5 py-2 text-white"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <ManageEventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default ManageEvents;
