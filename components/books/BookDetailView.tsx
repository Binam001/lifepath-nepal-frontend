"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { books, Book } from "@/constants/books";
import BookCard from "./BookCard";
import Button from "../shared/Button";
import AddToCartButton from "./AddToCartButton";
import { useResponsive } from "@/hooks/useMediaQuery";

interface BookDetailViewProps {
  book: Book;
}

const highlightMap: Record<string, string[]> = {
  "Career & Growth": [
    "Clarifies your next career move with practical direction.",
    "Turns uncertainty into a more focused action plan.",
    "Helps connect personal strengths with real opportunities.",
  ],
  "Self Improvement": [
    "Builds a steadier mindset for change and growth.",
    "Gives simple ideas you can apply in daily life.",
    "Encourages consistency instead of short bursts of motivation.",
  ],
  "Mindset & Discipline": [
    "Helps shape better routines and stronger self-control.",
    "Breaks abstract growth into more actionable steps.",
    "Supports long-term progress with a calmer structure.",
  ],
  "Psychology & Behavior": [
    "Makes patterns, habits, and emotional responses easier to read.",
    "Creates more self-awareness in relationships and choices.",
    "Offers language for understanding behavior more clearly.",
  ],
  Productivity: [
    "Turns ideas into momentum through practical structure.",
    "Makes progress feel lighter and easier to sustain.",
    "Reduces friction around focus, priorities, and follow-through.",
  ],
  "Life Philosophy": [
    "Creates space for reflection, perspective, and clarity.",
    "Invites slower and more intentional decision-making.",
    "Supports a more grounded view of life and relationships.",
  ],
};

export default function BookDetailView({ book }: BookDetailViewProps) {
  const { isMobile } = useResponsive();

  const relatedBooks = books
    .filter((item) => item.slug !== book.slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.genre === book.genre) * 2 +
        Number(left.category.some((cat) => book.category.includes(cat)));
      const rightScore =
        Number(right.genre === book.genre) * 2 +
        Number(right.category.some((cat) => book.category.includes(cat)));

      return rightScore - leftScore;
    })
    .slice(0, 3);

  const formattedPublishedAt = new Date(book.publishedAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const highlights = highlightMap[book.genre] ?? [
    "A clean, approachable read designed for personal growth.",
    "Useful ideas that can be applied in real situations.",
    "A focused book for clarity, reflection, and action.",
  ];

  const actionButtonSize = isMobile ? "md" : "sm";

  return (
    <main className="min-h-screen bg-white pb-8 pt-20 text-zinc-900">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {/* Breadcrumb */}
        <Link
          href="/books"
          className="inline-flex items-center gap-3 text-sm text-zinc-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse all books
        </Link>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-[3fr_4fr] gap-8 xl:items-start">
          {/* Left Column: Cover */}
          <div className="flex flex-col">
            <div className="relative w-full">
              <div className="relative mx-auto aspect-3/4 w-auto h-[40vh] md:h-[50vh]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  priority
                  className="object-fill"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Book Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 text-xs tracking-widest text-zinc-400 uppercase">
              <div className="flex flex-wrap items-center gap-2">
                {book.category.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-md bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary"
                  >
                    {cat}
                  </span>
                ))}
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-700">
                  {book.genre}
                </span>
              </div>

              <div className="">
                {book.isBestSeller && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Bestseller
                  </span>
                )}
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-semibold text-zinc-900 md:text-5xl lg:text-4xl">
              {book.title}
            </h1>

            <p className="mt-2 text-zinc-500">
              by <span className="text-zinc-900 font-bold">{book.author}</span>
            </p>

            <div className="mt-4 text-base leading-relaxed text-zinc-600">
              {book.description}
            </div>

            {/* Actions */}
            <div className="mt-8 border-t border-zinc-200 pt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg text-zinc-400">Rs.</span>
                  <span className="text-2xl font-light text-zinc-900">
                    {book.priceNpr.toLocaleString()}
                  </span>
                </div>
                <AddToCartButton
                  slug={book.slug}
                  title={book.title}
                  priceNpr={book.priceNpr}
                  image={book.image}
                  size={actionButtonSize}
                  className="w-full! md:w-auto!"
                />
                {/* <Button
                  label="Read Free Preview"
                  href={`/books/${book.slug}/read?page=1`}
                  variant="outline"
                  size={actionButtonSize}
                  className="w-full! md:w-auto!"
                /> */}
              </div>
            </div>

            {/* Quick Stats Grid under image */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8 border-t border-zinc-200 pt-8">
              <div className="flex gap-2 items-start text-xs ">
                <span className="font-semibold">Published:</span>
                <span className="">{formattedPublishedAt}</span>
              </div>
              <div className="flex gap-2 items-s:tart text-xs">
                <span className="font-semibold">ISBN:</span>
                <span className=" w-full" title={book.isbn}>
                  {book.isbn}
                </span>
              </div>
              <div className="flex gap-2 items-s:tart text-xs">
                <span className="font-semibold">Pages:</span>
                <span className=" w-full" title={book.pages.length.toString()}>
                  {book.pages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Highlights Section */}
        <div className="mt-8 border-t border-zinc-200 pt-8">
          <h2 className="text-lg font-semibold mb-4">Why read this book</h2>
          <div className="flex flex-col gap-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <p className="text-zinc-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Related Books */}
      </div>
      <section className="mx-auto w-full max-w-7xl px-4 md:px-8 mt-8">
        <div className="border-t border-zinc-200 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-light text-zinc-900 tracking-tight">
              Similar selections
            </h2>
            <Link
              href="/books"
              className="group inline-flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors duration-300"
            >
              Browse all
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {relatedBooks.map((relatedBook) => (
              <div key={relatedBook.id} className="w-full flex justify-center">
                <BookCard
                  slug={relatedBook.slug}
                  title={relatedBook.title}
                  description={book.description}
                  author={relatedBook.author}
                  category={relatedBook.category}
                  image={relatedBook.image}
                  priceNpr={relatedBook.priceNpr}
                  isBestSeller={relatedBook.isBestSeller}
                  pageImageCount={relatedBook.pages.length}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
