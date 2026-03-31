import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { bestSellerBooks, books, genres, newBooks } from "@/constants/books";
import { notFound } from "next/navigation";

type AllBooksPageProps = {
  searchParams: Promise<{
    filter?: string;
    genre?: string;
  }>;
};

export default async function AllBooksPage({
  searchParams,
}: AllBooksPageProps) {
  const { filter, genre } = await searchParams;
  const normalizedGenre = genre?.trim();

  const filteredBooks = normalizedGenre
    ? books.filter((book) => book.genre === normalizedGenre)
    : filter === "bestsellers"
      ? bestSellerBooks
      : filter === "new"
        ? newBooks
        : books;

  const title = normalizedGenre
    ? `${normalizedGenre} Books`
    : filter === "bestsellers"
      ? "Best Seller Books"
      : filter === "new"
        ? "New Books"
        : "All books from the LifePath collection";

  const subtitle = normalizedGenre
    ? `Showing books from the ${normalizedGenre} genre.`
    : filter === "bestsellers"
      ? "Showing the most popular books from the LifePath collection."
      : filter === "new"
        ? "Showing the latest books added to the LifePath collection."
        : "Browse the complete LifePath catalog.";

  const activeFilter = normalizedGenre
    ? `genre:${normalizedGenre}`
    : filter === "bestsellers"
      ? "bestsellers"
      : filter === "new"
        ? "new"
        : "all";

  const filterLinks = [
    { key: "all", label: "All Books", href: "/books/all-books" },
    {
      key: "bestsellers",
      label: "Best Sellers",
      href: "/books/all-books?filter=bestsellers",
    },
    { key: "new", label: "New Books", href: "/books/all-books?filter=new" },
  ] as const;

  return (
    <main className="bg-white pt-24 pb-16">
      {notFound()}
      <section className="mx-auto max-w-7xl px-4 md:px-0">
        <div className="pb-6">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to books
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 bg-linear-to-r from-blue-600 to-slate-900 px-6 py-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                  Catalog
                </p>
                <h1 className="mt-3 font-montserrat text-3xl font-bold leading-tight">
                  {title}
                </h1>
              </div>

              <div className="p-6">
                <p className="text-sm leading-7 text-zinc-700 md:text-base">
                  {subtitle}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                      Results
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {filteredBooks.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                      Titles
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {books.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                      Genres
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {genres.length}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Active View
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {normalizedGenre
                      ? normalizedGenre
                      : filter === "bestsellers"
                        ? "Best Sellers"
                        : filter === "new"
                          ? "New Books"
                          : "Full Catalog"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    Use the filter groups below to narrow the collection without
                    leaving the page.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                Quick Filters
              </p>
              <h2 className="mt-3 font-montserrat text-xl font-bold text-slate-900">
                Browse By Filter
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {filterLinks.map((item) => {
                  const isActive = activeFilter === item.key;

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-blue-300 hover:text-blue-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                Explore
              </p>
              <h2 className="mt-3 font-montserrat text-xl font-bold text-slate-900">
                Browse By Genre
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {genres.map((item) => {
                  const isActive = activeFilter === `genre:${item.name}`;

                  return (
                    <Link
                      key={item.name}
                      href={`/books/all-books?genre=${encodeURIComponent(item.name)}`}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-blue-300 hover:text-blue-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="grid gap-5 rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 md:grid-cols-[112px_1fr_auto]"
              >
                <Link
                  href={`/books/${book.slug}`}
                  className="relative mx-auto h-32 w-24 md:mx-0"
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-contain"
                  />
                </Link>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                      {book.category}
                    </span>
                    <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-700">
                      {book.genre}
                    </span>
                    {book.isBestSeller && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        Bestseller
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 font-montserrat text-2xl font-bold leading-tight text-slate-900">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-zinc-600">
                    by {book.author}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-700">
                    {book.description}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-between gap-5 md:items-end">
                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Price
                    </p>
                    <p className="mt-2 text-2xl font-bold text-blue-700">
                      NPR {book.priceNpr}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    <Link
                      href={`/books/${book.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      View Book
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <p className="text-xs font-medium text-zinc-500">
                      {book.pages.length} pages
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
