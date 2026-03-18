"use client";

import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import PageTitle from "../ui/PageTitle";

export default function PathCardsSection() {
  const steps = [
    {
      leftTitle: "Confused student",
      rightTitle: "Career clarity & guidance",
      problem: "Too many choices, no clear direction before enrolling.",
      solution: "We start with career clarity and map what fits you.",
      Icon: MoveRight,
      LeftImg: "/heroImages/problem.jpg",
      RightImg: "/heroImages/happy.png",
    },
    {
      leftTitle: "Unclear strengths",
      rightTitle: "Personalized direction",
      problem: "Uncertain which path matches strengths and interests.",
      solution: "Personal guidance turns uncertainty into a focused path.",
      Icon: MoveRight,
      LeftImg: "/heroImages/problem.jpg",
      RightImg: "/heroImages/happy.png",
    },
    {
      leftTitle: "Random learning",
      rightTitle: "Structured learning roadmap",
      problem: "Courses feel scattered without a plan or outcomes.",
      solution: "A step-by-step roadmap builds skills in the right order.",
      Icon: MoveRight,
      LeftImg: "/heroImages/problem.jpg",
      RightImg: "/heroImages/happy.png",
    },
    {
      leftTitle: "No next steps",
      rightTitle: "Confident next steps",
      problem: "Unsure how to tranzinc skills into opportunities.",
      solution: "Portfolio, jobs, or freelancing with clear next steps.",
      Icon: MoveRight,
      LeftImg: "/heroImages/problem.jpg",
      RightImg: "/heroImages/happy.png",
    },
  ];

  return (
    <section className="w-full px-4 md:px-0 bg-white">
      <div className="max-w-5xl mx-auto py-16">
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xl font-semibold text-blue-700">
            Why choose Lifepath?
          </div> */}

          <PageTitle
            title="From confusion to career clarity"
            subtitle="LifePath helps students decide first, then learn with confidence."
            titleClassName="text-3xl md:text-4xl font-semibold text-zinc-900 mb-2"
            subtitleClassName="text-lg text-zinc-600"
            containerClassName="text-center max-w-3xl mx-auto"
            align="center"
          />
        </div>

        <div className="relative grid gap-8">
          {steps.map((step, index) => {
            // const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative grid gap-6 lg:grid-cols-[1fr_auto_1fr] border-dashed border-b border-zinc-400 pb-4"
              >
                <div className="flex">
                  <div className=" lg:flex lg:justify-between">
                    <Image
                      src={
                        step.leftTitle === "Confused student"
                          ? "/problem/a.jpg"
                          : step.leftTitle === "Unclear strengths"
                            ? "/heroImages/problem.jpg"
                            : step.leftTitle === "Random learning"
                              ? "/heroImages/random.png"
                              : step.leftTitle === "No next steps"
                                ? "/heroImages/no.png"
                                : "/heroImages/problem.jpg"
                      }
                      alt="Path illustration"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="">
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                      Problem
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-zinc-900">
                      {step.leftTitle}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-zinc-600">
                      {step.problem}
                    </p>
                  </div>
                </div>

                <div className="relative hidden lg:flex items-center justify-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center text-blue-600">
                    <step.Icon size={20} />
                  </span>
                </div>

                <div className="flex">
                  <div className=" lg:flex lg:justify-between">
                    <Image
                      src={
                        step.rightTitle === "Career clarity & guidance"
                          ? "/heroImages/happy.png"
                          : step.rightTitle === "Personalized direction"
                            ? "/heroImages/direction.png"
                            : step.rightTitle === "Structured learning roadmap"
                              ? "/heroImages/structure.png"
                              : "/heroImages/next.png"
                      }
                      alt="Path illustration"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Lifepath Solution
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-zinc-900">
                      {step.rightTitle}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-zinc-600">
                      {step.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
