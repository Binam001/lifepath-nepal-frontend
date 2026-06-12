// Small project ideas that surface on the side of the roadmap
// once the learner has reached a meaningful milestone.

import { NodeStatus } from "../components/useProgress";

export interface ProjectIdea {
  id: string;
  title: string;
  pitch: string;
  steps: string[];
  stack: string[];
  /** Which side rail the card sits on */
  side: "left" | "right";
  /** Vertical top position in canvas coordinates (matches data.ts y system) */
  y: number;
  /** Estimated time to ship a basic version */
  effort: string;
  /** Conditions that must all be satisfied for the card to "unlock" */
  unlock: {
    /** ALL of these node ids must be marked 'done' */
    requireDone?: string[];
    /** At least one of these node ids must be 'done' */
    requireAnyDone?: string[];
    /** Total trackable nodes marked 'done' must reach this number */
    requireDoneCount?: number;
    /** Friendly "Unlocks after…" message shown while locked */
    description: string;
  };
}

export const PROJECTS: ProjectIdea[] = [
  {
    id: "p-resume",
    title: "Personal résumé page",
    pitch:
      "Your very first real project. Build your own CV as a single semantic HTML page.",
    steps: [
      "Structure with header, main, section, footer.",
      "Add an email + phone block and a contact form.",
      "Validate with the W3C Markup Validator.",
    ],
    stack: ["HTML"],
    side: "right",
    y: 480,
    effort: "1–2 days",
    unlock: {
      requireAnyDone: ["html-basics", "html-forms", "html-a11y"],
      description: "Unlocks once you mark any HTML topic as done",
    },
  },
  {
    id: "p-figma-clone",
    title: "Clone a landing page",
    pitch:
      "Pick any landing page on Dribbble or Mobbin and recreate it with pure HTML + CSS.",
    steps: [
      "Choose a single-screen design.",
      "Use only Flexbox + Grid for layout.",
      "Make it responsive at 360px, 768px and 1280px.",
    ],
    stack: ["HTML", "CSS"],
    side: "left",
    y: 770,
    effort: "3–5 days",
    unlock: {
      requireAnyDone: ["css-basics", "css-layouts", "css-responsive"],
      description: "Unlocks after a CSS topic is done",
    },
  },
  {
    id: "p-todo-vanilla",
    title: "Vanilla JS todo app",
    pitch:
      "The classic. No frameworks, no libraries — just you, the DOM, and localStorage.",
    steps: [
      "Add, edit, complete and delete todos.",
      "Persist them in localStorage between reloads.",
      "Filter by All / Active / Completed.",
    ],
    stack: ["HTML", "CSS", "JS"],
    side: "right",
    y: 960,
    effort: "2–3 days",
    unlock: {
      requireAnyDone: ["js-basics", "js-dom"],
      description: "Unlocks after a JavaScript topic is done",
    },
  },
  {
    id: "p-open-source",
    title: "Open-source your todo",
    pitch:
      "Push your todo app to GitHub with a real README, a license and a screenshot.",
    steps: [
      "git init → commit → push.",
      "Write a README with install + run instructions.",
      "Tag your first v0.1 release.",
    ],
    stack: ["Git", "GitHub"],
    side: "left",
    y: 1210,
    effort: "1 day",
    unlock: {
      requireDone: ["vcs-git"],
      description: "Unlocks after Git is marked done",
    },
  },
  {
    id: "p-react-todo",
    title: "Rebuild the todo in React",
    pitch:
      "Same app, but components and state replace querySelector. The moment React clicks.",
    steps: [
      "Scaffold with `npm create vite@latest`.",
      "Lift state to a TodoList parent component.",
      "Add filter buttons that re-render the list.",
    ],
    stack: ["React", "Vite"],
    side: "right",
    y: 1670,
    effort: "2–3 days",
    unlock: {
      requireAnyDone: [
        "fw-react",
        "fw-vue",
        "fw-svelte",
        "fw-angular",
        "fw-solid",
        "fw-qwik",
      ],
      description: "Unlocks once you’ve picked a framework",
    },
  },
  {
    id: "p-tailwind-clone",
    title: "SaaS hero clone with Tailwind",
    pitch:
      "Pick Stripe, Linear or Vercel’s homepage. Clone the hero + pricing section.",
    steps: [
      "Use only Tailwind utility classes — no custom CSS.",
      "Support light + dark mode.",
      "Animate one element with `transition` + `hover:`.",
    ],
    stack: ["React", "Tailwind"],
    side: "left",
    y: 2010,
    effort: "3–4 days",
    unlock: {
      requireDone: ["wc-tailwind"],
      description: "Unlocks after Tailwind is marked done",
    },
  },
  {
    id: "p-tested-app",
    title: "Add tests to a past project",
    pitch:
      "Go back to your todo and cover it: unit tests for helpers, component tests for the UI.",
    steps: [
      "Add Vitest + React Testing Library.",
      "Write 3 unit tests for pure functions.",
      "Add 1 RTL test that clicks Add → asserts the list grows.",
    ],
    stack: ["Vitest", "RTL"],
    side: "right",
    y: 2700,
    effort: "1–2 days",
    unlock: {
      requireAnyDone: ["test-vitest", "test-jest", "test-rtl"],
      description: "Unlocks after any testing topic is done",
    },
  },
  {
    id: "p-saas-auth",
    title: "Mini SaaS auth flow",
    pitch:
      "Signup → login → protected dashboard. The skeleton of every real product.",
    steps: [
      "Set up Auth.js with Email + Google providers.",
      "Add a /dashboard route that requires login.",
      "Show the logged-in user’s name and a Sign out button.",
    ],
    stack: ["Next.js", "Auth.js"],
    side: "left",
    y: 3010,
    effort: "3–5 days",
    unlock: {
      requireAnyDone: ["auth-jwt", "auth-oauth", "auth-session"],
      description: "Unlocks after an Auth topic is done",
    },
  },
  {
    id: "p-mdx-blog",
    title: "Markdown blog with Next.js",
    pitch:
      "A static blog built from .md files. Free to deploy on Vercel. Looks professional on a CV.",
    steps: [
      "Read posts from a /content folder using MDX.",
      "Generate dynamic routes for each post.",
      "Deploy to Vercel and connect a custom domain.",
    ],
    stack: ["Next.js", "MDX", "TypeScript"],
    side: "right",
    y: 3450,
    effort: "4–6 days",
    unlock: {
      requireDone: ["ssr-next"],
      description: "Unlocks after Next.js is marked done",
    },
  },
  {
    id: "p-capstone",
    title: "Ship a real product",
    pitch:
      "The capstone. Pick a real problem you have, build the smallest thing that solves it, and charge $1.",
    steps: [
      "Talk to 3 potential users this week.",
      "Build the smallest version that solves their problem.",
      "Get one person to pay you for it.",
    ],
    stack: ["Full stack"],
    side: "right",
    y: 4070,
    effort: "2–4 weeks",
    unlock: {
      requireDoneCount: 30,
      description: "Unlocks after you’ve completed 30 topics",
    },
  },
  {
    id: "p-perf-warroom",
    title: "Performance war-room dashboard",
    pitch:
      "Build a production performance dashboard that tracks Core Web Vitals and ships weekly optimization experiments.",
    steps: [
      "Instrument Web Vitals collection and send metrics to an analytics store.",
      "Create a dashboard with route-level trends and regression flags.",
      "Ship two optimizations and document before/after impact.",
    ],
    stack: ["Next.js", "Web Vitals", "Analytics"],
    side: "left",
    y: 4480,
    effort: "1–2 weeks",
    unlock: {
      requireDone: ["perf-vitals", "perf-loading", "perf-runtime"],
      requireDoneCount: 36,
      description:
        "Unlocks after core performance topics and 36 completed nodes",
    },
  },
  {
    id: "p-design-system-package",
    title: "Versioned design system package",
    pitch:
      "Create a reusable component package with tokens, Storybook docs, and release workflows that other apps can consume.",
    steps: [
      "Extract tokens + primitives into a shared package.",
      "Document variants and usage in Storybook with accessibility notes.",
      "Publish versioned releases and integrate into one consuming app.",
    ],
    stack: ["TypeScript", "Storybook", "Changesets"],
    side: "right",
    y: 5600,
    effort: "2–3 weeks",
    unlock: {
      requireDone: ["ds-tokens", "ds-headless", "ds-storybook"],
      requireAnyDone: ["ds-framer", "ds-gsap"],
      requireDoneCount: 42,
      description: "Unlocks after design-system topics and 42 completed nodes",
    },
  },
  {
    id: "p-platform-migration",
    title: "Frontend platform migration plan",
    pitch:
      "Execute a senior-level migration for a large app: architecture RFC, phased rollout, observability, and zero-downtime cutover.",
    steps: [
      "Write an RFC covering scope, risks, milestones, and rollback plans.",
      "Implement one vertical slice in the new architecture with feature flags.",
      "Measure error rate and performance parity before full migration.",
    ],
    stack: ["Architecture", "Feature Flags", "Observability"],
    side: "left",
    y: 6820,
    effort: "3–4 weeks",
    unlock: {
      requireDone: [
        "env-ci",
        "test-playwright",
        "prod-monitoring",
        "craft-docs",
      ],
      requireDoneCount: 50,
      description:
        "Unlocks after senior architecture topics and 50 completed nodes",
    },
  },
];

// ---------------------------------------------------------------------------
// Unlock logic
// ---------------------------------------------------------------------------
export function isUnlocked(
  p: ProjectIdea,
  progress: Record<string, NodeStatus>,
  doneCount: number,
): boolean {
  if (p.unlock.requireDone) {
    for (const id of p.unlock.requireDone) {
      if (progress[id] !== "done") return false;
    }
  }
  if (p.unlock.requireAnyDone) {
    const anyDone = p.unlock.requireAnyDone.some(
      (id) => progress[id] === "done",
    );
    if (!anyDone) return false;
  }
  if (p.unlock.requireDoneCount !== undefined) {
    if (doneCount < p.unlock.requireDoneCount) return false;
  }
  return true;
}
