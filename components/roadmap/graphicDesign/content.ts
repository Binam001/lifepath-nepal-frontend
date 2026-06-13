// Long-form content shown inside the side drawer for each graphic design roadmap node.
import { Resource } from "../frontend/data";
import { NodeContent } from "../frontend/content";

export const CONTENT: Record<string, NodeContent> = {
  // ----------------------------- Foundation Phase -----------------------------
  history: {
    description:
      "Understanding the history of graphic design helps you appreciate modern trends and movements. Study key historical points from Gutenberg's printing press, industrial revolution posters, Bauhaus minimalism, Swiss design, to the modern digital era.",
    howToBegin: [
      "Read a summary of the 10 most influential design movements.",
      "Watch PBS's series or YouTube essays on the history of graphic design.",
      "Identify design aesthetics around you (e.g., modernist logos or Swiss layouts) and trace their roots.",
    ],
    resources: [
      {
        label: "A Brief History of Graphic Design — 99designs",
        url: "https://99designs.com/blog/design-history-movements/history-of-graphic-design/",
        kind: "article",
      },
      {
        label: "Bauhaus Movement and Its Influence",
        url: "https://www.metmuseum.org/toah/hd/bauh/hd_bauh.htm",
        kind: "article",
      },
      {
        label: "The History of Graphic Design (Video)",
        url: "https://www.youtube.com/watch?v=s9s7RId9EGI",
        kind: "video",
      },
    ],
    effort: "2–3 days",
  },
  principles: {
    description:
      "Design principles govern how visual elements are arranged. Mastery of balance (symmetric vs. asymmetric), contrast, emphasis, movement, pattern, rhythm, and unity is crucial to creating compelling visual hierarchies.",
    howToBegin: [
      "Study the 7 core principles of design on Interaction Design Foundation.",
      "Open a magazine or website and sketch or identify the focal point and balance type used.",
      "Recreate a simple poster focusing purely on emphasizing one single word or shape.",
    ],
    resources: [
      {
        label: "The Principles of Design — IDF",
        url: "https://www.interaction-design.org/literature/article/the-7-factors-of-design-principles",
        kind: "article",
      },
      {
        label: "Design Principles Explained (Video Playlist)",
        url: "https://www.youtube.com/playlist?list=PL_JbC_74X2v-1d5jHwHkQ9_1F7kS2tQ-e",
        kind: "video",
      },
    ],
    effort: "1 week",
  },
  elements: {
    description:
      "Visual elements are the building blocks of any design. Lines, shapes, texture, space (positive and negative), form, and value interact to construct meaning and structure in layout designs.",
    howToBegin: [
      "Practice drawing compositions using only circles, lines, and squares.",
      "Analyze negative space in famous logos (like FedEx or Amazon) to understand shape interaction.",
      "Create a layout focusing on how the texture of elements affects the overall mood.",
    ],
    resources: [
      {
        label: "Visual Elements of Design — GCF Global",
        url: "https://edu.gcfglobal.org/en/beginning-graphic-design/layouts-and-composition/1/",
        kind: "course",
      },
      {
        label: "Understanding Shape, Form and Line",
        url: "https://vissinf.medium.com/the-elements-of-graphic-design-line-shape-and-form-6e06b72a0889",
        kind: "article",
      },
    ],
    effort: "3–4 days",
  },
  photoshop: {
    description:
      "Adobe Photoshop is the industry-standard software for raster image editing, photo manipulation, and digital painting. Learn selection tools, layers, masking, blending modes, adjustment layers, and photo retouching.",
    howToBegin: [
      "Follow Adobe's official Photoshop tutorials for absolute beginners.",
      "Practice cutting out an object from a complex background using the Pen tool or Select Subject.",
      "Create a simple photo collage/manipulation blending three different images seamlessly.",
    ],
    resources: [
      {
        label: "Adobe Photoshop Tutorials (Official)",
        url: "https://helpx.adobe.com/photoshop/tutorials.html",
        kind: "official",
      },
      {
        label: "Photoshop Beginners Course — Piximperfect (YouTube)",
        url: "https://www.youtube.com/c/PiXimperfect",
        kind: "video",
      },
    ],
    effort: "2–3 weeks",
  },
  illustrator: {
    description:
      "Adobe Illustrator is the premier tool for creating scalable vector graphics. Learn the Pen and Anchor point tools, Shape Builder, pathfinders, typography styling, and custom vector illustration workflows.",
    howToBegin: [
      "Complete the Adobe Illustrator beginner tutorials.",
      "Trace a hand-drawn sketch or logo icon using the Pen tool.",
      "Design a set of flat vector flat icons (e.g. home, settings, user) using simple geometric shapes.",
    ],
    resources: [
      {
        label: "Adobe Illustrator Tutorials (Official)",
        url: "https://helpx.adobe.com/illustrator/tutorials.html",
        kind: "official",
      },
      {
        label: "Illustrator for Beginners — Envato Tuts+",
        url: "https://www.youtube.com/watch?v=Ib8UBwq3yGM",
        kind: "video",
      },
    ],
    effort: "2–3 weeks",
  },
  indesign: {
    description:
      "Adobe InDesign is the benchmark layout design software for multipage documents. Master master pages, grids, paragraph and character styles, and layouts for both print (books, brochures) and digital publications.",
    howToBegin: [
      "Review the basic interface of InDesign and set up a document margin and grid system.",
      "Create a 4-page brochure with columns, headlines, body text, and images.",
      "Export your layout with bleed marks for print and interactive PDFs.",
    ],
    resources: [
      {
        label: "Adobe InDesign Tutorials (Official)",
        url: "https://helpx.adobe.com/indesign/tutorials.html",
        kind: "official",
      },
      {
        label: "InDesign Beginner Guide (Video)",
        url: "https://www.youtube.com/watch?v=dEXkO8lE2-w",
        kind: "video",
      },
    ],
    effort: "1–2 weeks",
  },
  "alt-tools": {
    description:
      "Alternative design software provides robust capabilities outside the Adobe ecosystem. Tools like Affinity Designer, Affinity Photo, GIMP, and CorelDRAW are popular for cost-effectiveness and flexibility.",
    howToBegin: [
      "Download a trial or free alternative like GIMP or Inkscape.",
      "Compare the vector capabilities of Inkscape/Affinity to Illustrator.",
      "Understand why certain studios choose non-subscription models.",
    ],
    resources: [
      {
        label: "Affinity Designer Learning Resources",
        url: "https://affinity.serif.com/en-us/tutorials/designer/desktop/",
        kind: "official",
      },
      {
        label: "Inkscape Vector tutorials",
        url: "https://inkscape.org/learn/tutorials/",
        kind: "course",
      },
    ],
    effort: "3–5 days",
  },

  // ----------------------------- Intermediate Phase -----------------------------
  typography: {
    description:
      "Typography is the art of arranging type. Understand serif vs. sans-serif, kerning, tracking, leading, font pairing, legibility, readability, and establishing typographic hierarchy to communicate effectively.",
    howToBegin: [
      "Read Ellen Lupton's 'Thinking with Type'.",
      "Choose a passage of text and apply distinct hierarchy levels (H1, Subtitle, Body) using only size and weight.",
      "Experiment with different letter-spacing to see how it alters legibility.",
    ],
    resources: [
      {
        label: "Thinking with Type (Book Website)",
        url: "http://thinkingwithtype.com/",
        kind: "official",
      },
      {
        label: "Butterick's Practical Typography",
        url: "https://practicaltypography.com/",
        kind: "article",
      },
      {
        label: "Typography Rules for Beginners (Video)",
        url: "https://www.youtube.com/watch?v=QrNi9FmUMOU",
        kind: "video",
      },
    ],
    effort: "1–2 weeks",
  },
  "color-theory": {
    description:
      "Color theory explains how color behaves, maps to palettes (complementary, analogous, triadic), and triggers psychological responses. Learn color spaces (RGB vs. CMYK) and how to design for accessibility.",
    howToBegin: [
      "Use Adobe Color to generate 5 different color schemes using different rule types.",
      "Design a poster with a single key color and analyze the emotional tone it communicates.",
      "Check contrast ratios of text colors against background colors for WCAG compliance.",
    ],
    resources: [
      {
        label: "Adobe Color Wheel & Palette Generator",
        url: "https://color.adobe.com/",
        kind: "official",
      },
      {
        label: "Beginning Graphic Design — Color (Video)",
        url: "https://www.youtube.com/watch?v=GyVMoejaRYg",
        kind: "video",
      },
    ],
    effort: "3–5 days",
  },
  "layout-composition": {
    description:
      "Layout and composition place your elements in an organized structure. Master grid systems (modular, column, baseline), alignment, the Rule of Thirds, visual entry points, and the purposeful use of white space.",
    howToBegin: [
      "Sketch a 12-column grid system layout on paper for a magazine page.",
      "Place elements in a design using the golden ratio or Rule of Thirds.",
      "Iterate on a layout design by deleting 20% of its elements to increase breathing room (negative space).",
    ],
    resources: [
      {
        label:
          "Grid Systems in Graphic Design by Josef Müller-Brockmann (Book)",
        url: "https://www.instagram.com/grid_systems/",
        kind: "article",
      },
      {
        label: "Layout and Composition Guide — Canva",
        url: "https://www.canva.com/learn/design-elements-principles/",
        kind: "course",
      },
    ],
    effort: "1 week",
  },
  "logo-design": {
    description:
      "Logo design requires translating complex brand values into clean, scalable symbols. Focus on simplicity, memorability, versatility, and creating vector paths that look good at any scale.",
    howToBegin: [
      "Research the design history of 5 famous logos and analyze why they work.",
      "Sketch 50 logo concepts on paper for a fictional brand in 30 minutes (rapid ideation).",
      "Vectorize the best sketch in Illustrator using grid alignments and shape builders.",
    ],
    resources: [
      {
        label: "Logo Design Love by David Airey (Book)",
        url: "https://www.logodesignlove.com/",
        kind: "official",
      },
      {
        label: "The Futur — Logo Design Process (Video)",
        url: "https://www.youtube.com/watch?v=x3dy5MR_j48",
        kind: "video",
      },
    ],
    effort: "1–2 weeks",
  },
  branding: {
    description:
      "Branding builds the visual and strategic identity surrounding a logo. Learn to construct cohesive brand books, design style guides, coordinate secondary graphics, and design mockups for physical collateral.",
    howToBegin: [
      "Design a cohesive brand identity (logo, typography palette, patterns, colors) for a local café.",
      "Compile a 5-page brand style guide outlining rules for logo spacing, color uses, and typography rules.",
      "Create photorealistic mockups showing your branding on business cards, bags, and menus.",
    ],
    resources: [
      {
        label: "Designspiration — Branding Inspiration",
        url: "https://www.designspiration.com/search/saves/?q=branding",
        kind: "article",
      },
      {
        label: "Brand Identity Design Process — Envato Tuts+",
        url: "https://webdesign.tutsplus.com/articles/a-beginners-guide-to-brand-identity-design--cms-34863",
        kind: "article",
      },
    ],
    effort: "2 weeks",
  },
  "web-basics": {
    description:
      "Web design basics bridge static visual design and dynamic digital interfaces. Learn the basics of digital layout, screens, responsive screen sizes, and introductory UX/UI design guidelines.",
    howToBegin: [
      "Read an overview of web UI sizes (mobile, desktop, tablet resolution constraints).",
      "Sketch wireframes for a portfolio landing page on a layout grid.",
      "Explore Figma and learn to build digital page layouts.",
    ],
    resources: [
      {
        label: "Figma Design Academy (Free)",
        url: "https://www.figma.com/resource-library/design-basics/",
        kind: "course",
      },
      {
        label: "Google UX Design Professional Certificate — Coursera",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        kind: "course",
      },
    ],
    effort: "1 week",
  },

  // ----------------------------- Advanced Phase -----------------------------
  "motion-graphics": {
    description:
      "Motion graphics add animation, time, and sound to static graphic designs. Learn the key concepts in Adobe After Effects: keyframes, ease curves, typography in motion, and timeline-based rendering.",
    howToBegin: [
      "Open After Effects and animate a simple shape moving across the screen.",
      "Learn and apply the 12 Principles of Animation to a bouncing ball animation.",
      "Create a 5-second animated logo reveal using paths and keyframe easing.",
    ],
    resources: [
      {
        label: "After Effects Tutorials — Adobe",
        url: "https://helpx.adobe.com/after-effects/tutorials.html",
        kind: "official",
      },
      {
        label: "Ben Marriott — Motion Design (YouTube)",
        url: "https://www.youtube.com/c/BenMarriott",
        kind: "video",
      },
    ],
    effort: "2–3 weeks",
  },
  "three-d-design": {
    description:
      "3D design integrates depth, lighting, and realistic materials into your visuals. Learn basic 3D modeling, lighting setups, texturing, and rendering workflows using tools like Blender.",
    howToBegin: [
      "Download Blender and complete the famous 'Blender Donut' tutorial by Blender Guru.",
      "Create a simple 3D packaging render showing product labels you designed in Illustrator.",
      "Render a 3D abstract background for a poster composition.",
    ],
    resources: [
      {
        label: "Blender Guru — Beginner Tutorial Series",
        url: "https://www.youtube.com/playlist?list=PLjEaoINr3zgFX8Jwjh7ecofnF48kVJAn1",
        kind: "video",
      },
      {
        label: "Blender Official Manual",
        url: "https://docs.blender.org/manual/en/latest/",
        kind: "official",
      },
    ],
    effort: "3 weeks",
  },
  "adv-web-app": {
    description:
      "Advanced Web and App Design covers detailed interactive prototyping, wireframes, user testing, user personas, layout grids, and building high-fidelity screens in Figma, Adobe XD, or Sketch.",
    howToBegin: [
      "Pick a mobile app you use frequently and identify three usability/layout issues.",
      "Redesign the app screens in Figma and wire up interactive buttons (prototyping).",
      "Conduct a user-testing session with a friend to see if they can easily navigate your prototype.",
    ],
    resources: [
      {
        label: "Figma Community Templates & Projects",
        url: "https://www.figma.com/community",
        kind: "opensource",
      },
      {
        label: "Laws of UX — Guidelines for digital layouts",
        url: "https://lawsofux.com/",
        kind: "article",
      },
    ],
    effort: "2 weeks",
  },
  portfolio: {
    description:
      "Your portfolio is your primary tool for securing design work. Curate your 5-8 best design cases, showcase your process (sketches to mockup), and present them on Behance, Dribbble, or a personal website.",
    howToBegin: [
      "Select your top 5 projects and write a case study detailing your problem-solving process for each.",
      "Set up a portfolio on Behance or create a custom website using card/grid layouts.",
      "Ensure your contact details, resume, and portfolio link are easily accessible.",
    ],
    resources: [
      {
        label: "Behance — Creative Portfolios",
        url: "https://www.behance.net/",
        kind: "official",
      },
      {
        label: "Dribbble — Design Inspiration & Portfolios",
        url: "https://dribbble.com/",
        kind: "official",
      },
      {
        label: "The Futur — Building a Great Portfolio (Video)",
        url: "https://www.youtube.com/watch?v=wXwRocwB92Q",
        kind: "video",
      },
    ],
    effort: "2–3 weeks",
  },
  networking: {
    description:
      "Networking connects you to other creatives and potential clients. Join design forums, engage on social platforms (Behance, LinkedIn), share work-in-progress, and attend events to find job openings.",
    howToBegin: [
      "Follow and comment constructively on 10 graphic designers whose work you admire.",
      "Share your daily design studies or sketches on Behance or LinkedIn.",
      "Attend local tech/design meetups or design webinars.",
    ],
    resources: [
      {
        label: "AIGA — The Professional Association for Design",
        url: "https://www.aiga.org/",
        kind: "official",
      },
      {
        label: "Design Communities — Reddit r/graphic_design",
        url: "https://www.reddit.com/r/graphic_design/",
        kind: "article",
      },
    ],
    effort: "Ongoing",
  },
  freelancing: {
    description:
      "Freelancing requires business skills like client management, invoicing, writing project proposals, marketing yourself, pricing (hourly vs. project rates), and managing copyrights.",
    howToBegin: [
      "Draft a template for a design proposal, covering timeline, pricing, and revisions.",
      "Read about basic designer contracts and copyright handovers.",
      "Set up accounts on platforms like Upwork or locally seek freelance opportunities.",
    ],
    resources: [
      {
        label: "The Futur — Business of Design (Video)",
        url: "https://www.youtube.com/c/TheFuturish",
        kind: "video",
      },
      {
        label: "AIGA — Standard Form of Agreement for Design Services",
        url: "https://www.aiga.org/resources/aiga-standard-form-of-agreement-for-design-services",
        kind: "official",
      },
    ],
    effort: "2 weeks",
  },

  // ----------------------------- Mastery Phase -----------------------------
  "staying-updated": {
    description:
      "Design trends, software tools, and paradigms evolve quickly. Stay updated by reading industry blogs, studying design annuals, and experimenting with emerging technology (AI generation, digital formats).",
    howToBegin: [
      "Subscribe to design news channels like Brand New (UnderConsideration) or Smashing Magazine.",
      "Dedicate 1 hour every week to researching newly uploaded design projects on Behance.",
      "Experiment with combining manual designs and AI design assistants.",
    ],
    resources: [
      {
        label: "Brand New — UnderConsideration",
        url: "https://www.underconsideration.com/brandnew/",
        kind: "article",
      },
      {
        label: "Smashing Magazine — Design and Web insights",
        url: "https://www.smashingmagazine.com/",
        kind: "official",
      },
    ],
    effort: "Ongoing",
  },
  "feedback-critique": {
    description:
      "Giving and receiving constructive critique is central to growing as a designer. Learn to detach yourself from your work, ask for targeted feedback, and analyze design solutions objectively.",
    howToBegin: [
      "Share a project draft on a designer forum requesting feedback on specific elements (like layout or color).",
      "Critique one famous branding project yourself, highlighting strengths and layout issues.",
      "Apply suggestions from feedback to your work and evaluate if it improved the solution.",
    ],
    resources: [
      {
        label: "How to Give and Receive Design Critique",
        url: "https://www.nngroup.com/articles/design-critique/",
        kind: "article",
      },
    ],
    effort: "Ongoing",
  },
  mentorship: {
    description:
      "Mentorship and community contribution solidify your design skills. Sharing your knowledge by teaching, blogging, or helping junior designers builds community authority and refines your own design understanding.",
    howToBegin: [
      "Write a short tutorial explaining a specific Photoshop or Illustrator technique you learned.",
      "Answer questions from beginner designers in online communities.",
      "Partner with a peer to run weekly design critiques together.",
    ],
    resources: [
      {
        label: "ADPList — Free Creative & Tech Mentorship",
        url: "https://adplist.org/",
        kind: "official",
      },
    ],
    effort: "Ongoing",
  },

  // ----------------------------- Main Spine Nodes -----------------------------
  basics: {
    description:
      "Mastering the fundamentals is the most critical step. Understanding the history, core principles of art and design, and basic visual elements will build the foundation for all your future creative works.",
    howToBegin: [
      "Study how visual hierarchy guides a viewer's eye across a page.",
      "Practice defining layout grid structures.",
      "Analyze everyday items (advertisements, logos, book covers) to identify their design principles.",
    ],
    resources: [
      {
        label: "Thinking with Type by Ellen Lupton",
        url: "https://www.mubranding.com/teach/wp-content/uploads/2020/06/Thinking_with_Type.pdf",
        kind: "official",
      },
    ],
    effort: "1–2 weeks",
  },
  tools: {
    description:
      "Learn the primary software systems of the design trade. Photoshop, Illustrator, and InDesign form the core Creative Suite that professional graphic designers use to edit raster photos, draw vector illustrations, and layout magazines or documents.",
    howToBegin: [
      "Install Adobe Creative Cloud or free alternatives like GIMP or Inkscape.",
      "Familiarize yourself with the workspace and key tools of each application.",
      "Follow a basic start-to-finish tutorial for Photoshop and Illustrator.",
    ],
    resources: [
      {
        label: "Adobe Creative Cloud Tutorials",
        url: "https://helpx.adobe.com/creative-cloud/tutorials-explore.html",
        kind: "official",
      },
    ],
    effort: "3–4 weeks",
  },
  "advanced-principles": {
    description:
      "Take your designs to the next level by mastering advanced concepts. Dive deep into typography rules, color psychology and harmony schemes, and grid systems that organize complex layouts.",
    howToBegin: [
      "Learn about font classifications (Serif, Sans-serif, Slab-serif, Script) and how to pair them.",
      "Build color palettes that align with specific brand moods and emotions.",
      "Create layouts using strict baseline and column grids to build perfect alignments.",
    ],
    resources: [
      {
        label: "Grid Systems in Graphic Design by Josef Müller-Brockmann",
        url: "https://www.instagram.com/grid_systems/",
        kind: "article",
      },
    ],
    effort: "2 weeks",
  },
  "practical-skills": {
    description:
      "Apply your design knowledge to real-world projects. Master logo design, comprehensive brand guidelines development, and the foundational layouts required to design web and screen interfaces.",
    howToBegin: [
      "Deconstruct a brand's style guide to understand their identity decisions.",
      "Create a set of custom logos for fictional companies or local businesses.",
      "Design a basic homepage wireframe to practice digital UI structure.",
    ],
    resources: [
      {
        label: "Logo Design Love by David Airey",
        url: "https://www.logodesignlove.com/",
        kind: "official",
      },
    ],
    effort: "3 weeks",
  },
  specialization: {
    description:
      "Expand your career horizons by specializing. Explore animation and keyframe graphics in motion design, 3D modeling and texturing in Blender, or advanced digital UX/UI screens in Figma.",
    howToBegin: [
      "Animate static vector graphics you designed in Illustrator.",
      "Learn basic 3D rendering and lighting principles.",
      "Build interactive digital prototypes of web pages or mobile apps.",
    ],
    resources: [
      {
        label: "Ben Marriott's Motion Design Guides",
        url: "https://www.youtube.com/c/BenMarriott",
        kind: "video",
      },
      {
        label: "Blender Beginner Courses",
        url: "https://www.youtube.com/playlist?list=PLjEaoINr3zgFX8Jwjh7ecofnF48kVJAn1",
        kind: "video",
      },
    ],
    effort: "4 weeks",
  },
  "professional-dev": {
    description:
      "Prepare yourself to enter the creative market. Focus on assembling a stellar portfolio, networking with other designers and communities, and learning client management, proposals, and freelancing skills.",
    howToBegin: [
      "Write detailed design case studies highlighting your problem-solving process.",
      "Publish your portfolio online (Behance, Dribbble, or a personal domain).",
      "Draft contract templates and pricing structures for future design work.",
    ],
    resources: [
      {
        label: "The Futur - Business of Design",
        url: "https://www.youtube.com/c/TheFuturish",
        kind: "video",
      },
    ],
    effort: "2 weeks",
  },
  "continued-learning": {
    description:
      "Mastery is a journey of continuous improvement. Stay ahead of design trends, participate in creative critiques to refine your solutions, and contribute by mentoring others in the design community.",
    howToBegin: [
      "Regularly review industry design blogs and award-winning annuals.",
      "Seek feedback from senior designers and practice revising designs based on critiques.",
      "Share your workflows, writing, or tips with beginner design peers.",
    ],
    resources: [
      {
        label: "ADPList Mentorship Community",
        url: "https://adplist.org/",
        kind: "official",
      },
    ],
    effort: "Ongoing",
  },
};
