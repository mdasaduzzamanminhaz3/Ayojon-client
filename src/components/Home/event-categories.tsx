import Link from "next/link";
import {
  Heart,
  Cake,
  HandHeart,
  Users,
  Music,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Wedding",
    description: "Celebrate love and special moments.",
    icon: Heart,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
    slug: "wedding",
  },
  {
    id: 2,
    name: "Birthday",
    description: "Make birthdays more memorable.",
    icon: Cake,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    slug: "birthday",
  },
  {
    id: 3,
    name: "Charity",
    description: "Make a positive impact together.",
    icon: HandHeart,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    slug: "charity",
  },
  {
    id: 4,
    name: "Social Gathering",
    description: "Connect with your community.",
    icon: Users,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    slug: "social",
  },
  {
    id: 5,
    name: "Festival",
    description: "Enjoy culture, music and celebration.",
    icon: Music,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    slug: "festival",
  },
  {
    id: 6,
    name: "Education",
    description: "Learn, share and grow together.",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    slug: "education",
  },
];

export default function EventCategories() {
  return (
    <section className="bg-[#f7faf7] py-20 dark:bg-[#142019]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Explore Categories
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Find Events That Match Your Interest
          </h2>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
            From personal celebrations to community activities,
            discover events for every occasion.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={`/events?category=${category.slug}`}
                key={category.id}
                className="group flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800"
              >
                <div className={`rounded-2xl p-4 ${category.color}`}>
                  <Icon size={28} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>

                    <ArrowUpRight
                      size={20}
                      className="text-gray-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-600"
                    />
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}