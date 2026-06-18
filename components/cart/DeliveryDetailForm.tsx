import React, { useState } from "react";
import Button from "../shared/Button";
import { MapPin, Phone, Truck, User, Mail, CreditCard } from "lucide-react";

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

interface DeliveryDetailFormProps {
  cartItems: CartItem[];
  totalAmount: number;
  onSuccess: (order: OrderDetails) => void;
}

const DeliveryDetailForm = ({
  cartItems,
  totalAmount,
  onSuccess,
}: DeliveryDetailFormProps) => {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      const order: OrderDetails = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        paymentMethod: formData.paymentMethod,
        items: [...cartItems],
        total: totalAmount,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Save orders history to localStorage
      const existingOrders = localStorage.getItem("lifepath_orders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem("lifepath_orders", JSON.stringify(orders));

      // Clear Cart from localStorage
      localStorage.removeItem("lifepath_cart");
      window.dispatchEvent(new Event("lifepath_cart_update"));

      setIsSubmitting(false);
      onSuccess(order);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
      <h2 className="text-lg font-extrabold text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2">
        <Truck className="h-5 w-5 text-primary" />
        Delivery Information
      </h2>
      <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
        {/* Name field */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1"
          >
            Full Name *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <User size={16} />
            </span>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.name
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500"
                  : "border-zinc-200"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-rose-500 text-xs mt-1 font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1"
          >
            Phone Number *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Phone size={16} />
            </span>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="98XXXXXXXX"
              className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.phone
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500"
                  : "border-zinc-200"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-rose-500 text-xs mt-1 font-medium">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address field */}
        <div>
          <label
            htmlFor="address"
            className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1"
          >
            Delivery Address *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <MapPin size={16} />
            </span>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="City, Area, Street Name"
              className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.address
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500"
                  : "border-zinc-200"
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-rose-500 text-xs mt-1 font-medium">
              {errors.address}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1"
          >
            Email Address (Optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1"
          >
            Payment Method
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <CreditCard size={16} />
            </span>
            <select
              name="paymentMethod"
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full pl-9 pr-8 py-2.5 border border-zinc-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer font-medium text-zinc-700"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="fonepay">
                Fonepay / Digital Wallet (On Delivery)
              </option>
            </select>
          </div>
        </div>

        <Button
          // type="submit"
          label={
            isSubmitting ? (
              <span className="flex items-center gap-2 justify-center">
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                Confirm & Place Order
              </span>
            )
          }
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full py-3 mt-4 text-center justify-center font-bold text-sm bg-primary hover:bg-primary/95 text-white"
        />
      </form>
    </div>
  );
};

export default DeliveryDetailForm;
