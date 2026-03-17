"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StorySection() {
  const stats = [
    // { number: "2000+", label: "Students Guided" },
    { number: "16", label: "Personality Types" },
    { number: "10+", label: "Career Paths" },
    { number: "100%", label: "Success Rate" },
  ];
  return (
    <section className="relative">
      <div className="relative max-w-7xl mx-auto min-h-screen px-4 py-4 sm:px-6 lg:px-0 flex flex-col sm:flex-row gap-12 justify-center items-center">
        {/* Left side: 4 images */}
        <div className="w-full px-2 items-center sm:items-start sm:w-1/2 flex flex-col justify-center gap-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
            About LifePath
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-600 ">
            Know More about us
          </h2>
          <h2 className="text-xl text-wrap md:text-xl font-normal text-zinc-500 ">
            LifePath helps students discover the right career path. We help you
            understand your strengths through personality assessments, build
            practical skills with training programs, and prepare for future job
            opportunities.
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-5xl font-bold text-blue-600">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-zinc-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {/* <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-8">
            LifePath is a comprehensive career guidance platform designed to
            guide students toward meaningful careers. We help you discover your
            ideal career path through personality assessments, build practical
            skills with our job-training programs, and prepare you for future
            job demand.
          </p> */}
          <Link href="/about-us" className="flex">
            <button className="group flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-blue-50 shadow-lg transition-all cursor-pointer hover:shadow-blue-500/50">
              Learn More About Us
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </Link>
        </div>

        {/* Right side: About content */}
        <div className="w-full  sm:w-1/2 relative flex justify-center items-center">
          {/* Blue circle background */}
          {/* <div className="absolute w-60 h-60 rounded-full sm:w-110 sm:h-110 sm:rounded-full bg-linear-to-t from-blue-50 to-blue-600 flex justify-center items-center z-10 " /> */}

          {/* Image + badge */}
          <div className="relative flex flex-col items-center z-20 ">
            <Image
              src="/assets/about_img.png"
              alt="Student with career clarity"
              width={800}
              height={800}
              className="w-108 sm:w-160 rounded-xl object-contain"
            />

            {/* <div className="bg-blue-50 px-16 py-2 rounded-full">
              <p className="text-blue-600 font-medium text-sm">People loved</p>
            </div> */}
          </div>
        </div>
      </div>
      {/* Stats Section */}
      {/* <section className="py-16 px-4 bg-zinc-100 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-zinc-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </section>
  );
}
