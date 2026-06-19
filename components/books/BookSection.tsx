"use client";

import { books, genres } from "@/constants/books";
import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronDown,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
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

const GenreAndCartControls = ({
  selectedGenre,
  setSelectedGenre,
  isGenreDropdownOpen,
  setIsGenreDropdownOpen,
  cartCount,
  className,
}: {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  isGenreDropdownOpen: boolean;
  setIsGenreDropdownOpen: (open: boolean) => void;
  cartCount: number;
  className: string;
}) => {
  return (
    <div className={className}>
      <div
        className="relative flex items-center"
        id="genre-dropdown-container"
      >
        <button
          onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
          className={`border rounded-full size-10 flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
            selectedGenre
              ? "border-primary bg-blue-50 text-primary font-bold"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
          }`}
          aria-label="Filter by genre"
        >
          <SlidersHorizontal size={18} className="current-color" />
        </button>

        {isGenreDropdownOpen && (
          <div className="absolute right-0 top-12 z-40 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl animate-fade-in flex flex-col gap-0.5">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider px-3 py-1.5 select-none">
              Filter by Genre
            </span>
            <button
              onClick={() => {
                setSelectedGenre(null);
                setIsGenreDropdownOpen(false);
              }}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors w-full text-left cursor-pointer ${
                !selectedGenre
                  ? "bg-blue-50 text-primary font-semibold"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              All Genres
            </button>
            <div className="border-t border-zinc-100 my-1" />
            {genres.map((g) => {
              const isActive = selectedGenre === g.name;
              return (
                <button
                  key={g.name}
                  onClick={() => {
                    setSelectedGenre(isActive ? null : g.name);
                    setIsGenreDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors w-full text-left cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-primary font-semibold"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Link
        href="/cart"
        className="relative flex items-center justify-center p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-xs cursor-pointer size-10 shrink-0"
        aria-label="View shopping cart"
      >
        <ShoppingCart size={18} className="text-zinc-700" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

const BookSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const { isMobile } = useResponsive();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (!isGenreDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#genre-dropdown-container")) {
        setIsGenreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isGenreDropdownOpen]);

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

  const filteredBooks = books
    .filter((book) => {
      if (selectedCategory === "all") return true;
      return book.category.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
      );
    })
    .filter((book) => {
      if (!selectedGenre) return true;
      return book.genre === selectedGenre;
    })
    .filter((book) => {
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    });

  const totalFilteredBooks = filteredBooks.length;

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
              <GenreAndCartControls
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                isGenreDropdownOpen={isGenreDropdownOpen}
                setIsGenreDropdownOpen={setIsGenreDropdownOpen}
                cartCount={cartCount}
                className="md:hidden flex items-center gap-4"
              />
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
                className="w-full sm:w-60 pl-8 pr-4 py-1.5 border border-zinc-200 rounded-full md:text-sm placeholder:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
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
              <GenreAndCartControls
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                isGenreDropdownOpen={isGenreDropdownOpen}
                setIsGenreDropdownOpen={setIsGenreDropdownOpen}
                cartCount={cartCount}
                className="hidden md:flex items-center gap-4"
              />
            )}
          </div>
        </div>

        {selectedGenre && (
          <div className="flex items-center gap-2 mt-3 flex-wrap animate-fade-in">
            <span className="text-xs text-zinc-500 font-medium">
              Active filter:
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
              Genre: {selectedGenre}
              <button
                onClick={() => setSelectedGenre(null)}
                className="hover:text-blue-950 font-bold ml-1 cursor-pointer w-4 h-4 inline-flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 rounded-3xl border border-zinc-200 border-dashed">
          <p className="text-zinc-500 text-lg font-medium">
            No books found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedGenre(null);
            }}
            className="mt-4 text-primary hover:underline font-semibold transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
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
      )}
    </section>
  );
};

export default BookSection;
