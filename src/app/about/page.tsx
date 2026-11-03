
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Users,
  HeartHandshake,
  Target,
  Eye,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description: "Find exciting events that match your interests.",
  },
  {
    icon: Users,
    title: "Connect People",
    description: "Meet new people and build meaningful connections.",
  },
  {
    icon: HeartHandshake,
    title: "Support Community",
    description: "Participate in activities that make a difference.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-[#101b16]">

      {/* Hero */}
      <section className="bg-[#f5faf6] px-6 py-20 text-center dark:bg-[#14251c]">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-900 dark:bg-gray-900 dark:text-emerald-400">
            <Sparkles size={15} />
            About Ayojon
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl">
            Bringing People
            <span className="block text-emerald-700 dark:text-emerald-400">
              Together Through Events.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
            Discover events, connect with people, and create
            unforgettable memories with Ayojon.
          </p>

          <Link
            href="/events"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Explore Events
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              More Than Just an Event Platform.
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-400">
              Ayojon is a platform designed to make discovering and
              organizing events easier. From social gatherings and
              cultural festivals to charity programs, we help people
              come together and share meaningful experiences.
            </p>
          </div>

          <div className="flex min-h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-950 p-10 text-center">
            <div>
              <HeartHandshake
                size={65}
                className="mx-auto text-emerald-200"
              />
              <h3 className="mt-5 text-2xl font-bold text-white">
                Discover. Connect. Celebrate.
              </h3>
              <p className="mt-3 text-sm text-emerald-100">
                Every event creates a new story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f5faf6] px-6 py-16 dark:bg-[#14251c]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Our Purpose
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              Mission & Vision
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-7 dark:border-emerald-900 dark:bg-gray-900">
              <Target size={30} className="text-emerald-700 dark:text-emerald-400" />
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                To make event discovery and organization simple while
                helping people build stronger community connections.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-7 dark:border-emerald-900 dark:bg-gray-900">
              <Eye size={30} className="text-emerald-700 dark:text-emerald-400" />
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                To create a welcoming platform where everyone can
                discover opportunities and create lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ayojon */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Why Ayojon
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              What Makes Us Different?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-emerald-800 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to Be Part of Our Community?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-100">
            Find your next event, meet new people, and make
            unforgettable memories with Ayojon.
          </p>

          <Link
            href="/events"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
