"use client";

import Image from "next/image";
import React, { useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type PreloaderProps = {
  children: React.ReactNode;
};

const Preloader = ({ children }: PreloaderProps) => {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return sessionStorage.getItem("hasPreloaderShown") === "true";
  });
  const [animating, setAnimating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const doorRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mainRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = (index: number) => {
    if (animating) return;

    const video = videoRefs.current[index];
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleMouseLeave = (index: number) => {
    if (animating) return;

    const video = videoRefs.current[index];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  const handleClick = (index: number) => {
    if (animating) return;

    const door = doorRefs.current[index];
    const video = videoRefs.current[index];
    if (!door) return;

    setAnimating(true);
    sessionStorage.setItem("hasPreloaderShown", "true");

    if (video) {
      video.play().catch(() => {});
    }

    const tl = gsap.timeline();

    tl.to(door, {
      zIndex: 2000,
      scale: 8,
      duration: 1,
      ease: "power3.inOut",
      transformOrigin: "center center",
      onComplete: () => {
        setEntered(true);

        if (pathname !== "/") {
          router.push("/");
        }
      },
    })
      .to(
        mainRef.current,
        {
          opacity: 0.1,
        },
        "<",
      )
      .to(
        door,
        {
          opacity: 1,
          duration: 0.5,
        },
        ">",
      );
  };

  if (!isClient) return null;

  return (
    <>
      {!entered && (
        <main
          ref={mainRef}
          className="fixed inset-0 z-1000 flex min-h-screen flex-col bg-white px-6"
        >
          <div className="flex flex-col items-center gap-20 pt-10">
            <Image
              src="/Lifepath/Asset1.png"
              alt="Lifepath"
              width={200}
              height={100}
            />
          </div>

          <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h2 className="text-center text-4xl font-bold text-blue-500">
              You&apos;ve come to the right place
            </h2>

            <div className="flex gap-12 ">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  ref={(el) => {
                    doorRefs.current[index] = el;
                  }}
                  type="button"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => handleClick(index)}
                  className="relative overflow-hidden"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src="/videos/door.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="h-40 w-28 object-cover md:h-160 md:w-200"
                  />
                </button>
              ))}
            </div>
          </div>
        </main>
      )}

      {entered && children}
    </>
  );
};

export default Preloader;
