"use client";
import { useGSAP } from "@gsap/react";
import HelpCard from "./HelpCard";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const helpCards = [
  {
    id: 1,
    title: "Visa Assistance",
    imageUrl: "/heroImages/self.png",
    description:
      "Comprehensive support for all types of visas, ensuring a smooth application process.",
  },
  {
    id: 2,
    title: "Travel Assistance",
    imageUrl: "/heroImages/self.png",
    description:
      "End-to-end travel planning and support for a hassle-free experience.",
  },
  {
    id: 3,
    title: "Scholarship Assistance",
    imageUrl: "/heroImages/self.png",
    description:
      "Guidance and support in finding and applying for scholarships.",
  },
  {
    id: 4,
    title: "Japan",
    imageUrl: "/heroImages/self.png",
    description:
      "Specialized services tailored for clients interested in Japan.",
  },
];

const Help2 = () => {
  useGSAP(() => {
    const textSplit = SplitText.create("#help-title-top, #help-title-bottom", {
      type: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#help-section",
        start: "top top",
        end: "+=220%",
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.from(textSplit.lines, {
      scrollTrigger: {
        trigger: "#help-section",
        start: "top 70%",
        end: "bottom bottom",
        scrub: 0.6,
      },
      yPercent: 40,
      opacity: 0,
      stagger: 0.15,
      ease: "power2.out",
    });

    tl.to(
      "#help-title-top",
      {
        yPercent: -80,
        ease: "power1.out",
      },
      0,
    ).to(
      "#help-title-bottom",
      {
        yPercent: 80,
        ease: "power1.out",
      },
      0,
    );

    tl.fromTo(
      "#help-cards",
      {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      {
        scale: 1,
        opacity: 1,
        display: "block",
        ease: "power2.out",
      },
      "<20%",
    );
  }, []);

  return (
    <section
      id="help-section"
      className="relative overflow-hidden min-h-[120vh]"
    >
      <div className="max-w-6xl mx-auto">
        <div className=" min-h-screen flex flex-col items-center justify-center">
          <div
            id="help-title-top"
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <p className="uppercase text-9xl font-seasons text-transparent bg-clip-text bg-linear-to-r from-black to-blue-600">
              What we
            </p>
            <p className="uppercase text-9xl font-seasons text-transparent bg-clip-text bg-linear-to-r from-black to-blue-600">will</p>
          </div>

          <div id="help-cards" className="hidden relative z-0">
            <div className="flex gap-6">
              {helpCards.map((card) => (
                <HelpCard
                  key={card.id}
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>

          <div
            id="help-title-bottom"
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <p className="uppercase text-9xl font-seasons text-transparent bg-clip-text bg-linear-to-r from-black to-blue-600">help you</p>
            <p className="uppercase text-9xl font-seasons text-transparent bg-clip-text bg-linear-to-r from-black to-blue-600">in</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help2;
