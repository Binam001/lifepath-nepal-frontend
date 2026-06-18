import React from "react";
import PageTitle from "../ui/PageTitle";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  tag?: string;
  tagIcon?: React.ReactNode;
}

const HeroSection = ({ title, subtitle, tag, tagIcon }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden border-b border-blue-900 bg-linear-to-l from-primary to-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center">
          {tag && (
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
              {tagIcon}
              {/* <Sparkles className="h-3.5 w-3.5" /> */}
              {tag}
            </div>
          )}
          <div className="mt-5">
            <PageTitle
              title={title}
              subtitle={subtitle}
              titleClassName="text-4xl md:text-6xl font-bold text-white mb-4"
              subtitleClassName="text-base md:text-lg text-blue-100"
              containerClassName="max-w-3xl mx-auto"
              align="center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
