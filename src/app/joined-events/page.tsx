import MainLayout from "../main-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import JoinedEventCard from "@/components/Event/joined-event-card";
import { IJoinedEvent } from "@/types";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const JoinedEvents = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  let joined: IJoinedEvent[] = [];

  try {
    const token = await getTokenFromServer();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch joined events");
    }

    const data = await res.json();
    joined = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Joined events error:", error);
  }

  return (
    <MainLayout>
      <section className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="font-semibold uppercase tracking-wider text-rose-600">
              Your Activities
            </p>

            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              My Joined Events
            </h1>

            <p className="mt-3 text-muted-foreground">
              All the events you have joined are collected here.
            </p>
          </div>

          {joined.length > 0 ? (
            <>
              <p className="mb-5 text-sm text-muted-foreground">
                You have joined {joined.length}{" "}
                {joined.length === 1 ? "event" : "events"}.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {joined.map((event) => (
                  <JoinedEventCard
                    key={event._id || event.eventId}
                    event={event}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                No joined events yet!
              </h2>

              <p className="mt-2 text-muted-foreground">
                Explore upcoming events and join something exciting.
              </p>

              <Link
                href={"/events"}
                className="mt-6 inline-block rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"
              >
                Explore Events
              </Link>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default JoinedEvents;
