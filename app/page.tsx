import HeroSection from "./components/home/HeroSection";
import StorySection from "./components/home/StorySection";
// import PathCardsSection from "./components/home/PathCardsSection";
// import MBTISection from "./components/home/MBTISection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import StudentTestimonialsSection from "./components/home/StudentTestimonialsSection";
import FAQSection from "./components/home/FAQSection";
// import NewsletterCTA from "./components/home/NewsletterCTA";
import About from "./components/home/About";
import ContactSection from "./components/home/ContactSection";
import Divider3 from "./components/home/Divider3";
import ProblemSolution from "./components/home/ProblemSolution";
import Divider from "./components/home/Divider";
import Divider2 from "./components/home/Divider2";
// import Footer from "./components/layout/Footer";
// import FooterCTA from "./components/footerCTA/FooterCTA";
// import Help from "./components/help/Help";
// import Help2 from "./components/help/Help2";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Divider />
      <About />
      <Divider2 />
      {/* <Help2 /> */}
      <ProblemSolution />
      <StorySection />
      {/* <MBTISection /> */}
      <HowItWorksSection />
      {/* <NewsletterCTA
        title="Clarity changes everything."
        btnText="Start Your Journey"
        imageSrc="/heroImages/woman2.png"
        description="Build a career that fits you — one insight at a time."
      /> */}
      <Divider3 />
      <StudentTestimonialsSection />
      <FAQSection />
      <ContactSection />
      {/* Call */}
      {/* <FooterCTA /> */}
    </div>
  );
}
