import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
// import BookCard from "@/components/books/BookCard";
import GenreCarousel from "@/components/books/GenreCarousel";
import { bestSellerBooks, books, genres } from "@/constants/books";
import PageTitle from "@/components/ui/PageTitle";
import BookCard from "@/components/books/BookCard";

export default function BooksPage() {
  // const allBooksPreview = books.slice(0, 3);
  const featuredBestSeller = bestSellerBooks[0];
  const rankedBestSellers = bestSellerBooks.slice(1);

  return (
    <main className="bg-white pt-16">
      <div className="flex flex-col gap-2 bg-linear-to-r from-blue-600 to-black text-white py-8 px-4 md:px-0">
        <PageTitle
          title="Build your future, one page at a time."
          subtitle="Curated books to help you discover your path, build real-world skills,
          and stay ahead in your career."
          titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
          subtitleClassName="text-lg text-blue-100 mb-6"
          containerClassName="text-center max-w-3xl mx-auto"
        />
      </div>
      <section className="mx-auto max-w-7xl px-4 md:px-0">
        <div>
          <section className="pt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-montserrat text-4xl font-bold text-blue-700">
                  Genres
                </h2>
                <p className="mt-2 text-lg font-medium text-zinc-700">
                  Browse the collection by learning and growth themes.
                </p>
              </div>
            </div>

            <div>
              <GenreCarousel genres={genres} />
            </div>
          </section>

          <section className="pt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-montserrat text-4xl font-bold text-blue-700">
                  Best Sellers
                </h2>
                <p className="pt-2 text-lg font-medium text-zinc-700">
                  Popular books readers are picking the most.
                </p>
              </div>
              {/* <Link
                href="/books/all-books?filter=bestsellers"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                View Best Sellers
                <ArrowRight className="h-4 w-4" />
              </Link> */}
            </div>

            {featuredBestSeller && (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <article className="overflow-hidden rounded-[32px] border border-zinc-200 bg-linear-to-br from-[#0d1b4d] via-blue-700 to-[#09101f] text-white shadow-xl shadow-blue-600/10">
                  <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div className="relative mx-auto h-[360px] w-full max-w-[280px]">
                      <Image
                        src={featuredBestSeller.image}
                        alt={featuredBestSeller.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full  py-2 text-sm font-semibold text-blue-50 backdrop-blur-sm">
                        <Star className="h-4 w-4 fill-current text-yellow-300" />
                        #1 Best Seller
                      </div>
                      <h3 className="mt-5 font-montserrat text-3xl font-bold md:text-4xl">
                        {featuredBestSeller.title}
                      </h3>
                      <p className="mt-3 text-sm font-medium text-blue-100">
                        by {featuredBestSeller.author}
                      </p>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
                        {featuredBestSeller.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                          {featuredBestSeller.category}
                        </span>
                        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                          {featuredBestSeller.genre}
                        </span>
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                          href={`/books/${featuredBestSeller.slug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-50"
                        >
                          View Book
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <p className=" font-semibold text-white">
                          <span className="text-sm">NPR</span>
                          <span className="text-2xl">
                            {" "}
                            {featuredBestSeller.priceNpr}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>

                <div className="space-y-4">
                  {rankedBestSellers.map((book, index) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.slug}`}
                      className="group flex items-center gap-4 rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl  font-montserrat text-xl font-bold text-blue-700">
                        0{index + 2}
                      </div>
                      <div className="relative h-28 w-20 shrink-0">
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                          {book.category}
                        </p>
                        <h3 className="mt-2 font-montserrat text-xl font-bold text-slate-900">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-zinc-600">
                          by {book.author}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-4">
                          <span className="text-sm font-semibold text-blue-700">
                            NPR {book.priceNpr}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            Best Seller
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="mt-14">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-montserrat text-4xl font-bold text-blue-700">
                  All Books
                </h2>
                <p className=" text-lg font-medium text-zinc-700">
                  The complete LifePath catalog in one place.
                </p>
              </div>
            </div>

            <div className="mt-6 mx-auto grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {books.map((book, index) => (
                // <Link
                //   key={book.id}
                //   href={`/books/${book.slug}?page=1`}
                //   className="group grid h-full grid-rows-[320px_1fr] overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300"
                // >
                //   <div className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 p-6">
                //     <div className="absolute left-4 top-4 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                //       New
                //     </div>
                //     <div className="absolute right-4 top-4 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-600">
                //       0{index + 1}
                //     </div>
                //     <Image
                //       src={book.image}
                //       alt={book.title}
                //       fill
                //       className="object-contain px-8 py-10 transition-transform duration-300 group-hover:scale-[1.03]"
                //     />
                //   </div>

                //   <div className="flex flex-1 flex-col p-5">
                //     <div className="flex items-start justify-between gap-3">
                //       <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-700">
                //         {book.category}
                //       </span>
                //       <span className="text-sm font-semibold text-blue-700">
                //         NPR {book.priceNpr}
                //       </span>
                //     </div>

                //     <h3 className="mt-4 font-montserrat text-2xl font-bold leading-tight text-slate-900">
                //       {book.title}
                //     </h3>
                //     <p className="mt-2 text-sm font-medium text-zinc-600">
                //       by {book.author}
                //     </p>
                //     <p className="mt-4 line-clamp-4 text-sm leading-6 text-zinc-700">
                //       {book.description}
                //     </p>

                //     <div className="mt-auto pt-6">
                //       <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                //         Purchase Now
                //         <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                //       </div>
                //     </div>
                //   </div>
                // </Link>
                <BookCard
                  key={index}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  image={book.image}
                  priceNpr={book.priceNpr}
                  isBestSeller={book.isBestSeller}
                  pageImageCount={6}
                />
              ))}
            </div>
          </section>
          {/* All Books */}
          {/* <section className="mt-14">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-montserrat text-4xl font-bold text-blue-700">
                  All Books
                </h2>
                <p className=" text-lg font-medium text-zinc-700">
                  The complete LifePath catalog in one place.
                </p>
              </div>
              <Link
                href="/books/all-books"
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
              >
                View All Books
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 md:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Library Overview
                </p>
                <h3 className="mt-4 font-montserrat text-3xl font-bold text-slate-900 md:text-4xl">
                  Browse every title in one organized collection.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-700 md:text-base">
                  Explore books for self-discovery, discipline, productivity,
                  psychology, and long-term career growth. The full catalog is
                  structured so readers can move from clarity to action.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-zinc-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Titles
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {books.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Genres
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {genres.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      New
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {newBooks.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {allBooksPreview.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.slug}?page=1`}
                    className="group grid items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors duration-200 hover:border-zinc-300 md:grid-cols-[88px_1fr_auto]"
                  >
                    <div className="relative h-24 w-20 justify-self-center md:justify-self-start">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                          {book.category}
                        </span>
                        <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-700">
                          {book.genre}
                        </span>
                      </div>
                      <h3 className="mt-3 font-montserrat text-xl font-bold text-slate-900 md:text-2xl">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-zinc-600">
                        by {book.author}
                      </p>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-700">
                        {book.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <span className="text-base font-bold text-blue-700 md:text-lg">
                        NPR {book.priceNpr}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:border-blue-300 group-hover:text-blue-700">
                        Purchase Book
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section> */}
        </div>
      </section>
    </main>
  );
}
