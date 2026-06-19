"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Button from "../shared/Button";
import "next-google-translate-widget/styles";
import GoogleTranslate from "next-google-translate-widget";
import ProfileDropdown from "./ProfileDropdown";
import OrderItemCount from "../shared/OrderItemCount";

const myLanguages = [
  { label: "English", value: "en", flag: "us" },
  { label: "नेपाली", value: "ne", flag: "np" },
];

function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return isVisible;
}

export default function Header() {
  const isVisible = useScrollDirection();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#profile-dropdown-container") &&
        !target.closest("#profile-dropdown-container-mobile")
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  const navItems = [
    { label: "Home", nepaliLabel: "होम", href: "/" },
    // { label: "Job Training", nepaliLabel: "रोजगार तालिम", href: "/job-training" },
    { label: "Future", nepaliLabel: "भविष्य", href: "/future" },
    { label: "Career", nepaliLabel: "करियर", href: "/jobs" },
    { label: "Events", nepaliLabel: "कार्यक्रमहरू", href: "/events" },
    { label: "Roadmap", nepaliLabel: "रोडम्याप", href: "/roadmap" },
    // { label: "Guide Books", nepaliLabel: "निर्देशिका पुस्तकहरू", href: "/guide-books" },
    { label: "Courses", nepaliLabel: "पाठ्यक्रमहरू", href: "/job-training" },
    // { label: "Reviews", nepaliLabel: "प्रतिक्रियाहरू", href: "/reviews" },
    { label: "Books", nepaliLabel: "पुस्तकहरू", href: "/books" },
    { label: "Help", nepaliLabel: "मद्दत", href: "/support" },
    { label: "Grow", nepaliLabel: "प्रगति", href: "/grow" },
    { label: "Contact", nepaliLabel: "सम्पर्क", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 px-4 md:px-8 backdrop-blur-2xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <style>{`
        .english-label {
          display: inline !important;
        }
        .nepali-label {
          display: none !important;
        }
        html[lang="ne"] .english-label,
        html.translated-ltr .english-label,
        html.translated-rtl .english-label {
          display: none !important;
        }
        html[lang="ne"] .nepali-label,
        html.translated-ltr .nepali-label,
        html.translated-rtl .nepali-label {
          display: inline !important;
        }
      `}</style>
      <nav className="max-w-7xl mx-auto">
        <div className="relative flex h-16 items-center justify-between gap-3">
          {/* Profile Dropdown Container (Mobile/Tablet) */}
          <div
            id="profile-dropdown-container-mobile"
            className={`relative flex items-center xl:hidden ${isProfileOpen ? "z-50" : "z-10"}`}
          >
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="relative flex items-center justify-center p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer w-10 h-10 shrink-0 text-zinc-700 active:scale-95 animate-fade-in"
              aria-label="Toggle profile menu"
            >
              <User size={18} />
              <OrderItemCount className="absolute -top-1 -right-1" />
            </button>

            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0 shrink-0 cursor-pointer z-10"
          >
            <Image
              src="/main-logo.png"
              alt="LifePath Logo"
              width={120}
              height={48}
              className="h-8 w-auto"
            />
          </Link>

          <div className="ml-6 hidden items-center gap-2 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-100 text-primary"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <span>
                  <span translate="no" className="english-label notranslate">
                    {item.label}
                  </span>
                  <span translate="no" className="nepali-label notranslate">
                    {item.nepaliLabel}
                  </span>
                </span>
                {item.label === "Events" && (
                  <span className="absolute -top-0.5 [html[lang='ne']_&]:-top-1.5 right-1/2 translate-x-1/2 inline-flex items-center gap-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] [html[lang='ne']_&]:text-[10px] font-bold text-white uppercase tracking-wider leading-none shadow-xs z-10">
                    <span className="">ongoing</span>
                    {/* <span translate="no" className="nepali-label notranslate">चलिरहेको</span> */}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-3 xl:flex">
            <Button
              label={<span>Know Yourself</span>}
              href="/personality-test"
              size="sm"
              className="px-6!"
            />

            {/* Profile Dropdown Container */}
            <div
              id="profile-dropdown-container"
              className="relative flex items-center"
            >
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="relative flex items-center justify-center p-2 rounded-full border border-primary/50 bg-white hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer w-10 h-10 shrink-0 text-zinc-700 active:scale-95"
                aria-label="Toggle profile menu"
              >
                <User size={18} className="text-primary" />
                <OrderItemCount className="absolute -top-1 -right-1" />
              </button>

              <ProfileDropdown
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            </div>
          </div>

          <button
            className="flex items-center justify-center cursor-pointer w-10 h-10 shrink-0 text-zinc-700 active:scale-95 z-10 xl:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-zinc-200 xl:hidden">
          <div className="mx-auto h-screen max-w-6xl space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`relative rounded-xl px-2 py-2 text-lg font-medium transition-colors block ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                <span>
                  <span translate="no" className="english-label notranslate">
                    {item.label}
                  </span>
                  <span translate="no" className="nepali-label notranslate">
                    {item.nepaliLabel}
                  </span>
                </span>
                {item.label === "Events" && (
                  <span className="xl:absolute top-1/2 xl:-translate-y-1/2 right-1/2 inline-flex items-center gap-0.5 rounded-full bg-red-500 px-1.5 py-0.5 ml-4 md:ml-8 xl:ml-0 text-xs font-bold text-white uppercase tracking-wider leading-none shadow-xs z-10">
                    <span translate="no" className="english-label notranslate">
                      ongoing
                    </span>
                    <span translate="no" className="nepali-label notranslate">
                      चलिरहेको
                    </span>
                  </span>
                )}
              </Link>
            ))}
            {/* <div className="py-2 border-t border-zinc-100">
              <GoogleTranslate
                pageLanguage="en"
                languages={myLanguages}
                className="w-full [&>button]:w-full [&>button]:justify-between [&>button]:py-6! [&>button]:px-4! [&>button]:text-lg! [&>button]:rounded-full [&>div]:w-full"
              />
            </div> */}
            <Link
              href="/personality-test"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-full bg-blue-600 px-4 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700"
            >
              <span>Know Yourself</span>
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
