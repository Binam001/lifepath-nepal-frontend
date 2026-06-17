"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import "next-google-translate-widget/styles";
import GoogleTranslate from "next-google-translate-widget";

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

  const navItems = [
    { label: "Home", nepaliLabel: "गृह पृष्ठ", href: "/" },
    // { label: "Job Training", nepaliLabel: "रोजगार तालिम", href: "/job-training" },
    { label: "Future", nepaliLabel: "भविष्य", href: "/future" },
    { label: "Career", nepaliLabel: "करियर", href: "/jobs" },
    { label: "Events", nepaliLabel: "कार्यक्रमहरू", href: "/events" },
    { label: "Roadmap", nepaliLabel: "रोडम्याप", href: "/roadmap" },
    // { label: "Guide Books", nepaliLabel: "निर्देशिका पुस्तकहरू", href: "/guide-books" },
    { label: "Reviews", nepaliLabel: "समीक्षाहरू", href: "/reviews" },
    // { label: "Books", nepaliLabel: "पुस्तकहरू", href: "/books" },
    // { label: "Help", nepaliLabel: "मद्दत", href: "/support" },
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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 px-4 md:px-8 xl:px-0 backdrop-blur-2xl transition-transform duration-300 ${
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

          <div className="ml-6 hidden items-center gap-4 lg:flex">
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

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            {/* <Link
              href="/personality-test"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-white"
            >
              <span
                className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-600"
                style={{ backgroundSize: "200% 100%" }}
              />
              <span className="relative z-10">Find Your Lifepath</span>
            </Link> */}
            {/* <GoogleTranslate
              pageLanguage="en"
              languages={myLanguages}
              menuAlign="right"
            /> */}
            <Button
              label={<span>Know Yourself</span>}
              href="/personality-test"
              size="sm"
              className="px-8!"
            />

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`relative block rounded-xl px-4 py-2 text-lg font-medium transition-colors ${
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
                  <span className="absolute top-1/2 -translate-y-1/2 right-1/2 inline-flex items-center gap-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider leading-none shadow-xs z-10">
                    <span>ongoing</span>
                    {/* <span translate="no" className="nepali-label notranslate">
                      चलिरहेको
                    </span> */}
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
