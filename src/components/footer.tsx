import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Heart } from "lucide-react";

import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import Image from "next/image";

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
    <footer className="bg-[#101B16] text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Information */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl border-2 border-primary/20 bg-background shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Image
                  className="h-full w-full object-cover object-center"
                  src="/images/ayojon-logo.png"
                  height={44}
                  width={44}
                  alt="Ayojon Logo"
                  priority
                />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Ayo<span className="text-rose-400">jon</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              Bringing people together through meaningful events. Discover
              experiences, build connections, and create unforgettable memories
              with Ayojon.
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 text-gray-300 transition hover:border-rose-500 hover:bg-rose-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-rose-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 opacity-0 transition group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Events */}
          <div>
            <h3 className="text-lg font-bold text-white">Explore Events</h3>

            <ul className="mt-6 space-y-4">
              {eventLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-rose-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 opacity-0 transition group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white">Get In Touch</h3>

            <p className="mt-6 text-sm leading-7 text-gray-400">
              Have questions or need help? We&apos;d love to hear from you.
            </p>

            <ul className="mt-5 space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={19} className="mt-0.5 shrink-0 text-rose-400" />
                <a
                  href="mailto:hello@ayojon.com"
                  className="text-sm text-gray-400 transition hover:text-rose-400"
                >
                  hello@ayojon.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={19} className="mt-0.5 shrink-0 text-rose-400" />
                <a
                  href="tel:+8801000000000"
                  className="text-sm text-gray-400 transition hover:text-rose-400"
                >
                  +880 1000-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-rose-400" />
                <span className="text-sm text-gray-400">Dhaka, Bangladesh</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rose-400 transition hover:gap-3"
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
              className="transition hover:text-rose-400"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-rose-400">
              Terms & Conditions
            </Link>
          </div>

          <p className="inline-flex items-center gap-1.5 text-sm text-gray-500">
            Made with
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
