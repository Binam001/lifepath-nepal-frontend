import Image from "next/image";
import Link from "next/link";
// import { ShoppingCart } from "lucide-react";

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
  priceNpr,
}: BookCardProps) {
  return (
    <Link
      href={`/books/${slug}`}
      className="group flex w-full max-w-[280px] flex-col overflow-hidden transition-opacity hover:opacity-80"
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-50 border border-zinc-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col pt-5">
        <h3 className="line-clamp-1 text-base text-zinc-900 tracking-tight">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">{author}</p>

        <p className="mt-3 text-sm text-zinc-900">
          Rs. {priceNpr.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
