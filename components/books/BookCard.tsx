"use client";

import Image from "next/image";
import React from "react";
import Button from "../shared/Button";
import { useResponsive } from "@/hooks/useMediaQuery";
import AddToCartButton from "./AddToCartButton";

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
  const { isMobile } = useResponsive();

  return (
    <div className="group relative flex flex-col md:flex-row items-stretch gap-3 md:gap-6 w-full bg-white rounded-3xl border border-zinc-200 p-2 md:p-4 transition-all hover:shadow-lg hover:border-zinc-300">
      {/* Left: Book Cover Image */}
      <div className="flex gap-4">
        <div className="relative aspect-3/4 w-28 md:w-36 shrink-0 overflow-hidden bg-zinc-50 border border-zinc-100 rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-fill"
            sizes="(max-width: 768px) 112px, 144px"
          />
        </div>
        {isMobile && (
          <div className="md:hidden flex flex-col gap-4">
            <div className="">
              <h3 className="line-clamp-1 text-lg font-semibold text-zinc-900 tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-xs text-zinc-400 font-medium mt-1 tracking-wide uppercase">
                {author}
              </p>
              {description && (
                <p className="text-xs text-zinc-600 mt-2 line-clamp-4 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            <p className="text-lg md:text-xl font-bold text-primary">
              Rs. {priceNpr.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Right: Book Details */}
      <div className="flex flex-col flex-1 self-stretch justify-between">
        {!isMobile && (
          <div className="hidden md:block">
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
        )}

        <div className="flex items-center justify-between mt-4 w-full">
          {!isMobile && (
            <p className="hidden md:block text-lg md:text-xl font-bold text-primary">
              Rs. {priceNpr.toLocaleString()}
            </p>
          )}

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              label="View Details"
              variant="outline"
              size="sm"
              href={`/books/${slug}`}
              className="flex-1 md:flex-initial w-full! md:w-fit! whitespace-nowrap!"
            />

            <AddToCartButton
              slug={slug}
              title={title}
              priceNpr={priceNpr}
              image={image}
              className="flex-1 md:flex-initial w-full! md:w-fit!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
