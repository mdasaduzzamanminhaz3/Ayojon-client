"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/types";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const JoinEventButton = ({ event }: { event: IEvent }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
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
        image: event.image,
        title: event.title,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        joinedDate: new Date().toISOString(),
      };
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to join event");
        return;
      }
      setIsJoined(true);
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
        disabled={loading || isJoined}
        className="w-full rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Joining..." : isJoined ? "Already Joined" : "Join Event"}
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
