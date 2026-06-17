"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import { useResponsive } from "@/hooks/useMediaQuery";

interface NewsletterCTAProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  btnText?: string;
}

export default function NewsletterCTA({
  title = "Subscribe our newsletter",
  description = "Subscribe to our newsletter and be the first to receive insights, updates, and expert tips on optimizing your career development.",
  btnText = "Take Free Personality Test",
  imageSrc,
}: NewsletterCTAProps) {
  const { isMobile } = useResponsive();
  return (
    <section className="">
      <div className="bg-blue-600 text-white px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 items-center">
            {/* Left Content */}
            <div className="py-8 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-white">
                {title}
              </h2>
              <p className="text-lg text-white">{description}</p>

              <Button
                label={btnText}
                href="/personality-test"
                className="bg-white! text-primary! w-full! md:w-fit!"
                icon={
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                }
              />
            </div>
            {/* Right Image */}
            {!isMobile && imageSrc && (
              <div className="flex items-center justify-center">
                <Image
                  src={imageSrc}
                  alt="Newsletter"
                  width={500}
                  height={1000}
                  className="w-full hidden md:block h-44 md:h-84 rounded-2xl object-contain object-top"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
