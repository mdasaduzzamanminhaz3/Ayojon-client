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
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import UserNavDropdown from "@/components/user-nav-dropdown";

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
          {navLinks.map((link) => (
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

        {/* Desktop Right Actions */}
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
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-green-900/10 transition-colors hover:bg-green-100 dark:border-white/10 dark:hover:bg-white/10"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Authentication / User Profile */}
          {isPending ? null : user ? (
            <UserNavDropdown user={user} />
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-green-100 dark:hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#176B40] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#105532] hover:shadow-md"
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
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-green-100 dark:hover:bg-white/10"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Mobile Profile */}
          {!isPending && user && (
            <UserNavDropdown user={user} />
          )}

          {/* Mobile Menu Button */}
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

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-green-100 dark:hover:bg-white/10 ${
                  isActive(link.href) ? "text-[#23834F]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Show Login and Signup only when logged out */}
            {!isPending && !user && (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}