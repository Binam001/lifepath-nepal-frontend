import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  // Calendar,
  CheckCircle2,
  // ShoppingBag,
  Star,
  // Layers,
  // FileText,
  // BadgeCheck,
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
    <main className="min-h-screen bg-white pb-32 pt-24 text-zinc-900">
      {notFound()}
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {/* Breadcrumb */}
        <Link
          href="/books"
          className="inline-flex items-center gap-3 text-sm text-zinc-500 hover:text-blue-600 mb-16 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse all books
        </Link>

        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-[3fr_4fr] lg:gap-24 lg:items-start">
          {/* Left Column: Cover */}
          <div className="flex flex-col">
            <div className="relative w-full">
              {book.isBestSeller && (
                <div className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
                  <Star className="h-3.5 w-3.5" />
                  Bestseller
                </div>
              )}
              <div className="relative mx-auto aspect-3/4 w-full max-w-[360px] lg:max-w-full">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Quick Stats Grid under image */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-zinc-200 pt-8">
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                  Published
                </span>
                <span className="text-sm text-zinc-900">
                  {formattedPublishedAt}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                  ISBN
                </span>
                <span
                  className="text-sm text-zinc-900  w-full"
                  title={book.isbn}
                >
                  {book.isbn}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                  Pages
                </span>
                <span className="text-sm text-zinc-900">
                  {book.pages.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 text-xs tracking-widest text-zinc-400 uppercase">
              <span>{book.category}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-200"></span>
              <span>{book.genre}</span>
            </div>

            <h1 className="mt-6 text-4xl font-normal leading-tight text-zinc-900 md:text-5xl lg:text-[3.5rem] tracking-tight">
              {book.title}
            </h1>

            <p className="mt-4 text-xl text-zinc-400">
              by <span className="text-zinc-900">{book.author}</span>
            </p>

            <div className="mt-10 text-base leading-relaxed text-zinc-600">
              {book.description}
            </div>

            {/* Actions */}
            <div className="mt-12 border-t border-zinc-200 pt-10">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-xl text-zinc-400">Rs.</span>
                <span className="text-3xl font-light text-zinc-900">
                  {book.priceNpr.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/books/${book.slug}/read?page=1`}
                  className="inline-flex items-center rounded-full justify-center gap-3 bg-blue-600 px-8 py-4 text-sm text-white transition-colors hover:bg-blue-700 w-full sm:w-auto"
                >
                  Get Access
                </Link>
                <Link
                  href={`/books/${book.slug}/read?page=1`}
                  className="inline-flex items-center rounded-full justify-center gap-3 border border-blue-200 bg-transparent px-8 py-4 text-sm text-blue-600 transition-colors hover:bg-blue-50 w-full sm:w-auto"
                >
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  Read Free Preview
                </Link>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mt-16 border-t border-zinc-200 pt-12">
              <h2 className="text-lg text-zinc-900 mb-8">Why read this book</h2>
              <div className="flex flex-col gap-6">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
                      strokeWidth={1.5}
                    />
                    <p className="text-zinc-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books */}
      <section className="mx-auto mt-32 max-w-5xl px-4 md:px-8">
        <div className="border-t border-zinc-200 pt-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-light text-zinc-900 tracking-tight">
              Similar selections
            </h2>
            <Link
              href="/books"
              className="inline-flex items-center gap-3 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Browse all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {relatedBooks.map((relatedBook) => (
              <div key={relatedBook.id} className="w-full flex justify-center">
                <BookCard
                  slug={relatedBook.slug}
                  title={relatedBook.title}
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
