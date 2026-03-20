import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type BookCardProps = {
  slug: string;
  title: string;
  author: string;
  description?: string;
  category: string;
  genre?: string;
  image: string;
  priceNpr: number;
  isbn?: string;
  isBestSeller: boolean;
  pageImageCount: number;
};

export default function BookCard({
  slug,
  title,
  author,
  // description,
  category,
  // genre,
  image,
  priceNpr,
  // isbn,
  isBestSeller,
  // pageImageCount,
}: BookCardProps) {
  return (
    <article className="flex flex-col px-2 py-4 h-full w-80  transition-transform duration-200 hover:-translate-y-1">
      {/* Book Image */}
      <div className="relative mb-5 h-100 w-80 ">
        <Image
          src={image}
          alt={title}
          fill
          className="object-fit object-bottom"
        />
      </div>
      {/* Category & Best Seller */}
      <div className="flex items-start justify-between gap-3 ">
        <span className="rounded-full  px-3 py-1 text-xs font-semibold text-slate-600 ">
          {category}
        </span>
        {isBestSeller && (
          <span className="inline-flex items-center gap-1 rounded-full  px-3 py-1 text-xs font-semibold text-yellow-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            Bestseller
          </span>
        )}
      </div>
      <section className="flex flex-1 flex-col gap-4 px-2">
        {/* Book Title */}

        <div className="pt-4">
          <h3 className=" font-montserrat text-2xl font-bold text-slate-800">
            {title}
          </h3>
          <p className="text-sm font-medium text-zinc-600">
            <span className="text-xs">by&nbsp;</span>
            {author}
          </p>
        </div>

        {/* Description */}

        {/* <p className="flex-1 text-sm leading-6 text-zinc-700">{description}</p> */}

        <div className="mt-auto">
          {/* Bottom Info */}

          <div className="flex  justify-between gap-3 text-sm text-zinc-600">
            <div className=" ">
              <p className=" flex gap-2 items-baseline  font-semibold text-zinc-900">
                <span className="text-md">NPR</span>{" "}
                <span className="text-2xl text-blue-800">{priceNpr}</span>
              </p>
            </div>
            <Link
              href={`/books/${slug}`}
              className=" w-auto flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
            >
              View Book
              <ArrowRight className="h-4 w-4" />
            </Link>
            {/* <div className="flex items-center gap-2 ">
              <p className="text-xs uppercase tracking-wide text-zinc-400">
                Pages
              </p>
              <p className=" font-semibold text-zinc-900">{pageImageCount}</p>
            </div> */}
            {/* <div className=" ">
              <p className="text-xs uppercase tracking-wide text-zinc-400">
                Genre
              </p>
              <p className="mt-1 font-semibold text-zinc-900">{genre}</p>
            </div> */}
            {/* <div className=" ">
              <p className="text-xs uppercase tracking-wide text-zinc-400">
                ISBN
              </p>
              <p className="mt-1 font-semibold text-zinc-900">{isbn}</p>
            </div> */}
          </div>
          {/* CTA Button */}

          <div className="pt-4"></div>
        </div>
      </section>
    </article>
  );
}
