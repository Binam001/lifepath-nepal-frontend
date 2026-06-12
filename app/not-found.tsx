"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Hide scrollbar when component mounts
    document.body.style.overflow = "hidden";

    // Restore scrollbar when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/404/404-img.webp"
            alt="404 background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Text */}
          <h1 className="text-white text-2xl md:text-3xl font-light mb-12 max-w-2xl mx-auto">
            This page went missing
            <br /> in another galaxy.
          </h1>

          {/* 404 with glow effect */}
          <div className="relative mb-16">
            {/* 404 Text */}
            <h2 className="text-8xl md:text-9xl font-extrabold text-white relative z-10">
              404
            </h2>
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          </div>

          {/* Back to Homepage button */}
          <Link href="/" onClick={handleClick}>
            <button
              className="px-8 py-3 border-2 border-white text-white rounded-full bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-600 hover:border-white/50 transition-all duration-300 text-sm uppercase cursor-pointer tracking-wider font-medium flex items-center justify-center gap-2 min-w-70"
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isLoading
                ? "Travelling back..."
                : "No worries, we'll guide you home"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
