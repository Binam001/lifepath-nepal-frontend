import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ShoppingCart,
  Star,
  Check,
  Package,
  Shield,
  Truck,
  MessageCircle,
  Eye,
  Calendar,
  FileText,
} from "lucide-react";
import { books, booksBySlug } from "@/constants/books";
import BookCard from "@/components/books/BookCard";

type BookDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
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

  const whatsappMessage = `Hi! I'm interested in purchasing "${book.title}" by ${book.author}. Can you provide more details?`;
  const whatsappLink = `https://wa.me/9779761082244?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-zinc-50 pt-20 pb-16">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all books
        </Link>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 mt-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Book Image & Preview */}
          <div className="space-y-6">
            {/* Main Book Display */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
              {book.isBestSeller && (
                <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-amber-900 shadow-lg">
                  <Star className="h-4 w-4 fill-current" />
                  Best Seller
                </div>
              )}

              <div className="relative mx-auto aspect-3/4 w-full max-w-[400px]">
                <div className="absolute inset-x-[8%] top-4 h-full rounded-2xl bg-blue-100/50 blur-xl" />
                <div className="relative h-full rounded-2xl bg-linear-to-br from-zinc-50 to-zinc-100 p-6 shadow-2xl">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    priority
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="rounded-3xl border border-zinc-200 bg-linear-to-br from-white to-blue-50 p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  What You&apos;ll Discover
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-blue-100">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Clear Direction & Purpose
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Understand your unique path and gain clarity on where
                      you&apos;re heading in life and career.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-blue-100">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Actionable Strategies
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Practical frameworks and exercises you can implement
                      immediately to see real results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-blue-100">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Personal Growth Insights
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Deep understanding of yourself, your patterns, and how to
                      build lasting positive change.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-blue-100">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Real-World Applications
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Stories and examples that show how these principles work
                      in everyday situations.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/books/${book.slug}/read?page=1`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700"
              >
                <Eye className="h-4 w-4" />
                Preview This Book
              </Link>
            </div>
          </div>

          {/* Right: Book Details & Purchase */}
          <div className="space-y-6">
            {/* Book Info */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                  {book.category}
                </span>
                <span className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-semibold text-purple-700">
                  {book.genre}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
                {book.title}
              </h1>
              <p className="text-lg text-zinc-600 mb-6">by {book.author}</p>

              <p className="text-base leading-relaxed text-zinc-700 mb-8">
                {book.description}
              </p>

              {/* Price & Stock */}
              <div className="flex items-center justify-between gap-4 mb-6 p-6 rounded-2xl bg-linear-to-br from-blue-50 to-purple-50 border border-blue-100">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Price</p>
                  <p className="text-4xl font-bold text-blue-600">
                    NPR {book.priceNpr}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    <Check className="h-4 w-4" />
                    {book.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-8">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Purchase Now
                </Link>

                <Link
                  href={`/books/${book.slug}/read?page=1`}
                  className="flex items-center justify-center gap-3 rounded-full border-2 border-zinc-300 bg-white px-8 py-4 text-base font-bold text-zinc-900 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <BookOpen className="h-5 w-5" />
                  Preview Book
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-zinc-200">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-700">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-700">
                    24/7 Support
                  </p>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">
                Book Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Published
                  </span>
                  <span className="text-sm font-bold text-zinc-900">
                    {formattedPublishedAt}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Pages
                  </span>
                  <span className="text-sm font-bold text-zinc-900">
                    {book.pages.length} pages
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                    <Package className="h-4 w-4 text-blue-600" />
                    ISBN
                  </span>
                  <span className="text-sm font-bold text-zinc-900">
                    {book.isbn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                    <Star className="h-4 w-4 text-amber-500" />
                    Status
                  </span>
                  <span className="text-sm font-bold text-zinc-900">
                    {book.isBestSeller ? "Best Seller" : "Regular Title"}
                  </span>
                </div>
              </div>
            </div>

            {/* Why This Book */}
            <div className="rounded-3xl border border-zinc-200 bg-linear-to-br from-blue-50 to-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">
                Why Choose This Book?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Practical Insights
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Real-world advice you can apply immediately to your life
                      and career.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Clear Structure
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Well-organized content that guides you from understanding
                      to action.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1">
                      Proven Methods
                    </h4>
                    <p className="text-sm text-zinc-600">
                      Strategies backed by research and real success stories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 mt-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">
              You Might Also Like
            </h2>
            <p className="text-zinc-600">
              More books from the same category and genre
            </p>
          </div>
          <Link
            href="/books/all-books"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            Browse All Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

        <Link
          href="/books/all-books"
          className="mt-8 flex sm:hidden items-center justify-center gap-2 rounded-full border-2 border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
        >
          Browse All Books
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Sticky Bottom CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white p-4 shadow-2xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-zinc-600">Price</p>
            <p className="text-2xl font-bold text-blue-600">
              NPR {book.priceNpr}
            </p>
          </div>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Now
          </Link>
        </div>
      </div>
    </main>
  );
}
