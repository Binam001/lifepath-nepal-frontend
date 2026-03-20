import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  MessageCircle,
  ShoppingBag,
  Star,
} from "lucide-react";
import { books, booksBySlug } from "@/constants/books";
import BookCard from "@/components/books/BookCard";

type BookDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = booksBySlug[slug];

  if (!book) {
    notFound();
  }

  const relatedBooks = books
    .filter((item) => item.slug !== book.slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.genre === book.genre) * 2 +
        Number(left.category === book.category);
      const rightScore =
        Number(right.genre === book.genre) * 2 +
        Number(right.category === book.category);

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

  return (
    <main className="bg-white pb-16 pt-20">
      <section className="mx-auto max-w-7xl px-4 md:px-0">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all books
        </Link>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 md:px-0">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] p-6 ">
              {book.isBestSeller ? (
                <div className="mb-5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Bestseller
                </div>
              ) : null}

              <div className="relative mx-auto aspect-3/4 w-full max-w-[380px]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                {book.category}
              </span>
              <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-semibold text-zinc-700">
                {book.genre}
              </span>
            </div>

            <h1 className="mt-5 font-montserrat text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl">
              {book.title}
            </h1>
            <p className="mt-3 text-base font-medium text-zinc-600 md:text-lg">
              by {book.author}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-700 md:text-base">
              {book.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-6 border-y border-zinc-200 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Price
                </p>
                <p className="mt-2 font-montserrat text-4xl font-bold tracking-[-0.04em] text-blue-700">
                  NPR {book.priceNpr}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-blue-600 hover:text-blue-700">
                <BookOpen className="h-4 w-4" />
                Preview Book
              </button>
              <Link
                href={`/books/${book.slug}/read?page=1`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
              >
                <ShoppingBag className="h-4 w-4" />
                Purchase Book
              </Link>
            </div>

            <div className="mt-10 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Published
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  {formattedPublishedAt}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Pages
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {book.pages.length} preview pages
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  ISBN
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {book.isbn}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-montserrat text-2xl font-bold tracking-[-0.03em] text-slate-950">
                Why this book works
              </h2>
              <div className="mt-5 space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm leading-7 text-zinc-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 md:px-0">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-montserrat text-3xl font-bold tracking-[-0.04em] text-blue-500">
              You Might Also Like
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-600 md:text-base">
              More books with a similar tone, theme, or direction.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-blue-700"
          >
            Browse all books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {relatedBooks.map((relatedBook) => (
            <BookCard
              key={relatedBook.id}
              slug={relatedBook.slug}
              title={relatedBook.title}
              author={relatedBook.author}
              category={relatedBook.category}
              image={relatedBook.image}
              priceNpr={relatedBook.priceNpr}
              isBestSeller={relatedBook.isBestSeller}
              pageImageCount={relatedBook.pages.length}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
