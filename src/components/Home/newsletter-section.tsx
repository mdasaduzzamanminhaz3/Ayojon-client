"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // TODO: Connect your newsletter API here.
    setIsSubscribed(true);
    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-white px-6 py-12 dark:bg-[#101B16] sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-rose-800 px-6 py-9 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full bg-rose-500/30 blur-3xl" />

          {/* Text */}
          <div className="relative max-w-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300">
              Stay Connected
            </span>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Get Event Updates in Your Inbox
            </h2>

            <p className="mt-2 text-sm leading-6 text-rose-100/80">
              Subscribe to discover exciting events and community updates.
            </p>
          </div>

          {/* Form */}
          <div className="relative mt-6 w-full lg:mt-0 lg:max-w-md">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2 rounded-xl bg-white p-2 sm:flex-row"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Mail size={18} className="shrink-0 text-rose-700" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                    setIsSubscribed(false);
                  }}
                  placeholder="Your email address"
                  aria-label="Email address"
                  required
                  className="h-11 w-full min-w-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubscribed}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-rose-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-900 disabled:opacity-70"
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
                {isSubscribed ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <ArrowRight size={17} />
                )}
              </button>
            </form>

            {message && (
              <p
                role="status"
                className={`mt-2 text-xs ${
                  isSubscribed ? "text-rose-200" : "text-red-200"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
