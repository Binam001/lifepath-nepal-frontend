"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "../ui/PageTitle";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

const AboutSupport = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const items = [
    {
      src: "/heroImages/future-kid-1.webp",
      label: "Their Future",
      description:
        "Your support provides scholarships and educational supplies to children in need across Nepal.",
    },
    {
      src: "/heroImages/future-dream-1.webp",
      label: "Their Dream",
      description:
        "Empower youth with job training, mentorship, and practical digital skills to pursue their dream careers.",
    },
    {
      src: "/heroImages/job-opportunity-1.webp",
      label: "Their Career",
      description:
        "Help individuals prepare for real-world jobs, gain internship experience, and build a secure path to employment.",
    },
  ];

  return (
    <section className="relative px-4 md:px-8 py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <PageTitle
          containerClassName="max-w-6xl mx-auto"
          title="Your Support, Their Opportunity"
          titleClassName="text-3xl md:text-5xl xl:text-5xl"
          subtitle="Every contribution directly empowers individuals. See how your support translates into real education, structured mentorship, and stable career paths for people across Nepal."
          subtitleClassName="md:max-w-[80%] mx-auto mt-4 text-zinc-600 text-base md:text-lg"
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[28px] h-[70vh] md:h-[50vh] xl:h-[70vh] w-full cursor-pointer ${
                  index === 2 && "md:col-span-2 xl:col-span-1"
                }`}
                onClick={() => {
                  if (isMobile) {
                    setActiveIndex((prev) => (prev === index ? null : index));
                  }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className={`object-cover object-top transition-transform duration-700 z-10 ${
                    isOpen ? "scale-105" : "group-hover:scale-105"
                  }`}
                />

                {/* Glassmorphic Card Content */}
                <div className="absolute inset-0 z-30 flex items-end p-4 pointer-events-none overflow-hidden">
                  <div
                    className={`relative w-full max-w-full rounded-[24px] border border-white/15 bg-white/10 px-6 py-6 backdrop-blur-md transition-all duration-500 ${
                      isOpen ? "min-h-36" : "min-h-16 group-hover:min-h-36"
                    }`}
                  >
                    {/* Header (visible when not hovered / not active) */}
                    <div
                      className={`transition-all duration-500 flex justify-between items-center text-white ${
                        isOpen
                          ? "-translate-y-6 opacity-0"
                          : "group-hover:-translate-y-6 group-hover:opacity-0"
                      }`}
                    >
                      <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                        {item.label}
                      </h3>
                      <ChevronUp />
                    </div>

                    {/* Description (visible when hovered / active) */}
                    <div
                      className={`absolute inset-0 px-6 py-6 transition-all duration-500 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      <div className="w-12 h-px mb-4 bg-white" />
                      <p className="text-sm md:text-base leading-relaxed text-white max-w-[32ch]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSupport;
