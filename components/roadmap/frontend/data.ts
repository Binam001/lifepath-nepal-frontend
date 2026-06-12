// Frontend Roadmap data — full senior-track curriculum across 10 phases.
// All coordinates are in a virtual canvas of CANVAS_W × CANVAS_H pixels.

export type NodeVariant =
  | "primary"
  | "secondary"
  | "topic"
  | "option"
  | "label"
  | "title"
  | "phase";

export type ResourceKind = "official" | "article" | "video" | "course" | "opensource";

export interface Resource {
  label: string;
  url: string;
  kind?: ResourceKind;
}

export interface RNode {
  id: string;
  title: string;
  variant: NodeVariant;
  /** "recommended" = solid blue, "alternative" = sky, "optional" = dashed gray */
  flavor?: "recommended" | "alternative" | "optional";
  x: number;
  y: number;
  w: number;
  h: number;
  description?: string;
  resources?: Resource[];
}

export interface REdge {
  from: string;
  to: string;
  path?: string;
  dashed?: boolean;
  color?: string;
  kind?: "main" | "cross";
}

export const CANVAS_W = 1480;
export const CANVAS_H = 7780;

// ----------------------------------------------------------------------------
// Layout helpers
// ----------------------------------------------------------------------------
const MID = CANVAS_W / 2;
const MAIN_W = 230;
const MAIN_H = 56;
const SUB_W = 220;
const SUB_H = 44;

const mainBox = (x: number, y: number) => ({
  x: x - MAIN_W / 2,
  y,
  w: MAIN_W,
  h: MAIN_H,
});

const subBox = (x: number, y: number, w: number = SUB_W) => {
  void w;
  return {
    x: x - SUB_W / 2,
    y,
    w: SUB_W,
    h: SUB_H,
  };
};

const phaseBox = (y: number) => ({
  x: MID - 320,
  y,
  w: 640,
  h: 48,
});

// ----------------------------------------------------------------------------
// Nodes
// ----------------------------------------------------------------------------
export const NODES: RNode[] = [
  // ============ Title ============
  {
    id: "title",
    title: "Frontend Developer",
    variant: "title",
    x: MID - 220,
    y: 20,
    w: 440,
    h: 90,
  },

  // ============================================================
  // PHASE 1 — The "Trinity"
  // ============================================================
  { id: "phase-1", title: "Phase 1 — The Trinity (Languages & Browser)", variant: "phase", ...phaseBox(140) },

  // Internet
  { id: "internet", title: "Internet", variant: "primary", ...mainBox(MID, 220) },
  { id: "internet-how", title: "How the internet works", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 210) },
  { id: "internet-http", title: "HTTP & Status Codes", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 260) },
  { id: "internet-domain", title: "Domain Names", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 310) },
  { id: "internet-hosting", title: "Hosting", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 360) },
  { id: "internet-dns", title: "DNS", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 410) },
  { id: "internet-browsers", title: "Browsers & Rendering Pipeline", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 460, 260) },

  // HTML
  { id: "html", title: "HTML", variant: "primary", ...mainBox(MID, 570) },
  { id: "html-basics", title: "HTML5 Semantics", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 560) },
  { id: "html-forms", title: "Forms & Constraint Validation", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 610, 250) },
  { id: "html-conventions", title: "Conventions & Best Practices", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 660) },
  { id: "html-a11y", title: "Accessibility (WCAG 2.2 + ARIA)", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 710, 260) },
  { id: "html-seo", title: "SEO Basics", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 760) },
  { id: "html-advanced", title: "Web Components & DOM Tree", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 810, 250) },

  // CSS
  { id: "css", title: "CSS", variant: "primary", ...mainBox(MID, 920) },
  { id: "css-basics", title: "Selectors, Box Model & Variables", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 910, 280) },
  { id: "css-layouts", title: "Flexbox, Grid & Container Queries", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 960, 290) },
  { id: "css-responsive", title: "Responsive Design & Fluid Type", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 1010, 260) },
  { id: "css-modern", title: "Modern CSS (@layer, Nesting, Logical)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 1060, 290) },
  { id: "css-animation", title: "Animations & Web Animations API", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 1110, 270) },

  // JavaScript
  { id: "js", title: "JavaScript", variant: "primary", ...mainBox(MID, 1220) },
  { id: "js-basics", title: "ES6+ Syntax & Constructs", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1210, 240) },
  { id: "js-dom", title: "DOM Manipulation", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1260) },
  { id: "js-fetch", title: "Fetch API / Network", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1310) },
  { id: "js-async", title: "Event Loop, Promises, async/await", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1360, 280) },
  { id: "js-deep", title: "Closures, this, Prototypes, Classes", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1410, 270) },
  { id: "js-modules-memory", title: "Modules (ESM) & Memory Management", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1460, 290) },

  // ============================================================
  // PHASE 2 — Logic & Engineering
  // ============================================================
  { id: "phase-2", title: "Phase 2 — Logic & Engineering (TypeScript & Frameworks)", variant: "phase", ...phaseBox(1560) },

  // TypeScript
  { id: "types", title: "TypeScript", variant: "primary", ...mainBox(MID, 1640) },
  { id: "ts-typescript", title: "TS Basics (Interfaces, Types, Enums)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 1630, 280) },
  { id: "ts-advanced", title: "Generics, Utility Types, Type Guards", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 1680, 290) },

  // Pick a Framework
  { id: "framework", title: "Pick a Framework", variant: "primary", ...mainBox(MID, 1790) },
  { id: "fw-react", title: "React", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 1780) },
  { id: "fw-vue", title: "Vue.js", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 1830) },
  { id: "fw-svelte", title: "Svelte", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 1880) },
  { id: "fw-angular", title: "Angular", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 1930) },
  { id: "fw-solid", title: "Solid JS", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 1980) },
  { id: "fw-qwik", title: "Qwik", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 2030) },

  // Framework Mastery
  { id: "fw-mastery", title: "Framework Mastery", variant: "primary", ...mainBox(MID, 2140) },
  { id: "fw-internals", title: "Internals (vDOM, Signals, Runes)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2130, 270) },
  { id: "fw-state", title: "State Management (Local & Global)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2180, 280) },
  { id: "fw-data", title: "Server State & Forms (TanStack, Zod)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2230, 290) },
  { id: "fw-lifecycle", title: "Hooks, Composables & Lifecycle", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2280, 270) },
  { id: "fw-routing", title: "Routing (Nested, Parallel)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2330, 250) },
  { id: "fw-patterns", title: "Context & Component Patterns", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2380, 270) },

  // SSR
  { id: "ssr", title: "Server Side Rendering", variant: "primary", ...mainBox(MID, 2490) },
  { id: "ssr-next", title: "Next.js", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 2480) },
  { id: "ssr-nuxt", title: "Nuxt.js", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 2530) },
  { id: "ssr-remix", title: "Remix", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 2580) },
  { id: "ssr-hydration", title: "Hydration, RSC & Resumability", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 2630, 270) },

  // ============================================================
  // PHASE 3 — Build System & Environment
  // ============================================================
  { id: "phase-3", title: "Phase 3 — The Build System & Environment", variant: "phase", ...phaseBox(2740) },

  // VCS
  { id: "vcs", title: "Version Control Systems", variant: "primary", ...mainBox(MID, 2820) },
  { id: "vcs-git", title: "Git", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 2820) },

  // VCS Hosting
  { id: "vcsHosting", title: "VCS Hosting", variant: "primary", ...mainBox(MID, 2920) },
  { id: "vcs-github", title: "GitHub", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 2900) },
  { id: "vcs-gitlab", title: "GitLab", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 2950) },
  { id: "vcs-bitbucket", title: "Bitbucket", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 3000) },

  // Pkg
  { id: "pkg", title: "Package Managers", variant: "primary", ...mainBox(MID, 3090) },
  { id: "pkg-npm", title: "npm", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 3070) },
  { id: "pkg-pnpm", title: "pnpm", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 3120) },
  { id: "pkg-yarn", title: "yarn / bun", variant: "secondary", flavor: "alternative", ...subBox(MID + 280, 3170) },

  // Build Tools
  { id: "build", title: "Build Tools", variant: "primary", ...mainBox(MID, 3280) },
  { id: "bt-vite", title: "Vite", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3250) },
  { id: "bt-webpack", title: "Webpack", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 3300) },
  { id: "bt-esbuild", title: "esbuild", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 3350) },
  { id: "bt-transpile", title: "Transpilers (Babel, SWC, Turbopack)", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3400, 290) },
  { id: "bt-prettier", title: "Prettier", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3450) },
  { id: "bt-eslint", title: "ESLint / Biome", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3500) },

  // Dev Environment
  { id: "env-mastery", title: "Dev Environment", variant: "primary", ...mainBox(MID, 3620) },
  { id: "env-vars", title: "Environment Variables", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 3610) },
  { id: "env-monorepo", title: "Monorepos (Turborepo, Nx)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 3660, 250) },
  { id: "env-ci", title: "CI/CD (Actions, Vercel, Federation)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 3710, 290) },

  // ============================================================
  // PHASE 4 — Performance & Optimization
  // ============================================================
  { id: "phase-4", title: "Phase 4 — Performance & Optimization (Senior Tier)", variant: "phase", ...phaseBox(3820) },

  { id: "perf", title: "Performance", variant: "primary", ...mainBox(MID, 3900) },
  { id: "perf-vitals", title: "Core Web Vitals (LCP, CLS, INP)", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3890, 270) },
  { id: "perf-loading", title: "Code Split, Tree Shake, Critical CSS", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3940, 300) },
  { id: "perf-media", title: "Image & Font Mastery", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 3990) },
  { id: "perf-runtime", title: "Rendering Perf, Debounce, Throttle", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4040, 290) },
  { id: "perf-workers", title: "Web Workers & WebAssembly", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4090, 260) },
  { id: "perf-caching", title: "Caching Strategies & Service Workers", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4140, 290) },

  // ============================================================
  // PHASE 5 — Security & Data
  // ============================================================
  { id: "phase-5", title: "Phase 5 — Security & Data", variant: "phase", ...phaseBox(4260) },

  { id: "security", title: "Web Security", variant: "primary", ...mainBox(MID, 4340) },
  { id: "sec-attacks", title: "XSS, CSRF & CSP", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 4330) },
  { id: "sec-transport", title: "HTTPS/TLS & CORS", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 4380) },

  { id: "auth", title: "Authentication", variant: "primary", ...mainBox(MID, 4480) },
  { id: "auth-jwt", title: "JWT", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4460) },
  { id: "auth-oauth", title: "OAuth", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4510) },
  { id: "auth-session", title: "Session + Cookie", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4560) },
  { id: "auth-basic", title: "Basic Authentication", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 4610) },

  { id: "data-mastery", title: "Data & Real-time", variant: "primary", ...mainBox(MID, 4720) },
  { id: "data-storage", title: "Storage APIs (Local, Cookies, IndexedDB)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 4710, 310) },
  { id: "data-realtime", title: "WebSockets & SSE", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 4760) },

  { id: "graphql", title: "GraphQL", variant: "primary", flavor: "optional", ...mainBox(MID, 4870) },
  { id: "gql-apollo", title: "Apollo Client", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 4860) },
  { id: "gql-relay", title: "Relay Modern", variant: "secondary", flavor: "alternative", ...subBox(MID - 280, 4910) },

  // ============================================================
  // PHASE 6 — Testing & Quality
  // ============================================================
  { id: "phase-6", title: "Phase 6 — Testing & Quality", variant: "phase", ...phaseBox(5020) },

  { id: "testing", title: "Testing your Apps", variant: "primary", ...mainBox(MID, 5100) },
  { id: "test-vitest", title: "Vitest", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 5080) },
  { id: "test-jest", title: "Jest", variant: "secondary", flavor: "alternative", ...subBox(MID + 280, 5130) },
  { id: "test-rtl", title: "React Testing Library", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 5180) },
  { id: "test-playwright", title: "Playwright (E2E)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 5230) },
  { id: "test-cypress", title: "Cypress", variant: "secondary", flavor: "alternative", ...subBox(MID + 280, 5280) },
  { id: "test-quality", title: "Visual Regression, Snapshot, MSW", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 5330, 290) },

  // ============================================================
  // PHASE 7 — UI/UX & Design Systems
  // ============================================================
  { id: "phase-7", title: "Phase 7 — UI/UX & Design Systems", variant: "phase", ...phaseBox(5440) },

  { id: "design-systems", title: "Design Systems", variant: "primary", ...mainBox(MID, 5520) },
  { id: "ds-tokens", title: "Tokens, Typography & Color (APCA)", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 5510, 290) },
  { id: "ds-headless", title: "Headless UI (Radix, shadcn/ui)", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 5560, 270) },
  { id: "ds-framer", title: "Framer Motion", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 5610, 230) },
  { id: "ds-gsap", title: "GSAP + ScrollTrigger", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 5660, 250) },
  { id: "ds-storybook", title: "Storybook", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 5710) },

  // ============================================================
  // PHASE 8 — Modern & Emerging
  // ============================================================
  { id: "phase-8", title: "Phase 8 — Modern & Emerging Tech (2026)", variant: "phase", ...phaseBox(5770) },

  { id: "pwa", title: "Progressive Web Apps", variant: "primary", ...mainBox(MID, 5850) },
  { id: "pwa-sw", title: "Service Workers", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 5840) },
  { id: "pwa-storage", title: "Offline + Web Storage", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 5890) },

  { id: "modern-web", title: "Modern Web", variant: "primary", ...mainBox(MID, 6000) },
  { id: "emrg-ai", title: "AI Integration & Generative UI", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 5990, 280) },
  { id: "emrg-graphics", title: "SVG, Canvas, WebGPU/WebGL", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 6040, 270) },
  { id: "emrg-darkmode", title: "Dark Mode & color-scheme", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 6090) },

  { id: "mobile", title: "Mobile Applications", variant: "primary", flavor: "optional", ...mainBox(MID, 6200) },
  { id: "mob-rn", title: "React Native", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 6190) },
  { id: "mob-flutter", title: "Flutter", variant: "secondary", flavor: "alternative", ...subBox(MID + 280, 6240) },
  { id: "mob-ionic", title: "Ionic", variant: "secondary", flavor: "alternative", ...subBox(MID + 280, 6290) },

  { id: "desktop", title: "Desktop Applications", variant: "primary", flavor: "optional", ...mainBox(MID, 6400) },
  { id: "desk-electron", title: "Electron", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 6390) },
  { id: "desk-tauri", title: "Tauri", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 6440) },

  // ============================================================
  // PHASE 9 — Soft Skills & Architecture
  // ============================================================
  { id: "phase-9", title: "Phase 9 — Soft Skills & Architecture", variant: "phase", ...phaseBox(6550) },

  { id: "craft", title: "Engineering Craft", variant: "primary", ...mainBox(MID, 6630) },
  { id: "craft-collab", title: "Code Reviews & Agile", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 6620) },
  { id: "craft-docs", title: "Docs, JSDoc & Tech Debt", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 6670, 260) },
  { id: "craft-handoff", title: "Design-to-Code (Figma)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 6720, 240) },
  { id: "craft-git", title: "Git Mastery (rebase, bisect)", variant: "secondary", flavor: "recommended", ...subBox(MID + 280, 6770, 260) },

  // ============================================================
  // PHASE 10 — Mastery Checkpoints
  // ============================================================
  { id: "phase-10", title: "Phase 10 — Mastery Checkpoints", variant: "phase", ...phaseBox(6890) },

  { id: "production", title: "Production-Ready", variant: "primary", ...mainBox(MID, 6970) },
  { id: "prod-debug", title: "DevTools Debugging Mastery", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 6960, 260) },
  { id: "prod-monitoring", title: "Sentry, Analytics, Feature Flags", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 7010, 290) },
  { id: "prod-global", title: "i18n, RTL & TC39 Watch", variant: "secondary", flavor: "recommended", ...subBox(MID - 280, 7060, 240) },

  // ============ End ============
  {
    id: "end",
    title: "Keep Learning. Keep Shipping.",
    variant: "title",
    x: MID - 220,
    y: 7200,
    w: 440,
    h: 80,
  },
];

const NODE_BY_ID = new Map(NODES.map((node) => [node.id, node] as const));

// ----------------------------------------------------------------------------
// Edge helpers
// ----------------------------------------------------------------------------
function vCurve(x1: number, y1: number, x2: number, y2: number) {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}
function hookRight(mainCx: number, mainCy: number, subCx: number, subCy: number) {
  const startX = mainCx + MAIN_W / 2;
  const endX = subCx - SUB_W / 2;
  const elbowX = Math.round((startX + endX) / 2);
  return `M ${startX} ${mainCy} L ${elbowX} ${mainCy} L ${elbowX} ${subCy} L ${endX} ${subCy}`;
}
function hookLeft(mainCx: number, mainCy: number, subCx: number, subCy: number) {
  const startX = mainCx - MAIN_W / 2;
  const endX = subCx + SUB_W / 2;
  const elbowX = Math.round((startX + endX) / 2);
  return `M ${startX} ${mainCy} L ${elbowX} ${mainCy} L ${elbowX} ${subCy} L ${endX} ${subCy}`;
}

const cy = (yTop: number) => yTop + MAIN_H / 2;
const sy = (yTop: number) => yTop + SUB_H / 2;

// Quick lookup: main node y-tops
const M = {
  internet: 220,
  html: 570,
  css: 920,
  js: 1220,
  types: 1640,
  framework: 1790,
  fwMastery: 2140,
  ssr: 2490,
  vcs: 2820,
  vcsHosting: 2920,
  pkg: 3090,
  build: 3280,
  envMastery: 3620,
  perf: 3900,
  security: 4340,
  auth: 4480,
  dataMastery: 4720,
  graphql: 4870,
  testing: 5100,
  designSystems: 5520,
  pwa: 5850,
  modernWeb: 6000,
  mobile: 6200,
  desktop: 6400,
  craft: 6630,
  production: 6970,
};

// ----------------------------------------------------------------------------
// Edges
// ----------------------------------------------------------------------------
export const EDGES: REdge[] = [
  // Title → Internet
  { from: "title", to: "internet", path: `M ${MID} 110 L ${MID} ${M.internet}` },

  // Main spine
  ...spine([
    M.internet, M.html, M.css, M.js,
    M.types, M.framework, M.fwMastery, M.ssr,
    M.vcs, M.vcsHosting, M.pkg, M.build, M.envMastery,
    M.perf,
    M.security, M.auth, M.dataMastery, M.graphql,
    M.testing,
    M.designSystems,
    M.pwa, M.modernWeb, M.mobile, M.desktop,
    M.craft,
    M.production,
  ]),
  // Final segment to "end" title
  { from: "production", to: "end", path: `M ${MID} ${cy(M.production) + MAIN_H / 2} L ${MID} 7200` },

  // ---- Subtopic hooks ----
  // Internet (right)
  ...hookSubs("internet", M.internet, "right", [
    { id: "internet-how", y: 210 },
    { id: "internet-http", y: 260 },
    { id: "internet-domain", y: 310 },
    { id: "internet-hosting", y: 360 },
    { id: "internet-dns", y: 410 },
    { id: "internet-browsers", y: 460 },
  ]),
  // HTML (left)
  ...hookSubs("html", M.html, "left", [
    { id: "html-basics", y: 560 },
    { id: "html-forms", y: 610 },
    { id: "html-conventions", y: 660 },
    { id: "html-a11y", y: 710 },
    { id: "html-seo", y: 760 },
    { id: "html-advanced", y: 810 },
  ]),
  // CSS (right)
  ...hookSubs("css", M.css, "right", [
    { id: "css-basics", y: 910 },
    { id: "css-layouts", y: 960 },
    { id: "css-responsive", y: 1010 },
    { id: "css-modern", y: 1060 },
    { id: "css-animation", y: 1110 },
  ]),
  // JS (left)
  ...hookSubs("js", M.js, "left", [
    { id: "js-basics", y: 1210 },
    { id: "js-dom", y: 1260 },
    { id: "js-fetch", y: 1310 },
    { id: "js-async", y: 1360 },
    { id: "js-deep", y: 1410 },
    { id: "js-modules-memory", y: 1460 },
  ]),
  // TS (right)
  ...hookSubs("types", M.types, "right", [
    { id: "ts-typescript", y: 1630 },
    { id: "ts-advanced", y: 1680 },
  ]),
  // Framework (left)
  ...hookSubs("framework", M.framework, "left", [
    { id: "fw-react", y: 1780 },
    { id: "fw-vue", y: 1830 },
    { id: "fw-svelte", y: 1880 },
    { id: "fw-angular", y: 1930 },
    { id: "fw-solid", y: 1980 },
    { id: "fw-qwik", y: 2030 },
  ]),
  // Framework Mastery (right)
  ...hookSubs("fw-mastery", M.fwMastery, "right", [
    { id: "fw-internals", y: 2130 },
    { id: "fw-state", y: 2180 },
    { id: "fw-data", y: 2230 },
    { id: "fw-lifecycle", y: 2280 },
    { id: "fw-routing", y: 2330 },
    { id: "fw-patterns", y: 2380 },
  ]),
  // SSR (left)
  ...hookSubs("ssr", M.ssr, "left", [
    { id: "ssr-next", y: 2480 },
    { id: "ssr-nuxt", y: 2530 },
    { id: "ssr-remix", y: 2580 },
    { id: "ssr-hydration", y: 2630 },
  ]),
  // VCS (right)
  ...hookSubs("vcs", M.vcs, "right", [{ id: "vcs-git", y: 2820 }]),
  // VCS Hosting (left)
  ...hookSubs("vcsHosting", M.vcsHosting, "left", [
    { id: "vcs-github", y: 2900 },
    { id: "vcs-gitlab", y: 2950 },
    { id: "vcs-bitbucket", y: 3000 },
  ]),
  // Pkg (right)
  ...hookSubs("pkg", M.pkg, "right", [
    { id: "pkg-npm", y: 3070 },
    { id: "pkg-pnpm", y: 3120 },
    { id: "pkg-yarn", y: 3170 },
  ]),
  // Build (left)
  ...hookSubs("build", M.build, "left", [
    { id: "bt-vite", y: 3250 },
    { id: "bt-webpack", y: 3300 },
    { id: "bt-esbuild", y: 3350 },
    { id: "bt-transpile", y: 3400 },
    { id: "bt-prettier", y: 3450 },
    { id: "bt-eslint", y: 3500 },
  ]),
  // Dev Env (right)
  ...hookSubs("env-mastery", M.envMastery, "right", [
    { id: "env-vars", y: 3610 },
    { id: "env-monorepo", y: 3660 },
    { id: "env-ci", y: 3710 },
  ]),
  // Performance (left)
  ...hookSubs("perf", M.perf, "left", [
    { id: "perf-vitals", y: 3890 },
    { id: "perf-loading", y: 3940 },
    { id: "perf-media", y: 3990 },
    { id: "perf-runtime", y: 4040 },
    { id: "perf-workers", y: 4090 },
    { id: "perf-caching", y: 4140 },
  ]),
  // Security (right)
  ...hookSubs("security", M.security, "right", [
    { id: "sec-attacks", y: 4330 },
    { id: "sec-transport", y: 4380 },
  ]),
  // Auth (left)
  ...hookSubs("auth", M.auth, "left", [
    { id: "auth-jwt", y: 4460 },
    { id: "auth-oauth", y: 4510 },
    { id: "auth-session", y: 4560 },
    { id: "auth-basic", y: 4610 },
  ]),
  // Data & Real-time (right)
  ...hookSubs("data-mastery", M.dataMastery, "right", [
    { id: "data-storage", y: 4710 },
    { id: "data-realtime", y: 4760 },
  ]),
  // GraphQL (left, dashed because optional)
  ...hookSubs(
    "graphql",
    M.graphql,
    "left",
    [
      { id: "gql-apollo", y: 4860 },
      { id: "gql-relay", y: 4910 },
    ],
    true,
  ),
  // Testing (right)
  ...hookSubs("testing", M.testing, "right", [
    { id: "test-vitest", y: 5080 },
    { id: "test-jest", y: 5130 },
    { id: "test-rtl", y: 5180 },
    { id: "test-playwright", y: 5230 },
    { id: "test-cypress", y: 5280 },
    { id: "test-quality", y: 5330 },
  ]),
  // Design Systems (left)
  ...hookSubs("design-systems", M.designSystems, "left", [
    { id: "ds-tokens", y: 5510 },
    { id: "ds-headless", y: 5560 },
    { id: "ds-framer", y: 5610 },
    { id: "ds-gsap", y: 5660 },
    { id: "ds-storybook", y: 5710 },
  ]),
  // PWA (right)
  ...hookSubs("pwa", M.pwa, "right", [
    { id: "pwa-sw", y: 5840 },
    { id: "pwa-storage", y: 5890 },
  ]),
  // Modern Web (left)
  ...hookSubs("modern-web", M.modernWeb, "left", [
    { id: "emrg-ai", y: 5990 },
    { id: "emrg-graphics", y: 6040 },
    { id: "emrg-darkmode", y: 6090 },
  ]),
  // Mobile (right, dashed - optional)
  ...hookSubs(
    "mobile",
    M.mobile,
    "right",
    [
      { id: "mob-rn", y: 6190 },
      { id: "mob-flutter", y: 6240 },
      { id: "mob-ionic", y: 6290 },
    ],
    true,
  ),
  // Desktop (left, dashed)
  ...hookSubs(
    "desktop",
    M.desktop,
    "left",
    [
      { id: "desk-electron", y: 6390 },
      { id: "desk-tauri", y: 6440 },
    ],
    true,
  ),
  // Craft (right)
  ...hookSubs("craft", M.craft, "right", [
    { id: "craft-collab", y: 6620 },
    { id: "craft-docs", y: 6670 },
    { id: "craft-handoff", y: 6720 },
    { id: "craft-git", y: 6770 },
  ]),
  // Production (left)
  ...hookSubs("production", M.production, "left", [
    { id: "prod-debug", y: 6960 },
    { id: "prod-monitoring", y: 7010 },
    { id: "prod-global", y: 7060 },
  ]),

  // ---- Cross-topic interconnections (roadmap-style dependencies) ----
  ...crossLinks([
    ["internet-http", "js-fetch"],
    ["js-async", "fw-data"],
    ["fw-routing", "ssr-next"],
    ["perf-caching", "pwa-sw"],
    ["env-ci", "prod-monitoring"],
    ["ds-gsap", "emrg-graphics"],
  ]),
];

// Build vertical spine edges
function spine(yTops: number[]): REdge[] {
  const out: REdge[] = [];
  for (let i = 0; i < yTops.length - 1; i++) {
    out.push({
      from: `spine-${i}`,
      to: `spine-${i + 1}`,
      path: vCurve(MID, cy(yTops[i]) + MAIN_H / 2, MID, cy(yTops[i + 1]) - MAIN_H / 2),
      kind: "main",
    });
  }
  return out;
}

// Build subtopic edges branching out from a main node
function hookSubs(
  mainId: string,
  mainYTop: number,
  side: "left" | "right",
  subs: { id: string; y: number }[],
  dashed = false,
): REdge[] {
  const mainCx = MID;
  const mainCy = cy(mainYTop);
  const sideX = side === "right" ? MID + 280 : MID - 280;
  const fn = side === "right" ? hookRight : hookLeft;
  return subs.map((s) => ({
    from: mainId,
    to: s.id,
    path: fn(mainCx, mainCy, sideX, sy(s.y)),
    dashed,
    kind: "main",
  }));
}

function centerOf(id: string) {
  const node = NODE_BY_ID.get(id);
  if (!node) return null;
  return {
    x: node.x + node.w / 2,
    y: node.y + node.h / 2,
  };
}

function crossLinkPath(fromId: string, toId: string, laneOffset: number) {
  const from = centerOf(fromId);
  const to = centerOf(toId);
  if (!from || !to) return undefined;

  const laneX = Math.round((from.x + to.x) / 2 + laneOffset);
  return `M ${from.x} ${from.y} L ${laneX} ${from.y} L ${laneX} ${to.y} L ${to.x} ${to.y}`;
}

function crossLinks(pairs: [string, string][]): REdge[] {
  return pairs
    .map(([from, to], index) => ({
      from,
      to,
      path: crossLinkPath(from, to, index % 2 === 0 ? -26 : 26),
      dashed: true,
      color: "#94a3b8",
      kind: "cross" as const,
    }))
    .filter((edge) => Boolean(edge.path));
}
