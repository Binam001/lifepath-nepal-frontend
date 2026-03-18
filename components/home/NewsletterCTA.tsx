"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="">
      <div className="bg-blue-600 text-white px-2 md:px-4 lg:px-8">
        <div className=" px-4 md:px-0 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="py-8">
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 text-white">
                {title}
              </h2>
              <p className="text-lg text-white">{description}</p>
              <Link href="/personality-test">
                <button className="px-10 py-3.5 bg-white text-blue-600 font-semibold rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-6">
                  {btnText}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </div>
            {/* Right Image */}
            <div className="flex items-center justify-center">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Newsletter"
                  width={500}
                  height={1000}
                  className="w-full hidden md:block h-44 md:h-84 rounded-2xl object-contain object-top"
                />
              ) : (
                <div className="w-full aspect-video bg-linear-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300">
                  <div className="text-center">
                    <p className="text-blue-600 font-semibold text-lg">
                      Image Placeholder
                    </p>
                    <p className="text-blue-500 text-sm mt-2">
                      Add your image via imageSrc prop
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
