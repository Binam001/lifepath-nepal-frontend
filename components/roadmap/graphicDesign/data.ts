// Graphic Design Roadmap data — curriculum across 4 phases.
// All coordinates are in a virtual canvas of CANVAS_W × CANVAS_H pixels.

import { NodeVariant, ResourceKind, Resource, RNode, REdge } from "../frontend/data";

export const CANVAS_W = 1480;
export const SCALE_Y = 1.35;
export const scaleY = (y: number) => Math.round(y * SCALE_Y);
export const CANVAS_H = scaleY(1850);

// ----------------------------------------------------------------------------
// Layout helpers
// ----------------------------------------------------------------------------
const MID = CANVAS_W / 2;
const MAIN_W = 230;
const MAIN_H = 56;
const SUB_W = 220;
const SUB_H = 40;

const mainBox = (x: number, y: number) => ({
  x: x - MAIN_W / 2,
  y,
  w: MAIN_W,
  h: MAIN_H,
});

const subBox = (x: number, y: number, w: number = SUB_W) => {
  const finalW = w + 100;
  let finalX = x - finalW / 2;
  if (x < MID) {
    // Left side: anchor right edge to original right boundary (x + SUB_W / 2)
    finalX = x + SUB_W / 2 - finalW;
  } else if (x > MID) {
    // Right side: anchor left edge to original left boundary (x - SUB_W / 2)
    finalX = x - SUB_W / 2;
  }
  return {
    x: finalX,
    y,
    w: finalW,
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
    title: "Graphic Designer",
    variant: "title",
    x: MID - 220,
    y: 20,
    w: 440,
    h: 90,
  },

  // ============================================================
  // PHASE 1 — Foundation Phase
  // ============================================================
  {
    id: "phase-1",
    title: "Phase 1 — Foundation Phase",
    variant: "phase",
    ...phaseBox(140),
  },

  // Understanding Graphic Design Basics
  {
    id: "basics",
    title: "Design Basics",
    variant: "primary",
    ...mainBox(MID, 220),
  },
  {
    id: "history",
    title: "History of Graphic Design",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 210),
  },
  {
    id: "principles",
    title: "Design Principles",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 250),
  },
  {
    id: "elements",
    title: "Visual Elements",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 290),
  },

  // Essential Tools and Software
  {
    id: "tools",
    title: "Essential Tools & Software",
    variant: "primary",
    ...mainBox(MID, 390),
  },
  {
    id: "photoshop",
    title: "Adobe Photoshop",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 370),
  },
  {
    id: "illustrator",
    title: "Adobe Illustrator",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 410),
  },
  {
    id: "indesign",
    title: "Adobe InDesign",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 450),
  },
  {
    id: "alt-tools",
    title: "Alternative Tools",
    variant: "secondary",
    flavor: "optional",
    ...subBox(MID + 280, 490),
  },

  // ============================================================
  // PHASE 2 — Intermediate Phase
  // ============================================================
  {
    id: "phase-2",
    title: "Phase 2 — Intermediate Phase",
    variant: "phase",
    ...phaseBox(600),
  },

  // Advanced Design Principles
  {
    id: "advanced-principles",
    title: "Advanced Principles",
    variant: "primary",
    ...mainBox(MID, 680),
  },
  {
    id: "typography",
    title: "Typography",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 660),
  },
  {
    id: "color-theory",
    title: "Color Theory",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 700),
  },
  {
    id: "layout-composition",
    title: "Layout & Composition",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 740),
  },

  // Practical Skills and Projects
  {
    id: "practical-skills",
    title: "Practical Skills & Projects",
    variant: "primary",
    ...mainBox(MID, 850),
  },
  {
    id: "logo-design",
    title: "Logo Design",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 830),
  },
  {
    id: "branding",
    title: "Branding",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 870),
  },
  {
    id: "web-basics",
    title: "Web Design Basics",
    variant: "secondary",
    flavor: "optional",
    ...subBox(MID - 280, 910),
  },

  // ============================================================
  // PHASE 3 — Advanced Phase
  // ============================================================
  {
    id: "phase-3",
    title: "Phase 3 — Advanced Phase",
    variant: "phase",
    ...phaseBox(1020),
  },

  // Specialization
  {
    id: "specialization",
    title: "Specialization",
    variant: "primary",
    ...mainBox(MID, 1100),
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 1080),
  },
  {
    id: "three-d-design",
    title: "3D Design",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 1120),
  },
  {
    id: "adv-web-app",
    title: "Adv. Web & App Design",
    variant: "secondary",
    flavor: "optional",
    ...subBox(MID - 280, 1160),
  },

  // Professional Development
  {
    id: "professional-dev",
    title: "Professional Development",
    variant: "primary",
    ...mainBox(MID, 1270),
  },
  {
    id: "portfolio",
    title: "Portfolio Building",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 1250),
  },
  {
    id: "networking",
    title: "Networking & Communities",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 1290),
  },
  {
    id: "freelancing",
    title: "Freelancing & Business",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 1330),
  },

  // ============================================================
  // PHASE 4 — Mastery Phase
  // ============================================================
  {
    id: "phase-4",
    title: "Phase 4 — Mastery Phase",
    variant: "phase",
    ...phaseBox(1440),
  },

  // Continued Learning and Adaptation
  {
    id: "continued-learning",
    title: "Continued Learning",
    variant: "primary",
    ...mainBox(MID, 1520),
  },
  {
    id: "staying-updated",
    title: "Staying Updated",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID - 280, 1500),
  },
  {
    id: "feedback-critique",
    title: "Feedback & Critique",
    variant: "secondary",
    flavor: "recommended",
    ...subBox(MID + 280, 1540),
  },
  {
    id: "mentorship",
    title: "Teaching & Mentorship",
    variant: "secondary",
    flavor: "optional",
    ...subBox(MID - 280, 1580),
  },

  // ============ End ============
  {
    id: "end",
    title: "Keep Creating. Keep Growing.",
    variant: "title",
    x: MID - 220,
    y: 1720,
    w: 440,
    h: 80,
  },
];

for (const node of NODES) {
  node.y = scaleY(node.y);
}

const NODE_BY_ID = new Map(NODES.map((node) => [node.id, node] as const));

// ----------------------------------------------------------------------------
// Edge helpers
// ----------------------------------------------------------------------------
function vCurve(x1: number, y1: number, x2: number, y2: number) {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

function hookRight(
  mainCx: number,
  mainCy: number,
  subCx: number,
  subCy: number,
) {
  const startX = mainCx + MAIN_W / 2;
  const endX = subCx - SUB_W / 2;
  const elbowX = Math.round((startX + endX) / 2);
  return `M ${startX} ${mainCy} L ${elbowX} ${mainCy} L ${elbowX} ${subCy} L ${endX} ${subCy}`;
}

function hookLeft(
  mainCx: number,
  mainCy: number,
  subCx: number,
  subCy: number,
) {
  const startX = mainCx - MAIN_W / 2;
  const endX = subCx + SUB_W / 2;
  const elbowX = Math.round((startX + endX) / 2);
  return `M ${startX} ${mainCy} L ${elbowX} ${mainCy} L ${elbowX} ${subCy} L ${endX} ${subCy}`;
}

const cy = (yTop: number) => yTop + MAIN_H / 2;
const sy = (yTop: number) => yTop + SUB_H / 2;

// Quick lookup: main node y-tops
const M = {
  basics: scaleY(220),
  tools: scaleY(390),
  advancedPrinciples: scaleY(680),
  practicalSkills: scaleY(850),
  specialization: scaleY(1100),
  professionalDev: scaleY(1270),
  continuedLearning: scaleY(1520),
};

// ----------------------------------------------------------------------------
// Edges
// ----------------------------------------------------------------------------
export const EDGES: REdge[] = [
  // Title to first
  {
    from: "title",
    to: "basics",
    path: `M ${MID} 110 L ${MID} ${scaleY(220)}`,
    kind: "main",
  },

  // Main spine connections
  ...spine([
    M.basics,
    M.tools,
    M.advancedPrinciples,
    M.practicalSkills,
    M.specialization,
    M.professionalDev,
    M.continuedLearning,
  ]),

  // Final segment to "end" title
  {
    from: "continued-learning",
    to: "end",
    path: `M ${MID} ${cy(M.continuedLearning) + MAIN_H / 2} L ${MID} ${scaleY(1720)}`,
    kind: "main",
  },

  // ---- Subtopic hooks ----
  // Basics (left/right)
  ...hookSubs("basics", M.basics, "left", [
    { id: "history", y: 210 },
    { id: "elements", y: 290 },
  ]),
  ...hookSubs("basics", M.basics, "right", [
    { id: "principles", y: 250 },
  ]),

  // Tools (left/right)
  ...hookSubs("tools", M.tools, "left", [
    { id: "photoshop", y: 370 },
    { id: "indesign", y: 450 },
  ]),
  ...hookSubs("tools", M.tools, "right", [
    { id: "illustrator", y: 410 },
    { id: "alt-tools", y: 490 },
  ], true),

  // Advanced Principles (left/right)
  ...hookSubs("advanced-principles", M.advancedPrinciples, "left", [
    { id: "typography", y: 660 },
    { id: "layout-composition", y: 740 },
  ]),
  ...hookSubs("advanced-principles", M.advancedPrinciples, "right", [
    { id: "color-theory", y: 700 },
  ]),

  // Practical Skills (left/right)
  ...hookSubs("practical-skills", M.practicalSkills, "left", [
    { id: "logo-design", y: 830 },
    { id: "web-basics", y: 910 },
  ], true),
  ...hookSubs("practical-skills", M.practicalSkills, "right", [
    { id: "branding", y: 870 },
  ]),

  // Specialization (left/right)
  ...hookSubs("specialization", M.specialization, "left", [
    { id: "motion-graphics", y: 1080 },
    { id: "adv-web-app", y: 1160 },
  ], true),
  ...hookSubs("specialization", M.specialization, "right", [
    { id: "three-d-design", y: 1120 },
  ]),

  // Professional Development (left/right)
  ...hookSubs("professional-dev", M.professionalDev, "left", [
    { id: "portfolio", y: 1250 },
    { id: "freelancing", y: 1330 },
  ]),
  ...hookSubs("professional-dev", M.professionalDev, "right", [
    { id: "networking", y: 1290 },
  ]),

  // Continued Learning (left/right)
  ...hookSubs("continued-learning", M.continuedLearning, "left", [
    { id: "staying-updated", y: 1500 },
    { id: "mentorship", y: 1580 },
  ], true),
  ...hookSubs("continued-learning", M.continuedLearning, "right", [
    { id: "feedback-critique", y: 1540 },
  ]),
];

// Build vertical spine edges
function spine(yTops: number[]): REdge[] {
  const out: REdge[] = [];
  for (let i = 0; i < yTops.length - 1; i++) {
    out.push({
      from: `spine-${i}`,
      to: `spine-${i + 1}`,
      path: vCurve(
        MID,
        cy(yTops[i]) + MAIN_H / 2,
        MID,
        cy(yTops[i + 1]) - MAIN_H / 2,
      ),
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
  return subs.map((s) => {
    const node = NODE_BY_ID.get(s.id);
    const nodeY = node ? node.y : scaleY(s.y);
    return {
      from: mainId,
      to: s.id,
      path: fn(mainCx, mainCy, sideX, sy(nodeY)),
      dashed,
      kind: "main",
    };
  });
}
