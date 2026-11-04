"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const JoinEventButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoinEvent = async () => {
    if (!session?.user) {
      router.push("/signin");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `http://localhost:8000/event/${eventId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not join the event");
      }

      setMessage(result.message || "You joined the event successfully!");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
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