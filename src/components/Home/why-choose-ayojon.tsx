import {
  CalendarCheck,
  Users,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Globe,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Easy Event Discovery",
    description:
      "Find exciting events around you. Discover weddings, festivals, charity programs and social gatherings in one place.",
    icon: CalendarCheck,
  },
  {
    id: 2,
    title: "Create Your Own Events",
    description:
      "Organize your own events and invite people to join your special occasions and community activities.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Connect With People",
    description:
      "Meet new people, build meaningful connections and become part of a growing community.",
    icon: Users,
  },
  {
    id: 4,
    title: "Support Social Causes",
    description:
      "Participate in charity programs, volunteer activities and initiatives that make a positive difference.",
    icon: HeartHandshake,
  },
  {
    id: 5,
    title: "Trusted Event Information",
    description:
      "Get important event details, dates, locations and organizer information in one convenient place.",
    icon: ShieldCheck,
  },
  {
    id: 6,
    title: "Events For Everyone",
    description:
      "Explore different types of gatherings and find opportunities that match your interests.",
    icon: Globe,
  },
];

export default function WhyChooseAyojon() {
  return (
    <section className="bg-white py-20 dark:bg-[#101b16]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Why Ayojon?
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Everything You Need to Make Events Memorable
          </h2>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
            We make discovering, organizing and joining events easier.
            Bring your community closer with Ayojon.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white dark:bg-emerald-950 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                  <Icon size={27} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}