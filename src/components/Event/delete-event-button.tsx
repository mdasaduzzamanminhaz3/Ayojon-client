
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteEventButtonProps {
  eventId: string;
}

const DeleteEventButton = ({ eventId }: DeleteEventButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/event/${eventId}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          result?.message || "Failed to delete event"
        );
      }

      toast.success("Event deleted successfully!");

      // Server Component-এর data আবার fetch করবে।
      router.refresh();

    } catch (error) {
      console.error("Delete event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
 <AlertDialog>
    <AlertDialogTrigger
      className="group flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
    >
      <Trash2 size={16} />
      Delete
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you absolutely sure?
        </AlertDialogTitle>

        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this event.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel disabled={loading}>
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

export default DeleteEventButton;
