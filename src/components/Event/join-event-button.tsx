"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/types";
import { toast } from "sonner";

const JoinEventButton = ({ event }:{event:IEvent}) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const handleJoinEvent = async () => {
  if (!user) {
    router.push("/signin");
    return;
  }

  try {
    setLoading(true);
    setMessage("");

    const data = {
      eventId: event._id,
      username: user.name,
      email: user.email,
      image: user.image,
      title: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      joinedDate: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:8000/join-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message || "Failed to join event");
      return;
    }

    toast.success("Event joined successfully!", {
      description: "You have successfully joined this event.",
    });

    router.refresh();

  } catch (error) {
    console.error(error);

    toast.error("Something went wrong!", {
      description: "Please try again later.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <button
        onClick={handleJoinEvent}
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Joining..." : "Join Event"}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
};

export default JoinEventButton;