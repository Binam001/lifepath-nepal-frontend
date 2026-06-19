"use client";

import React, { useState, useEffect } from "react";

interface OrderItemCountProps {
  className?: string;
}

export default function OrderItemCount({ className }: OrderItemCountProps) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const existingCart = localStorage.getItem("lifepath_cart");
      if (existingCart) {
        try {
          const cart = JSON.parse(existingCart);
          const count = cart.reduce((acc: number, item: any) => acc + (item.qty || 0), 0);
          setCartCount(count);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("lifepath_cart_update", updateCartCount);
    return () => window.removeEventListener("lifepath_cart_update", updateCartCount);
  }, []);

  if (cartCount === 0) return null;

  const defaultClasses =
    "flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-2xs";

  return (
    <span className={`${defaultClasses} ${className || ""}`}>
      {cartCount}
    </span>
  );
}
