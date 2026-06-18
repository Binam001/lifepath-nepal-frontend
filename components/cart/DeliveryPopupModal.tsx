import React from "react";
import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import Button from "../shared/Button";

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

interface DeliveryPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails;
}

export default function DeliveryPopupModal({
  isOpen,
  onClose,
  orderDetails,
}: DeliveryPopupModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-300"
      data-lenis-prevent
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="bg-primary/5 border-b border-zinc-100 p-6 text-center relative">
          <div className="mx-auto mb-4]2 flex size-14 items-center justify-center rounded-full bg-green-100 border border-green-200">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Thank you for your purchase. We have received your order request and
            will contact you shortly to confirm delivery details.
          </p>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto pr-6">
          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Order Summary
            </h3>
            <div className="space-y-3">
              {orderDetails.items.map((item) => (
                <div
                  key={item.slug}
                  className="flex justify-between items-center text-sm text-zinc-800"
                >
                  <span className="font-medium">
                    {item.title}{" "}
                    <span className="text-zinc-400 text-xs">x {item.qty}</span>
                  </span>
                  <span className="font-semibold">
                    Rs. {(item.priceNpr * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t border-zinc-100 pt-3 flex justify-between items-baseline">
                <span className="font-bold text-zinc-900">Total Paid</span>
                <span className="text-xl font-extrabold text-primary">
                  Rs. {orderDetails.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Delivery Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-700">
              <div>
                <span className="block text-xs text-zinc-400 font-semibold uppercase">
                  Customer
                </span>
                <span className="font-semibold text-zinc-900">
                  {orderDetails.name}
                </span>
              </div>
              <div>
                <span className="block text-xs text-zinc-400 font-semibold uppercase">
                  Phone
                </span>
                <span className="font-semibold text-zinc-900">
                  {orderDetails.phone}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-xs text-zinc-400 font-semibold uppercase">
                  Address
                </span>
                <span className="font-semibold text-zinc-900">
                  {orderDetails.address}
                </span>
              </div>
              {orderDetails.email && (
                <div>
                  <span className="block text-xs text-zinc-400 font-semibold uppercase">
                    Email
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {orderDetails.email}
                  </span>
                </div>
              )}
              <div>
                <span className="block text-xs text-zinc-400 font-semibold uppercase">
                  Payment Method
                </span>
                <span className="font-semibold text-zinc-900 uppercase">
                  {orderDetails.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Fonepay / Digital"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="p-8 border-t border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            label="Back to Books"
            variant="outline"
            size="md"
            href="/books"
            onClick={onClose}
            className="w-full sm:w-auto font-bold"
          />
          <Button
            label="Go Home"
            variant="solid"
            size="md"
            href="/"
            onClick={onClose}
            className="w-full sm:w-auto font-bold"
          />
        </div> */}
      </div>
    </div>
  );
}
