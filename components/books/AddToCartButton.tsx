"use client";

import React, { useState } from "react";
import Button from "../shared/Button";

interface AddToCartButtonProps {
  slug: string;
  title: string;
  priceNpr: number;
  image: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function AddToCartButton({
  slug,
  title,
  priceNpr,
  image,
  className,
  size = "sm",
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent double click additions
    if (isAdded) return;

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

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      label={isAdded ? "Added to Cart" : "Add to Cart"}
      onClick={handleAddToCart}
      size={size}
      variant={isAdded ? "outline" : "solid"}
      disabled={isAdded}
      className={`${className || ""} w-full! md:w-auto! transition-all ${
        isAdded ? "bg-green-500! border-green-500! text-white!" : ""
      }`}
    />
  );
}
