import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

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
  image,
  // description,
  priceNpr,
  // isBestSeller,
}: BookCardProps) {
  return (
    <Link
      href={`/books/${slug}`}
      className="group relative flex w-64 flex-col overflow-hidden  bg-white p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden  bg-gray-100 shadow-sm">
        <Image
          src={image}
          alt={title}
          fill
          className="object-fit transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 256px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-xl">
            View Details
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-1">
          <h3 className="line-clamp-1 font-sans text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600">
            {title}
          </h3>
          <p className="text-sm font-medium text-zinc-500">{author}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-tight text-zinc-400">
              Price
            </span>
            <p className="flex items-center font-bold text-slate-900">
              <span className="mr-0.5 text-sm ">Rs.&nbsp;</span>
              <span className="text-xl text-blue-600">
                {priceNpr.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Subtle Action Icon */}
          <div className="rounded-full bg-slate-50 p-2 text-slate-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
