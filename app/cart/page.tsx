"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import Button from "@/components/shared/Button";
import DeliveryDetailForm from "@/components/cart/DeliveryDetailForm";
import DeliveryPopupModal from "@/components/cart/DeliveryPopupModal";

interface CartItem {
  slug: string;
  title: string;
  priceNpr: number;
  image: string;
  qty: number;
}

interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
  date: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"review" | "shipping">(
    "review",
  );

  useEffect(() => {
    const updateCart = () => {
      const cart = localStorage.getItem("lifepath_cart");
      setCartItems(cart ? JSON.parse(cart) : []);
    };
    updateCart();
    window.addEventListener("lifepath_cart_update", updateCart);
    return () => window.removeEventListener("lifepath_cart_update", updateCart);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.priceNpr * item.qty,
    0,
  );
  const shippingFee = 0; // Free delivery
  const totalAmount = cartSubtotal + shippingFee;

  const updateItemQty = (slug: string, delta: number) => {
    const cart = [...cartItems];
    const item = cart.find((i) => i.slug === slug);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
      }
      localStorage.setItem("lifepath_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("lifepath_cart_update"));
    }
  };

  const removeItem = (slug: string) => {
    const cart = cartItems.filter((i) => i.slug !== slug);
    localStorage.setItem("lifepath_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("lifepath_cart_update"));
  };

  const clearCart = () => {
    localStorage.removeItem("lifepath_cart");
    window.dispatchEvent(new Event("lifepath_cart_update"));
  };



  return (
    <main className="min-h-screen bg-slate-50/50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
              <ShoppingCart className="text-primary stroke-[2.5]" />
              Shopping Cart
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Review your items and complete checkout below.
            </p>
          </div>

          {/* Step Indicator */}
        </div>
        <div className="w-full flex items-center justify-center xl:justify-start">
          <div className="w-fit flex items-center gap-3 bg-white border border-zinc-200/80 rounded-2xl px-4 py-2.5 shadow-2xs shrink-0 self-stretch md:self-auto justify-center">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  checkoutStep === "review"
                    ? "bg-primary text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {checkoutStep === "review" ? "1" : "✓"}
              </span>
              <span
                className={`text-xs font-bold transition-all ${
                  checkoutStep === "review"
                    ? "text-zinc-900 font-extrabold"
                    : "text-zinc-400"
                }`}
              >
                Review Cart
              </span>
            </div>
            <div className="h-px w-6 bg-zinc-200" />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  checkoutStep === "shipping"
                    ? "bg-primary text-white"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                2
              </span>
              <span
                className={`text-xs font-bold transition-all ${
                  checkoutStep === "shipping"
                    ? "text-zinc-900 font-extrabold"
                    : "text-zinc-400"
                }`}
              >
                Delivery Info
              </span>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center shadow-xs max-w-xl mx-auto my-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300 mb-6">
              <ShoppingBag size={32} className="stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-bold text-zinc-800">
              Your cart is currently empty
            </h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              Looks like you haven&apos;t added any lifebooks to your cart yet.
              Explore our curated selection to get started.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                label="Browse Books"
                variant="solid"
                size="md"
                href="/books"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {checkoutStep === "shipping" && (
              <div className="flex items-center">
                <button
                  onClick={() => setCheckoutStep("review")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Order Review
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {checkoutStep === "review" ? (
                <>
                  {/* Left: Cart Items List */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
                      <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                        <span className="text-sm font-bold text-zinc-700">
                          Items ({cartCount})
                        </span>
                        <button
                          onClick={clearCart}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer hover:underline"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="divide-y divide-zinc-100">
                        {cartItems.map((item) => (
                          <div
                            key={item.slug}
                            className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                          >
                            <div className="flex gap-4 items-center flex-1">
                              <div className="relative aspect-3/4 w-16 sm:w-20 shrink-0 overflow-hidden bg-zinc-50 border border-zinc-100 rounded-xl">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-base font-bold text-zinc-900 leading-snug hover:text-primary transition-colors">
                                  <Link href={`/books/${item.slug}`}>
                                    {item.title}
                                  </Link>
                                </h3>
                                <p className="text-sm text-primary font-extrabold mt-1">
                                  Rs. {item.priceNpr.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                              {/* Qty controls */}
                              <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-1 shrink-0">
                                <button
                                  onClick={() => updateItemQty(item.slug, -1)}
                                  className="p-1.5 rounded-lg hover:bg-white text-zinc-600 cursor-pointer shadow-none hover:shadow-2xs transition-all"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} className="stroke-[2.5]" />
                                </button>
                                <span className="text-sm font-bold text-zinc-800 min-w-6 text-center select-none">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateItemQty(item.slug, 1)}
                                  className="p-1.5 rounded-lg hover:bg-white text-zinc-600 cursor-pointer shadow-none hover:shadow-2xs transition-all"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} className="stroke-[2.5]" />
                                </button>
                              </div>

                              <div className="text-right min-w-24 hidden sm:block">
                                <p className="text-base font-extrabold text-zinc-950">
                                  Rs.{" "}
                                  {(item.priceNpr * item.qty).toLocaleString()}
                                </p>
                              </div>

                              <button
                                onClick={() => removeItem(item.slug)}
                                className="p-2 rounded-full text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Summary */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
                      <h2 className="text-lg font-extrabold text-zinc-900 border-b border-zinc-100 pb-3">
                        Order Summary
                      </h2>
                      <div className="space-y-3 text-sm text-zinc-600">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-semibold text-zinc-800">
                            Rs. {cartSubtotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery</span>
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        </div>
                        <div className="border-t border-zinc-100 my-2 pt-3 flex justify-between items-baseline">
                          <span className="font-bold text-zinc-900 text-base">
                            Total
                          </span>
                          <span className="text-xl font-extrabold text-zinc-950">
                            Rs. {totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        label="Check out"
                        variant="solid"
                        size="md"
                        onClick={() => setCheckoutStep("shipping")}
                        className="w-full justify-center py-3 mt-4 text-center font-bold text-sm bg-primary text-white hover:bg-primary/95"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left: Shipping Form */}
                  <div className="space-y-6">
                    <DeliveryDetailForm
                      cartItems={cartItems}
                      totalAmount={totalAmount}
                      onSuccess={(order) => {
                        setLastOrder(order);
                        setCheckoutSuccess(true);
                      }}
                    />
                  </div>

                  {/* Right: Sticky Order Summary & Items Preview */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
                      <h2 className="text-lg font-extrabold text-zinc-900 border-b border-zinc-100 pb-3">
                        Order Summary
                      </h2>
                      <div className="space-y-3 text-sm text-zinc-600">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-semibold text-zinc-800">
                            Rs. {cartSubtotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery</span>
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        </div>
                        <div className="border-t border-zinc-100 my-2 pt-3 flex justify-between items-baseline">
                          <span className="font-bold text-zinc-900 text-base">
                            Total
                          </span>
                          <span className="text-xl font-extrabold text-zinc-950">
                            Rs. {totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
                      <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider border-b border-zinc-100 pb-2">
                        Items Review ({cartCount})
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                          <div
                            key={item.slug}
                            className="flex gap-3 items-center"
                          >
                            <div className="relative aspect-3/4 w-10 shrink-0 overflow-hidden bg-zinc-50 border border-zinc-100 rounded-md">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-zinc-900 truncate">
                                {item.title}
                              </h4>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                Rs. {item.priceNpr.toLocaleString()}{" "}
                                <span className="text-zinc-400">
                                  x{item.qty}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {checkoutSuccess && lastOrder && (
        <DeliveryPopupModal
          isOpen={checkoutSuccess}
          onClose={() => {
            setCheckoutSuccess(false);
            setCheckoutStep("review");
          }}
          orderDetails={lastOrder}
        />
      )}
    </main>
  );
}
