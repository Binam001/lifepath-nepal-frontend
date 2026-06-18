import Divider from "@/components/home/Divider";
import AboutSupport from "@/components/support/AboutSupport";
import DonationFormSection from "@/components/support/DonationFormSection";
import HeroSection from "@/components/support/HeroSection";
import QrSection from "@/components/support/QrCodeSection";
import TopDonorSection from "@/components/support/TopDonorSection";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection />
      <TopDonorSection />
      <AboutSupport />
      <Divider text=" Your support helps create real opportunities for people in need across Nepal. Contributions are used to provide scholarships, educational materials, charitable support, and other essential assistance that helps individuals grow, learn, and improve their chances for education and employment." />
      {/* <QrSection /> */}
      <DonationFormSection />
    </div>
  );
};

export default page;
