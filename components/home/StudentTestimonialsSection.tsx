"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import PageTitle from "../ui/PageTitle";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Alish Maharjan",
    thumbnail: "/students/alish_img.jpeg",
    role: "Creative Designer",
    video: "/videos/Alish-1.mp4",
    quote: "LifePath helped me discover my true potential",
    caption: "I found my dream career path through LifePath",
  },
  {
    id: 2,
    name: "Krishma Maharjan",
    thumbnail: "/students/krishma.jpeg",
    role: "UX Designer",
    video: "/videos/Krishma.mp4",
    quote: "The personality test was eye-opening",
    caption: "First of all, it's safe and accurate",
  },
  {
    id: 3,
    name: "Zidan Chaudary",
    thumbnail: "/students/Zidan.png",
    role: "Data Analyst",
    video: "/videos/Zidan.mp4",
    quote: "Career guidance at its best",
    caption: "The concept of LifePath changed my life",
  },
];

export default function StudentTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(3); // Desktop
      }
      setCurrentIndex(0); // Reset to first slide on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrevious = () => {
    setIsPlaying(null);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(null);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handlePlayVideo = (id: number) => {
    setIsPlaying(id);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchEndX.current = null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (swipeDistance > minSwipeDistance) {
      handleNext();
    } else if (swipeDistance < -minSwipeDistance) {
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const transformStyle =
    itemsPerView === 1
      ? `translateX(calc(-${currentIndex} * (100% + 1rem)))`
      : itemsPerView === 2
        ? `translateX(calc(-${currentIndex} * (50% + 0.75rem)))`
        : `translateX(calc(-${currentIndex} * (33.333% + 0.5rem)))`;

  return (
    <section className="px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <PageTitle
          title=" Real Students. Real Journeys."
          subtitle="Real stories from students who found clarity and direction."
          titleClassName="text-3xl md:text-5xl"
          subtitleClassName="text-base md:text-lg text-zinc-700"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />

        {/* Testimonial Carousel */}
        <div className="relative mt-8 md:mt-16">
          {/* Testimonials Grid */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-4 xl:gap-8"
              style={{
                transform: transformStyle,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="group relative h-120 sm:h-125 lg:h-137.5 rounded-2xl sm:rounded-3xl overflow-hidden bg-primary cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                    {/* Video Background */}
                    <div className="absolute inset-0 transition-transform duration-500 ">
                      <video
                        src={testimonial.video}
                        className="absolute inset-0 h-full w-full object-cover"
                        muted
                        loop
                        playsInline
                      />

                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20">
                        <Image
                          alt="Lifepath Nepal"
                          src={testimonial.thumbnail}
                          height={1000}
                          width={500}
                          className="h-full object-cover"
                        />
                      </div>

                      {/* Subtle Blue Overlay on Hover */}
                      {/* <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div> */}
                    </div>

                    {/* Play Button with Enhanced Design */}
                    <button
                      onClick={() => handlePlayVideo(testimonial.id)}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Play ${testimonial.name}'s testimonial`}
                    >
                      <div className="relative">
                        {/* Pulsing Ring */}
                        <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/30 animate-ping"></div>

                        {/* Main Play Button */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:bg-primary transition-all duration-300">
                          <Play
                            size={28}
                            className="sm:w-8 sm:h-8 text-primary group-hover:text-white ml-1 transition-colors"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </button>

                    {isPlaying === testimonial.id && (
                      <div className="absolute inset-0 z-20 bg-black/60">
                        <video
                          src={testimonial.video}
                          className="absolute inset-0 h-full w-full bg-black object-cover object-top [&:fullscreen]:object-contain"
                          controls
                          autoPlay
                          playsInline
                          controlsList="nodownload noplaybackrate noremoteplayback"
                          disablePictureInPicture
                          disableRemotePlayback
                          onContextMenu={(event) => event.preventDefault()}
                          onEnded={() => setIsPlaying(null)}
                        />
                      </div>
                    )}

                    {/* Quote Badge */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/90 backdrop-blur-sm rounded-full">
                      <span className="text-white text-xs font-semibold">
                        Success Story
                      </span>
                    </div>

                    {/* Caption/Quote with Enhanced Design */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white bg-linear-to-t from-black/95 via-black/80 to-transparent">
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-base sm:text-lg lg:text-xl font-bold leading-tight group-hover:text-blue-300 transition-colors">
                          &quot;{testimonial.caption}&quot;
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-xs sm:text-sm">
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-zinc-300">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls (Dots + Nav Buttons) */}
          {maxIndex > 0 && (
            <div className="w-full flex items-center justify-center gap-4 mt-6 sm:mt-8">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-zinc-200 transition-all ${
                  currentIndex === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "text-zinc-700 hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer"
                }`}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsPlaying(null);
                      setCurrentIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-6 sm:w-8"
                        : "bg-zinc-300 hover:bg-zinc-400 w-2 cursor-pointer"
                    }`}
                    aria-label={`Go to testimonial group ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-zinc-200 transition-all ${
                  currentIndex >= maxIndex
                    ? "opacity-40 cursor-not-allowed"
                    : "text-zinc-700 hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer"
                }`}
                aria-label="Next testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
