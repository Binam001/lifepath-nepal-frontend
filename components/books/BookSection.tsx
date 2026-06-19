"use client";

import { books } from "@/constants/books";
import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import Link from "next/link";
import { Search, Filter, ChevronDown, ShoppingCart } from "lucide-react";
import { useResponsive } from "@/hooks/useMediaQuery";

const sections = [
  {
    title: "Job",
    subtitle:
      "Books that sharpen decision-making, confidence, and readiness for work.",
  },
  {
    title: "Life",
    subtitle:
      "Minimal, thoughtful reads for relationships, resilience, and everyday clarity.",
  },
  {
    title: "Career",
    subtitle:
      "A focused shelf for growth, ambition, and building your next chapter.",
  },
];

const BookSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const { isMobile } = useResponsive();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartItems, setCartItems] = useState<
    {
      slug: string;
      title: string;
      priceNpr: number;
      image: string;
      qty: number;
    }[]
  >([]);

  useEffect(() => {
    const updateCart = () => {
      const cart = localStorage.getItem("lifepath_cart");
      setCartItems(cart ? JSON.parse(cart) : []);
    };
    updateCart();
    window.addEventListener("lifepath_cart_update", updateCart);
    return () => window.removeEventListener("lifepath_cart_update", updateCart);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const filteredSections = sections
    .map((section) => {
      // If a specific category is selected, and it doesn't match this section, skip it
      if (
        selectedCategory !== "all" &&
        section.title.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return null;
      }

      const sectionBooks = books
        .filter((book) =>
          book.category.some(
            (cat) => cat.toLowerCase() === section.title.toLowerCase(),
          ),
        )
        .filter((book) => {
          if (!searchTerm.trim()) return true;
          const query = searchTerm.toLowerCase();
          return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
          );
        });

      if (sectionBooks.length === 0) return null;

      return {
        ...section,
        books: sectionBooks,
      };
    })
    .filter(Boolean) as Array<(typeof sections)[0] & { books: any[] }>;

  const totalFilteredBooks = filteredSections.reduce(
    (sum, section) => sum + section.books.length,
    0,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-4">
      {/* Filter controls row */}
      <div
        className={`sticky z-30 mb-8 transition-all duration-300 bg-white/90 backdrop-blur-md py-4 border-b border-zinc-200/80 -mx-4 px-4 md:-mx-8 md:px-8 ${
          isHeaderVisible ? "top-16" : "top-0"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="">
              <h3 className="text-xl font-bold text-zinc-900">Lifebooks</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Showing {totalFilteredBooks} books
              </p>
            </div>
            {isMobile && (
              <Link
                href="/cart"
                className="md:hidden relative items-center justify-center p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-xs cursor-pointer w-10 h-10 shrink-0"
                aria-label="View shopping cart"
              >
                <ShoppingCart size={18} className="text-zinc-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          <div className="flex flex-row items-center gap-2 md:gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-[65%] sm:w-auto">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-400" />
              </span>
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60 pl-9 pr-4 py-2 border border-zinc-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
              />
            </div>

            {/* Category Filter */}
            <div className="relative w-[35%] sm:w-auto">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {!isMobile && (
                  <Filter size={14} className="text-zinc-400 hidden md:block" />
                )}
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-48 pl-4 md:pl-8 pr-8 py-2 border border-zinc-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer shadow-xs font-medium text-zinc-700"
              >
                <option value="all">All Books</option>
                <option value="job">Job</option>
                <option value="life">Life</option>
                <option value="career">Career</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
            {!isMobile && (
              <Link
                href="/cart"
                className="hidden md:flex relative items-center justify-center p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-xs cursor-pointer w-10 h-10 shrink-0"
                aria-label="View shopping cart"
              >
                <ShoppingCart size={18} className="text-zinc-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8 md:space-y-16">
        {filteredSections.map((section) => (
          <section key={section.title}>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-2">
                <h2 className="font-montserrat text-3xl font-bold tracking-[-0.04em] text-primary md:text-4xl">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base text-slate-600">
                  {section.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {section.books.map((book) => (
                <BookCard
                  key={`${section.title}-${book.id}`}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  category={book.category}
                  genre={book.genre}
                  image={book.image}
                  priceNpr={book.priceNpr}
                  isbn={book.isbn}
                  isBestSeller={book.isBestSeller}
                  pageImageCount={book.pages.length}
                />
              ))}
            </div>
          </section>
        ))}

        {filteredSections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">
              No books found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
