import Image from "next/image";
import React from "react";

type Personality = {
  code: string;
  title: string;
  group: string;
  short: string;
  strengths: string[];
  careers: string[];
  image: string;
};

type PersonalityGroup = {
  name: string;
  description: string;
  types: Personality[];
};

const personalityGroups: PersonalityGroup[] = [
  {
    name: "Analysts",
    description: "Logical, strategic, and idea-driven personalities.",
    types: [
      {
        code: "INTJ",
        title: "Architect",
        group: "Analysts",
        short: "Strategic, independent, and future-focused thinker.",
        strengths: ["Strategic thinking", "Independent", "Goal-oriented"],
        careers: ["Data Scientist", "Strategist", "Software Engineer"],
        image: "/personalities/architect.png",
      },
      {
        code: "INTP",
        title: "Logician",
        group: "Analysts",
        short: "Curious, analytical, and loves solving complex problems.",
        strengths: ["Logical", "Curious", "Innovative"],
        careers: ["Researcher", "Developer", "Analyst"],
        image: "/personalities/logician.png",
      },
      {
        code: "ENTJ",
        title: "Commander",
        group: "Analysts",
        short: "Bold leader who likes structure, goals, and progress.",
        strengths: ["Leadership", "Efficiency", "Confidence"],
        careers: ["Manager", "Entrepreneur", "Consultant"],
        image: "/personalities/commander.png",
      },
      {
        code: "ENTP",
        title: "Debater",
        group: "Analysts",
        short: "Creative, energetic, and full of new ideas.",
        strengths: ["Innovative", "Adaptable", "Quick thinker"],
        careers: ["Startup Founder", "Marketer", "Product Designer"],
        image: "/personalities/debater.png",
      },
    ],
  },
  {
    name: "Diplomats",
    description: "Empathetic, imaginative, and people-centered personalities.",
    types: [
      {
        code: "INFJ",
        title: "Advocate",
        group: "Diplomats",
        short: "Insightful, idealistic, and driven by meaning.",
        strengths: ["Empathy", "Vision", "Immenseness"],
        careers: ["Counselor", "Writer", "Psychologist"],
        image: "/personalities/advocate.png",
      },
      {
        code: "INFP",
        title: "Mediator",
        group: "Diplomats",
        short: "Gentle, creative, and guided by strong values.",
        strengths: ["Creativity", "Compassion", "Imagination"],
        careers: ["Writer", "Designer", "Therapist"],
        image: "/personalities/mediator.png",
      },
      {
        code: "ENFJ",
        title: "Protagonist",
        group: "Diplomats",
        short: "Warm, inspiring, and naturally supportive leader.",
        strengths: ["Leadership", "Communication", "Motivation"],
        careers: ["Teacher", "Coach", "HR Specialist"],
        image: "/personalities/protagonist.png",
      },
      {
        code: "ENFP",
        title: "Campaigner",
        group: "Diplomats",
        short: "Energetic, expressive, and full of possibilities.",
        strengths: ["Creativity", "Enthusiasm", "People skills"],
        careers: ["Content Creator", "Marketer", "Public Relations"],
        image: "/personalities/campaigner.png",
      },
    ],
  },
  {
    name: "Sentinels",
    description: "Practical, dependable, and structured personalities.",
    types: [
      {
        code: "ISTJ",
        title: "Logistician",
        group: "Sentinels",
        short: "Responsible, disciplined, and detail-oriented.",
        strengths: ["Reliable", "Organized", "Focused"],
        careers: ["Administrator", "Accountant", "Operations Officer"],
        image: "/personalities/logistician.png",
      },
      {
        code: "ISFJ",
        title: "Defender",
        group: "Sentinels",
        short: "Caring, loyal, and quietly supportive.",
        strengths: ["Supportive", "Patient", "Dependable"],
        careers: ["Nurse", "Teacher", "Coordinator"],
        image: "/personalities/defender.png",
      },
      {
        code: "ESTJ",
        title: "Executive",
        group: "Sentinels",
        short: "Efficient, direct, and great at leading systems.",
        strengths: ["Leadership", "Structure", "Responsibility"],
        careers: ["Manager", "Supervisor", "Administrator"],
        image: "/personalities/executive.png",
      },
      {
        code: "ESFJ",
        title: "Consul",
        group: "Sentinels",
        short: "Friendly, organized, and community-oriented.",
        strengths: ["Warmth", "Teamwork", "Organization"],
        careers: ["Event Manager", "Teacher", "Customer Relations"],
        image: "/personalities/consul.png",
      },
    ],
  },
  {
    name: "Explorers",
    description: "Flexible, energetic, and action-oriented personalities.",
    types: [
      {
        code: "ISTP",
        title: "Virtuoso",
        group: "Explorers",
        short: "Hands-on, practical, and calm under pressure.",
        strengths: ["Problem-solving", "Adaptability", "Practicality"],
        careers: ["Engineer", "Mechanic", "Developer"],
        image: "/personalities/virtuoso.png",
      },
      {
        code: "ISFP",
        title: "Adventurer",
        group: "Explorers",
        short: "Creative, gentle, and deeply expressive.",
        strengths: ["Creativity", "Sensitivity", "Flexibility"],
        careers: ["Artist", "Photographer", "UI Designer"],
        image: "/personalities/adventurer.png",
      },
      {
        code: "ESTP",
        title: "Entrepreneur",
        group: "Explorers",
        short: "Bold, energetic, and loves real-world action.",
        strengths: ["Confidence", "Action", "Adaptability"],
        careers: ["Sales", "Business", "Event Management"],
        image: "/personalities/entrepreneur.png",
      },
      {
        code: "ESFP",
        title: "Entertainer",
        group: "Explorers",
        short: "Fun, social, and naturally expressive.",
        strengths: ["Charm", "Energy", "Communication"],
        careers: ["Presenter", "Performer", "Social Media Manager"],
        image: "/personalities/entertainer.png",
      },
    ],
  },
];

const mbtiDimensions = [
  {
    pair: "E / I",
    title: "Extroversion / Introversion",
    description:
      "Shows where you get your energy from — people and activity, or quiet and reflection.",
  },
  {
    pair: "S / N",
    title: "Sensing / Intuition",
    description:
      "Shows whether you focus more on facts and details, or patterns and possibilities.",
  },
  {
    pair: "T / F",
    title: "Thinking / Feeling",
    description:
      "Shows whether you usually decide through logic or personal values and emotions.",
  },
  {
    pair: "J / P",
    title: "Judging / Perceiving",
    description:
      "Shows whether you prefer structure and planning, or flexibility and spontaneity.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-100 text-slate-900">
      <section className="bg-linear-to-l from-blue-600 to-black px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-medium text-slate-600 shadow-sm">
            Guidebook
          </span>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
            A Simple Guide to the 16 Personalities
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-200 sm:text-lg">
            Understand how the 16 MBTI personality types work, what makes each
            one unique, and which careers may match them best.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-10 text-center">
        <div className="rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 md:px-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            What are the 16 Personalities?
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            The 16 personalities come from the MBTI model. Each type is made by
            combining 4 preference pairs. Together, they form personality types
            like INTJ, ENFP, ISFJ, and more.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {mbtiDimensions.map((item) => (
              <div
                key={item.pair}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm font-semibold text-blue-600">
                  {item.pair}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 ">
        <div className="space-y-20">
          {personalityGroups.map((group) => (
            <section key={group.name} className="relative">
              <div className="relative overflow-hidden rounded-[32px] bg-white px-6 py-6  md:px-8 md:py-10">
                <div className="relative z-10">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 md:text-6xl">
                      {group.name}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 xl:grid-cols-4">
                    {group.types.map((type) => (
                      <div key={type.code} className="flex h-full flex-col">
                        <div className={`overflow-hidden  bg-white    `}>
                          <div className="relative aspect-4/5 w-full">
                            <Image
                              src={type.image}
                              alt={type.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="p-5">
                            <div className="flex flex-wrap items-center justify-between  gap-2">
                              <h3 className=" text-xl font-semibold text-slate-900">
                                {type.title}
                              </h3>
                              <p className="rounded-full bg-blue-50 px-2.5 text-xs font-semibold text-blue-700">
                                {type.code}
                              </p>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {type.short}
                            </p>

                            <div className="mt-5">
                              <p className="text-sm font-semibold text-slate-900">
                                Good career matches
                              </p>
                              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                                {type.careers.map((career) => (
                                  <li
                                    key={career}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400" />
                                    <span>{career}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
