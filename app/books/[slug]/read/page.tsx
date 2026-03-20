import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { booksBySlug } from "@/constants/books";

type BookReaderPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function BookReaderPage({
  params,
  searchParams,
}: BookReaderPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const book = booksBySlug[slug];

  if (!book) {
    notFound();
  }

  const parsedPage = Number(page ?? "1");
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(Math.trunc(parsedPage), 1), book.pages.length)
    : 1;
  const currentPageData = book.pages[currentPage - 1];
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < book.pages.length;

  return (
    <main className="bg-white pt-24 pb-16">
      <section className="mx-auto max-w-6xl px-4 md:px-0">
        <Link
          href={`/books/${book.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to book details
        </Link>
        <div className="p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mt-4 font-montserrat text-4xl font-semibold text-blue-700 md:text-5xl">
                {book.title}
              </h1>
              <p className="mt-3 text-sm font-medium text-zinc-600">
                {book.author}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 font-medium text-zinc-700 md:text-base">
                {book.description}
              </p>
            </div>

            <div className="rounded-3xl bg-blue-50 ring-1 ring-blue-100">
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <BookOpen className="h-4 w-4" />
                Reading Page {currentPage} of {book.pages.length}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] bg-blue-50 p-3 ring-1 ring-blue-100 md:p-6">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-white shadow-md">
              <Image
                src={currentPageData.image}
                alt={`${book.title} page ${currentPage}`}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {hasPreviousPage ? (
              <Link
                href={`/books/${book.slug}/read?page=${currentPage - 1}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Page
              </Link>
            ) : (
              <div />
            )}

            {hasNextPage ? (
              <Link
                href={`/books/${book.slug}/read?page=${currentPage + 1}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                Next Page
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={`/books/${book.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                Back to details
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
