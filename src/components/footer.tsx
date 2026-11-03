import Link from "next/link";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Heart,
} from "lucide-react";

import {
  SiFacebook,
  SiInstagram,
} from "@icons-pack/react-simple-icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Explore Events", href: "/events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Contact Us", href: "/contact" },
];

const eventLinks = [
  { label: "Social Events", href: "/events?category=social" },
  { label: "Charity Events", href: "/events?category=charity" },
  { label: "Cultural Events", href: "/events?category=cultural" },
  { label: "Birthday Events", href: "/events?category=birthday" },
  { label: "Wedding Events", href: "/events?category=wedding" },
];

const socialLinks = [
  {
    icon: SiFacebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: SiInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#101b16] text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Information */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <CalendarDays size={24} />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Ayo<span className="text-emerald-400">jon</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              Bringing people together through meaningful events.
              Discover experiences, build connections, and create
              unforgettable memories with Ayojon.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 text-gray-300 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-0 transition group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Events */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Explore Events
            </h3>

            <ul className="mt-6 space-y-4">
              {eventLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-0 transition group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Get In Touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-gray-400">
              Have questions or need help? We'd love to hear from you.
            </p>

            <ul className="mt-5 space-y-5">
              <li className="flex items-start gap-3">
                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <a
                  href="mailto:hello@ayojon.com"
                  className="text-sm text-gray-400 transition hover:text-emerald-400"
                >
                  hello@ayojon.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <a
                  href="tel:+8801000000000"
                  className="text-sm text-gray-400 transition hover:text-emerald-400"
                >
                  +880 1000-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <span className="text-sm text-gray-400">
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:gap-3"
            >
              Contact Us
              <ArrowUpRight size={17} />
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Ayojon. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <Link
              href="/privacy-policy"
              className="transition hover:text-emerald-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-emerald-400"
            >
              Terms & Conditions
            </Link>
          </div>

          <p className="inline-flex items-center gap-1.5 text-sm text-gray-500">
            Made with
            <Heart size={14} className="fill-emerald-500 text-emerald-500" />
            for the community
          </p>

        </div>
      </div>

    </footer>
  );
}