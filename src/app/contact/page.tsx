"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import MainLayout from "../main-layout";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team is ready to help.",
    value: "hello@ayojon.com",
    href: "mailto:hello@ayojon.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Talk to our support team.",
    value: "+880 1000-000000",
    href: "tel:+8801000000000",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Visit our office.",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka+Bangladesh",
  },
];

const faqs = [
  {
    question: "How can I create an event on Ayojon?",
    answer:
      "Create an account, sign in, and visit the Create Event page to start organizing your event.",
  },
  {
    question: "How can I join an event?",
    answer:
      "Explore available events, open an event details page, and use the Join Event option.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can contact our team through the contact form or send us an email.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log("Contact Form Data:", formData);
    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <MainLayout>
      <div className="bg-[#f8faf8] dark:bg-[#2a1b1e]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-rose-950 px-5 py-20 text-white sm:py-24">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-rose-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-white/10 px-4 py-2 text-sm text-rose-100">
              <MessageCircle size={16} />
              We&apos;re Here to Help
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get in Touch
              <span className="block text-rose-400">With Our Team</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-rose-100/80 sm:text-lg">
              Have a question, suggestion, or need assistance? We&apos;d love to
              hear from you. Let&apos;s make something amazing happen together.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-rose-100">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                We&apos;re happy to help
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <CalendarDays size={16} />
                Every event matters
              </span>
            </div>
          </div>
        </section>

        {/* Contact Information + Form */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Contact Information */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                Contact Information
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Let&apos;s start a conversation.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-gray-600 dark:text-gray-400">
                Whether you&apos;re organizing an event or looking for something
                exciting to attend, we&apos;re here to support you.
              </p>

              <div className="mt-9 space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={
                        item.title === "Our Location" ? "_blank" : undefined
                      }
                      rel={
                        item.title === "Our Location" ? "noreferrer" : undefined
                      }
                      className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg dark:border-gray-800 dark:bg-[#151f18]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-rose-700 group-hover:underline dark:text-rose-400">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl bg-rose-900 p-6 text-white dark:bg-rose-950">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-3">
                    <HeartHandshakeIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold">We&apos;re all ears!</h3>
                    <p className="mt-1 text-sm text-rose-100">
                      Your feedback helps us improve Ayojon.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-9 dark:border-gray-800 dark:bg-[#151f18]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Fill out the form below and we&apos;ll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-rose-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-rose-900 focus:outline-none focus:ring-4 focus:ring-rose-600/20 dark:bg-rose-600 dark:hover:bg-rose-500"
                >
                  Send Message
                  <Send
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-gray-200 bg-white px-5 py-20 dark:border-gray-800 dark:bg-[#151f18]">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Here are some quick answers to common questions.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-200 bg-[#f8faf8] p-5 open:border-rose-300 dark:border-gray-800 dark:bg-gray-900"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                    <span className="text-xl text-rose-700 transition-transform group-open:rotate-45 dark:text-rose-400">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700 hover:underline dark:text-rose-400"
              >
                Explore Events
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function HeartHandshakeIcon() {
  return <MessageCircle size={23} />;
}
