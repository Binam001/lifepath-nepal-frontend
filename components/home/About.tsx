"use client";

import Image from "next/image";
import Button from "../shared/Button";

export default function StorySection() {
  const stats = [
    // { number: "2000+", label: "Students Guided" },
    { number: "4", label: "Personality Tests" },
    { number: "6", label: "Career Roadmaps" },
    { number: "8", label: "Job Opportunities" },
  ];
  return (
    <section className="relative py-8 xl:py-0">
      <div className="relative max-w-7xl mx-auto h-auto px-4 md:px-8 xl:px-0 flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left gap-4 md:gap-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="w-fit text-xs font-semibold uppercase tracking-wider text-black bg-black/10 rounded-full px-4 py-2">
              About LifePath
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary">
              Know More About Us
            </h2>
            <h2 className="text-lg font-normal text-zinc-500">
              LifePath helps students discover the right career path. We help
              you understand your strengths through personality assessments,
              build practical skills with training programs, and prepare for
              future job opportunities.
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-5xl font-bold text-black">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-zinc-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Button
            label="Learn More About Us"
            href="/about-us"
            className="w-full! md:w-fit!"
            icon="ArrowRight"
          />
        </div>

        {/* Right side: About content */}
        <div className="w-full  md:w-1/2 relative flex justify-center items-center">
          <div className="relative flex flex-col items-center z-20">
            <Image
              src="/assets/about_img.png"
              alt="Student with career clarity"
              width={800}
              height={800}
              className="w-108 md:w-160 rounded-xl object-contain"
            />

            {/* <div className="bg-blue-50 px-16 py-2 rounded-full">
              <p className="text-primary font-medium text-sm">People loved</p>
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
                <div className="text-3xl md:text-5xl font-bold text-primary mb-2">
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
