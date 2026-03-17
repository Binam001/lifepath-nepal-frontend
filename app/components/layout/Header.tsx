"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useScrollDirection } from "@/app/hooks/useScrollDirection";
import { useState } from "react";

export default function Header() {
  const isVisible = useScrollDirection();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Job Training", href: "/job-training" },
    { label: "Best Jobs", href: "/jobs" },
    { label: "Events", href: "/events" },
    // { label: "Guide Books", href: "/guide-books" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const mobileNavItems = [
    { label: "Home", href: "/" },
    { label: "Job Training", href: "/job-training" },
    { label: "Best Jobs", href: "/jobs" },
    { label: "Events", href: "/events" },
    // { label: "Guide Books", href: "/guide-books" },
    { label: "Success Stories", href: "/success-stories" },
    // { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur-2xl transition-transform duration-300 md:px-0 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="shrink-0 cursor-pointer">
            <Image
              src="/main-logo.png"
              alt="LifePath Logo"
              width={120}
              height={48}
              className="h-8 w-auto"
            />
          </Link>

          <div className="ml-6 hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <Link
              href="/personality-test"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-white"
            >
              <span
                className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-600"
                style={{ backgroundSize: "200% 100%" }}
              />
              <span className="relative z-10">Find Your Lifepath</span>
            </Link>

            {/* <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium whitespace-nowrap text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
            >
              Know Yourself
            </Link> */}
          </div>

          <button
            className="cursor-pointer rounded-full text-zinc-900 transition-colors hover:bg-zinc-100 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MenuIcon size={26} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <div className="mx-auto h-screen max-w-6xl space-y-2 py-4">
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-xl px-4 py-2 text-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/personality-test"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-full bg-blue-600 px-4 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700"
            >
              Find Your Lifepath
            </Link>
            {/* <Link
              href="/#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-full border border-blue-200 bg-blue-50 px-4 py-3 text-center text-lg font-semibold text-blue-700 hover:bg-blue-100"
            >
              Know Yourself
            </Link> */}
          </div>
        </div>
      )}
    </header>
  );
}
