"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Cloud,
  Code2,
  Database,
  Palette,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";

export const ROADMAPS = [
  {
    slug: "frontend",
    title: "Frontend",
    tagline: "HTML, CSS, JS → React + Next.js",
    description:
      "Build beautiful, fast, accessible interfaces. From the basics of the web to shipping production React apps.",
    icon: Code2,
    iconBg: "bg-blue-600 text-white",
    status: "live" as const,
    topics: 70,
  },
  {
    slug: "backend",
    title: "Backend",
    tagline: "Node, Databases, APIs",
    description:
      "Design the data, business logic, and APIs that power modern apps. Master databases, caching, and scaling.",
    icon: Server,
    iconBg: "bg-blue-700 text-white",
    status: "soon" as const,
  },
  {
    slug: "devops",
    title: "DevOps",
    tagline: "Linux, Docker, CI/CD, Cloud",
    description:
      "Ship reliably. Learn Linux fundamentals, containers, infrastructure-as-code, monitoring and cloud deployment.",
    icon: Cloud,
    iconBg: "bg-blue-500 text-white",
    status: "soon" as const,
  },
  {
    slug: "fullstack",
    title: "Full Stack",
    tagline: "Frontend + Backend + Deploy",
    description:
      "The complete picture — from your first HTML tag to deploying a SaaS that paying users love.",
    icon: Briefcase,
    iconBg: "bg-blue-800 text-white",
    status: "soon" as const,
  },
  {
    slug: "mobile",
    title: "Mobile",
    tagline: "React Native, Flutter, Swift, Kotlin",
    description:
      "Build apps people carry in their pocket. Cross-platform with React Native or native with Swift/Kotlin.",
    icon: Smartphone,
    iconBg: "bg-blue-600 text-white",
    status: "soon" as const,
  },
  {
    slug: "data",
    title: "Data Analyst",
    tagline: "SQL, Python, Excel, Tableau",
    description:
      "Turn data into decisions. Statistics, SQL, Python and visualization tools used by every data team.",
    icon: Database,
    iconBg: "bg-blue-700 text-white",
    status: "soon" as const,
  },
  {
    slug: "ux",
    title: "UX / UI Design",
    tagline: "Figma, Research, Systems",
    description:
      "Design products people actually love using. Research, interaction design, prototyping, and design systems.",
    icon: Palette,
    iconBg: "bg-blue-500 text-white",
    status: "soon" as const,
  },
];

export default function RoadmapHubPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-900 bg-linear-to-l from-blue-600 to-black text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              Career Roadmaps
            </div>
            <div className="mt-5">
              <PageTitle
                title="Your path to a tech career"
                subtitle="Interactive, step-by-step roadmaps that show you what to learn, in what order, and where to find the best free resources. Track your progress as you go."
                titleClassName="text-4xl md:text-6xl font-bold text-white mb-4"
                subtitleClassName="text-base md:text-lg text-blue-100"
                containerClassName="max-w-3xl mx-auto"
                align="center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap grid */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAPS.map((r) => {
            const Icon = r.icon;
            const isLive = r.status === "live";

            const card = (
              <div
                className={`group relative h-full overflow-hidden rounded-2xl border bg-white p-6 transition ${
                  isLive
                    ? "border-blue-100 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 cursor-pointer"
                    : "border-zinc-200 opacity-90"
                }`}
              >
                {/* corner accent */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-[3px_3px_0_#1e3a8a] ${r.iconBg}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  {isLive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                      Coming soon
                    </span>
                  )}
                </div>

                <h3
                  className="mt-5 text-2xl font-semibold text-blue-700"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {r.title}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-zinc-500">
                  {r.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {r.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  {isLive ? (
                    <span className="text-xs font-medium text-zinc-500">
                      {r.topics}+ topics · ~80 hrs
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-zinc-400">
                      We&apos;re still designing this one
                    </span>
                  )}
                  {isLive && (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:gap-2 transition-all">
                      Start <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            );

            return isLive ? (
              <Link key={r.slug} href={`/roadmap/${r.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={r.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2
            className="text-3xl font-semibold text-blue-600 md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Want a roadmap we haven&apos;t built yet?
          </h2>
          <p className="mt-3 text-zinc-600">
            Tell us what role or skill you&apos;re aiming for and we&apos;ll
            prioritize building the roadmap for it.
          </p>
          <Link
            href="/support"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Request a roadmap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
