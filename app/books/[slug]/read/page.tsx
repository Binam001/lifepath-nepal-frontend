import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid, X } from "lucide-react";
import { booksBySlug } from "@/constants/books";
import { notFound } from "next/navigation";
import JumpToPage from "@/components/books/JumpToPage";

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
    <main className="min-h-screen bg-white mt-10">
      {notFound()}
      {/* Top Navigation Bar */}
      <header className="px-6 py-8 flex items-center justify-between border-b mx-4 md:mx-8 border-zinc-100">
        <div className="flex items-center gap-6">
          <Link
            href={`/books/${book.slug}`}
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
            title="Exit reader"
          >
            <X className="h-5 w-5" />
          </Link>
          <div className="hidden sm:block">
            <h1 className="text-sm text-zinc-900 tracking-wide">
              {book.title}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm text-zinc-400">
          <JumpToPage
            bookSlug={book.slug}
            currentPage={currentPage}
            totalPages={book.pages.length}
          />
          <Link
            href={`/books/${book.slug}`}
            className="hidden sm:flex hover:text-zinc-900 transition-colors"
          >
            <LayoutGrid className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="flex flex-col items-center justify-center p-6 py-12 relative w-full">
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center gap-12 lg:gap-24">
          {hasPreviousPage ? (
            <Link
              href={`/books/${book.slug}/read?page=${currentPage - 1}`}
              className="p-4 text-zinc-300 hover:text-zinc-900 transition-colors hidden sm:block"
            >
              <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
            </Link>
          ) : (
            <div className="w-14 hidden sm:block" />
          )}

          <div className="relative aspect-3/4 w-full max-w-xl mx-auto border border-zinc-100 bg-white">
            <Image
              src={currentPageData.image}
              alt={`${book.title} page ${currentPage}`}
              fill
              priority
              quality={90}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {hasNextPage ? (
            <Link
              href={`/books/${book.slug}/read?page=${currentPage + 1}`}
              className="p-4 text-zinc-300 hover:text-zinc-900 transition-colors hidden sm:block"
            >
              <ArrowRight className="h-6 w-6" strokeWidth={1.5} />
            </Link>
          ) : (
            <div className="w-14 hidden sm:block" />
          )}
        </div>

        {/* Mobile Nav */}
        <div className="mt-12 flex items-center justify-between sm:hidden pt-8 w-full max-w-xs mx-auto">
          {hasPreviousPage ? (
            <Link
              href={`/books/${book.slug}/read?page=${currentPage - 1}`}
              className="text-zinc-900 p-2 border border-zinc-200"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          ) : (
            <div className="w-9" />
          )}

          <JumpToPage
            bookSlug={book.slug}
            currentPage={currentPage}
            totalPages={book.pages.length}
          />

          {hasNextPage ? (
            <Link
              href={`/books/${book.slug}/read?page=${currentPage + 1}`}
              className="text-zinc-900 p-2 border border-zinc-200"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          ) : (
            <div className="w-9" />
          )}
        </div>
      </section>
    </main>
  );
}
