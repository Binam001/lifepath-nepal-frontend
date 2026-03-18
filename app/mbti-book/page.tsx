import React from "react";

type Personality = {
  code: string;
  title: string;
  group: string;
  short: string;
  strengths: string[];
  careers: string[];
};

const personalityGroups = [
  {
    name: "Analysts",
    description: "Logical, strategic, and idea-driven personalities.",
    color: "from-blue-600 to-blue-200",
    types: [
      {
        code: "INTJ",
        title: "Architect",
        group: "Analysts",
        short: "Strategic, independent, and future-focused thinker.",
        strengths: ["Strategic thinking", "Independent", "Goal-oriented"],
        careers: ["Data Scientist", "Strategist", "Software Engineer"],
      },
      {
        code: "INTP",
        title: "Thinker",
        group: "Analysts",
        short: "Curious, analytical, and loves solving complex problems.",
        strengths: ["Logical", "Curious", "Innovative"],
        careers: ["Researcher", "Developer", "Analyst"],
      },
      {
        code: "ENTJ",
        title: "Commander",
        group: "Analysts",
        short: "Bold leader who likes structure, goals, and progress.",
        strengths: ["Leadership", "Efficiency", "Confidence"],
        careers: ["Manager", "Entrepreneur", "Consultant"],
      },
      {
        code: "ENTP",
        title: "Debater",
        group: "Analysts",
        short: "Creative, energetic, and full of new ideas.",
        strengths: ["Innovative", "Adaptable", "Quick thinker"],
        careers: ["Startup Founder", "Marketer", "Product Designer"],
      },
    ] as Personality[],
  },
  {
    name: "Diplomats",
    description: "Empathetic, imaginative, and people-centered personalities.",
    color: "from-rose-500 to-rose-200",
    types: [
      {
        code: "INFJ",
        title: "Advocate",
        group: "Diplomats",
        short: "Insightful, idealistic, and driven by meaning.",
        strengths: ["Empathy", "Vision", "Depth"],
        careers: ["Counselor", "Writer", "Psychologist"],
      },
      {
        code: "INFP",
        title: "Mediator",
        group: "Diplomats",
        short: "Gentle, creative, and guided by strong values.",
        strengths: ["Creativity", "Compassion", "Imagination"],
        careers: ["Writer", "Designer", "Therapist"],
      },
      {
        code: "ENFJ",
        title: "Protagonist",
        group: "Diplomats",
        short: "Warm, inspiring, and naturally supportive leader.",
        strengths: ["Leadership", "Communication", "Motivation"],
        careers: ["Teacher", "Coach", "HR Specialist"],
      },
      {
        code: "ENFP",
        title: "Campaigner",
        group: "Diplomats",
        short: "Energetic, expressive, and full of possibilities.",
        strengths: ["Creativity", "Enthusiasm", "People skills"],
        careers: ["Content Creator", "Marketer", "Public Relations"],
      },
    ] as Personality[],
  },
  {
    name: "Sentinels",
    description: "Practical, dependable, and structured personalities.",
    color: "from-emerald-500 to-green-300",
    types: [
      {
        code: "ISTJ",
        title: "Logistician",
        group: "Sentinels",
        short: "Responsible, disciplined, and detail-oriented.",
        strengths: ["Reliable", "Organized", "Focused"],
        careers: ["Administrator", "Accountant", "Operations Officer"],
      },
      {
        code: "ISFJ",
        title: "Defender",
        group: "Sentinels",
        short: "Caring, loyal, and quietly supportive.",
        strengths: ["Supportive", "Patient", "Dependable"],
        careers: ["Nurse", "Teacher", "Coordinator"],
      },
      {
        code: "ESTJ",
        title: "Executive",
        group: "Sentinels",
        short: "Efficient, direct, and great at leading systems.",
        strengths: ["Leadership", "Structure", "Responsibility"],
        careers: ["Manager", "Supervisor", "Administrator"],
      },
      {
        code: "ESFJ",
        title: "Consul",
        group: "Sentinels",
        short: "Friendly, organized, and community-oriented.",
        strengths: ["Warmth", "Teamwork", "Organization"],
        careers: ["Event Manager", "Teacher", "Customer Relations"],
      },
    ] as Personality[],
  },
  {
    name: "Explorers",
    description: "Flexible, energetic, and action-oriented personalities.",
    color: "from-amber-500 to-orange-300",
    types: [
      {
        code: "ISTP",
        title: "Virtuoso",
        group: "Explorers",
        short: "Hands-on, practical, and calm under pressure.",
        strengths: ["Problem-solving", "Adaptability", "Practicality"],
        careers: ["Engineer", "Mechanic", "Developer"],
      },
      {
        code: "ISFP",
        title: "Adventurer",
        group: "Explorers",
        short: "Creative, gentle, and deeply expressive.",
        strengths: ["Creativity", "Sensitivity", "Flexibility"],
        careers: ["Artist", "Photographer", "UI Designer"],
      },
      {
        code: "ESTP",
        title: "Entrepreneur",
        group: "Explorers",
        short: "Bold, energetic, and loves real-world action.",
        strengths: ["Confidence", "Action", "Adaptability"],
        careers: ["Sales", "Business", "Event Management"],
      },
      {
        code: "ESFP",
        title: "Entertainer",
        group: "Explorers",
        short: "Fun, social, and naturally expressive.",
        strengths: ["Charm", "Energy", "Communication"],
        careers: ["Presenter", "Performer", "Social Media Manager"],
      },
    ] as Personality[],
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
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-slate-100 text-slate-900">
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

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">
            What are the 16 Personalities?
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-7">
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
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">
            The 4 Personality Groups
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            To make things easier, the 16 types are often grouped into 4 main
            categories.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {personalityGroups.map((group) => (
            <div
              key={group.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div
                className={`bg-linear-to-r ${group.color} px-6 py-6 text-white md:px-8`}
              >
                <h3 className="text-2xl font-semibold">{group.name}</h3>
                <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4 md:p-8">
                {group.types.map((type) => (
                  <div
                    key={type.code}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">
                        {type.group}
                      </span>
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {type.code}
                      </span>
                    </div>

                    <h4 className="mt-4 text-xl font-semibold">{type.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {type.short}
                    </p>

                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-900">
                        Strengths
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {type.strengths.map((strength) => (
                          <span
                            key={strength}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-900">
                        Good career matches
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-600">
                        {type.careers.map((career) => (
                          <li key={career}>• {career}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 md:px-10 md:pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold md:text-3xl">
              How to Use This Guide
            </h2>
            <div className="mt-6 space-y-5 text-slate-600">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  1. For self-awareness
                </h3>
                <p className="mt-2 leading-7">
                  Learn how you think, decide, communicate, and work best.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  2. For career direction
                </h3>
                <p className="mt-2 leading-7">
                  Personality type can help suggest careers that may feel more
                  natural and motivating for you.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  3. For communication
                </h3>
                <p className="mt-2 leading-7">
                  Some people prefer logic, some value emotions, and some need
                  structure while others like flexibility.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-blue-600 p-6 text-white shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold">Important Note</h2>
            <p className="mt-4 leading-7 text-slate-300">
              MBTI is best used as a helpful framework, not as a strict rule.
              People are more complex than one label.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm leading-6 text-slate-200">
                Think of personality types as a guide to understand tendencies,
                not a final definition of who someone is.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
