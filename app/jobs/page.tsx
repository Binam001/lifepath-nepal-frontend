"use client";

import { MapPin, Clock, ArrowRight, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NewsletterCTA from "../components/home/NewsletterCTA";
import PageTitle from "../components/ui/PageTitle";
import { jobs } from "./data";

export default function JobsPage() {
  const [searchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<"nepal" | "global">("nepal");

  const filteredJobs = jobs.filter(
    (job) =>
      job.region === activeRegion &&
      (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const nepalCount = jobs.filter((job) => job.region === "nepal").length;
  const globalCount = jobs.filter((job) => job.region === "global").length;

  return (
    <div className="min-h-screen pt-16 bg-zinc-100">
      {/* Hero Section */}
      <section className="bg-linear-to-l from-blue-600 to-black text-white">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-0">
          <PageTitle
            title="Find Your Dream Job"
            subtitle="Discover high-paying opportunities in Nepal and remote positions"
            titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
            subtitleClassName="text-lg text-blue-100 mb-8"
            containerClassName="text-center max-w-3xl mx-auto"
          />

          {/* Search Bar */}
          <div className="flex items-center justify-center">
            <div className="inline-flex rounded-full bg-white/20 border-2 border-white/20 p-1">
              <button
                onClick={() => setActiveRegion("nepal")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold shadow-sm transition-colors cursor-pointer ${
                  activeRegion === "nepal"
                    ? "bg-white text-blue-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                <Image
                  src="/flags/Nepal.png"
                  alt="Nepal Flag"
                  width={16}
                  height={16}
                  className=""
                />
                Nepal
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                    activeRegion === "nepal"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {nepalCount}
                </span>
              </button>
              <button
                onClick={() => setActiveRegion("global")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors cursor-pointer ${
                  activeRegion === "global"
                    ? "bg-white text-blue-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                <Globe size={18} />
                International
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                    activeRegion === "global"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {globalCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout - List + Sidebar */}
      <section className="max-w-6xl mx-auto py-8 px-4 md:px-0">
        <div className="flex flex-col gap-8">
          {/* Jobs List */}
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  // href={`/jobs/${job.id}`}
                  key={job.id}
                  className="bg-white/90 backdrop-blur rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-300"
                >
                  <div className="flex gap-4 z-10 relative">
                    {/* Logo */}
                    <div className="w-20 h-20 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={job.img || `/company-logos/${job.img}.png`}
                        alt={`${job.company} logo`}
                        width={56}
                        height={56}
                        className=""
                      />
                    </div>

                    {/* Job Details */}
                    <div className="grow">
                      {/* Title and Time */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-sm text-zinc-600 mt-1">
                            {job.company}
                          </p>
                        </div>
                        <span className="text-xs text-zinc-500 whitespace-nowrap bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                          {job.postedDate}
                        </span>
                      </div>

                      {/* Job Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          {job.region === "nepal" ? "NPR" : "$"} {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-zinc-50 text-zinc-700 text-xs font-medium rounded-full">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-zinc-50 text-zinc-700 text-xs font-medium rounded-full">
                          {job.category}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          View details
                          <ArrowRight size={16} />
                        </Link>
                        <Link
                          href={`/jobs/${job.id}?apply=true`}
                          className="text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors cursor-pointer"
                        >
                          Apply now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <NewsletterCTA
        btnText="Join Class Today"
        title="Ready to take the next step in your career?"
        description="Enroll in our job training programs and unlock your potential."
        imageSrc="/heroImages/woman2.png"
      />
    </div>
  );
}
