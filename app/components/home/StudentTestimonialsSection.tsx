"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import PageTitle from "../ui/PageTitle";

const testimonials = [
  {
    id: 1,
    name: "Alish Maharjan",
    role: "Creative Designer",
    video: "/videos/Alish-1.mp4",
    quote: "LifePath helped me discover my true potential",
    caption: "I found my dream career path through LifePath",
  },
  {
    id: 2,
    name: "Krishma Maharjan",
    role: "UX Designer",
    video: "/videos/Krishma.mp4",
    quote: "The personality test was eye-opening",
    caption: "First of all, it's safe and accurate",
  },
  {
    id: 3,
    name: "Zidan Chaudary",
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

  const translatePercentage =
    itemsPerView === 1
      ? currentIndex * 100
      : currentIndex * (100 / itemsPerView + 2);

  return (
    <section className="py-8 px-4 md:px-0">
      <div className="max-w-7xl mx-auto mb-16">
        {/* Section Header */}
        <PageTitle
          title=" Real Students. Real Journeys."
          subtitle="Real stories from students who found clarity and direction."
          titleClassName="text-3xl md:text-4xl  font-semibold text-zinc-900 mb-2"
          subtitleClassName="text-lg text-zinc-600"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />

        {/* Testimonial Carousel */}
        <div className="relative mt-4 md:mt-16">
          {/* Navigation Buttons - Hidden on mobile */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`hidden sm:flex absolute left-0 top-1/2 -tranzinc-y-1/2 -tranzinc-x-4 lg:-tranzinc-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg items-center justify-center transition-all ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600 hover:text-white"
                }`}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`hidden sm:flex absolute right-0 top-1/2 -tranzinc-y-1/2 tranzinc-x-4 lg:tranzinc-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg items-center justify-center transition-all ${
                  currentIndex >= maxIndex
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600 hover:text-white"
                }`}
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} className="lg:w-6 lg:h-6" />
              </button>
            </>
          )}

          {/* Testimonials Grid */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${translatePercentage}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="group relative h-96 sm:h-125 lg:h-137.5 rounded-2xl sm:rounded-3xl overflow-hidden bg-blue-500 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-600/20">
                    {/* Video Background */}
                    <div className="absolute inset-0 transition-transform duration-500 ">
                      <video
                        src={testimonial.video}
                        className="absolute inset-0 h-[80vh] w-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />

                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20"></div>

                      {/* Subtle Blue Overlay on Hover */}
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300"></div>
                    </div>

                    {/* Play Button with Enhanced Design */}
                    <button
                      onClick={() => handlePlayVideo(testimonial.id)}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Play ${testimonial.name}'s testimonial`}
                    >
                      <div className="relative">
                        {/* Pulsing Ring */}
                        <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/30 animate-ping"></div>

                        {/* Main Play Button */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:bg-blue-600 transition-all duration-300">
                          <Play
                            size={28}
                            className="sm:w-8 sm:h-8 text-blue-600 group-hover:text-white ml-1 transition-colors"
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
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600/90 backdrop-blur-sm rounded-full">
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
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
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

          {/* Dots Indicator */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsPlaying(null);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-blue-600 w-6 sm:w-8"
                      : "bg-zinc-300 hover:bg-zinc-400 w-2"
                  }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
