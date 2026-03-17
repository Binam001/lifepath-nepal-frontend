"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
// import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0; // optional: reset video
  };
  return (
    <section className="overflow-hidden bg-white px-4 pt-16 pb-14 md:px-0 min-h-screen">
      <div className="max-w-7xl mx-auto grid items-center gap-12 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold font-montserrat text-blue-700 sm:text-5xl lg:text-5xl pt-8 sm:pt-8">
              Don&apos;t Just Choose a Career. Discover Your Direction.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-700 font-medium md:text-base">
              A platform designed to guide students toward meaningful careers.
              Get mentorship, practical training, and clarity about your future
              so you can build the life you truly want.
            </p>
          </div>

          <div className="flex flex-col justify-start gap-3 pt-2 sm:flex-row">
            <Link href="/personality-test">
              <button className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 sm:w-auto">
                Discover Your Career Path
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </Link>
            <Link href="/job-training">
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-zinc-300 bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 sm:w-auto">
                Explore Job Training
              </button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl h-full">
          <div
            className="relative overflow-hidden flex h-full items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              src="/videos/door.mp4"
              className="w-full h-150 object-contain"
              muted
              playsInline
            />
          </div>
          {/* <div className="relative overflow-hidden flex h-full items-center">
            <Image
              src="/heroImages/door.png"
              alt="Student planning a career path"
              width={736}
              height={510}
              className="h-150 w-full object-contain"
              priority
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
