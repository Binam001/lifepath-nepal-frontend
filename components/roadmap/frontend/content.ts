// Long-form content shown inside the side drawer for each roadmap node.
// Kept separate from data.ts so the layout stays readable.

import { Resource } from "./data";

export interface NodeContent {
  /** 1–3 sentence summary shown at the top of the drawer */
  description: string;
  /** Concrete first steps the learner can take today */
  howToBegin: string[];
  /** Curated free resources, ordered most-useful first */
  resources: Resource[];
  /** How long an average beginner should plan to spend, e.g. "1–2 weeks" */
  effort?: string;
}

export const CONTENT: Record<string, NodeContent> = {
  // ----------------------------- Internet -----------------------------
  internet: {
    description:
      "The internet is the global network your apps live on. Before you can build for the web, you should understand how packets travel from a browser, through DNS, to a server, and back as a webpage.",
    howToBegin: [
      "Read MDN’s primer on how the internet works (15 min).",
      "Watch a short video that traces a single HTTP request end-to-end.",
      "Open your browser DevTools → Network tab and refresh any page. Click a request and read the headers.",
    ],
    resources: [
      { label: "MDN — How does the Internet work?", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work", kind: "official" },
      { label: "Vox — What is the Internet? (video)", url: "https://www.youtube.com/watch?v=7_LPdttKXPc", kind: "video" },
      { label: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/", kind: "article" },
    ],
    effort: "2–3 days",
  },
  "internet-how": {
    description:
      "Understand the journey of a webpage: typed URL → DNS lookup → TCP/TLS handshake → HTTP request → server response → rendered page.",
    howToBegin: [
      "Read “How does the Internet work?” on MDN.",
      "Read “What happens when you type google.com into your browser?” on GitHub.",
      "Open DevTools → Network and watch a real-world request lifecycle.",
    ],
    resources: [
      { label: "MDN — How the Internet works", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work", kind: "official" },
      { label: "What happens when you type google.com…", url: "https://github.com/alex/what-happens-when", kind: "article" },
      { label: "Khan Academy — The Internet", url: "https://www.khanacademy.org/computing/code-org/computers-and-the-internet", kind: "course" },
    ],
  },
  "internet-http": {
    description:
      "HTTP is the request/response protocol that powers the web. Learn the verbs (GET, POST, PUT, PATCH, DELETE), the most common status codes, and the difference between headers and the body.",
    howToBegin: [
      "Read MDN’s HTTP overview.",
      "Install Postman or use curl from the terminal to make a GET and POST request to https://jsonplaceholder.typicode.com.",
      "Memorize the meaning of 200, 301, 400, 401, 404 and 500.",
    ],
    resources: [
      { label: "MDN — HTTP overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", kind: "official" },
      { label: "HTTP Cats — status codes", url: "https://http.cat/", kind: "article" },
      { label: "Postman Learning Center", url: "https://learning.postman.com/", kind: "course" },
    ],
  },
  "internet-domain": {
    description:
      "A domain name (like lifepathnepal.com) is a human-friendly label that maps to a server’s IP address. Learn how registrars, TLDs and DNS records connect.",
    howToBegin: [
      "Read Cloudflare’s “What is a domain name?” article.",
      "Look up the DNS records of any site on https://www.whatsmydns.net.",
      "Try buying a $1 domain on Namecheap or Porkbun to see the registrar flow.",
    ],
    resources: [
      { label: "Cloudflare — What is a domain name?", url: "https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/", kind: "article" },
      { label: "ICANN — Domain Names Basics", url: "https://www.icann.org/resources/pages/welcome-2012-02-25-en", kind: "official" },
    ],
  },
  "internet-hosting": {
    description:
      "Hosting is where your files physically live so the world can fetch them. Static sites can live on Vercel/Netlify; dynamic apps live on EC2/Render/Fly/etc.",
    howToBegin: [
      "Sign up for Vercel (free) and deploy a single index.html file.",
      "Read the docs on what static vs server-rendered hosting means.",
      "Try deploying the same site to Netlify — compare the workflow.",
    ],
    resources: [
      { label: "Vercel — Get Started", url: "https://vercel.com/docs/getting-started-with-vercel", kind: "official" },
      { label: "Netlify Docs", url: "https://docs.netlify.com/", kind: "official" },
      { label: "MDN — What is a web server?", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server", kind: "article" },
    ],
  },
  "internet-dns": {
    description:
      "DNS is the phone book of the internet — translating names like google.com into IP addresses. Learn A, AAAA, CNAME, MX and TXT records.",
    howToBegin: [
      "Read Cloudflare’s “What is DNS?” explainer.",
      "Run `dig google.com` (or use https://dnschecker.org) and inspect the result.",
      "Add a DNS record on a domain you own to point a subdomain at Vercel.",
    ],
    resources: [
      { label: "Cloudflare — What is DNS?", url: "https://www.cloudflare.com/learning/dns/what-is-dns/", kind: "article" },
      { label: "MDN — DNS basics", url: "https://developer.mozilla.org/en-US/docs/Glossary/DNS", kind: "official" },
    ],
  },
  // ----------------------------- HTML -----------------------------
  html: {
    description:
      "HTML is the structure of every webpage. You’ll use it every day for the rest of your career, so build a strong sense of semantics, forms and accessibility from day one.",
    howToBegin: [
      "Work through freeCodeCamp’s “Responsive Web Design” first module.",
      "Build a single-page resume using only HTML — no styling.",
      "Validate your page on https://validator.w3.org.",
    ],
    resources: [
      { label: "freeCodeCamp — Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", kind: "course" },
      { label: "MDN — HTML basics", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", kind: "official" },
      { label: "web.dev — Learn HTML", url: "https://web.dev/learn/html", kind: "course" },
    ],
    effort: "1–2 weeks",
  },
  "html-conventions": {
    description:
      "Clean, consistent HTML is easier to debug, easier to style and easier to hand off to teammates. Indentation, attribute order, class naming.",
    howToBegin: [
      "Read Google’s HTML/CSS Style Guide.",
      "Install Prettier in your editor and let it format on save.",
      "Audit any old project of yours — fix anything that doesn’t match.",
    ],
    resources: [
      { label: "Google HTML/CSS Style Guide", url: "https://google.github.io/styleguide/htmlcssguide.html", kind: "article" },
      { label: "MDN — HTML best practices", url: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Howto/Markup_articles", kind: "official" },
    ],
  },
  "html-seo": {
    description:
      "Search engines find your pages through HTML signals — title, meta description, headings, Open Graph tags, structured data. Solid SEO unlocks free traffic.",
    howToBegin: [
      "Read Google’s SEO Starter Guide.",
      "Add a unique <title>, meta description and Open Graph image to your portfolio.",
      "Test the result on https://www.opengraph.xyz.",
    ],
    resources: [
      { label: "Google — SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", kind: "official" },
      { label: "Ahrefs — SEO Basics", url: "https://ahrefs.com/blog/seo-basics/", kind: "article" },
    ],
  },

  // ----------------------------- CSS -----------------------------
  css: {
    description:
      "CSS controls how your pages look. The modern stack is mostly Flexbox + Grid + custom properties. Avoid the float-based layouts of the 2010s — they’re only worth knowing as history.",
    howToBegin: [
      "Play through Flexbox Froggy and Grid Garden — both are games.",
      "Read web.dev’s “Learn CSS” end to end.",
      "Build a card component and a responsive nav bar from scratch.",
    ],
    resources: [
      { label: "web.dev — Learn CSS", url: "https://web.dev/learn/css", kind: "course" },
      { label: "Flexbox Froggy (game)", url: "https://flexboxfroggy.com/", kind: "course" },
      { label: "Grid Garden (game)", url: "https://cssgridgarden.com/", kind: "course" },
      { label: "MDN — CSS basics", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", kind: "official" },
    ],
    effort: "2–3 weeks",
  },
  // ----------------------------- JavaScript -----------------------------
  js: {
    description:
      "JavaScript is the language of the web. Everything dynamic on a page — interactivity, async data, animations — is JS. You will spend most of your career here.",
    howToBegin: [
      "Work through the first 5 chapters of javascript.info.",
      "Build a todo list (vanilla JS, no framework) that persists in localStorage.",
      "Solve ~20 problems on https://www.codewars.com (8 kyu → 7 kyu).",
    ],
    resources: [
      { label: "JavaScript.info — The Modern JavaScript Tutorial", url: "https://javascript.info/", kind: "course" },
      { label: "MDN — JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", kind: "official" },
      { label: "freeCodeCamp — JS Algorithms & Data Structures", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", kind: "course" },
    ],
    effort: "4–6 weeks",
  },
  "js-dom": {
    description: "The DOM is your interface to the page. querySelector, addEventListener, createElement, classList, dataset — these get you 90% of the way there.",
    howToBegin: [
      "Read MDN’s DOM introduction.",
      "Build a tab-switcher component with no libraries.",
    ],
    resources: [
      { label: "MDN — DOM Introduction", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction", kind: "official" },
      { label: "JavaScript.info — Document", url: "https://javascript.info/document", kind: "course" },
    ],
  },
  "js-fetch": {
    description: "Fetch is how the browser talks to APIs. Pair it with async/await and you can build any data-driven UI.",
    howToBegin: [
      "Make a GET request to https://jsonplaceholder.typicode.com/users and render names in a list.",
      "Add error handling — what happens when the network fails?",
    ],
    resources: [
      { label: "MDN — Using Fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", kind: "official" },
      { label: "JavaScript.info — Fetch", url: "https://javascript.info/fetch", kind: "course" },
      { label: "JSONPlaceholder — Free fake REST API", url: "https://jsonplaceholder.typicode.com/", kind: "article" },
    ],
  },
  "js-modern": {
    description: "Hoisting, scope, closures, the event loop, prototypes, this binding, modules, the strict mode. These are the questions you’ll be asked in every interview.",
    howToBegin: [
      "Read You Don’t Know JS — “Scope & Closures”.",
      "Watch Philip Roberts’ “What the heck is the event loop?” talk.",
    ],
    resources: [
      { label: "You Don’t Know JS Yet (book series, free)", url: "https://github.com/getify/You-Dont-Know-JS", kind: "course" },
      { label: "What the heck is the event loop? (video)", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", kind: "video" },
      { label: "MDN — Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", kind: "official" },
    ],
  },

  // ----------------------------- VCS -----------------------------
  vcs: {
    description:
      "Version control lets you track every change, branch fearlessly, and collaborate with others. Even solo, your future self will thank you.",
    howToBegin: [
      "Install git on your machine.",
      "Initialize any folder with `git init` and make your first commit.",
      "Push it to a new GitHub repo.",
    ],
    resources: [
      { label: "Pro Git (free book)", url: "https://git-scm.com/book/en/v2", kind: "course" },
      { label: "GitHub Skills", url: "https://skills.github.com/", kind: "course" },
    ],
  },
  "vcs-git": {
    description: "Branching, merging, rebasing, resolving conflicts and the staging area. Don’t fear `git reset` — learn it.",
    howToBegin: [
      "Practice on https://learngitbranching.js.org (visual sandbox).",
      "Create a feature branch, make 3 commits, rebase onto main, push and open a PR.",
    ],
    resources: [
      { label: "Learn Git Branching (interactive)", url: "https://learngitbranching.js.org/", kind: "course" },
      { label: "Atlassian Git Tutorials", url: "https://www.atlassian.com/git/tutorials", kind: "article" },
      { label: "Oh Shit, Git!?!", url: "https://ohshitgit.com/", kind: "article" },
    ],
  },
  vcsHosting: {
    description: "GitHub, GitLab and Bitbucket all host git repos. GitHub has the biggest community and ecosystem — start there.",
    howToBegin: ["Create a free GitHub account and push a portfolio repo.", "Star 5 repositories of tools you use daily."],
    resources: [{ label: "GitHub Skills", url: "https://skills.github.com/", kind: "course" }],
  },
  "vcs-github": {
    description: "Industry-standard hub for code. Pull requests, issues, GitHub Actions for CI, GitHub Pages for free hosting.",
    howToBegin: [
      "Finish all 5 “First Day on GitHub” skills.",
      "Open your first PR on a friend’s repo (or your own from a fork).",
    ],
    resources: [
      { label: "GitHub Skills", url: "https://skills.github.com/", kind: "course" },
      { label: "GitHub Docs", url: "https://docs.github.com/en", kind: "official" },
    ],
  },
  "vcs-gitlab": {
    description: "Self-hostable alternative with built-in CI/CD. Popular at companies that want full ownership of their devops stack.",
    howToBegin: ["Sign up at gitlab.com and import a GitHub repo.", "Set up a simple .gitlab-ci.yml pipeline."],
    resources: [{ label: "GitLab Docs", url: "https://docs.gitlab.com/", kind: "official" }],
  },
  "vcs-bitbucket": {
    description: "Atlassian’s git host — integrates tightly with Jira. Less common in the open-source world, common at enterprises.",
    howToBegin: ["Skim the Bitbucket Cloud docs.", "Try linking a Bitbucket repo to a Jira project."],
    resources: [{ label: "Bitbucket Cloud Docs", url: "https://support.atlassian.com/bitbucket-cloud/", kind: "official" }],
  },

  // ----------------------------- Package managers -----------------------------
  pkg: {
    description:
      "Package managers install your dependencies, lock versions, and run scripts. npm ships with Node; pnpm is faster and disk-efficient; yarn is the older alternative.",
    howToBegin: [
      "Install Node.js — npm comes with it.",
      "Run `npm init -y` in an empty folder and install a package like `lodash`.",
      "Inspect the resulting package.json and node_modules.",
    ],
    resources: [
      { label: "npm Docs", url: "https://docs.npmjs.com/", kind: "official" },
      { label: "Node.js — Download", url: "https://nodejs.org/", kind: "official" },
    ],
  },
  "pkg-npm": {
    description: "Default package manager that ships with Node.js. Big registry, decent speed, you’ll use it whether you like it or not.",
    howToBegin: ["Run `npm install <package>`, then `npm uninstall`, then `npm run`.", "Read what `package-lock.json` is."],
    resources: [
      { label: "npm CLI Documentation", url: "https://docs.npmjs.com/cli/", kind: "official" },
    ],
  },
  "pkg-pnpm": {
    description: "Fast, disk-efficient. Stores packages in a global content-addressable store and symlinks them into projects.",
    howToBegin: ["Install with `npm i -g pnpm`.", "Compare `pnpm install` speed to `npm install` on a real project."],
    resources: [{ label: "pnpm Docs", url: "https://pnpm.io/", kind: "official" }],
  },
  // ----------------------------- Frameworks -----------------------------
  framework: {
    description:
      "Once you’re solid on JS, learn a component-driven framework. React dominates the job market, especially in Nepal; Vue and Svelte are excellent alternatives.",
    howToBegin: [
      "Pick React first — it has the biggest market. You can always learn another later.",
      "Scaffold a new project with `npm create vite@latest my-app -- --template react-ts`.",
      "Rebuild your vanilla-JS todo list as a React app.",
    ],
    resources: [
      { label: "React — official tutorial", url: "https://react.dev/learn", kind: "official" },
      { label: "Vite — Get Started", url: "https://vite.dev/guide/", kind: "official" },
    ],
    effort: "4–6 weeks",
  },
  "fw-react": {
    description: "The most-used frontend framework in the world. Component-based, declarative, huge ecosystem, almost every Nepali tech company is hiring React devs.",
    howToBegin: [
      "Complete the official Tic-Tac-Toe tutorial on react.dev.",
      "Read “Thinking in React” on the new docs.",
      "Build 3 small projects: todo list, weather app, GitHub user search.",
    ],
    resources: [
      { label: "react.dev — Learn", url: "https://react.dev/learn", kind: "official" },
      { label: "Scrimba — Learn React (free)", url: "https://scrimba.com/learn/learnreact", kind: "course" },
      { label: "Beta React Docs Tutorial", url: "https://react.dev/learn/tutorial-tic-tac-toe", kind: "official" },
    ],
  },
  "fw-vue": {
    description: "Gentler learning curve than React, fantastic docs, single-file components feel natural. Popular in China and in parts of Europe.",
    howToBegin: [
      "Work through the official Vue tutorial (in-browser, no setup).",
      "Build a small CRUD app with Vue + Pinia.",
    ],
    resources: [
      { label: "Vue — Official Tutorial", url: "https://vuejs.org/tutorial/", kind: "official" },
      { label: "Vue Mastery (free intro courses)", url: "https://www.vuemastery.com/courses/", kind: "course" },
    ],
  },
  "fw-svelte": {
    description: "Compile-time framework — no virtual DOM, less runtime, very little boilerplate. SvelteKit is the meta-framework.",
    howToBegin: [
      "Work through svelte.dev’s interactive tutorial.",
      "Build a small SvelteKit app.",
    ],
    resources: [
      { label: "Svelte — Interactive Tutorial", url: "https://learn.svelte.dev/", kind: "official" },
      { label: "SvelteKit Docs", url: "https://kit.svelte.dev/", kind: "official" },
    ],
  },
  "fw-angular": {
    description: "Full, opinionated framework from Google. RxJS, dependency injection, TypeScript by default. Common at large enterprises and in banking.",
    howToBegin: [
      "Run the Angular getting started tutorial.",
      "Learn the basics of RxJS observables before diving deeper.",
    ],
    resources: [
      { label: "Angular — Tutorial", url: "https://angular.dev/tutorials", kind: "official" },
    ],
  },
  "fw-solid": {
    description: "Looks like React, but with fine-grained reactivity (no virtual DOM, no re-renders). Very fast.",
    howToBegin: ["Try the Solid tutorial on solidjs.com.", "Port a small React component to Solid and compare."],
    resources: [{ label: "Solid — Tutorial", url: "https://www.solidjs.com/tutorial/introduction_basics", kind: "official" }],
  },
  "fw-qwik": {
    description: "Resumable framework — apps start instantly, no hydration. Worth knowing in 2025+.",
    howToBegin: ["Read the Qwik “Think Qwik” guide.", "Spin up a starter project with `npm create qwik@latest`."],
    resources: [{ label: "Qwik — Docs", url: "https://qwik.dev/docs/", kind: "official" }],
  },

  // ----------------------------- Writing CSS -----------------------------
  "writing-css": {
    description:
      "Once you’ve picked a framework, you need a way to style components at scale. Tailwind is the dominant choice today — it’s what most Nepali product teams use too.",
    howToBegin: [
      "Add Tailwind to a small Vite + React app.",
      "Rebuild a component you’re proud of using only utility classes.",
    ],
    resources: [
      { label: "Tailwind CSS — Docs", url: "https://tailwindcss.com/docs", kind: "official" },
      { label: "Net Ninja — Tailwind Playlist", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw", kind: "video" },
    ],
  },
  "wc-tailwind": {
    description: "Utility-first CSS. Compose designs by stringing tiny classes together. Best DX once it clicks.",
    howToBegin: [
      "Read the Tailwind docs “Utility-First Fundamentals” page.",
      "Convert your old CSS files to Tailwind classes in one project.",
    ],
    resources: [
      { label: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs/utility-first", kind: "official" },
      { label: "Tailwind UI components (paid, free previews)", url: "https://tailwindui.com/", kind: "article" },
    ],
  },
  "wc-modules": {
    description: "Local-scoped CSS by default — class names get hashed so they can’t collide. Built into Next.js, Vite, CRA out of the box.",
    howToBegin: ["Create a file named Button.module.css and import it in a React component.", "Read the CSS Modules spec."],
    resources: [{ label: "CSS Modules — GitHub", url: "https://github.com/css-modules/css-modules", kind: "official" }],
  },
  "wc-styled": {
    description: "CSS-in-JS with tagged template literals. Used in many older React codebases. Performance is OK but not as fast as compile-time alternatives.",
    howToBegin: ["Read the styled-components Getting Started guide.", "Build one component with it to feel the DX."],
    resources: [{ label: "styled-components Docs", url: "https://styled-components.com/docs", kind: "official" }],
  },
  "wc-emotion": {
    description: "Similar to styled-components but lighter and faster. Used by MUI, Mantine and many design systems.",
    howToBegin: ["Skim emotion.sh’s introduction.", "Compare the API to styled-components on a single button."],
    resources: [{ label: "Emotion — Docs", url: "https://emotion.sh/docs/introduction", kind: "official" }],
  },

  // ----------------------------- Modern CSS -----------------------------
  "modern-css": {
    description: "Preprocessors give CSS extra power — variables, nesting, mixins. CSS has caught up with most of these, but you’ll still see Sass in many codebases.",
    howToBegin: ["Add Sass to an existing project.", "Convert one CSS file to a Sass partial with nested rules."],
    resources: [{ label: "Sass — Docs", url: "https://sass-lang.com/documentation/", kind: "official" }],
  },
  "mc-sass": {
    description: "Variables, mixins, nesting, partials, math operators. Sass was the standard for a decade before native CSS caught up.",
    howToBegin: [
      "Install with `npm i -D sass`.",
      "Rename a .css file to .scss and refactor with nesting and a variable.",
    ],
    resources: [
      { label: "Sass Documentation", url: "https://sass-lang.com/documentation/", kind: "official" },
      { label: "freeCodeCamp Sass Course", url: "https://www.freecodecamp.org/news/the-complete-guide-to-scss-sass-30053c266b23/", kind: "article" },
    ],
  },
  "mc-postcss": {
    description: "PostCSS is a tooling pipeline for CSS. Autoprefixer (the thing that adds -webkit- prefixes) is a PostCSS plugin.",
    howToBegin: ["Read the PostCSS intro.", "Look at the postcss.config.js in any Next.js project to see real-world usage."],
    resources: [{ label: "PostCSS — GitHub", url: "https://github.com/postcss/postcss", kind: "official" }],
  },

  // ----------------------------- Build tools -----------------------------
  build: {
    description:
      "Build tools bundle, transpile and optimize your code for production. Vite is the modern default. Webpack still powers older codebases. Pair with a linter (ESLint) and a formatter (Prettier).",
    howToBegin: [
      "Scaffold a project with `npm create vite@latest`.",
      "Run `npm run build` and look at the dist/ folder.",
      "Set up ESLint and Prettier in the same project.",
    ],
    resources: [
      { label: "Vite — Getting Started", url: "https://vite.dev/guide/", kind: "official" },
      { label: "ESLint — Getting Started", url: "https://eslint.org/docs/latest/use/getting-started", kind: "official" },
    ],
  },
  "bt-vite": {
    description: "Native ES modules in development, Rollup-based bundling for production. The default choice for new React/Vue/Svelte projects in 2025.",
    howToBegin: ["Run `npm create vite@latest`.", "Read the Vite config docs to understand plugins."],
    resources: [{ label: "Vite — Docs", url: "https://vite.dev/", kind: "official" }],
  },
  "bt-webpack": {
    description: "The most flexible bundler. Steep config curve but powers many large codebases. Worth knowing if you’ll work at a big company.",
    howToBegin: ["Read “Webpack — Getting Started”.", "Build a tiny project with hand-written webpack.config.js."],
    resources: [{ label: "Webpack Docs", url: "https://webpack.js.org/concepts/", kind: "official" }],
  },
  "bt-esbuild": {
    description: "Bundler written in Go. Extremely fast. Used under the hood by Vite for dev, by tsup for libraries.",
    howToBegin: ["Skim esbuild.github.io.", "Bundle a tiny file with the CLI to feel the speed."],
    resources: [{ label: "esbuild — Docs", url: "https://esbuild.github.io/", kind: "official" }],
  },
  "bt-prettier": {
    description: "Opinionated code formatter — run it on save and never argue about commas again.",
    howToBegin: [
      "Install with `npm i -D prettier`.",
      "Add a `.prettierrc` and enable format-on-save in your editor.",
    ],
    resources: [{ label: "Prettier — Docs", url: "https://prettier.io/docs/en/", kind: "official" }],
  },
  // ----------------------------- Testing -----------------------------
  testing: {
    description:
      "Tests give you confidence to ship. Start with unit tests for pure functions, add component tests with React Testing Library, finish with E2E via Playwright.",
    howToBegin: [
      "Add Vitest to a Vite project.",
      "Write a test for a single pure function — say, a date formatter.",
      "Add one component test using React Testing Library.",
    ],
    resources: [
      { label: "Vitest — Get Started", url: "https://vitest.dev/guide/", kind: "official" },
      { label: "Testing Library — Docs", url: "https://testing-library.com/docs/", kind: "official" },
      { label: "Playwright — Get Started", url: "https://playwright.dev/docs/intro", kind: "official" },
    ],
  },
  "test-vitest": {
    description: "Vite-native test runner. Jest-compatible API. Super fast HMR for tests.",
    howToBegin: ["`npm i -D vitest`.", "Create `src/sum.test.ts` and write your first `expect(1+1).toBe(2)`."],
    resources: [{ label: "Vitest — Docs", url: "https://vitest.dev/", kind: "official" }],
  },
  "test-jest": {
    description: "The classic test runner. Slower than Vitest in modern projects, but still everywhere in legacy React codebases.",
    howToBegin: ["Read the Jest Getting Started guide.", "Run `npx jest --init` in a project."],
    resources: [{ label: "Jest — Docs", url: "https://jestjs.io/docs/getting-started", kind: "official" }],
  },
  "test-rtl": {
    description: "Test components the way users use them — by visible text and roles, not implementation details. The right way to test React UI.",
    howToBegin: ["Read the “Guiding Principles” page on testing-library.com.", "Write a test that finds a button by its accessible name and clicks it."],
    resources: [{ label: "React Testing Library — Docs", url: "https://testing-library.com/docs/react-testing-library/intro/", kind: "official" }],
  },
  "test-playwright": {
    description: "Modern end-to-end testing. Runs in real Chromium/Firefox/WebKit. Has component testing too. Made by Microsoft.",
    howToBegin: ["Run `npm init playwright@latest`.", "Record a test by clicking through your app — Playwright generates the code."],
    resources: [{ label: "Playwright — Docs", url: "https://playwright.dev/", kind: "official" }],
  },
  "test-cypress": {
    description: "Visual E2E test runner with replay UI. Easier first impressions than Playwright but slower in CI.",
    howToBegin: ["Run `npm i -D cypress` then `npx cypress open`.", "Record one happy-path test through your app."],
    resources: [{ label: "Cypress — Docs", url: "https://docs.cypress.io/", kind: "official" }],
  },

  // ----------------------------- Auth -----------------------------
  auth: {
    description:
      "Auth controls who is allowed to do what. Know the trade-offs between sessions + cookies, JWT tokens, and OAuth — then in production, use a battle-tested library like Auth.js, Clerk or Supabase Auth.",
    howToBegin: [
      "Read MDN’s HTTP authentication overview.",
      "Wire up Auth.js (next-auth) on a small Next.js app.",
      "Read the OWASP Authentication Cheat Sheet — it’s gold.",
    ],
    resources: [
      { label: "Auth.js — Docs", url: "https://authjs.dev/", kind: "official" },
      { label: "OWASP — Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", kind: "article" },
      { label: "Clerk — Docs", url: "https://clerk.com/docs", kind: "official" },
    ],
  },
  "auth-jwt": {
    description: "Stateless tokens — server doesn’t need to store sessions. Great for APIs, but never store sensitive data in them (they’re only base64-encoded).",
    howToBegin: ["Decode any JWT on https://jwt.io to see the parts.", "Implement a tiny Node API that signs and verifies a JWT."],
    resources: [
      { label: "JWT.io — Intro", url: "https://jwt.io/introduction", kind: "article" },
      { label: "OWASP — JWT Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html", kind: "article" },
    ],
  },
  "auth-oauth": {
    description: "“Login with Google/GitHub/Facebook”. You delegate authentication to a trusted provider and get back an access token.",
    howToBegin: ["Read OAuth.com’s “OAuth 2.0 Simplified”.", "Set up Google OAuth on a tiny Next.js app via Auth.js."],
    resources: [
      { label: "OAuth 2.0 Simplified", url: "https://www.oauth.com/", kind: "article" },
      { label: "Auth.js — OAuth Providers", url: "https://authjs.dev/getting-started/providers/oauth", kind: "official" },
    ],
  },
  "auth-session": {
    description: "Server stores a session ID, browser stores a cookie pointing to it. The classic model — still excellent for server-rendered apps.",
    howToBegin: ["Read MDN’s page on HTTP cookies.", "Build a tiny Express + express-session login flow."],
    resources: [
      { label: "MDN — HTTP Cookies", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies", kind: "official" },
    ],
  },
  "auth-basic": {
    description: "401 response + Authorization header. Mostly used for internal tools or simple API testing. Don’t use it for real user auth in production.",
    howToBegin: ["Read MDN’s page on HTTP Authentication.", "Test a basic-auth endpoint with curl."],
    resources: [{ label: "MDN — HTTP Authentication", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication", kind: "official" }],
  },

  // ----------------------------- Types -----------------------------
  types: {
    description:
      "TypeScript is now the default for any serious frontend job. It catches bugs at compile time, gives you autocomplete, and makes refactoring safe.",
    howToBegin: [
      "Read the TypeScript Handbook’s “The Basics” section.",
      "Rename one .js file to .ts in an existing project and fix the errors.",
    ],
    resources: [
      { label: "TypeScript — Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", kind: "official" },
      { label: "Total TypeScript (free tutorials)", url: "https://www.totaltypescript.com/", kind: "course" },
      { label: "Type Challenges", url: "https://github.com/type-challenges/type-challenges", kind: "course" },
    ],
  },
  // ----------------------------- SSR -----------------------------
  ssr: {
    description:
      "Server-side rendering produces HTML on the server instead of the client. Better SEO, faster first paint, and full-stack apps in one repo.",
    howToBegin: [
      "Work through the Next.js Learn course.",
      "Build a small blog with Next.js App Router and MDX.",
    ],
    resources: [
      { label: "Next.js — Learn", url: "https://nextjs.org/learn", kind: "course" },
      { label: "Nuxt — Get Started", url: "https://nuxt.com/docs/getting-started/introduction", kind: "official" },
    ],
  },
  "ssr-next": {
    description: "The React meta-framework. App Router, server components, file-based routing, Vercel-friendly. This very site is built with Next.js.",
    howToBegin: [
      "Run `npx create-next-app@latest` and pick App Router + TS.",
      "Finish the Next.js Learn course end to end.",
    ],
    resources: [
      { label: "Next.js — Learn", url: "https://nextjs.org/learn", kind: "course" },
      { label: "Next.js Docs", url: "https://nextjs.org/docs", kind: "official" },
    ],
  },
  "ssr-nuxt": {
    description: "Vue’s answer to Next. File-based routing, modules ecosystem, SSR/SSG out of the box.",
    howToBegin: ["Run `npx nuxi@latest init my-app`.", "Read the Nuxt Pages and Layouts docs."],
    resources: [{ label: "Nuxt — Docs", url: "https://nuxt.com/docs", kind: "official" }],
  },
  "ssr-remix": {
    description: "Data-loading-focused React meta-framework. Excellent loaders/actions story. Now under React Router umbrella.",
    howToBegin: ["Read the Remix tutorial (Contacts app).", "Compare its data API to Next.js server actions."],
    resources: [{ label: "Remix — Tutorial", url: "https://remix.run/docs/en/main/tutorials/jokes", kind: "official" }],
  },

  // ----------------------------- GraphQL -----------------------------
  graphql: {
    description:
      "GraphQL is a typed query language for APIs. Client asks for exactly the fields it needs, server returns a single response. Optional for many jobs — pick it up after you ship a real REST app.",
    howToBegin: [
      "Read graphql.org/learn end to end.",
      "Play with a public GraphQL API at https://countries.trevorblades.com.",
    ],
    resources: [
      { label: "GraphQL.org — Learn", url: "https://graphql.org/learn/", kind: "official" },
      { label: "How To GraphQL (free course)", url: "https://www.howtographql.com/", kind: "course" },
    ],
  },
  "gql-apollo": {
    description: "The most-used GraphQL client. React hooks API. Caching is its superpower.",
    howToBegin: ["Read Apollo’s “Get Started” page.", "Wire up Apollo Client in a React app against the Countries API."],
    resources: [{ label: "Apollo Client — Docs", url: "https://www.apollographql.com/docs/react", kind: "official" }],
  },
  "gql-relay": {
    description: "Meta’s GraphQL client. Stricter, more opinionated, scales beautifully to large apps but has a steep learning curve.",
    howToBegin: ["Skim the Relay docs.", "Compare Relay’s declarative data approach to Apollo."],
    resources: [{ label: "Relay — Docs", url: "https://relay.dev/docs/", kind: "official" }],
  },

  // ----------------------------- PWA -----------------------------
  pwa: {
    description:
      "PWAs are installable, offline-capable web apps. Learn service workers, the Web App Manifest, the Cache API and push notifications.",
    howToBegin: [
      "Read web.dev’s “Learn PWA”.",
      "Add a manifest.json and a basic service worker to any existing site.",
      "Run Lighthouse → PWA audit and chase 100.",
    ],
    resources: [
      { label: "web.dev — Learn PWA", url: "https://web.dev/learn/pwa", kind: "course" },
      { label: "MDN — Progressive web apps", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps", kind: "official" },
    ],
  },
  "pwa-sw": {
    description: "Service workers are background scripts that can intercept fetches, cache assets, and enable offline. The brain of every PWA.",
    howToBegin: ["Register a minimal service worker in any project.", "Cache the homepage so it works offline."],
    resources: [
      { label: "MDN — Service Worker API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API", kind: "official" },
    ],
  },
  "pwa-storage": {
    description: "localStorage for small key-values, IndexedDB for structured data, the Cache API for HTTP responses. Know when to use which.",
    howToBegin: ["Read MDN’s “Web Storage API” page.", "Persist your todo list in localStorage, then migrate to IndexedDB using idb-keyval."],
    resources: [
      { label: "MDN — Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API", kind: "official" },
    ],
  },

  // ----------------------------- Mobile -----------------------------
  mobile: {
    description: "Take your frontend skills to mobile. React Native is the easiest jump if you already know React; Flutter is also a great choice.",
    howToBegin: [
      "Install Expo on your machine.",
      "Run `npx create-expo-app` and open the app on your phone via the Expo Go app.",
    ],
    resources: [
      { label: "Expo — Get Started", url: "https://docs.expo.dev/get-started/introduction/", kind: "official" },
    ],
  },
  "mob-rn": {
    description: "Build native iOS and Android apps using React + JavaScript. Use Expo to skip Xcode/Android Studio setup.",
    howToBegin: ["Install Expo Go on your phone.", "`npx create-expo-app` then run `npm start` and scan the QR code."],
    resources: [
      { label: "React Native — Docs", url: "https://reactnative.dev/docs/getting-started", kind: "official" },
      { label: "Expo — Tutorial", url: "https://docs.expo.dev/tutorial/introduction/", kind: "course" },
    ],
  },
  "mob-flutter": {
    description: "Dart language, draws every pixel with Skia. Excellent design fidelity, slightly bigger app size. Big in agencies.",
    howToBegin: ["Install Flutter SDK.", "Work through the “Write your first Flutter app” codelab."],
    resources: [{ label: "Flutter — Codelabs", url: "https://docs.flutter.dev/get-started/codelab", kind: "official" }],
  },
  "mob-ionic": {
    description: "Wraps a web app in a native shell using Capacitor. Easiest path if you have an existing web app you want on stores.",
    howToBegin: ["Read the Ionic getting started page.", "Wrap any small React/Vue app with Capacitor."],
    resources: [{ label: "Ionic — Docs", url: "https://ionicframework.com/docs", kind: "official" }],
  },

  // ----------------------------- Desktop -----------------------------
  desktop: {
    description: "Build native-feeling apps for macOS, Windows and Linux using web tech. Electron ships Chromium with your app; Tauri uses the OS webview for a smaller bundle.",
    howToBegin: [
      "Read the Electron Quick Start.",
      "Build a tiny “system tray clock” app to feel the workflow.",
    ],
    resources: [
      { label: "Electron — Docs", url: "https://www.electronjs.org/docs/latest/", kind: "official" },
      { label: "Tauri — Docs", url: "https://tauri.app/start/", kind: "official" },
    ],
  },
  "desk-electron": {
    description: "Ships Chromium + Node.js. Big bundles (~150MB) but extremely capable — Slack, VS Code, Discord use it.",
    howToBegin: ["Clone the official electron-quick-start repo.", "Modify it to load your React app instead of a static page."],
    resources: [
      { label: "Electron — Quick Start", url: "https://www.electronjs.org/docs/latest/tutorial/quick-start", kind: "official" },
    ],
  },
  "desk-tauri": {
    description: "Uses the OS’s native webview + a Rust backend. Bundles ~10MB. Faster startup, less RAM, but Rust required for native code.",
    howToBegin: ["Install the Tauri prerequisites for your OS.", "Run `npm create tauri-app@latest`."],
    resources: [{ label: "Tauri — Docs", url: "https://tauri.app/start/", kind: "official" }],
  },

  // ============================================================
  // PHASE 1 — additions
  // ============================================================
  "internet-browsers": {
    description:
      "How browsers turn HTML/CSS/JS into pixels: parse HTML → build DOM → build CSSOM → render tree → layout → paint → composite. Knowing this pipeline is what makes you good at performance.",
    howToBegin: [
      "Read “How Browsers Work” by Tali Garsiel.",
      "Open DevTools → Performance and record a page load. Identify each stage.",
      "Read web.dev’s “Critical Rendering Path”.",
    ],
    resources: [
      { label: "How Browsers Work — web.dev", url: "https://web.dev/articles/howbrowserswork", kind: "article" },
      { label: "MDN — Populating the page", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work", kind: "official" },
      { label: "Critical Rendering Path", url: "https://web.dev/articles/critical-rendering-path", kind: "course" },
    ],
  },
  "html-basics": {
    description:
      "Modern HTML is semantic HTML: use header, main, nav, section, article, aside, footer correctly. Right tag = better SEO, better screen-reader support, and easier-to-maintain code.",
    howToBegin: [
      "Read MDN’s “HTML elements reference” — focus on the sectioning section.",
      "Audit one page you’ve built and replace every meaningless <div> with the right semantic tag.",
      "Run Lighthouse and aim for a 100 Accessibility score.",
    ],
    resources: [
      { label: "MDN — HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", kind: "official" },
      { label: "web.dev — Learn HTML", url: "https://web.dev/learn/html", kind: "course" },
    ],
  },
  "html-forms": {
    description:
      "Forms are how users talk to your app. Master input types, the Constraint Validation API (required, pattern, min/max), FormData, and label/fieldset relationships before reaching for libraries.",
    howToBegin: [
      "Read MDN’s “Form validation” article — focus on the Constraint Validation API.",
      "Build a signup form using only native validation. No JS until it’s broken.",
      "Use `new FormData(form)` to read everything in one go on submit.",
    ],
    resources: [
      { label: "MDN — Form Validation", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", kind: "official" },
      { label: "MDN — FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData", kind: "official" },
      { label: "web.dev — Learn Forms", url: "https://web.dev/learn/forms/", kind: "course" },
    ],
  },
  "html-a11y": {
    description:
      "Accessibility is a legal and ethical baseline. Learn WCAG 2.2 success criteria, the right ARIA roles (and when NOT to use them), focus traps, keyboard nav and color contrast.",
    howToBegin: [
      "Skim the WCAG 2.2 quick-reference.",
      "Tab through your site — every interactive element must be reachable and visible when focused.",
      "Install the axe DevTools extension and fix every issue on one page.",
    ],
    resources: [
      { label: "WCAG 2.2 Quick Reference", url: "https://www.w3.org/WAI/WCAG22/quickref/", kind: "official" },
      { label: "The A11Y Project", url: "https://www.a11yproject.com/", kind: "article" },
      { label: "ARIA Authoring Practices", url: "https://www.w3.org/WAI/ARIA/apg/", kind: "official" },
    ],
  },
  "html-advanced": {
    description:
      "Two senior-tier HTML topics. Web Components (Custom Elements + Shadow DOM + Templates) let you build framework-agnostic UI. DOM internals (Node vs Element, traversal, live vs static NodeLists) come up in every interview.",
    howToBegin: [
      "Read MDN’s Web Components overview and build a tiny <my-counter> element.",
      "Read MDN’s “Introduction to the DOM” end-to-end.",
      "On any page, run `document.getElementsByTagName('div')` then add a div with JS — notice it updates live. Compare to `querySelectorAll('div')`.",
    ],
    resources: [
      { label: "MDN — Web Components", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components", kind: "official" },
      { label: "MDN — Introduction to the DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction", kind: "official" },
      { label: "Open WC — Guides", url: "https://open-wc.org/guides/", kind: "course" },
    ],
  },
  "css-basics": {
    description:
      "Three foundations rolled into one node: modern selectors (`:has()`, `:is()`, `:where()`, attribute selectors), the box model (content vs border-box, margin collapsing), and CSS custom properties for runtime theming.",
    howToBegin: [
      "Read MDN on `:has()`, `:is()`, `:where()` — they replace 90% of utility selectors.",
      "Set `* { box-sizing: border-box; }` in every project and stop guessing widths.",
      "Build a dark-mode toggle that swaps a single `--bg` and `--fg` variable.",
    ],
    resources: [
      { label: "MDN — :has()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:has", kind: "official" },
      { label: "MDN — Box model", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model", kind: "official" },
      { label: "MDN — Custom Properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties", kind: "official" },
    ],
  },
  "css-layouts": {
    description:
      "Master the three layout systems: Flexbox for 1D, Grid (including Subgrid) for 2D, and Container Queries for sizing based on the parent rather than the viewport. This is the bulk of modern frontend work.",
    howToBegin: [
      "Play through Flexbox Froggy and Grid Garden.",
      "Build the same component twice — once with Flex, once with Grid — to feel the difference.",
      "Read web.dev’s container-queries article and rebuild a card that adapts to its parent.",
    ],
    resources: [
      { label: "Flexbox Froggy", url: "https://flexboxfroggy.com/", kind: "course" },
      { label: "Grid Garden", url: "https://cssgridgarden.com/", kind: "course" },
      { label: "MDN — Container queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries", kind: "official" },
    ],
  },
  "css-responsive": {
    description:
      "Build mobile-first with media queries, then graduate to fluid typography with `clamp()` and breakpoint-less layouts. Container queries (covered above) reduce the need for many media queries.",
    howToBegin: [
      "Read web.dev’s Learn Responsive Design.",
      "Replace any fixed font-size with `clamp(1rem, 2vw + 0.5rem, 1.5rem)`.",
      "Test every page at 360 / 768 / 1280 widths.",
    ],
    resources: [
      { label: "web.dev — Learn Responsive Design", url: "https://web.dev/learn/design", kind: "course" },
      { label: "MDN — clamp()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp", kind: "official" },
    ],
  },
  "css-modern": {
    description:
      "The modern CSS you’ll be expected to know in 2026: `@layer` (Cascade Layers) for predictable specificity, logical properties (`margin-inline`) for RTL support, `aspect-ratio` for media, and native CSS Nesting (no Sass needed).",
    howToBegin: [
      "Read “A Complete Guide to CSS Cascade Layers” on CSS-Tricks.",
      "Replace `margin-left` with `margin-inline-start` in one component and test in RTL.",
      "Refactor a Sass file to use native CSS Nesting.",
    ],
    resources: [
      { label: "MDN — @layer", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer", kind: "official" },
      { label: "MDN — Logical Properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values", kind: "official" },
      { label: "MDN — CSS Nesting", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting", kind: "official" },
    ],
  },
  "css-animation": {
    description:
      "Three layers of motion: CSS transitions for hover/state changes, @keyframes for richer sequences, and the Web Animations API (WAAPI) for JS control over them. Then layer on the View Transitions API for native page transitions.",
    howToBegin: [
      "Read MDN’s “Using CSS animations” overview.",
      "Replace a CSS animation with WAAPI’s `element.animate()` and compare.",
      "Try the View Transitions API for a same-page route change.",
    ],
    resources: [
      { label: "MDN — CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations", kind: "official" },
      { label: "MDN — Web Animations API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API", kind: "official" },
      { label: "web.dev — View Transitions API", url: "https://developer.chrome.com/docs/web-platform/view-transitions", kind: "article" },
    ],
  },
  "js-basics": {
    description:
      "Modern JavaScript syntax: arrow functions, destructuring, spread/rest, template literals, optional chaining (`?.`), nullish coalescing (`??`). These are the day-to-day building blocks.",
    howToBegin: [
      "Skim javascript.info’s “Code Quality” + “Objects” chapters.",
      "Refactor an old script of yours to use destructuring and arrow functions.",
    ],
    resources: [
      { label: "JavaScript.info — Tutorial", url: "https://javascript.info/", kind: "course" },
      { label: "MDN — JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", kind: "official" },
    ],
  },
  "js-async": {
    description:
      "The hardest part of JS. Learn the call stack, microtasks (Promises) vs macrotasks (setTimeout), how `await` actually works, and how to handle errors in async code (try/catch, .catch(), AbortController).",
    howToBegin: [
      "Watch Philip Roberts’ classic talk: “What the heck is the event loop?”",
      "Read javascript.info’s “Promises, async/await” chapter.",
      "Build a search-as-you-type box with debounce + AbortController.",
    ],
    resources: [
      { label: "What the heck is the event loop? (video)", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", kind: "video" },
      { label: "JavaScript.info — Promises, async/await", url: "https://javascript.info/async", kind: "course" },
      { label: "MDN — Using Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", kind: "official" },
    ],
  },
  "js-deep": {
    description:
      "The interview-favorite cluster. Closures + lexical scoping + execution context + the `this` keyword (call/apply/bind) + prototypal inheritance vs ES6 classes. Get this and you’ll never bomb a JS interview.",
    howToBegin: [
      "Read “You Don’t Know JS Yet: Scope & Closures” (free online).",
      "Solve the “What is this?” quizzes on https://2ality.com/2014/05/this.html",
      "Implement your own `bind()` polyfill and verify it against the native one.",
    ],
    resources: [
      { label: "You Don’t Know JS Yet (book series)", url: "https://github.com/getify/You-Dont-Know-JS", kind: "course" },
      { label: "MDN — this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this", kind: "official" },
      { label: "MDN — Inheritance and the prototype chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain", kind: "official" },
    ],
  },
  "js-modules-memory": {
    description:
      "Two senior-tier topics. ES Modules (`import`/`export`) are the modern standard; understand the differences with CommonJS (`require`). Memory management — garbage collection, common leak patterns (closures over DOM, event listeners), and WeakMap/WeakSet for breakable references.",
    howToBegin: [
      "Read MDN’s “JavaScript modules” page.",
      "Compare CJS vs ESM behavior — pick one library that ships both and look at both entries.",
      "Read “4 Types of Memory Leaks in JavaScript and How to Fix Them”.",
    ],
    resources: [
      { label: "MDN — JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", kind: "official" },
      { label: "4 Types of JS Memory Leaks", url: "https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/", kind: "article" },
      { label: "MDN — WeakMap", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap", kind: "official" },
    ],
  },

  // ============================================================
  // PHASE 2 — additions
  // ============================================================
  "ts-typescript": {
    description:
      "TypeScript basics: type vs interface, primitive types, arrays, tuples, enums, function signatures, union & intersection types. Spend a week here before touching advanced TS.",
    howToBegin: [
      "Work through the “Everyday Types” chapter of the TS Handbook.",
      "Rename one .js file to .ts in an existing project, fix every red squiggle.",
    ],
    resources: [
      { label: "TS Handbook — Everyday Types", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html", kind: "official" },
      { label: "Type Challenges (beginner)", url: "https://github.com/type-challenges/type-challenges", kind: "course" },
    ],
  },
  "ts-advanced": {
    description:
      "Generics, conditional types, template literal types, mapped types. Plus utility types (`Pick`, `Omit`, `Partial`, `Required`, `Record`, `ReturnType`) and type guards (`typeof`, `instanceof`, user-defined predicates with `x is T`). This separates mid from senior.",
    howToBegin: [
      "Read “Total TypeScript Beginners” — Matt Pocock’s free tutorials.",
      "Solve the first 20 easy challenges at type-challenges.com.",
      "Write a generic `apiClient<T>()` function that returns typed responses.",
    ],
    resources: [
      { label: "Total TypeScript — Tutorials", url: "https://www.totaltypescript.com/tutorials", kind: "course" },
      { label: "TS Handbook — Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html", kind: "official" },
      { label: "TS Handbook — Utility Types", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html", kind: "official" },
    ],
  },
  "fw-mastery": {
    description:
      "Picking React (or Vue/Svelte) is one thing. Becoming productive in it takes mastering: how the renderer works, state management (local vs global), data fetching/caching, lifecycle and hooks, routing, and composition patterns. The next 6 nodes cover each.",
    howToBegin: [
      "Read react.dev’s “Thinking in React” article.",
      "Re-read the official docs of your chosen framework end-to-end — yes, all of it.",
    ],
    resources: [
      { label: "react.dev — Thinking in React", url: "https://react.dev/learn/thinking-in-react", kind: "official" },
    ],
    effort: "4–8 weeks",
  },
  "fw-internals": {
    description:
      "Different frameworks update the DOM differently. React diffs a virtual DOM. Vue 3, SolidJS and Angular use Signals for surgical updates. Svelte 5 uses Runes. Knowing the model helps you debug perf issues.",
    howToBegin: [
      "Read “SolidJS in-depth” or “Inside Fiber” to feel one of the two camps.",
      "Build the same counter in React + Solid + Svelte. Open DevTools → compare updates.",
    ],
    resources: [
      { label: "React — Reconciliation", url: "https://react.dev/learn/preserving-and-resetting-state", kind: "official" },
      { label: "SolidJS — Reactivity", url: "https://www.solidjs.com/guides/reactivity", kind: "official" },
      { label: "Svelte — Runes", url: "https://svelte.dev/docs/svelte/what-are-runes", kind: "official" },
    ],
  },
  "fw-state": {
    description:
      "When should state live in `useState`? When does it deserve a global store? Learn the trade-offs between component state, Context, Zustand/Jotai (signal-style), and Redux Toolkit. The mantra: state lives as close as possible to where it’s used.",
    howToBegin: [
      "Read “When to use a state library” on tkdodo.eu.",
      "Build the same todo app three ways: useState only → Context → Zustand.",
    ],
    resources: [
      { label: "Zustand — Docs", url: "https://zustand.docs.pmnd.rs/", kind: "official" },
      { label: "Redux Toolkit — Tutorials", url: "https://redux-toolkit.js.org/tutorials/overview", kind: "official" },
      { label: "TkDodo — When to use a state library", url: "https://tkdodo.eu/blog/working-with-zustand", kind: "article" },
    ],
  },
  "fw-data": {
    description:
      "Server state ≠ client state. Use TanStack Query (React Query) for caching, deduping, retries and background refresh. Pair with `zod` + `react-hook-form` for type-safe forms with great DX.",
    howToBegin: [
      "Read TanStack Query’s overview — it changes how you think about data.",
      "Build a form with React Hook Form + Zod resolver and ship it.",
    ],
    resources: [
      { label: "TanStack Query — Overview", url: "https://tanstack.com/query/latest/docs/framework/react/overview", kind: "official" },
      { label: "React Hook Form — Docs", url: "https://react-hook-form.com/", kind: "official" },
      { label: "Zod — Docs", url: "https://zod.dev/", kind: "official" },
    ],
  },
  "fw-lifecycle": {
    description:
      "Hooks (React) and Composables (Vue) are the unit of reusable logic. Master `useEffect` cleanup, `useMemo`/`useCallback` (when they actually help), and the mental model of “effects synchronize state, they don’t respond to events.”",
    howToBegin: [
      "Read “You Might Not Need an Effect” on react.dev.",
      "Build a custom `useLocalStorage` hook.",
    ],
    resources: [
      { label: "react.dev — You Might Not Need an Effect", url: "https://react.dev/learn/you-might-not-need-an-effect", kind: "official" },
      { label: "VueUse — composable library", url: "https://vueuse.org/", kind: "opensource" },
    ],
  },
  "fw-routing": {
    description:
      "Client-side routing, dynamic segments, nested layouts, and parallel routes (Next.js App Router). Most jobs will expect comfort with React Router or Next.js routing.",
    howToBegin: [
      "Read the Next.js App Router routing docs end-to-end.",
      "Build a 3-level nested layout (root → dashboard → settings) with shared chrome.",
    ],
    resources: [
      { label: "Next.js — Routing", url: "https://nextjs.org/docs/app/building-your-application/routing", kind: "official" },
      { label: "React Router — Docs", url: "https://reactrouter.com/start/library/installation", kind: "official" },
    ],
  },
  "fw-patterns": {
    description:
      "How to avoid prop drilling: Context, compound components, render props, headless components. How to compose hooks into bigger primitives. The art of API design at the component level.",
    howToBegin: [
      "Read Kent C. Dodds’ “Application State Management with React”.",
      "Refactor a component that has 4+ levels of prop drilling using Context.",
    ],
    resources: [
      { label: "Kent C. Dodds — App State Management", url: "https://kentcdodds.com/blog/application-state-management-with-react", kind: "article" },
      { label: "Patterns.dev — React Patterns", url: "https://www.patterns.dev/react", kind: "course" },
    ],
  },
  "ssr-hydration": {
    description:
      "Hydration is when the browser brings a server-rendered page “alive”. Learn the cost, partial hydration (Astro Islands), resumability (Qwik), and React Server Components (RSC) — the new model where the server does the heavy lifting.",
    howToBegin: [
      "Read “How does React Server Components work?” on Plasmic blog.",
      "Build a Next.js App Router page with one server component and one client component. Inspect the network tab.",
    ],
    resources: [
      { label: "Next.js — Server Components", url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components", kind: "official" },
      { label: "Qwik — Resumability", url: "https://qwik.dev/docs/concepts/resumable/", kind: "official" },
      { label: "Astro — Islands Architecture", url: "https://docs.astro.build/en/concepts/islands/", kind: "official" },
    ],
  },

  // ============================================================
  // PHASE 3 — additions
  // ============================================================
  "pkg-yarn": {
    description: "Yarn and Bun are alternatives to npm/pnpm. Bun is fast and ships a runtime + bundler + test runner. Yarn is older but common in legacy codebases.",
    howToBegin: ["Read the Bun install guide.", "Run a benchmark — `bun install` vs `pnpm install`."],
    resources: [
      { label: "Bun — Docs", url: "https://bun.sh/docs", kind: "official" },
      { label: "Yarn — Docs", url: "https://yarnpkg.com/getting-started", kind: "official" },
    ],
  },
  "bt-transpile": {
    description:
      "Transpilers turn modern (or future) JS/TS into code today’s browsers understand. Babel is the historical standard; SWC (Rust-based) is what Next.js uses; Turbopack is Vercel’s next-gen bundler (Webpack’s successor).",
    howToBegin: [
      "Read “What is Babel?” on the Babel site.",
      "Look at the SWC config that ships in any new Next.js app (`next.config.js`).",
      "Skim the Turbopack roadmap to understand where bundlers are heading.",
    ],
    resources: [
      { label: "Babel — What is Babel?", url: "https://babeljs.io/docs/", kind: "official" },
      { label: "SWC — Docs", url: "https://swc.rs/", kind: "official" },
      { label: "Turbopack — Docs", url: "https://turbo.build/pack/docs", kind: "official" },
    ],
  },
  "bt-eslint": {
    description:
      "ESLint catches bugs and enforces conventions through pluggable rules. Biome is a Rust-based alternative that bundles formatting + linting in one binary — fast and zero-config.",
    howToBegin: [
      "Run `npm create @eslint/config` in a project.",
      "Try Biome on the same project — compare speed.",
    ],
    resources: [
      { label: "ESLint — Docs", url: "https://eslint.org/docs/latest/", kind: "official" },
      { label: "Biome — Docs", url: "https://biomejs.dev/", kind: "official" },
    ],
  },
  "env-mastery": {
    description:
      "Production-grade frontend work goes beyond building. You need to manage env vars across local/staging/prod, work in monorepos when teams grow, and ship through CI/CD pipelines with preview deployments.",
    howToBegin: [
      "Set up a `.env.local`, `.env.development`, `.env.production` for a Next.js app.",
      "Create a Turborepo with one shared package consumed by two apps.",
      "Add a GitHub Actions workflow that runs tests on every PR.",
    ],
    resources: [
      { label: "Turborepo — Docs", url: "https://turbo.build/repo/docs", kind: "official" },
    ],
  },
  "env-vars": {
    description:
      "Environment variables let you ship the same code to dev/staging/prod with different config. Learn the difference between server-only and `NEXT_PUBLIC_*` (or `VITE_*`) variables — never leak secrets to the client.",
    howToBegin: [
      "Read Next.js “Environment Variables” docs.",
      "Add a `.env.example` to a repo so contributors know what to set.",
    ],
    resources: [
      { label: "Next.js — Env Variables", url: "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables", kind: "official" },
      { label: "Vite — Env Variables", url: "https://vite.dev/guide/env-and-mode", kind: "official" },
    ],
  },
  "env-monorepo": {
    description:
      "Monorepos let you ship a shared design system, internal libs and multiple apps from one repo. Turborepo (simple, JS-native) and Nx (richer, generators) are the two big choices.",
    howToBegin: [
      "Run `npx create-turbo@latest` and explore the generated structure.",
      "Add a shared `@acme/ui` package consumed by two apps.",
    ],
    resources: [
      { label: "Turborepo — Docs", url: "https://turbo.build/repo/docs", kind: "official" },
      { label: "Nx — Docs", url: "https://nx.dev/getting-started/intro", kind: "official" },
    ],
  },
  "env-ci": {
    description:
      "CI runs your tests on every PR. CD deploys main automatically. GitHub Actions + Vercel/Netlify gets you preview deployments per branch for free. Module Federation lets independently deployed apps share code at runtime.",
    howToBegin: [
      "Add `.github/workflows/test.yml` that runs `pnpm test` on push.",
      "Connect a GitHub repo to Vercel — every PR now gets a preview URL.",
      "Skim the Module Federation docs to understand where it shines.",
    ],
    resources: [
      { label: "GitHub Actions — Quickstart", url: "https://docs.github.com/en/actions/quickstart", kind: "official" },
      { label: "Vercel — Deployments", url: "https://vercel.com/docs/deployments", kind: "official" },
      { label: "Module Federation — Docs", url: "https://module-federation.io/", kind: "official" },
    ],
  },

  // ============================================================
  // PHASE 4 — Performance
  // ============================================================
  perf: {
    description:
      "Performance is what separates a mid-level dev from a senior. Master Core Web Vitals (LCP, CLS, INP), reduce bundle size, optimize images and fonts, avoid layout thrashing, and use Web Workers + WASM for heavy work.",
    howToBegin: [
      "Run any production site through PageSpeed Insights. Read the diagnostics.",
      "Open Chrome DevTools → Lighthouse → run on your own site. Fix the top 3.",
      "Read web.dev’s “Learn Performance” course.",
    ],
    resources: [
      { label: "web.dev — Learn Performance", url: "https://web.dev/learn/performance", kind: "course" },
      { label: "PageSpeed Insights", url: "https://pagespeed.web.dev/", kind: "official" },
    ],
    effort: "3–5 weeks",
  },
  "perf-vitals": {
    description:
      "Three numbers Google measures: LCP (largest contentful paint — speed), CLS (cumulative layout shift — stability), INP (interaction to next paint — responsiveness). These directly impact SEO ranking.",
    howToBegin: [
      "Install the Chrome Web Vitals extension.",
      "Run it on your production site. Identify the worst metric.",
      "Read web.dev’s page on the specific metric you’re failing.",
    ],
    resources: [
      { label: "web.dev — Core Web Vitals", url: "https://web.dev/articles/vitals", kind: "official" },
      { label: "web-vitals npm package", url: "https://github.com/GoogleChrome/web-vitals", kind: "opensource" },
    ],
  },
  "perf-loading": {
    description:
      "Ship less JS. Code-split with dynamic imports, tree-shake by using ES modules, inline critical above-the-fold CSS, and optimize fonts (WOFF2, font-display: swap, subset to the chars you use).",
    howToBegin: [
      "Open your bundle in a visualizer (`vite-bundle-visualizer` or `next-bundle-analyzer`).",
      "Find the biggest dependency. Can you defer it with `React.lazy` / dynamic import?",
      "Self-host your fonts with `next/font` or `fontsource` and set `font-display: swap`.",
    ],
    resources: [
      { label: "web.dev — Reduce JS payload", url: "https://web.dev/articles/reduce-javascript-payloads-with-code-splitting", kind: "article" },
      { label: "Critical CSS — Smashing Mag", url: "https://www.smashingmagazine.com/2015/08/understanding-critical-css/", kind: "article" },
      { label: "Fontsource — self-hosted fonts", url: "https://fontsource.org/", kind: "opensource" },
    ],
  },
  "perf-media": {
    description:
      "Images and fonts often dominate page weight. Serve AVIF/WebP, use `srcset` + `sizes` so phones get small files, lean on `<picture>` for art direction, and lazy-load below-the-fold images with `loading=\"lazy\"`.",
    howToBegin: [
      "Convert any large hero image to AVIF — compare file size.",
      "Add `loading=\"lazy\"` to every image below the fold.",
      "Use `next/image` or `unpic` if you’re on a framework.",
    ],
    resources: [
      { label: "web.dev — Use modern image formats", url: "https://web.dev/articles/uses-webp-images", kind: "article" },
      { label: "MDN — srcset", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset", kind: "official" },
      { label: "Squoosh — image converter", url: "https://squoosh.app/", kind: "opensource" },
    ],
  },
  "perf-runtime": {
    description:
      "Avoid layout thrashing (don’t read/write/read/write DOM in a loop), minimize paints, debounce high-frequency events (scroll/resize/input), and throttle when you must run on every tick.",
    howToBegin: [
      "Read “Avoid large, complex layouts and layout thrashing”.",
      "Write a tiny `debounce()` helper and use it on a search input.",
      "Profile a janky page in DevTools → Performance.",
    ],
    resources: [
      { label: "web.dev — Avoid layout thrashing", url: "https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing", kind: "article" },
      { label: "MDN — Performance — Rendering", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_long_is_too_long", kind: "official" },
    ],
  },
  "perf-workers": {
    description:
      "Web Workers run JS on a background thread, so heavy work (parsing, image processing, math) doesn’t freeze your UI. WebAssembly (WASM) goes further — run Rust/C++/Go at near-native speed in the browser.",
    howToBegin: [
      "Read MDN’s Web Workers API.",
      "Move a heavy `JSON.parse` of a 5MB file into a worker. Notice the UI stays smooth.",
      "Read “Compiling Rust to WebAssembly”.",
    ],
    resources: [
      { label: "MDN — Using Web Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers", kind: "official" },
      { label: "Comlink — workers without the boilerplate", url: "https://github.com/GoogleChromeLabs/comlink", kind: "opensource" },
      { label: "Rust + WASM book", url: "https://rustwasm.github.io/docs/book/", kind: "course" },
    ],
  },
  "perf-caching": {
    description:
      "Three caching layers: HTTP cache (Cache-Control, ETag, immutable assets), Service Worker cache (offline + custom strategies), and CDN cache (stale-while-revalidate). Get these right and your site feels instant.",
    howToBegin: [
      "Read “HTTP caching” on web.dev.",
      "Set `Cache-Control: public, max-age=31536000, immutable` on hashed asset filenames.",
      "Add a basic Service Worker with Workbox.",
    ],
    resources: [
      { label: "web.dev — HTTP caching", url: "https://web.dev/articles/http-cache", kind: "article" },
      { label: "Workbox — Docs", url: "https://developer.chrome.com/docs/workbox", kind: "official" },
    ],
  },

  // ============================================================
  // PHASE 5 — additions
  // ============================================================
  security: {
    description:
      "Every frontend dev should know OWASP Top 10 basics. The frontend specifically owns XSS prevention, CSP, CORS understanding, safe storage choices, and transmitting tokens over HTTPS.",
    howToBegin: [
      "Read the OWASP Top 10 — at minimum the names + one-line definitions.",
      "Read MDN’s “Web Security” section end-to-end.",
      "Audit any old project: are you using `innerHTML` with user input?",
    ],
    resources: [
      { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", kind: "article" },
      { label: "MDN — Web Security", url: "https://developer.mozilla.org/en-US/docs/Web/Security", kind: "official" },
    ],
  },
  "sec-attacks": {
    description:
      "Three classic attacks the frontend needs to defend against. XSS (escape every user input before rendering), CSRF (use SameSite cookies + anti-forgery tokens), CSP (Content Security Policy restricts where scripts can be loaded from).",
    howToBegin: [
      "Read the OWASP XSS Prevention Cheat Sheet.",
      "Set a strict CSP header on your site and use the report-only mode first.",
      "On any form that mutates server state, ensure CSRF protection (Auth.js does this).",
    ],
    resources: [
      { label: "OWASP — XSS Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", kind: "article" },
      { label: "OWASP — CSRF Prevention", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html", kind: "article" },
      { label: "MDN — CSP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP", kind: "official" },
    ],
  },
  "sec-transport": {
    description:
      "HTTPS/TLS encrypts data in transit. Every modern site needs it (browsers warn otherwise). CORS controls which origins can call your API — understand the preflight request, why credentials need explicit opt-in, and why `*` + credentials is forbidden.",
    howToBegin: [
      "Read “How HTTPS works” (howhttps.works comic).",
      "Read MDN’s CORS page end-to-end — preflights catch everyone the first time.",
      "Use Cloudflare or Let’s Encrypt to add HTTPS to any site for free.",
    ],
    resources: [
      { label: "How HTTPS works (comic)", url: "https://howhttps.works/", kind: "article" },
      { label: "MDN — CORS", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS", kind: "official" },
      { label: "Let’s Encrypt", url: "https://letsencrypt.org/", kind: "official" },
    ],
  },
  "data-mastery": {
    description:
      "Frontend isn’t only static data. You’ll need to pick the right storage for the job (cookies, LocalStorage, SessionStorage, IndexedDB) and handle real-time updates with WebSockets or Server-Sent Events.",
    howToBegin: [
      "Read MDN’s “Client-side storage” guide.",
      "Build a tiny chat app with WebSockets (Socket.io for the easy mode).",
    ],
    resources: [
      { label: "MDN — Client-side storage", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage", kind: "official" },
    ],
  },
  "data-storage": {
    description:
      "Four storage APIs, each with a niche. Cookies: small, auto-sent with requests, server-readable. LocalStorage: 5MB, sync, string-only, no expiry. SessionStorage: same but per-tab. IndexedDB: huge, async, structured, the right choice for offline data.",
    howToBegin: [
      "Build something with each: a “last visited” cookie, a theme preference in LocalStorage, an offline cache in IndexedDB.",
      "Use the `idb-keyval` library to avoid raw IndexedDB pain.",
    ],
    resources: [
      { label: "MDN — Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API", kind: "official" },
      { label: "MDN — IndexedDB", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API", kind: "official" },
      { label: "idb-keyval", url: "https://github.com/jakearchibald/idb-keyval", kind: "opensource" },
    ],
  },
  "data-realtime": {
    description:
      "WebSockets are bidirectional and persistent — great for chat and games. Server-Sent Events (SSE) are one-way (server → client) and run over plain HTTP — perfect for live updates, AI streaming, and notifications.",
    howToBegin: [
      "Read MDN’s WebSockets API.",
      "Build a chat with Socket.io or a stream with SSE from a Next.js route handler.",
    ],
    resources: [
      { label: "MDN — WebSockets API", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", kind: "official" },
      { label: "MDN — Server-Sent Events", url: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events", kind: "official" },
      { label: "Socket.io — Docs", url: "https://socket.io/docs/v4/", kind: "official" },
    ],
  },

  // ============================================================
  // PHASE 6 — additions
  // ============================================================
  "test-quality": {
    description:
      "Beyond unit + E2E: Visual Regression catches unintended UI changes (Chromatic/Percy diff screenshots). Snapshot tests catch accidental rendering changes. MSW (Mock Service Worker) intercepts network requests in tests, so you don’t need a real backend running.",
    howToBegin: [
      "Add Vitest’s `toMatchSnapshot()` to one component test.",
      "Install MSW and intercept one fetch call in a test.",
      "Try Chromatic’s free tier on a Storybook setup.",
    ],
    resources: [
      { label: "Chromatic — Docs", url: "https://www.chromatic.com/docs/", kind: "official" },
      { label: "MSW — Mock Service Worker", url: "https://mswjs.io/docs/", kind: "official" },
      { label: "Vitest — Snapshots", url: "https://vitest.dev/guide/snapshot", kind: "official" },
    ],
  },

  // ============================================================
  // PHASE 7 — Design Systems
  // ============================================================
  "design-systems": {
    description:
      "A design system is the shared language of every product team — colors, spacing, typography, components. Learning to consume one (Radix + shadcn/ui) is mid-level work. Learning to design one is senior work.",
    howToBegin: [
      "Read Brad Frost’s “Atomic Design” chapters online (free).",
      "Set up shadcn/ui in a Next.js project — it’s the modern starting point.",
    ],
    resources: [
      { label: "Atomic Design (free book)", url: "https://atomicdesign.bradfrost.com/", kind: "course" },
      { label: "shadcn/ui — Docs", url: "https://ui.shadcn.com/", kind: "official" },
    ],
    effort: "2–3 weeks",
  },
  "ds-tokens": {
    description:
      "Design tokens are the atoms of a design system. Colors, spacing scales, font sizes, radii — all abstracted into variables. Then layer on typographic hierarchy and accessible color theory (APCA replaces WCAG’s outdated contrast formula).",
    howToBegin: [
      "Read “Tokens in Design Systems” on the Figma blog.",
      "Audit your CSS variables — do you have a clear spacing scale (4, 8, 16, 24, 32…) or random values?",
      "Test colors with APCA contrast at https://www.myndex.com/APCA/",
    ],
    resources: [
      { label: "Design Tokens — Figma blog", url: "https://www.figma.com/blog/design-tokens-the-future-of-design-systems/", kind: "article" },
      { label: "APCA contrast — Myndex", url: "https://www.myndex.com/APCA/", kind: "article" },
      { label: "Practical Typography", url: "https://practicaltypography.com/", kind: "course" },
    ],
  },
  "ds-headless": {
    description:
      "Headless component libraries give you behavior + accessibility, you bring the styles. Radix UI and Headless UI are the leaders. shadcn/ui wraps Radix with Tailwind — copy components into your repo, own the source. This is the modern standard.",
    howToBegin: [
      "Read Radix UI’s “Why Radix?” page.",
      "Add 3 shadcn/ui components to a Next.js app: Dialog, Dropdown, Toast.",
    ],
    resources: [
      { label: "Radix UI — Docs", url: "https://www.radix-ui.com/primitives", kind: "official" },
      { label: "shadcn/ui — Components", url: "https://ui.shadcn.com/docs/components", kind: "official" },
      { label: "Headless UI — Docs", url: "https://headlessui.com/", kind: "official" },
    ],
  },
  "ds-framer": {
    description:
      "Framer Motion is the standard React animation library for product UI. You get declarative transitions, gestures, layout animations, and shared element patterns with clean component-level APIs.",
    howToBegin: [
      "Animate a feature card with `initial`, `animate`, and `whileHover`.",
      "Use `AnimatePresence` for enter/exit transitions in a modal or drawer.",
      "Add `layout` animation to a filtered list so items reposition smoothly.",
    ],
    resources: [
      { label: "Framer Motion — Docs", url: "https://motion.dev/docs/react", kind: "official" },
      { label: "AnimatePresence", url: "https://motion.dev/docs/react-animate-presence", kind: "official" },
      { label: "Layout Animations", url: "https://motion.dev/docs/react-layout-animations", kind: "official" },
    ],
  },
  "ds-gsap": {
    description:
      "GSAP is the senior-tier motion tool for timeline choreography and scroll-driven storytelling. Use ScrollTrigger when animation progress must be tied to viewport position.",
    howToBegin: [
      "Set up a GSAP timeline for a multi-step hero sequence.",
      "Use ScrollTrigger to draw an SVG path on scroll.",
      "Add `matchMedia` handling so motion adapts across breakpoints.",
    ],
    resources: [
      { label: "GSAP — Docs", url: "https://gsap.com/docs/v3/", kind: "official" },
      { label: "GSAP ScrollTrigger", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/", kind: "official" },
      { label: "GSAP matchMedia", url: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()", kind: "official" },
    ],
    effort: "4–7 days",
  },
  "ds-storybook": {
    description:
      "Storybook lets you build and document components in isolation. Designers can browse them. QA can test edge cases. New devs onboard faster. Pair with Chromatic for free visual regression.",
    howToBegin: [
      "Run `npx storybook@latest init` in any React project.",
      "Write stories for 3 of your components — one happy path, one edge case each.",
    ],
    resources: [
      { label: "Storybook — Docs", url: "https://storybook.js.org/docs", kind: "official" },
      { label: "Component Driven", url: "https://www.componentdriven.org/", kind: "course" },
    ],
  },

  // ============================================================
  // PHASE 8 — additions
  // ============================================================
  "modern-web": {
    description:
      "What separates a 2026 frontend dev from a 2020 one: AI-driven UI, native graphics (SVG/Canvas/WebGPU), and system-aware theming. These topics are increasingly expected at senior interviews.",
    howToBegin: [
      "Pick one of the sub-topics that excites you. Spend a weekend on it.",
    ],
    resources: [
      { label: "Vercel AI SDK — Docs", url: "https://sdk.vercel.ai/docs", kind: "official" },
    ],
  },
  "emrg-ai": {
    description:
      "The biggest shift in frontend since React. Stream LLM responses into the UI with the Vercel AI SDK or OpenAI SDK, build generative UIs that render different components based on the AI’s output, and use Copilot/Cursor to ship 2-3× faster.",
    howToBegin: [
      "Build a chat UI that streams responses with the Vercel AI SDK.",
      "Try `generateUI` to render React components from an LLM response.",
      "Use Cursor or GitHub Copilot for a week. Notice what it’s great at and what it’s not.",
    ],
    resources: [
      { label: "Vercel AI SDK — Docs", url: "https://sdk.vercel.ai/docs/introduction", kind: "official" },
      { label: "OpenAI — Streaming", url: "https://platform.openai.com/docs/guides/streaming-responses", kind: "official" },
      { label: "Cursor — Editor", url: "https://www.cursor.com/", kind: "official" },
    ],
  },
  "emrg-graphics": {
    description:
      "Browser-native graphics, from light to heavy. SVG for icons + diagrams + simple animation. Canvas for 2D drawing and small games. WebGPU/WebGL (via Three.js or React Three Fiber) for 3D and GPU compute.",
    howToBegin: [
      "Hand-author one SVG icon set instead of using lucide.",
      "Build a tiny Pong game on Canvas.",
      "Spin up React Three Fiber and add a spinning cube.",
    ],
    resources: [
      { label: "MDN — SVG Tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial", kind: "official" },
      { label: "MDN — Canvas API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API", kind: "official" },
      { label: "Three.js Journey", url: "https://threejs-journey.com/", kind: "course" },
    ],
  },
  "emrg-darkmode": {
    description:
      "Dark mode is no longer optional. Use the `prefers-color-scheme` media query to detect the user’s system preference, the `color-scheme` CSS property to opt your form controls into dark UA defaults, and a `next-themes` or similar library for an override toggle.",
    howToBegin: [
      "Add `color-scheme: light dark` to `html` and notice that scrollbars adapt.",
      "Install `next-themes` and ship a system / light / dark toggle.",
    ],
    resources: [
      { label: "MDN — prefers-color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme", kind: "official" },
      { label: "next-themes", url: "https://github.com/pacocoursey/next-themes", kind: "opensource" },
    ],
  },

  // ============================================================
  // PHASE 9 — Soft Skills & Architecture
  // ============================================================
  craft: {
    description:
      "Code is half the job. The other half is everything around it — reviewing PRs, writing docs, managing tech debt, translating designs faithfully, working in sprints. These skills decide who gets promoted.",
    howToBegin: [
      "Read the Conventional Commits spec and use it on your next 10 commits.",
      "Volunteer to review someone else’s PR this week.",
    ],
    resources: [
      { label: "Conventional Commits", url: "https://www.conventionalcommits.org/", kind: "article" },
    ],
  },
  "craft-collab": {
    description:
      "Good code reviews unblock teammates and make code better. Be specific, lead with questions not commands, separate “must fix” from “nit”. Also: how Agile/Scrum actually works (sprints, standups, retros, velocity) so you can integrate fast at a new job.",
    howToBegin: [
      "Read Google’s code-review guides — both reviewer and author perspectives.",
      "Skim the Scrum Guide (it’s 13 pages).",
    ],
    resources: [
      { label: "Google — Code Review Guidelines", url: "https://google.github.io/eng-practices/review/", kind: "article" },
      { label: "The Scrum Guide", url: "https://scrumguides.org/scrum-guide.html", kind: "official" },
    ],
  },
  "craft-docs": {
    description:
      "Good docs are a force multiplier. Learn to write a README that gets a stranger running locally in under 5 minutes, JSDoc for editor tooltips, and ADRs (architecture decision records) to capture why decisions were made.",
    howToBegin: [
      "Audit a README — does it have purpose, install, run, test, deploy? Fix the gaps.",
      "Add JSDoc to your 3 most-used utility functions and hover over them in your editor.",
      "Read one ADR from the architecture-decision-records repo.",
    ],
    resources: [
      { label: "The Art of README", url: "https://github.com/hackergrrl/art-of-readme", kind: "article" },
      { label: "TSDoc — JSDoc for TypeScript", url: "https://tsdoc.org/", kind: "official" },
      { label: "Architecture Decision Records", url: "https://adr.github.io/", kind: "article" },
    ],
  },
  "craft-handoff": {
    description:
      "Translating a Figma file into pixel-perfect, accessible, responsive code is its own skill. Understand Figma auto-layout (it maps directly to Flexbox), components and variants, design tokens, and how to ask designers the right questions.",
    howToBegin: [
      "Watch Figma’s “Auto Layout deep dive”.",
      "Pick a Figma community file and reproduce it in code at 1:1 accuracy.",
    ],
    resources: [
      { label: "Figma — Auto Layout", url: "https://help.figma.com/hc/en-us/articles/360040451373", kind: "official" },
      { label: "Figma to Code — Refactoring UI", url: "https://www.refactoringui.com/", kind: "course" },
    ],
  },
  "craft-git": {
    description:
      "Beyond `git add . && git push`: interactive rebase to clean up history, cherry-pick to grab single commits across branches, bisect to find the commit that broke a test. These are the senior-tier git moves.",
    howToBegin: [
      "Read Pro Git chapters 3 and 7.",
      "Run an interactive rebase on a feature branch to squash & reword commits.",
      "Use `git bisect` once on any repo to find a regression.",
    ],
    resources: [
      { label: "Pro Git — Chapter 7", url: "https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History", kind: "course" },
      { label: "Atlassian — git bisect", url: "https://www.atlassian.com/git/tutorials/advanced-overview", kind: "article" },
    ],
  },

  // ============================================================
  // PHASE 10 — Mastery Checkpoints
  // ============================================================
  production: {
    description:
      "Shipping is just the start. Production-grade apps need deep DevTools debugging skill, error monitoring, analytics, feature flags for safe rollouts, i18n for global reach, and a habit of tracking the TC39 process to skate where the puck is going.",
    howToBegin: [
      "Pick a real bug in any app you’ve built. Solve it using only DevTools.",
      "Add Sentry to a Next.js app — see your first real error in production.",
    ],
    resources: [
      { label: "Chrome DevTools — Docs", url: "https://developer.chrome.com/docs/devtools/", kind: "official" },
    ],
    effort: "1–2 weeks each",
  },
  "prod-debug": {
    description:
      "DevTools is your debugger, profiler, network inspector and storage editor all in one. Master the Network tab (waterfall, timing, headers), the Performance tab (recording, frames), the Memory tab (heap snapshots, leak detection), and the Sources tab (breakpoints, conditional breakpoints, blackboxing).",
    howToBegin: [
      "Read each of the 4 main DevTools docs above.",
      "Use breakpoints — not console.log — for your next 5 bugs.",
      "Record a Performance trace of a slow page and identify the bottleneck.",
    ],
    resources: [
      { label: "Chrome DevTools — Overview", url: "https://developer.chrome.com/docs/devtools/overview/", kind: "official" },
      { label: "DevTools Tips", url: "https://devtoolstips.org/", kind: "article" },
    ],
  },
  "prod-monitoring": {
    description:
      "Once it’s in production, you need eyes on it. Sentry / LogRocket capture frontend errors and session replays. GA4 / Plausible / PostHog track usage. Feature flags (LaunchDarkly, GrowthBook) let you ship dark and roll out gradually + run A/B tests.",
    howToBegin: [
      "Add Sentry to a Next.js app in 10 minutes.",
      "Add Plausible (privacy-friendly, free for hobbyists).",
      "Read GrowthBook’s “Feature Flag best practices”.",
    ],
    resources: [
      { label: "Sentry — Next.js", url: "https://docs.sentry.io/platforms/javascript/guides/nextjs/", kind: "official" },
      { label: "Plausible — Docs", url: "https://plausible.io/docs", kind: "official" },
      { label: "GrowthBook — Open-source feature flags", url: "https://www.growthbook.io/", kind: "opensource" },
    ],
  },
  "prod-global": {
    description:
      "Internationalization is more than translating strings. Pluralization, date/number formats, currency, and right-to-left (RTL) layout for Arabic/Hebrew. Stay current by tracking the TC39 process for upcoming JS features.",
    howToBegin: [
      "Add `next-intl` or `react-intl` to a small app and translate it to one language.",
      "Test RTL by setting `dir=\"rtl\"` on `<html>`. Use logical CSS properties (you learned them in Phase 1).",
      "Bookmark https://github.com/tc39/proposals and skim Stage 3 once a quarter.",
    ],
    resources: [
      { label: "next-intl — Docs", url: "https://next-intl.dev/", kind: "official" },
      { label: "MDN — Intl namespace", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl", kind: "official" },
      { label: "TC39 Proposals", url: "https://github.com/tc39/proposals", kind: "opensource" },
    ],
  },
};
