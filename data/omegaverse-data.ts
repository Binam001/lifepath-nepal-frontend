export interface OmegaverseType {
  code: "ALPHA" | "BETA" | "OMEGA" | "SIGMA" | "DELTA" | "GAMMA";
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  workStyle: string;
  compatibility: {
    bestMatch: string;
    goodMatch: string;
    challenging: string;
  };
}

export const omegaverseTypes: Record<string, OmegaverseType> = {
  ALPHA: {
    code: "ALPHA",
    name: "Alpha",
    tagline: "The Natural Leader and Protector",
    description:
      "Strong, natural leaders who protect their people and command respect.",
    detailedDescription:
      "Alphas are driven, outgoing, and protective. They naturally step up during hard times and lead the way. They focus on big goals and making sure things get done, and people naturally look up to them.",
    strengths: [
      "Strong leadership",
      "Always stands up for their team",
      "Acts fast and confidently under pressure",
      "Highly driven and ambitious",
      "Great at public speaking and motivating people",
      "Handles emergencies and crises very well",
      "Not afraid to take big risks",
      "Easily inspires others to follow them",
    ],
    weaknesses: [
      "Can be stubborn, Demanding, or Refuses to listen",
      "Hides weaknesses and hates admitting mistakes",
      "Can become too competitive",
      "Burns out from taking on too much work",
      "Gets impatient with slow workers",
      "Might interfere too much while trying to help",
      "Struggles to let others handle important tasks",
    ],
    careers: [
      "Chief Executive Officer (CEO) / Boss",
      "Company Director",
      "Judge or Top Lawyer",
      "Military Commander",
      "Top-level Business Advisor",
      "Business Owner / Founder",
      "Chief Doctor or Surgeon",
      "Politician",
      "Chief Technology Officer (CTO)",
      "Tech Startup Founder",
      "IT Director",
      "Lead Enterprise Architect",
    ],
    workStyle:
      "Does best when in charge, working on high-stakes projects, and making their own rules. They prefer setting the big goals rather than doing everyday routines. They work well in fast-paced jobs, expect a lot from their team, and will fiercely defend their workers from outside trouble.",
    compatibility: {
      bestMatch: "Omega",
      goodMatch: "Beta",
      challenging: "Alpha",
    },
  },
  BETA: {
    code: "BETA",
    name: "Beta",
    tagline: "The Balanced and Steady Worker",
    description:
      "Calm, reliable team players who keep things running smoothly.",
    detailedDescription:
      "Betas are the peacemakers who keep the team united. They are fair, balanced, and easy to work with. They don't usually fight to be the boss. Instead, they like steady, friendly workplaces where everyone gets along and gets the job done.",
    strengths: [
      "Very stable, steady, and reliable",
      "Great at solving arguments and keeping the peace",
      "Adaptable, sensible, and logical",
      "Good at solving everyday, practical problems",
      "Stays calm when things get crazy",
      "Highly organized and great at planning",
      "Excellent at sticking to a long-term plan",
      "Pays close attention to how the team is feeling",
    ],
    weaknesses: [
      "Avoids taking risks just to keep the peace",
      "Prefers to keep doing things the same way instead of trying something new",
      "Too quiet or passive during big fights",
      "Often goes unnoticed because they don't talk about their own hard work",
      "Struggles to stand up for their own needs",
      "Afraid to talk back to a bad boss",
      "Works too hard to make everyone else happy",
    ],
    careers: [
      "Project Manager",
      "Human Resources (HR) Manager",
      "Teacher or Professor",
      "Office Coordinator",
      "Financial Analyst",
      "Operations Manager",
      "Mediator / Peacemaker",
      "Civil Engineer",
      "Digital Advertising Project Manager",
      "IT Business Analyst",
      "Systems Administrator",
    ],
    workStyle:
      "Does great in team settings. They keep the daily work moving, talk clearly, and make sure everything is organized. They like jobs with clear rules and friendly coworkers. They value a good work-life balance and are great at connecting different teams together.",
    compatibility: {
      bestMatch: "Beta",
      goodMatch: "Alpha, Omega",
      challenging: "None",
    },
  },
  OMEGA: {
    code: "OMEGA",
    name: "Omega",
    tagline: "The Caring Helper and Creator",
    description:
      "Warm, caring, and creative people who focus on feelings and building strong relationships.",
    detailedDescription:
      "Omegas are very creative, caring, and in tune with others. They can easily read a room and know how people are feeling. They care most about keeping everyone safe, happy, and connected. They are often the heart and soul of their group.",
    strengths: [
      "Understands feelings perfectly (High Emotional Intelligence)",
      "Deeply caring, helpful, and healing",
      "Very creative and artistic",
      "Easily senses what other people need",
      "Great at listening and giving advice",
      "Makes everyone feel welcome and included",
      "Has a great feel for what people want to buy or see",
      "Naturally calms people down during fights",
    ],
    weaknesses: [
      "Takes feedback or criticism too personally",
      "Gets stressed out or upset very easily",
      "Forgets to take care of themselves because they are helping others",
      "Loses their energy when dealing with negative or unkind people",
      "Struggles to say 'no' or to set strict rules",
      "Often doubts their own skills (Imposter Syndrome)",
      "Sometimes too kind for tough business choices",
    ],
    careers: [
      "Therapist or Counselor",
      "Creative Designer",
      "Doctor, Nurse, or Caregiver",
      "Community Organizer",
      "Customer Researcher",
      "Social Worker",
      "Charity Director",
      "Writer or Artist",
      "User Experience (UX) Designer",
      "Visual Branding Specialist",
      "IT Accessibility Specialist",
      "Tech Community Manager",
    ],
    workStyle:
      "Does best in jobs where they can create things, work with others, or care for people. They need to feel safe, appreciated, and connected to the work they do. They shine when helping others but will fall apart in mean, highly competitive, or strict corporate jobs.",
    compatibility: {
      bestMatch: "Alpha",
      goodMatch: "Beta",
      challenging: "Omega",
    },
  },
  SIGMA: {
    code: "SIGMA",
    name: "Sigma",
    tagline: "The Independent Lone Wolf",
    description:
      "Highly capable, smart workers who like to work alone and don't care about office drama.",
    detailedDescription:
      "Sigmas are smart problem-solvers who like to work alone. They don't care about being popular or controlling others, but they are very skilled. They are quiet, watch everything, and lead by being great at their jobs rather than being loud.",
    strengths: [
      "Very independent and can take care of themselves",
      "Deep, smart thinkers",
      "Solves problems in unique, out-of-the-box ways",
      "Works perfectly alone or from home",
      "Doesn't let office gossip or pressure affect them",
      "Can focus very deeply on a task for a long time",
      "Doesn't need a boss to check on them constantly",
      "Stays completely calm and emotionless during a crisis",
    ],
    weaknesses: [
      "Can seem cold, distant, or hard to talk to",
      "Hates normal rules, schedules, and bosses",
      "Dislikes pointless meetings or 'busy work'",
      "Has a hard time explaining their smart ideas to others",
      "Gets very impatient with slow paperwork or rules",
      "Tends to disappear into their work and ignore the team",
      "Can accidentally hurt other’s feelings by being too blunt",
    ],
    careers: [
      "Lead Computer Programmer",
      "Cybersecurity Expert",
      "Independent Business Consultant",
      "Scientist or Researcher",
      "Data Analyst",
      "Private Investigator",
      "Freelancer / Specialist",
      "Independent Writer or Creator",
      "Backend Software Engineer",
      "Cloud Infrastructure Architect",
      "Ethical Hacker / Pen Tester",
      "Machine Learning Engineer",
    ],
    workStyle:
      "Needs a lot of freedom to solve hard problems their own way. They don't care about climbing the corporate ladder or office politics. They do best in jobs with flexible hours where they can work alone, as long as they get the job done well.",
    compatibility: {
      bestMatch: "Sigma, Delta",
      goodMatch: "Gamma",
      challenging: "Alpha",
    },
  },
  DELTA: {
    code: "DELTA",
    name: "Delta",
    tagline: "The Hardworking Rule Follower",
    description:
      "Hardworking, detail-focused people who love rules, safety, and clear instructions.",
    detailedDescription:
      "Deltas are quiet, organized, and very focused. They value rules, safety, and doing things the right way. They work hard behind the scenes to make sure everything runs exactly as planned and no details are missed.",
    strengths: [
      "Never misses a detail",
      "Follows rules perfectly and works very hard",
      "Incredibly reliable and always gets the job done",
      "Great at checking for mistakes",
      "Remembers the 'right way' to do things perfectly",
      "Can handle boring or repetitive tasks without complaining",
      "Very loyal and protective of their company",
      "Great at spotting risks or safety hazards",
    ],
    weaknesses: [
      "Hates sudden changes, surprises, or broken routines",
      "Gets very stressed if there are no clear directions",
      "Sometimes too scared to try a new, better way of working",
      "Tries to control every little thing when they are feeling stressed",
      "Focuses too much on what could go wrong",
      "Struggles to think of a new plan when the original one fails",
      "Feels secretly unappreciated for all their hard work behind the scenes",
    ],
    careers: [
      "Rule Enforcer (Compliance Officer)",
      "Financial Checker (Auditor)",
      "Quality Inspector",
      "Database Manager",
      "Air Traffic Controller",
      "Supply and Delivery Manager",
      "Forensic Accountant",
      "Legal Assistant",
      "Quality Assurance (QA) Tester",
      "Network Engineer",
      "IT Security Auditor",
    ],
    workStyle:
      "Does best with clear rules, step-by-step tasks, and known duties. They are great at keeping things running for a long time. They like instruction manuals, steady bosses, and normal schedules. They hate messy, fast-changing jobs and want to be a steady, trusted worker.",
    compatibility: {
      bestMatch: "Sigma",
      goodMatch: "Beta, Gamma",
      challenging: "Alpha",
    },
  },
  GAMMA: {
    code: "GAMMA",
    name: "Gamma",
    tagline: "The Creative Idea Maker",
    description:
      "Smart, flexible thinkers who love coming up with fresh ideas and trying new things.",
    detailedDescription:
      "Gammas are creative planners who love to try new things. They don't mind changing plans if a better idea comes along. They value knowledge, fresh ideas, and looking ahead to the future. They are usually the ones who start big changes in a company.",
    strengths: [
      "Quick, smart, and flexible thinker",
      "Very creative and always looking to the future",
      "Easily adapts to new trends and technology",
      "Sees the 'big picture' and how things connect",
      "Gets everyone excited about new ideas",
      "Learns new skills incredibly fast",
      "Great at selling creative, new ideas to others",
      "Easily understands very hard concepts",
    ],
    weaknesses: [
      "Gets bored very quickly doing the same thing every day",
      "Can seem a bit scattered, messy, or unpredictable",
      "Has trouble explaining crazy future ideas to normal, practical workers",
      "Often starts a project but quits right before it's finished",
      "Hates strict bosses and doing things 'the old way'",
      "Jumps between tasks too much (Shiny Object Syndrome)",
      "Promises too much because they are too hopeful about how fast things can be done",
    ],
    careers: [
      "Creative Director",
      "Innovation Manager",
      "Product Planner",
      "Business Investor",
      "Startup Creator",
      "Marketing Planner",
      "Video Game Designer",
      "Trend Watcher",
      "IT Solutions Architect",
      "Product Manager",
    ],
    workStyle:
      "Needs a fast-paced, changing job that rewards new ideas and quick thinking. They are best at the start of a project, brainstorming, and making quick drafts. They work great for short periods but definitely need organized teammates (like Deltas or Betas) to finish the job and handle the daily tasks.",
    compatibility: {
      bestMatch: "Gamma, Beta",
      goodMatch: "Delta, Omega",
      challenging: "Alpha",
    },
  },
};
