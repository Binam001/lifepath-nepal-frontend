import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../shared/Button";

type BookCardProps = {
  slug: string;
  title: string;
  author: string;
  description?: string;
  category: string[];
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
  description,
  image,
  priceNpr,
}: BookCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existingCart = localStorage.getItem("lifepath_cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const existingItem = cart.find((item: any) => item.slug === slug);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ slug, title, priceNpr, image, qty: 1 });
    }

    localStorage.setItem("lifepath_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("lifepath_cart_update"));
  };

  return (
    <div className="group relative flex flex-col md:flex-row items-stretch gap-6 w-full bg-white rounded-3xl border border-zinc-200 p-4 transition-all hover:shadow-lg hover:border-zinc-300">
      {/* Left: Book Cover Image */}
      <div className="relative aspect-3/4 w-28 md:w-36 shrink-0 overflow-hidden bg-zinc-50 border border-zinc-100 rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-fill"
          sizes="(max-width: 768px) 112px, 144px"
        />
      </div>

      {/* Right: Book Details */}
      <div className="flex flex-col flex-1 self-stretch justify-between">
        <div>
          <h3 className="line-clamp-1 text-xl md:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 font-medium mt-1 tracking-wide uppercase">
            {author}
          </p>
          {description && (
            <p className="text-sm text-zinc-600 mt-3 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg md:text-xl font-bold text-primary">
            Rs. {priceNpr.toLocaleString()}
          </p>

          <div className="flex items-center gap-4">
            <Button
              label="View Details"
              variant="outline"
              size="sm"
              href={`/books/${slug}`}
            />
            <Button label="Add to Cart" size="sm" onClick={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
