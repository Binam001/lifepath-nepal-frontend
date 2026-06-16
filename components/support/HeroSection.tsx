import React from "react";
import PageTitle from "../ui/PageTitle";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-screen px-4 md:px-8 xl:px-0 py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto h-[50vh] flex justify-center items-center">
        <PageTitle
          title="Together, We Can Help Those Who Need It Most"
          titleClassName="text-3xl md:text-5xl xl:text-5xl"
          subtitle="Every contribution supports people facing difficult situations. Your donation helps provide assistance, resources, and hope to those in need."
          subtitleClassName="md:max-w-[80%] mx-auto"
        />
      </div>
      <div className="absolute inset-0">
        <Image
          src="/heroImages/trust-hand-2.webp"
          alt="trust hand"
          fill
          className="object-cover object-[50%_70%]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
