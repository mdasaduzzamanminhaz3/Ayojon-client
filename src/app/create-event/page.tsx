"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../main-layout";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ICategory {
  _id: string;
  name: string;
}

const CreateEventPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/categories");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Category fetching error:", error);
        toast.error("Could not load categories");
      }
    };

    fetchCategories();
  }, []);

  // Handle event submission
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to create an event");
      router.push("/signin");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const eventData = {
        title: formData.get("title"),
        category: formData.get("category"),
        description: formData.get("description"),
        date: formData.get("date"),
        time: formData.get("time"),
        location: formData.get("location"),
        capacity: Number(formData.get("capacity")),
        image: imageUrl.trim(),
        organizer: user.name,
        organizerEmail: user.email,
        createdAt: new Date(),
        status: "upcoming",
      };
       const {data,error} = await authClient.token();
      const token = data?.token;

      const res = await fetch("http://localhost:8000/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message || "Failed to create event"
        );
      }

      toast.success("Event created successfully!");

      router.push("/manage-events");
      router.refresh();
    } catch (error) {
      console.error("Event creation error:", error);

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
    <MainLayout>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Create Your Event
            </h1>

            <p className="mt-3 text-muted-foreground">
              Share your event with people and make something memorable.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >

            {/* Event Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold"
              >
                Event Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter event title"
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-semibold"
              >
                Event Category
              </label>

              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
              >
                <option value="" disabled>
                  Select a category
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-semibold"
              >
                Event Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe your event..."
                required
                className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Date and Time */}
            <div className="grid gap-6 md:grid-cols-2">

              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-sm font-semibold"
                >
                  Event Date
                </label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  min={today}
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="text-sm font-semibold"
                >
                  Event Time
                </label>

                <input
                  id="time"
                  type="time"
                  name="time"
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
                />
              </div>

            </div>

            {/* Location and Capacity */}
            <div className="grid gap-6 md:grid-cols-2">

              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-sm font-semibold"
                >
                  Event Location
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Enter event location"
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="capacity"
                  className="text-sm font-semibold"
                >
                  Event Capacity
                </label>

                <input
                  id="capacity"
                  type="number"
                  name="capacity"
                  min="1"
                  placeholder="Enter maximum attendees"
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
                />
              </div>

            </div>

            {/* Optional Image URL */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-semibold"
              >
                Event Cover Image
                <span className="ml-2 font-normal text-muted-foreground">
                  (Optional)
                </span>
              </label>

              <input
                id="image"
                type="url"
                name="image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/event-image.jpg"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-600"
              />

              <p className="text-xs text-muted-foreground">
                Add an image URL if you want to display a cover image.
              </p>
            </div>

            {/* Organizer Information */}
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-semibold">
                Event Organizer
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {user?.name || "Loading..."}
              </p>

              <p className="text-sm text-muted-foreground">
                {user?.email || ""}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !user}
              className="w-full rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEventPage;
