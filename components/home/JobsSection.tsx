"use client";
import {
  MapPin,
  Clock,
  ArrowRight,
  BriefcaseBusiness,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function JobsSection() {
  const jobs = [
    {
      img: "/company-logo/webx.png",
      title: "Software Developer",
      company: "F1 Soft",
      experience: "1-5",
      salary: "80k-200k",
      location: "Kathmandu only",
      type: "Full time",
      category: "Software Developer",
      postedTime: "1 hour ago",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur",
      skills: ["React", "Node.js", "TypeScript"],
    },
    {
      img: "/company-logo/webx.png",
      title: "UI/UX Designer",
      company: "Cursor",
      experience: "1-4",
      salary: "60k-180k",
      location: "Remote",
      type: "Full time",
      category: "Product Designer",
      postedTime: "4 hours ago",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur",
      skills: ["Figma", "Adobe XD", "Sketch"],
    },
    {
      img: "/company-logo/webx.png",
      title: "Graphic Designer",
      company: "FonePay",
      experience: "3-7",
      salary: "60k-150k",
      location: "Nepal only",
      type: "Full time",
      category: "Branding Designer",
      postedTime: "5 hours ago",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur",
      skills: ["Photoshop", "Ai", "InDesign"],
    },
    {
      img: "/company-logo/webx.png",
      title: "Account Executive",
      company: "Nameste",
      experience: "2-6",
      salary: "90k-140k",
      location: "Nepal only",
      type: "Part-time",
      category: "Finance",
      postedTime: "5 hours ago",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur",
      skills: ["Excel", "QuickBooks", "SAP"],
    },
  ];

  // const popularSearches = [
  //   { title: "Product Designer", count: "284 jobs" },
  //   { title: "Customer Success", count: "301 jobs" },
  //   { title: "Product Manager", count: "380 jobs" },
  //   { title: "Engineering Manager", count: "64 jobs" },
  // ];

  return (
    <section id="jobs" className="py-8 bg-linear-to-b from-white to-blue-50/10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BriefcaseBusiness size={32} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Based on 5,000+ Nepali job listings
            </span>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-black pb-1 mb-4">
            High-Paying Career Paths in Nepal (2026)
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Discover premium job opportunities from top companies across Nepal.
          </p>
          {/* <div className="flex justify-center mt-6">
            <div className="px-5 py-2.5 bg-green-100 rounded-full">
              <p className="text-sm font-semibold text-green-700">
                {jobs.length * 400} total jobs available
              </p>
            </div>
          </div> */}
        </div>

        {/* Jobs Grid */}
        <div className="flex gap-2 mb-12">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-zinc-200 p-5 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-400 via-indigo-500 to-blue-600 blur-sm"
                  style={{ animation: "spin 3s linear infinite" }}
                />
                <div className="absolute inset-0.5 rounded-xl bg-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex h-full items-start justify-between mb-4">
                  <div className="w-28 h-14 rounded-lg flex items-center justify-center shadow-md">
                    <Image
                      src={job.img}
                      alt={`${job.company} logo`}
                      width={70}
                      height={40}
                      className="rounded-md"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Zap size={16} className="text-green-600" />
                  </div>
                </div>

                {/* Company Info */}
                <div className="mb-3">
                  <h4 className="font-bold text-zinc-900 text-base mb-1 flex items-center gap-2">
                    {job.company}
                    <MapPin size={12} className="text-zinc-400" />
                    <span className="text-xs font-normal text-zinc-500">
                      {job.location.split(" ")[0]}
                    </span>
                  </h4>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>

                {/* Job Type & Time */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-md font-medium">
                    {job.type}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock size={12} />
                    Posted {job.postedTime}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">
                  {job.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                  <div>
                    <p className="text-lg font-bold text-blue-600">
                      ${job.salary}
                    </p>
                    <p className="text-xs text-zinc-500">/Hour</p>
                  </div>
                  <button className="px-4 py-2 bg-zinc-800 text-white hover:bg-blue-600  hover:text-white font-semibold rounded-full text-sm transition-all duration-300 group-hover:shadow-md cursor-pointer">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-600 font-medium">
            Showing 1-{jobs.length} of {jobs.length * 400} jobs
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer">
            <span>View All Jobs</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
