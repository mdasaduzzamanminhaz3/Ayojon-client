"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { IEvent } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface EditEventModalProps {
  event: IEvent;
  onUpdated?: () => void;
}

const EditEventModal = ({ event, onUpdated }: EditEventModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];  
  const router = useRouter();
  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!event._id) {
      toast.error("Event ID not found");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const updatedEvent = {
        title: String(formData.get("title") || ""),
        category: String(formData.get("category") || ""),
        description: String(formData.get("description") || ""),
        date: String(formData.get("date") || ""),
        time: String(formData.get("time") || ""),
        location: String(formData.get("location") || ""),
        capacity: Number(formData.get("capacity")),
        image: String(formData.get("image") || "").trim(),
      };
      const token = await getTokenFromClient()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization:`Bearer ${token}`
        },
        body: JSON.stringify(updatedEvent),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to update event");
      }
      router.refresh();
      toast.success("Event updated successfully!");

      setOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error("Event update error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <div
          role="button"
          tabIndex={0}
          className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 cursor-pointer"
        >
          <Pencil
            size={16}
            className="transition-transform group-hover:-rotate-12"
          />
          Edit Event
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>

          <DialogDescription>
            Update your event information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="edit-title" className="text-sm font-medium">
              Event Title
            </label>

            <input
              id="edit-title"
              name="title"
              defaultValue={event.title}
              required
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="edit-category" className="text-sm font-medium">
              Category
            </label>

            <input
              id="edit-category"
              name="category"
              defaultValue={event.category}
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium">
              Description
            </label>

            <textarea
              id="edit-description"
              name="description"
              rows={4}
              defaultValue={event.description}
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Date and Time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="edit-date" className="text-sm font-medium">
                Date
              </label>


              <input
                id="edit-date"
                name="date"
                type="date"
                  min={today}
                defaultValue={event.date}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-time" className="text-sm font-medium">
                Time
              </label>

              <input
                id="edit-time"
                name="time"
                type="time"
                defaultValue={event.time}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Location and Capacity */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="edit-location" className="text-sm font-medium">
                Location
              </label>

              <input
                id="edit-location"
                name="location"
                defaultValue={event.location}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-capacity" className="text-sm font-medium">
                Capacity
              </label>

              <input
                id="edit-capacity"
                name="capacity"
                type="number"
                min="1"
                defaultValue={event.capacity}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Optional Image URL */}
          <div className="space-y-2">
            <label htmlFor="edit-image" className="text-sm font-medium">
              Image URL (Optional)
            </label>

            <input
              id="edit-image"
              name="image"
              type="url"
              defaultValue={typeof event.image === "string" ? event.image : ""}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventModal;
