"use client";
import React, { useState } from "react";
import MainLayout from "../main-layout";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ImagePlus,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const categories = [
  "Wedding",
  "Birthday",
  "Charity",
  "Social Gathering",
  "Festival",
  "Education",
  "Conference",
  "Other",
];
const CreateEventPage = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const eventData = Object.fromEntries(formData.entries());
    const res = await fetch("http://localhost:8000/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    // console.log("Event Data:", data);
    setLoading(false);
  };
  return (
    <MainLayout>
      <main className="min-h-screen bg-[#f8faf8] px-4 py-12 dark:bg-[#101b16] sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/events"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Create Your Event
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
              Bring people together! Share your event details and let others
              discover and join your experience.
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
          >
            {/* Basic Information */}
            <section>
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Basic Information
              </h2>

              <div className="space-y-5">
                {/* Event Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Event Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your event name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Event Category *
                  </label>

                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Event Description *
                  </label>

                  <textarea
                    name="description"
                    rows={5}
                    required
                    placeholder="Tell people what your event is about..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-100 dark:border-gray-800" />

            {/* Date and Location */}
            <section>
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Date & Location
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Date */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <CalendarDays size={17} className="text-emerald-700" />
                    Event Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock size={17} className="text-emerald-700" />
                    Event Time *
                  </label>

                  <input
                    type="time"
                    name="time"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <MapPin size={17} className="text-emerald-700" />
                    Event Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Enter event venue or address"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Capacity */}
                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Users size={17} className="text-emerald-700" />
                    Maximum Attendees *
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    required
                    placeholder="e.g. 100"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-100 dark:border-gray-800" />

            {/* Cover Image */}
            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Event Cover Image
              </h2>

              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                Upload an attractive image to make your event stand out.
              </p>

              <label
                htmlFor="image"
                className="flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-center transition hover:border-emerald-600 hover:bg-emerald-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-emerald-950/20"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    width={600}
                    height={400}
                    alt="Event preview"
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <ImagePlus size={27} />
                    </div>

                    <p className="font-semibold text-gray-800 dark:text-white">
                      Click to upload an image
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      PNG, JPG or WEBP
                    </p>
                  </>
                )}

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </section>

            {/* Submit */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 dark:border-gray-800 sm:flex-row sm:justify-end">
              <Link
                href="/events"
                className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-8 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {loading ? "Creating Event..." : "Create Event"}
                {!loading && <Sparkles size={17} />}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Make every gathering memorable with Ayojon.
          </p>
        </div>
      </main>
    </MainLayout>
  );
};

export default CreateEventPage;
