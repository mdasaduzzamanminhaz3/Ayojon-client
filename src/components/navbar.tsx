"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Search } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import UserNavDropdown from "@/components/user-nav-dropdown";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mobileMenu, setMobileMenu] = useState(false);

  // Get current logged-in user
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-900/10 bg-[#FAFBF6]/95 text-[#172C20] backdrop-blur-xl dark:border-white/10 dark:bg-[#101B15]/95 dark:text-white">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-primary/20 bg-background shadow-xs transition-transform duration-300 group-hover:scale-105">
            <Image
              className="h-full w-full object-cover object-center"
              src="/images/ayojon-logo.png"
              height={44}
              width={44}
              alt="Ayojon Logo"
              priority
            />
          </div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-800">
                Ayo<span className="text-rose-400">jon</span>
              </span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-rose-600 ${
                isActive(link.href) ? "text-rose-600" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Search */}
          <Link
            href="/events"
            aria-label="Search events"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-rose-100 dark:hover:bg-white/10"
          >
            <Search size={19} />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-900/10 transition-colors hover:bg-rose-100 dark:border-white/10 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Authentication / User Profile */}
          {isPending ? null : user ? (
            <UserNavDropdown user={user} />
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-rose-100 dark:hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-rose-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-600 hover:shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-rose-100 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Mobile Profile */}
          {!isPending && user && <UserNavDropdown user={user} />}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-rose-100 dark:hover:bg-white/10"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenu && (
        <div className="border-t border-rose-900/10 bg-[#FAFBF6] px-5 py-5 dark:border-white/10 dark:bg-[#101B15] lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-rose-100 dark:hover:bg-white/10 ${
                  isActive(link.href) ? "text-rose-600" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Show Login and Signup only when logged out */}
            {!isPending && !user && (
              <>
                <div className="my-2 border-t border-rose-900/10 dark:border-white/10" />

                <Link
                  href="/signin"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-full border border-rose-800 px-5 py-3 text-center text-sm font-semibold text-rose-700 dark:border-rose-400 dark:text-rose-400"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-full bg-rose-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
