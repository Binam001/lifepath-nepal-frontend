"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building2,
  X,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { jobs } from "../data";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const jobId = Number(idParam);
  const job = useMemo(() => jobs.find((item) => item.id === jobId), [jobId]);
  const applyParam = searchParams?.get("apply") === "true";
  const [isOpen, setIsOpen] = useState(applyParam);

  if (!job) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            Job not found
          </h1>
          <p className="text-zinc-500 mb-6">
            The vacancy you&apos;re looking for does not exist.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            <ArrowLeft size={16} /> Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-zinc-100">
      <section className="max-w-6xl mx-auto py-10 px-4 md:px-0">
        <div className="text-sm text-zinc-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-blue-600">
            Career
          </Link>
          <span>/</span>
          <span className="text-zinc-700 font-medium">{job.title}</span>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center gap-2 text-zinc-600 hover:text-blue-600 font-semibold cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mt-6 grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
                <Image
                  src={job.img}
                  alt={`${job.company} logo`}
                  width={56}
                  height={56}
                  className="rounded-lg"
                />
              </div>
              <div className="grow">
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  {job.title}
                </h1>
                <p className="text-zinc-600 mt-1 flex items-center gap-2">
                  <Building2 size={16} /> {job.company}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-600">
                  <span className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full">
                    <Clock size={14} /> {job.experience}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full">
                    <DollarSign size={14} /> {job.salary}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full">
                    <Briefcase size={14} /> {job.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                About the role
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {job.summary}
              </p>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                  Responsibilities
                </h2>
                <ul className="space-y-2 text-sm text-zinc-700">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                  Requirements
                </h2>
                <ul className="space-y-2 text-sm text-zinc-700">
                  {job.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Apply Now
              </button>
              <button className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-zinc-200 text-zinc-700 font-semibold hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer">
                <Share2 size={16} /> Share
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                About {job.company}
              </h3>
              <div className="space-y-3 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-blue-600" />
                  <span>{job.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-600 mt-4">
                Hiring for a {job.category} role with a focus on growth and
                impact.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                Job Details
              </h3>
              <ul className="text-sm text-zinc-700 space-y-2">
                <li className="flex justify-between">
                  <span className="text-zinc-500">Department</span>
                  <span className="font-semibold text-zinc-900">
                    {job.category}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-500">Employment Type</span>
                  <span className="font-semibold text-zinc-900">
                    {job.type}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-500">Region</span>
                  <span className="font-semibold text-zinc-900">
                    {job.region === "nepal" ? "Nepal" : "International"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-500">Salary</span>
                  <span className="font-semibold text-zinc-900">
                    {job.salary}
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">
                  Apply for {job.title}
                </h3>
                <p className="text-sm text-zinc-500">{job.company}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form className="flex flex-1 flex-col space-y-3 overflow-y-auto pr-1">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="w-full">
                  <label className="text-sm font-semibold text-zinc-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold text-zinc-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="w-full">
                  <label className="text-sm font-semibold text-zinc-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="98xxxxxxxx"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold text-zinc-700">
                    Portfolio or LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="w-full">
                  <label className="text-sm font-semibold text-zinc-700">
                    Upload CV
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-2 py-2 text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm font-semibold text-zinc-700">
                    Upload Cover Letter
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-2 py-2 text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-700">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us why you're a great fit..."
                  className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>
            </form>
            <button
              type="button"
              className="mt-4 w-full shrink-0 rounded-full bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Submit application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
