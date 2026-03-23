"use client";

import { Timer, UserCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function JobTrainingPage() {
  const [searchQuery] = useState("");

  const courses = [
    {
      id: 1,
      slug: "advanced-digital-marketing-bootcamp",
      title: "Brand Developer",
      img: "/job-training/brand.png",
      duration: "5 months",
      price: "80000",
      originalPrice: "100000",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "Interview Practice",
        "Placement Opportunity",
      ],
    },
    {
      id: 2,
      slug: "full-stack-web-development-bootcamp",
      title: "Full Stack Web Developer",
      img: "/job-training/fullstack.png",
      duration: "5 months",
      price: "80000",
      originalPrice: "100000",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "Interview Practice",
        "Placement Opportunity",
      ],
    },
    {
      id: 3,
      slug: "digital-marketing-bootcamp",
      title: "Social Media Manager",
      img: "/job-training/social.png",
      duration: "5 months",
      price: "80000",
      originalPrice: "100000",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "Interview Practice",
        "Placement Opportunity",
      ],
    },
    {
      id: 4,
      slug: "graphic-designing-bootcamp",
      title: "Graphic Designer",
      img: "/job-training/graphic.png",
      duration: "3 months",
      price: "50000",
      originalPrice: "60000",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Portfolio Review",
        "Internship Guidance",
        "Placement Opportunity",
      ],
    },
    {
      id: 5,
      slug: "web-development-bootcamp",
      title: "Web Designer",
      img: "/job-training/webdev.png",
      duration: "3 months",
      price: "50000",
      originalPrice: "60000",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "Interview Practice",
        "Placement Opportunity",
      ],
    },
    {
      id: 6,
      slug: "creative-designer",
      title: "Creative Designer",
      img: "/job-training/sales.png",
      duration: "3 months",
      price: "50000",
      originalPrice: "60000",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "Interview Practice",
        "Placement Opportunity",
      ],
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen pt-16 bg-zinc-100">
      {notFound()}
      {/* Hero Section */}
      <section className="bg-linear-to-l from-blue-600 to-black text-white">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-0">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Job Training Programs
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Learn job focused, high demand skills that companies in Nepal{" "}
              <br /> and abroad are hiring right now.
            </p>

            {/* Search Bar */}
            {/* <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100"
                size={20}
              />
              <input
                type="text"
                placeholder="Search training programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/20 border-2 border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-6xl mx-auto py-8 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/job-training/${course.slug}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-zinc-200 hover:border-blue-500 flex flex-col relative"
            >
              {course.id <= 3 && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              {/* Badge */}
              {/* Course Info */}
              <div className="p-4 flex flex-col h-full group cursor-pointer">
                {/* Title */}
                <h4 className="text-xl md:text-2xl font-semibold text-zinc-900 mb-3 line-clamp-3 leading-tight">
                  {course.title}
                </h4>

                {/* Duration and Lessons */}
                <div className="flex items-center justify-between gap-3 text-xs text-zinc-600 mb-3 pb-3 border-b border-zinc-200">
                  {/* Instructor */}
                  <div className="flex items-center gap-1">
                    {" "}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        className="text-blue-600 text-lg"
                      >
                        <path
                          fill="currentColor"
                          d="M12.65 3.797c.487.131.908.458 1.42.854l.297.23c.243.187.301.23.359.261a1 1 0 0 0 .196.081c.063.019.134.03.438.07l.373.047c.642.082 1.17.149 1.607.4c.383.22.7.537.92.92c.251.436.318.965.4 1.607l.048.373c.039.304.05.375.069.438q.03.102.08.196c.032.058.075.116.262.359l.23.297c.396.512.723.933.854 1.42a2.5 2.5 0 0 1 0 1.3c-.131.487-.458.908-.854 1.42l-.23.297c-.187.243-.23.301-.261.359q-.051.094-.081.196c-.019.063-.03.134-.07.438l-.047.373c-.082.642-.149 1.17-.4 1.607a2.5 2.5 0 0 1-.92.92c-.436.251-.965.318-1.607.4l-.373.048c-.304.039-.375.05-.438.069q-.102.03-.196.08c-.058.032-.116.075-.359.262l-.297.23c-.512.396-.933.723-1.42.854a2.5 2.5 0 0 1-1.3 0c-.487-.131-.908-.458-1.42-.854l-.297-.23c-.243-.187-.301-.23-.359-.261a1 1 0 0 0-.196-.081c-.063-.019-.134-.03-.438-.07l-.373-.047c-.642-.082-1.17-.149-1.607-.4a2.5 2.5 0 0 1-.92-.92c-.251-.436-.318-.965-.4-1.607l-.048-.373c-.039-.304-.05-.375-.069-.438a1 1 0 0 0-.08-.196c-.032-.058-.075-.116-.262-.359l-.23-.297c-.396-.512-.723-.933-.854-1.42a2.5 2.5 0 0 1 0-1.3c.131-.487.458-.908.854-1.42l.23-.297c.187-.243.23-.301.261-.359a1 1 0 0 0 .081-.196c.019-.063.03-.134.07-.438l.047-.373c.082-.642.149-1.17.4-1.607a2.5 2.5 0 0 1 .92-.92c.436-.251.965-.318 1.607-.4l.373-.048c.304-.039.375-.05.438-.069a1 1 0 0 0 .196-.08c.058-.032.116-.075.359-.262l.297-.23c.512-.396.933-.723 1.42-.854a2.5 2.5 0 0 1 1.3 0m3.057 5.496a1 1 0 0 0-1.414 0L11 12.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-blue-600">
                      Job Guarantee
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-lg font-medium">
                    <Timer size={20} />
                    {course.duration}
                  </span>
                </div>

                {/* What's Included */}
                <div className="mb-4 rounded-lg grow flex items-center justify-center h-50 overflow-hidden">
                  <Image
                    src={course.img}
                    alt="What's included"
                    width={320}
                    height={100}
                    className="object-cover h-full w-full"
                    priority={false}
                  />
                </div>

                {/* Pricing */}
                <div className="mb-3 ">
                  <div className="flex items-center gap-2 text-sm font-medium  text-green-500">
                    <UserCheck size={20} className="" />
                    <p className="">Limited seats</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 items-center justify-between w-full mt-auto">
                  <button className="w-full px-4 py-2 bg-zinc-100 text-blue-500 border cursor-pointer hover:bg-zinc-50 hover:text-blue-700 hover:border-blue-600 font-semibold rounded-full transition-colors text-sm">
                    View course
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-full transition-colors text-sm">
                    {course.id <= 3 ? "Join Now" : "Book Now"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
