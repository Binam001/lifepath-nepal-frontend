import React from "react";
import PageTitle from "../ui/PageTitle";
import Image from "next/image";
import Button from "../shared/Button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen md:h-screen px-4 md:px-8 xl:px-0 pt-20 md:pt-16 pb-8 md:pb-16 overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center md:items-center xl:items-start gap-8">
          <PageTitle
            align="left"
            title="Together, We Can Help Those Who Need It Most"
            titleClassName="text-3xl md:text-5xl xl:text-5xl md:text-center xl:text-left"
            subtitle="Every contribution supports people facing difficult situations. Your donation helps provide assistance, resources, and hope to those in need."
            subtitleClassName="md:text-center xl:text-left"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              label="Explore Job Opportunities"
              href="/jobs"
              className="w-full! md:w-fit!"
            />
            <Button
              label="View Success Stories"
              href="/reviews"
              variant="outline"
              className="w-full! md:w-fit!"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="aspect-video h-[40vh] md:h-[50vh] relative rounded-3xl overflow-hidden border-2 border-primary/10">
            <Image
              src="/heroImages/donation-to-kids-1.webp"
              alt="future kid"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
