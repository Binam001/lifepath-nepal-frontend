"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import PageTitle from "../ui/PageTitle";
import { z } from "zod";
import {
  User,
  Mail,
  MapPin,
  Camera,
  QrCode,
  X,
  Info,
  FileText,
  CheckCheck,
  Coins,
  Heart,
} from "lucide-react";

const maxFileSize = 2 * 1024 * 1024; // 2 MB

const donationFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(6, "Full name must be at least 6 characters."),

  email: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || z.string().email().safeParse(value).success,
      "Enter a valid email.",
    ),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),

  address: z.string().trim().min(3, "Address is required."),

  amount: z
    .string()
    .trim()
    .min(1, "Donation amount is required")
    .refine((value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    }, "Please enter a valid positive donation amount"),

  photo: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, or WEBP images are allowed.",
    )
    .refine(
      (file) => !file || file.size <= maxFileSize,
      "Photo must be 2 MB or smaller.",
    ),

  screenshot: z
    .instanceof(File, { message: "Payment screenshot is required." })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, or WEBP images are allowed.",
    )
    .refine(
      (file) => file.size <= maxFileSize,
      "Screenshot must be 2 MB or smaller.",
    ),
});

const donationDetails = [
  {
    point:
      "We offer educational materials and learning resources to support learning.",
  },
  {
    point:
      "We provide scholarships and educational support to deserving individuals.",
  },
  {
    point:
      "We create opportunities for skill development and better employment.",
  },
  { point: "We use every donation responsibly to maximize its impact." },
  { point: "We support only verified beneficiaries and trusted initiatives." },
  { point: "We share regular updates and reports on donation usage." },
  {
    point: "We work with our community to create positive change across Nepal.",
  },
];

export default function DonationFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    amount: "",
    photo: null as File | null,
    screenshot: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showQR, setShowQR] = useState(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [isDraggingScreenshot, setIsDraggingScreenshot] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, phone: val }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, amount: val }));
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "photo" | "screenshot",
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [type]: "Only JPG, PNG, or WEBP images are allowed.",
        }));
        e.target.value = "";
        return;
      }
      if (file.size > maxFileSize) {
        setErrors((prev) => ({
          ...prev,
          [type]: `${type === "photo" ? "Photo" : "Screenshot"} must be 2 MB or smaller.`,
        }));
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({ ...prev, [type]: file }));
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const handleDragOver = (e: React.DragEvent, type: "photo" | "screenshot") => {
    e.preventDefault();
    if (type === "photo") setIsDraggingPhoto(true);
    else setIsDraggingScreenshot(true);
  };

  const handleDragLeave = (type: "photo" | "screenshot") => {
    if (type === "photo") setIsDraggingPhoto(false);
    else setIsDraggingScreenshot(false);
  };

  const handleDrop = (e: React.DragEvent, type: "photo" | "screenshot") => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [type]: "Only JPG, PNG, or WEBP images are allowed.",
        }));
        if (type === "photo") setIsDraggingPhoto(false);
        else setIsDraggingScreenshot(false);
        return;
      }
      if (file.size > maxFileSize) {
        setErrors((prev) => ({
          ...prev,
          [type]: `${type === "photo" ? "Photo" : "Screenshot"} must be 2 MB or smaller.`,
        }));
        if (type === "photo") setIsDraggingPhoto(false);
        else setIsDraggingScreenshot(false);
        return;
      }
      setFormData((prev) => ({ ...prev, [type]: file }));
      setErrors((prev) => ({ ...prev, [type]: "" }));

      const inputRef = type === "photo" ? photoInputRef : screenshotInputRef;
      if (inputRef.current) {
        const transfer = new DataTransfer();
        transfer.items.add(file);
        inputRef.current.files = transfer.files;
      }
    }
    if (type === "photo") setIsDraggingPhoto(false);
    else setIsDraggingScreenshot(false);
  };

  const validateForm = () => {
    const validationResult = donationFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="relative px-4 md:px-8 py-8 xl:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <PageTitle
          containerClassName="max-w-6xl mx-auto"
          title="Support Someone Today"
          titleClassName="text-3xl md:text-5xl xl:text-5xl"
          subtitle="Your contribution, no matter the size, helps us continue supporting individuals and families who need assistance."
          subtitleClassName="md:max-w-[80%] mx-auto mt-4 text-zinc-600 text-base md:text-lg"
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12 items-start">
          {/* donation details */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="space-y-6">
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Heart size={24} className="text-blue-500" />
                Why Support Us?
              </h2>
              <div className="space-y-4">
                {donationDetails.map((item, index) => (
                  <div key={index} className="flex items-start gap-3.5">
                    <CheckCheck className="mt-1 h-5 w-5 text-blue-500 shrink-0" />
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {item.point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* donation form */}
          <div className="flex flex-col gap-4 rounded-2xl">
            <div className="bg-blue-50/50 rounded-3xl p-2 sm:p-4 border border-blue-100/40">
              <div className="rounded-2xl border border-zinc-200 bg-white/95 p-4 sm:p-8 shadow-xs">
                <h3 className="mb-6 text-xl font-bold text-zinc-900">
                  Donation Form
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                        size={18}
                      />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="placeholder-zinc-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Email Address{" "}
                      <span className="text-zinc-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                        size={18}
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        className="placeholder-zinc-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex overflow-hidden rounded-lg border border-zinc-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-colors">
                      <div className="relative shrink-0 border-r border-zinc-300">
                        <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-700">
                          <Image
                            src="/flags/Nepal.png"
                            alt="Nepal flag"
                            width={16}
                            height={16}
                            className="h-4 w-auto object-contain"
                          />
                          <span className="text-sm pt-0.5">+977</span>
                        </div>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        id="phone"
                        name="phone"
                        placeholder="9812345678"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="placeholder-zinc-400 w-full min-w-0 px-3 py-2.5 focus:outline-none"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                        size={18}
                      />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Your address (e.g. Kathmandu, Lalitpur)"
                        className="placeholder-zinc-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500 font-medium">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Amount */}
                  <div>
                    <label
                      htmlFor="amount"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Donation Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500 font-semibold text-sm">
                        NRs.
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleAmountChange}
                        placeholder="e.g. 5000"
                        className="placeholder-zinc-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-14 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-500 font-medium">
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* Photo (optional) */}
                  <div>
                    <label
                      htmlFor="photo"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Your Photo{" "}
                      <span className="text-zinc-400">(optional)</span>
                    </label>
                    <div
                      onDragOver={(e) => handleDragOver(e, "photo")}
                      onDragLeave={() => handleDragLeave("photo")}
                      onDrop={(e) => handleDrop(e, "photo")}
                      className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${
                        errors.photo
                          ? "border-red-400 bg-red-50/5"
                          : isDraggingPhoto
                            ? "border-blue-500 bg-blue-50"
                            : "border-zinc-300 bg-white"
                      }`}
                    >
                      <div className="space-y-1 text-center">
                        <Camera
                          className="mx-auto h-10 w-10 text-zinc-400"
                          strokeWidth={1}
                        />
                        <div className="flex items-center justify-center text-sm text-zinc-600">
                          <label
                            htmlFor="photo"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              ref={photoInputRef}
                              id="photo"
                              name="photo"
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={(e) => handleFileChange(e, "photo")}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 hidden sm:block">
                            or drag and drop
                          </p>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {formData.photo
                            ? formData.photo.name
                            : "JPG, PNG, WEBP (max 2 MB)"}
                        </p>
                      </div>
                    </div>
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-500 font-medium">
                        {errors.photo}
                      </p>
                    )}
                  </div>

                  {/* Scan to Pay instruction & button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 mt-4">
                    <p className="flex-1 text-sm tracking-tight text-zinc-600">
                      Scan QR code to pay with eSewa, Fonepay, or IPS Connect.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowQR(true)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shrink-0"
                    >
                      <QrCode size={16} />
                      View QR
                    </button>
                  </div>

                  {/* Payment Screenshot (required) */}
                  <div>
                    <label
                      htmlFor="screenshot"
                      className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                      Payment Screenshot <span className="text-red-500">*</span>
                    </label>
                    <div
                      onDragOver={(e) => handleDragOver(e, "screenshot")}
                      onDragLeave={() => handleDragLeave("screenshot")}
                      onDrop={(e) => handleDrop(e, "screenshot")}
                      className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${
                        errors.screenshot
                          ? "border-red-400 bg-red-50/5"
                          : isDraggingScreenshot
                            ? "border-blue-500 bg-blue-50"
                            : "border-zinc-300 bg-white"
                      }`}
                    >
                      <div className="space-y-1 text-center">
                        <FileText
                          className="mx-auto h-10 w-10 text-zinc-400"
                          strokeWidth={1}
                        />
                        <div className="flex items-center justify-center text-sm text-zinc-600">
                          <label
                            htmlFor="screenshot"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              ref={screenshotInputRef}
                              id="screenshot"
                              name="screenshot"
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={(e) =>
                                handleFileChange(e, "screenshot")
                              }
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 hidden sm:block">
                            or drag and drop
                          </p>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {formData.screenshot
                            ? formData.screenshot.name
                            : "JPG, PNG, WEBP (max 2 MB)"}
                        </p>
                      </div>
                    </div>
                    {errors.screenshot && (
                      <p className="mt-1 text-sm text-red-500 font-medium">
                        {errors.screenshot}
                      </p>
                    )}
                  </div>

                  {/* Donate Button */}
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-full bg-blue-600 px-4 py-3 text-base font-bold text-white transition-colors hover:bg-blue-700 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                  >
                    Donate Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 rounded-full p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
            >
              <X size={20} />
            </button>
            <p className="mb-4 text-center text-sm font-semibold text-zinc-700">
              Scan QR to Make Donation
            </p>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-zinc-200">
              <Image
                src="/QR/Lifepath_QR.jpeg"
                alt="Payment QR Code"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm py-4 flex gap-2 text-zinc-600">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <span>
                Please write <strong>Your Name</strong> in the payment remarks.
              </span>
            </p>
            <button
              type="button"
              onClick={() => setShowQR(false)}
              className="w-full rounded-full bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCheck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-800">
              Thank You for Your Support!
            </h3>
            <p className="mb-6 text-zinc-600 text-sm leading-relaxed">
              Your donation application has been submitted successfully. We will
              verify the transaction and update our contributor records shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  address: "",
                  amount: "",
                  photo: null,
                  screenshot: null,
                });
                if (photoInputRef.current) photoInputRef.current.value = "";
                if (screenshotInputRef.current)
                  screenshotInputRef.current.value = "";
              }}
              className="w-full rounded-full bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
