"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageTitle from "../ui/PageTitle";

const faqs = [
  {
    id: 1,
    question: "What is LifePath and how can it help me?",
    answer:
      "LifePath is a comprehensive career guidance platform designed for students and professionals in Nepal. We help you discover your ideal career path through personality assessments, skill development courses, job opportunities, and expert guidance.",
  },
  {
    id: 2,
    question: "How does the personality test work?",
    answer:
      "Our personality test is based on the MBTI framework with 16 personality types. It takes about 10-15 minutes to complete and provides insights into your strengths, preferences, and suitable career paths based on your unique personality traits.",
  },
  {
    id: 3,
    question: "Are the courses certified?",
    answer:
      "Yes, all our courses come with certificates upon completion. Our courses are designed by industry experts and provide practical skills that are recognized by employers across various industries.",
  },
  {
    id: 4,
    question: "Is LifePath free to use?",
    answer:
      "LifePath offers both free and premium features. The personality test, job browsing, and basic career guidance are completely free. Premium courses and advanced features require a subscription.",
  },
  {
    id: 5,
    question: "How can I find jobs through LifePath?",
    answer:
      "Our job board features opportunities from top companies in Nepal. You can search by role, location, experience level, and industry. Simply create a profile, browse listings, and apply directly through our platform.",
  },
  {
    id: 6,
    question: "Can I get one-on-one career counseling?",
    answer:
      "Yes! We offer personalized career counseling sessions with experienced professionals. You can book a session through our platform to discuss your specific career goals and challenges.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <PageTitle
          title="Frequently Asked Questions"
          subtitle="Quick answers to help you understand how Lifepath works."
          titleClassName="text-3xl md:text-5xl font-semibold text-blue-600 mb-3"
          subtitleClassName="text-base md:text-lg text-zinc-700"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />
        <div className="space-y-2 mt-8">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className=" border rounded-2xl bg-zinc-50 border-zinc-200 hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-start gap-4 text-left hover:text-zinc-900 transition-colors cursor-pointer p-4"
                aria-expanded={openId === faq.id}
              >
                <span className="flex-1 text-base md:text-lg font-semibold text-zinc-900">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`mt-1 text-zinc-500 shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={` pr-6 overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="text-sm md:text-base text-zinc-600 leading-relaxed p-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <p className="text-zinc-600 mb-4">Still have questions?</p>
          <Link href="/support">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
              Contact Support
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
