"use client";

import { useState } from "react";
import {
  Crown,
  Lightbulb,
  Heart,
  Palette,
  Users,
  Star,
  CheckCircle,
  Shield,
  Briefcase,
  Handshake,
  Wrench,
  Camera,
  Rocket,
  PartyPopper,
  ChevronDown,
} from "lucide-react";

export default function PersonalitySection() {
  const [expanded, setExpanded] = useState(false);

  const personalityTypes = [
    {
      type: "INTJ",
      name: "The Architect",
      description: "Strategic and independent thinker",
      dreamJobs: ["Strategic Consultant", "Software Architect", "Executive"],
      icon: Crown,
    },
    {
      type: "INTP",
      name: "The Logician",
      description: "Curious and analytical problem-solver",
      dreamJobs: ["Data Scientist", "Research Engineer", "Systems Analyst"],
      icon: Lightbulb,
    },
    {
      type: "ENTJ",
      name: "The Commander",
      description: "Natural born leader and organizer",
      dreamJobs: ["CEO", "Project Manager", "Strategy Director"],
      icon: Crown,
    },
    {
      type: "ENTP",
      name: "The Debater",
      description: "Innovative and analytical entrepreneur",
      dreamJobs: ["Entrepreneur", "Product Manager", "Innovation Lead"],
      icon: Lightbulb,
    },
    {
      type: "INFJ",
      name: "The Advocate",
      description: "Compassionate and purpose-driven",
      dreamJobs: ["Counselor", "HR Director", "Social Impact Manager"],
      icon: Heart,
    },
    {
      type: "INFP",
      name: "The Mediator",
      description: "Creative and values-oriented",
      dreamJobs: ["UX Designer", "Content Creator", "Therapist"],
      icon: Palette,
    },
    {
      type: "ENFJ",
      name: "The Protagonist",
      description: "Charismatic and inspiring leader",
      dreamJobs: ["Coach", "Team Lead", "Business Development"],
      icon: Users,
    },
    {
      type: "ENFP",
      name: "The Campaigner",
      description: "Enthusiastic and people-focused",
      dreamJobs: ["Marketing Manager", "Event Organizer", "Sales Lead"],
      icon: Star,
    },
    {
      type: "ISTJ",
      name: "The Logistician",
      description: "Responsible and detail-oriented",
      dreamJobs: ["Operations Manager", "Auditor", "Project Coordinator"],
      icon: CheckCircle,
    },
    {
      type: "ISFJ",
      name: "The Defender",
      description: "Supportive and dedicated professional",
      dreamJobs: ["Nurse", "Administrator", "Customer Support Lead"],
      icon: Shield,
    },
    {
      type: "ESTJ",
      name: "The Executive",
      description: "Practical and results-oriented",
      dreamJobs: ["Operations Director", "Sales Manager", "Administrator"],
      icon: Briefcase,
    },
    {
      type: "ESFJ",
      name: "The Consul",
      description: "Sociable and tradition-minded",
      dreamJobs: ["Event Manager", "HR Manager", "Community Manager"],
      icon: Handshake,
    },
    {
      type: "ISTP",
      name: "The Virtuoso",
      description: "Practical and hands-on problem solver",
      dreamJobs: ["Engineer", "Mechanic", "Technical Support"],
      icon: Wrench,
    },
    {
      type: "ISFP",
      name: "The Adventurer",
      description: "Artistic and sensitive explorer",
      dreamJobs: ["Designer", "Photographer", "Artist"],
      icon: Camera,
    },
    {
      type: "ESTP",
      name: "The Entrepreneur",
      description: "Energetic and action-oriented",
      dreamJobs: ["Sales Executive", "Trader", "Business Owner"],
      icon: Rocket,
    },
    {
      type: "ESFP",
      name: "The Entertainer",
      description: "Spontaneous and creative performer",
      dreamJobs: ["Entertainer", "Trainer", "Event Producer"],
      icon: PartyPopper,
    },
  ];

  const displayedTypes = expanded
    ? personalityTypes
    : personalityTypes.slice(0, 6);

  return (
    <section id="personality" className="py-10 bg-white">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        {/* <div className="flex justify-center items-center">
          <div className="mb-12 text-center">
            <h3 className="text-4xl md:text-4xl font-bold text-zinc-900 mb-4">
              Other Personality Types and Career Matches
            </h3>
            <p className="text-lg text-zinc-600">
              Find your MBTI type and explore the best career paths that match
              your personality
            </p>
          </div>
        </div> */}

        {/* Personality Types List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {displayedTypes.map((personality, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-zinc-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex items-start gap-6"
            >
              {/* Icon */}
              <div className="shrink-0">
                <div className="bg-blue-100 rounded-lg p-3">
                  <personality.icon size={24} className="text-blue-600" />
                </div>
              </div>

              {/* Content */}
              <div className="grow">
                {/* Type and Name */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block bg-yellow-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {personality.type}
                  </span>
                  <h4 className="text-lg font-bold text-zinc-900">
                    {personality.name}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 mb-3">
                  {personality.description}
                </p>

                {/* Dream Jobs */}
                <div className="flex flex-wrap gap-2">
                  {personality.dreamJobs.map((job, jobIndex) => (
                    <span
                      key={jobIndex}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200"
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand Button */}
        {!expanded && (
          <div className="flex justify-center bg-linear-to-b from-transparent to-white py-12 absolute left-0 right-0 bottom-0">
            <button
              onClick={() => setExpanded(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <ChevronDown size={20} />
              View All {personalityTypes.length} Types
            </button>
          </div>
        )}

        {/* Preview Card with Blur */}
        {/*  */}
      </div>
    </section>
  );
}
