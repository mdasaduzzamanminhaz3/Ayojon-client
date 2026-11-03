
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Leaf,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ChevronDown,
  CalendarDays,
  HeartHandshake,
  Users,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Contact", href: "/contact" },
];

const eventLinks = [
  { name: "Explore Events", href: "/events", icon: CalendarDays },
  { name: "Charity Events", href: "/events?category=charity", icon: HeartHandshake },
  { name: "Social Events", href: "/events?category=social", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [eventMenu, setEventMenu] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-900/10 bg-[#FAFBF6]/95 text-[#172C20] backdrop-blur-xl dark:border-white/10 dark:bg-[#101B15]/95 dark:text-white">

      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#167344] text-white">
            <Leaf size={23} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight">
            Ayojon<span className="text-[#23834F]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">

          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-[#23834F] ${
                isActive(link.href) ? "text-[#23834F]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Events Dropdown */}
          <div className="relative">
            <button
              onClick={() => setEventMenu(!eventMenu)}
              className="flex items-center gap-1 text-sm font-semibold transition-colors hover:text-[#23834F]"
            >
              Events
              <ChevronDown
                size={16}
                className={`transition-transform ${eventMenu ? "rotate-180" : ""}`}
              />
            </button>

            {eventMenu && (
              <div className="absolute left-0 top-10 w-56 rounded-xl border border-green-900/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#1B2A21]">

                {eventLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setEventMenu(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-green-50 hover:text-[#23834F] dark:hover:bg-white/10"
                    >
                      <Icon size={17} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-[#23834F] ${
                isActive(link.href) ? "text-[#23834F]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Search */}
          <Link
            href="/events"
            aria-label="Search events"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-green-100 dark:hover:bg-white/10"
          >
            <Search size={19} />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-green-900/10 transition-colors hover:bg-green-100 dark:border-white/10 dark:hover:bg-white/10"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Login */}
          <Link
            href="/signin"
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-green-100 dark:hover:bg-white/10"
          >
            Login
          </Link>

          {/* Signup */}
          <Link
            href="/signup"
            className="rounded-full bg-[#176B40] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#105532] hover:shadow-md"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-green-100 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-green-100 dark:hover:bg-white/10"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenu && (
        <div className="border-t border-green-900/10 bg-[#FAFBF6] px-5 py-5 dark:border-white/10 dark:bg-[#101B15] lg:hidden">

          <div className="flex flex-col gap-2">

            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-green-100 dark:hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => setEventMenu(!eventMenu)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold hover:bg-green-100 dark:hover:bg-white/10"
            >
              Events
              <ChevronDown
                size={17}
                className={`transition-transform ${eventMenu ? "rotate-180" : ""}`}
              />
            </button>

            {eventMenu && (
              <div className="ml-4 flex flex-col gap-1 border-l-2 border-green-200 pl-3 dark:border-green-800">
                {eventLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setMobileMenu(false);
                      setEventMenu(false);
                    }}
                    className="rounded-lg px-3 py-2.5 text-sm hover:bg-green-100 dark:hover:bg-white/10"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-green-100 dark:hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-green-900/10 dark:border-white/10" />

            <Link
              href="/signin"
              onClick={() => setMobileMenu(false)}
              className="rounded-full border border-green-800 px-5 py-3 text-center text-sm font-semibold text-[#176B40] dark:border-green-400 dark:text-green-400"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileMenu(false)}
              className="rounded-full bg-[#176B40] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#105532]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
