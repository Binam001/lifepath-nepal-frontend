"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock3, Download, Layers3, Sparkles } from "lucide-react";

const guideBooks = [
  {
    id: 1,
    title: "Know Yourself Career Workbook",
    subtitle: "Assessment prompts, reflection exercises, and strength mapping.",
    format: "Digital workbook",
    readingTime: "2.5 hours",
    chapters: "12 guided sections",
    cover: "/heroImages/self.png",
    price: "Rs. 1,200",
    accent: "bg-blue-50",
  },
  {
    id: 2,
    title: "Career Clarity Starter Guide",
    subtitle: "A simple framework to move from confusion to a clear direction.",
    format: "PDF + templates",
    readingTime: "90 minutes",
    chapters: "9 practical chapters",
    cover: "/heroImages/direction.png",
    price: "Rs. 950",
    accent: "bg-sky-50",
  },
  {
    id: 3,
    title: "From Learning to Earning Playbook",
    subtitle: "Build a roadmap from skills to portfolio to paid work.",
    format: "Guide + action sheets",
    readingTime: "3 hours",
    chapters: "15 action pages",
    cover: "/heroImages/next.png",
    price: "Rs. 1,450",
    accent: "bg-blue-50",
  },
  {
    id: 4,
    title: "Parent Guide to Smarter Career Choices",
    subtitle:
      "Support your child with questions, options, and realistic planning.",
    format: "Family guide",
    readingTime: "75 minutes",
    chapters: "8 short chapters",
    cover: "/heroImages/people.png",
    price: "Rs. 850",
    accent: "bg-slate-50",
  },
];

export default function GuideBooksPage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      <section className="overflow-hidden border-b border-blue-100 bg-linear-to-br from-white via-sky-50 to-blue-100">
        <div className="mx-auto grid max-w-11/12 gap-10 px-4 py-16 md:px-0 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
              LifePath Guide Books
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
                Practical guide books for clearer decisions and stronger next
                steps
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
                These resources are built around the LifePath method: know
                yourself, understand your options, and move into work with a
                plan that fits you.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-semibold text-zinc-900">4</p>
                <p className="text-sm text-zinc-600">Focused guide books</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-semibold text-zinc-900">
                  Templates
                </p>
                <p className="text-sm text-zinc-600">Worksheets you can use</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-semibold text-zinc-900">
                  Actionable
                </p>
                <p className="text-sm text-zinc-600">Built for real progress</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/personality-test"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Find Your Lifepath
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
              >
                Ask about bulk access
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-x-10 top-10 h-24 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="relative rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(37,99,235,0.35)] sm:p-8">
              <div className="mb-5 flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
                    Featured resource
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    Know Yourself Career Workbook
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
                  Rs. 1,200
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] bg-linear-to-br from-slate-100 to-white">
                <Image
                  src="/heroImages/self.png"
                  alt="LifePath guide book preview"
                  width={900}
                  height={900}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    Includes
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    Reflection prompts and strength-mapping exercises
                  </p>
                </div>
                <div className="rounded-2xl border border-blue-100 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    Best for
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    Students and career switchers who need clarity fast
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-11/12 px-4 py-14 md:px-0 md:py-18">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
              Read and apply
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
              Guide books designed for action, not passive reading
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles size={16} />
            Built around the LifePath method
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {guideBooks.map((book) => (
            <article
              key={book.id}
              className="overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-[0_20px_60px_-40px_rgba(37,99,235,0.35)]"
            >
              <div className={`${book.accent} border-b border-blue-100 p-4`}>
                <div className="relative overflow-hidden rounded-[1.25rem] bg-white">
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    width={900}
                    height={900}
                    className="h-56 w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h3 className="text-xl font-semibold leading-tight text-zinc-900">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {book.subtitle}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-zinc-600">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-blue-600" />
                    <span>{book.format}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-blue-600" />
                    <span>{book.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Layers3 size={18} className="text-blue-600" />
                    <span>{book.chapters}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-blue-100 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      Price
                    </p>
                    <p className="mt-1 text-lg font-semibold text-zinc-900">
                      {book.price}
                    </p>
                  </div>
                  <Download size={18} className="text-blue-600" />
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Get Guide Book
                  </Link>
                  <Link
                    href="/personality-test"
                    className="inline-flex items-center justify-center rounded-full border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                  >
                    Know Yourself
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
