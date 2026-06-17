"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import PageTitle from "../ui/PageTitle";

gsap.registerPlugin(ScrollTrigger);

export default function QrSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!imageRef.current || !circleRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "back.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: circleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const stats = [
    { number: "10K+", label: "Students Guided" },
    { number: "3M+", label: "Donated Money" },
  ];

  return (
    <section ref={sectionRef} className="relative py-8 xl:py-16">
      <div className="max-w-7xl mx-auto">
        <PageTitle
          containerClassName="max-w-6xl mx-auto"
          title="Support Someone Today"
          titleClassName="text-3xl md:text-5xl xl:text-5xl"
          subtitle="Your contribution, no matter the size, helps us continue supporting individuals and families who need assistance."
          subtitleClassName="md:max-w-[80%] mx-auto mt-4 text-zinc-600 text-base md:text-lg"
        />

        <div className="mt-16 flex items-center justify-center">
          {/* <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-zinc-800">
                Direct Donation via QR Code
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Scan the QR code on the right with your preferred mobile banking
                or digital wallet app (eSewa, Khalti, Fonepay, IPS, etc.) to make
                a secure donation instantly.
              </p>
            </div>

            <div className="space-y-4 bg-zinc-50 border border-zinc-100 p-6 rounded-2xl">
              <h4 className="font-semibold text-zinc-700">How to Donate:</h4>
              <ol className="space-y-3 text-sm text-zinc-600 list-decimal pl-5">
                <li>Open your mobile banking or digital wallet app.</li>
                <li>Tap on the QR scanner tool.</li>
                <li>Scan the QR code shown on the right.</li>
                <li>Enter your donation amount and complete the payment.</li>
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* RIGHT SIDE: The QR Image in a Circle */}
          <div className="flex justify-center items-center">
            {/* Main Circle Container */}
            <div
              ref={circleRef}
              className="group relative size-[65vw] sm:size-[55vw] md:size-[45vw] xl:size-[25vw] flex items-center justify-center cursor-pointer"
            >
              {/* 1. FULL BACKGROUND CIRCLE (Sits behind everything) */}
              <div className="absolute inset-0 rounded-full bg-primary z-0" />

              {/* 2. THE TALL CLIPPING STAGE (Clips Left, Right, Bottom; Top is open) */}
              <div className="absolute -top-full bottom-0 left-0 right-0 overflow-hidden rounded-b-full pointer-events-none z-10">
                {/* This inner div is the exact same size as the circle, used for positioning */}
                <div className="absolute bottom-0 left-0 right-0 size-[65vw] sm:size-[55vw] md:size-[45vw] xl:size-[25vw]">
                  <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-[85%] h-auto pointer-events-auto transition-all duration-500 ease-out group-hover:-translate-y-[2vh]">
                    <div ref={imageRef} className="w-full h-auto">
                      <Image
                        src="/heroImages/support-qr-1.webp"
                        alt="Support QR Code"
                        width={800}
                        height={1100}
                        priority
                        className="w-full h-auto object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
