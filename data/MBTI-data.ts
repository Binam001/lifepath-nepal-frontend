// Comprehensive Personality Data for MBTI, OCEAN (Big 5), DISC Integration

export type PersonalityType = {
  code: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  workStyle: string;
  learningStyle: string;
  stressManagement: string;

  // OCEAN (Big 5) mapping
  ocean: {
    openness: "high" | "medium" | "low";
    conscientiousness: "high" | "medium" | "low";
    extraversion: "high" | "medium" | "low";
    agreeableness: "high" | "medium" | "low";
    neuroticism: "high" | "medium" | "low";
  };

  // DISC profile mapping
  disc: {
    dominance: "high" | "medium" | "low";
    influence: "high" | "medium" | "low";
    steadiness: "high" | "medium" | "low";
    compliance: "high" | "medium" | "low";
    primaryStyle: "D" | "I" | "S" | "C";
  };

  // Relationship compatibility
  relationships: {
    romantic: string[];
    friendship: string[];
    professional: string[];
    challenging: string[];
  };

  // Career guidance
  careerPaths: {
    ideal: string[];
    suitable: string[];
    challenging: string[];
    industries: string[];
  };

  // Life path insights
  lifePath: {
    purpose: string;
    values: string[];
    growthAreas: string[];
    successFactors: string[];
  };
};

export const personalityTypes: Record<string, PersonalityType> = {
  INTJ: {
    code: "INTJ",
    name: "The Architect",
    tagline: "Strategic Mastermind with Innovative Vision",
    description:
      "Strategic, analytical, and innovative. You excel at developing long-term plans and solving complex problems.",
    detailedDescription:
      "INTJs are independent thinkers who value knowledge and competence. You approach problems systematically and love turning theoretical concepts into practical solutions. Your mind naturally sees patterns and creates strategies for improvement.",
    strengths: [
      "Strategic thinking and long-term planning",
      "High competence in specialized areas",
      "Independent and self-motivated",
      "Innovative problem-solving abilities",
      "Strong analytical and logical reasoning",
    ],
    weaknesses: [
      "Can seem overly critical or arrogant",
      "Difficulty expressing emotions",
      "May dismiss others' input too quickly",
      "Can be perfectionistic",
      "Struggle with small talk and social niceties",
    ],
    careers: [
      "Software Architect",
      "Data Scientist",
      "Strategic Planner",
      "Research Scientist",
      "Systems Engineer",
    ],
    workStyle:
      "Prefer independent work with minimal supervision. Excel in roles requiring strategic thinking and long-term planning. Need intellectual challenges and opportunities for innovation.",
    learningStyle:
      "Theoretical and conceptual. Prefer learning through research, analysis, and independent study. Excel with complex abstract concepts.",
    stressManagement:
      "Need alone time to recharge. Manage stress through logical analysis and strategic planning. Avoid emotional overwhelm by maintaining structure.",

    ocean: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "low",
      neuroticism: "medium",
    },

    disc: {
      dominance: "high",
      influence: "low",
      steadiness: "medium",
      compliance: "high",
      primaryStyle: "C",
    },

    relationships: {
      romantic: ["ENFP", "ENTP", "INFJ", "INTJ"],
      friendship: ["INTP", "ENTJ", "INFJ", "ENTP"],
      professional: ["ENTJ", "INTP", "ISTJ", "INTJ"],
      challenging: ["ESFP", "ESFJ", "ISFP"],
    },

    careerPaths: {
      ideal: [
        "Software Architecture",
        "Data Science",
        "Strategic Management",
        "Engineering",
        "Research",
      ],
      suitable: ["Finance", "Law", "Academia", "Consulting", "Technology"],
      challenging: [
        "Customer Service",
        "Event Planning",
        "Social Work",
        "Retail",
      ],
      industries: [
        "Technology",
        "Finance",
        "Healthcare",
        "Engineering",
        "Research & Development",
      ],
    },

    lifePath: {
      purpose:
        "To innovate and improve systems through strategic thinking and expertise",
      values: [
        "Competence",
        "Knowledge",
        "Efficiency",
        "Independence",
        "Innovation",
      ],
      growthAreas: [
        "Emotional intelligence",
        "Collaboration",
        "Patience with others",
        "Work-life balance",
      ],
      successFactors: [
        "Continuous learning",
        "Strategic planning",
        "Specialized expertise",
        "Independent projects",
      ],
    },
  },

  INTP: {
    code: "INTP",
    name: "The Logician",
    tagline: "Innovative Thinker Who Loves Intellectual Challenges",
    description:
      "Curious, inventive, and logical. You love exploring theories and solving intellectual challenges.",
    detailedDescription:
      "INTPs are philosophical innovators fascinated by logical analysis and abstract thinking. You constantly seek to understand complex systems and create elegant solutions. Your mind thrives on intellectual stimulation.",
    strengths: [
      "Exceptional analytical and logical reasoning",
      "Innovative and creative problem-solving",
      "Open-minded and flexible thinking",
      "Strong theoretical understanding",
      "Independent and self-directed",
    ],
    weaknesses: [
      "Can be overly critical and skeptical",
      "Difficulty following through on ideas",
      "May neglect practical matters",
      "Can seem aloof or detached",
      "Struggle with routine and details",
    ],
    careers: [
      "Research Scientist",
      "Software Engineer",
      "Data Analyst",
      "Philosopher",
      "Mathematician",
    ],
    workStyle:
      "Thrive in flexible environments with intellectual challenges. Need autonomy and minimal micromanagement. Excel at theoretical problem-solving.",
    learningStyle:
      "Prefer exploring ideas independently. Learn through experimentation and logical analysis. Excel with abstract concepts and theories.",
    stressManagement:
      "Withdraw to think and analyze. Manage stress through intellectual pursuits and alone time. Need mental space to process.",

    ocean: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low",
    },

    disc: {
      dominance: "low",
      influence: "low",
      steadiness: "low",
      compliance: "high",
      primaryStyle: "C",
    },

    relationships: {
      romantic: ["ENTJ", "ENFP", "INFJ", "INTP"],
      friendship: ["INTJ", "ENTP", "INFP", "INTP"],
      professional: ["INTJ", "ENTJ", "INTP", "ENTP"],
      challenging: ["ESFJ", "ESTJ", "ISFJ"],
    },

    careerPaths: {
      ideal: [
        "Research & Development",
        "Software Engineering",
        "Data Analysis",
        "Academia",
        "Innovation",
      ],
      suitable: [
        "Technology",
        "Science",
        "Engineering",
        "Philosophy",
        "Mathematics",
      ],
      challenging: [
        "Sales",
        "Customer Service",
        "Event Management",
        "Administration",
      ],
      industries: [
        "Technology",
        "Research",
        "Academia",
        "Engineering",
        "Science",
      ],
    },

    lifePath: {
      purpose: "To understand complex systems and develop innovative solutions",
      values: ["Truth", "Logic", "Innovation", "Knowledge", "Independence"],
      growthAreas: [
        "Practical execution",
        "Social skills",
        "Consistency",
        "Attention to detail",
      ],
      successFactors: [
        "Intellectual freedom",
        "Challenging problems",
        "Continuous learning",
        "Flexibility",
      ],
    },
  },

  ENTJ: {
    code: "ENTJ",
    name: "The Commander",
    tagline: "Natural Leader Who Drives Change and Results",
    description:
      "Bold, decisive, and natural leaders. You excel at organizing people and resources toward goals.",
    detailedDescription:
      "ENTJs are strategic leaders who naturally take charge of situations. You combine long-term vision with decisive action, making you effective at turning ideas into reality and mobilizing teams.",
    strengths: [
      "Natural leadership and strategic planning",
      "Decisive and confident decision-making",
      "Excellent at organizing and coordinating",
      "Strong communication and persuasion",
      "Goal-oriented and results-driven",
    ],
    weaknesses: [
      "Can be domineering or insensitive",
      "Impatient with inefficiency",
      "May overlook emotional needs",
      "Can be overly critical",
      "Struggle to relax and delegate",
    ],
    careers: [
      "CEO/Executive",
      "Entrepreneur",
      "Project Manager",
      "Management Consultant",
      "Business Strategist",
    ],
    workStyle:
      "Natural leadership roles with strategic challenges. Excel at managing teams and complex projects. Need autonomy and clear goals.",
    learningStyle:
      "Action-oriented and goal-focused. Learn through leadership opportunities and real-world challenges. Excel in competitive environments.",
    stressManagement:
      "Take charge and create action plans. Manage stress through problem-solving and physical activity. Need to balance work with rest.",

    ocean: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "low",
      neuroticism: "low",
    },

    disc: {
      dominance: "high",
      influence: "high",
      steadiness: "low",
      compliance: "medium",
      primaryStyle: "D",
    },

    relationships: {
      romantic: ["INTP", "INFP", "ENFP", "ENTJ"],
      friendship: ["INTJ", "ENTP", "ENTJ", "ENFJ"],
      professional: ["INTJ", "ENTJ", "ISTJ", "ESTJ"],
      challenging: ["ISFP", "ESFP", "ISFJ"],
    },

    careerPaths: {
      ideal: [
        "Executive Leadership",
        "Entrepreneurship",
        "Management",
        "Strategy",
        "Consulting",
      ],
      suitable: ["Business", "Law", "Finance", "Politics", "Technology"],
      challenging: [
        "Routine Administration",
        "Customer Service",
        "Social Work",
      ],
      industries: [
        "Business",
        "Finance",
        "Technology",
        "Consulting",
        "Government",
      ],
    },

    lifePath: {
      purpose:
        "To lead others toward achieving ambitious goals and creating impact",
      values: [
        "Achievement",
        "Leadership",
        "Efficiency",
        "Power",
        "Innovation",
      ],
      growthAreas: [
        "Empathy",
        "Patience",
        "Work-life balance",
        "Listening to others",
      ],
      successFactors: [
        "Leadership opportunities",
        "Strategic challenges",
        "Team management",
        "Clear objectives",
      ],
    },
  },

  ENTP: {
    code: "ENTP",
    name: "The Debater",
    tagline: "Quick-Witted Innovator Who Challenges the Status Quo",
    description:
      "Quick-witted, clever, and innovative. You love intellectual challenges and brainstorming ideas.",
    detailedDescription:
      "ENTPs are clever innovators who love intellectual debates and creative problem-solving. You see possibilities everywhere and enjoy challenging conventional thinking to find better solutions.",
    strengths: [
      "Quick thinking and mental agility",
      "Excellent brainstorming and ideation",
      "Charismatic and persuasive communication",
      "Adaptable and resourceful",
      "Strong debate and argumentation skills",
    ],
    weaknesses: [
      "Can be argumentative for argument's sake",
      "Difficulty with follow-through",
      "May seem insensitive or provocative",
      "Struggle with routine tasks",
      "Can be scattered or unfocused",
    ],
    careers: [
      "Entrepreneur",
      "Marketing Strategist",
      "Management Consultant",
      "Innovation Manager",
      "Business Development",
    ],
    workStyle:
      "Thrive in dynamic environments with intellectual challenges. Excel at brainstorming and strategy. Need variety and flexibility.",
    learningStyle:
      "Learn through debate, discussion, and experimentation. Excel at seeing connections and patterns. Prefer hands-on exploration.",
    stressManagement:
      "Engage with new ideas and social interaction. Manage stress through variety and intellectual stimulation. Need mental challenges.",

    ocean: {
      openness: "high",
      conscientiousness: "low",
      extraversion: "high",
      agreeableness: "low",
      neuroticism: "low",
    },

    disc: {
      dominance: "high",
      influence: "high",
      steadiness: "low",
      compliance: "low",
      primaryStyle: "I",
    },

    relationships: {
      romantic: ["INFJ", "INTJ", "ENFP", "ENTP"],
      friendship: ["INTJ", "ENTJ", "ENFP", "INTP"],
      professional: ["ENTJ", "INTJ", "ENTP", "INFJ"],
      challenging: ["ISFJ", "ISTJ", "ESFJ"],
    },

    careerPaths: {
      ideal: [
        "Entrepreneurship",
        "Innovation",
        "Strategy",
        "Marketing",
        "Consulting",
      ],
      suitable: [
        "Business Development",
        "Sales",
        "Technology",
        "Creative Fields",
      ],
      challenging: ["Routine Administration", "Data Entry", "Accounting"],
      industries: [
        "Technology",
        "Business",
        "Marketing",
        "Consulting",
        "Innovation",
      ],
    },

    lifePath: {
      purpose:
        "To innovate and challenge existing systems to find better solutions",
      values: ["Innovation", "Knowledge", "Freedom", "Challenge", "Growth"],
      growthAreas: [
        "Focus and consistency",
        "Emotional awareness",
        "Follow-through",
        "Patience",
      ],
      successFactors: [
        "Intellectual challenges",
        "Variety",
        "Independence",
        "Innovation opportunities",
      ],
    },
  },

  INFJ: {
    code: "INFJ",
    name: "The Advocate",
    tagline: "Insightful Idealist Dedicated to Meaningful Change",
    description:
      "Insightful, principled, and idealistic. You're driven to help others and make a positive impact.",
    detailedDescription:
      "INFJs are rare idealists with deep insights into human nature. You combine empathy with strategic thinking to create meaningful change and help others reach their potential.",
    strengths: [
      "Deep insight into people and motivations",
      "Strong values and integrity",
      "Creative and visionary thinking",
      "Excellent at inspiring and counseling",
      "Committed to personal growth",
    ],
    weaknesses: [
      "Can be overly idealistic",
      "Tendency to burn out from overgiving",
      "May struggle with conflict",
      "Can be perfectionistic",
      "Need extensive alone time",
    ],
    careers: [
      "Counselor/Therapist",
      "Writer",
      "HR Manager",
      "Life Coach",
      "Nonprofit Leader",
    ],
    workStyle:
      "Need meaningful work aligned with values. Excel at counseling and creative roles. Prefer depth over breadth.",
    learningStyle:
      "Prefer deep understanding and meaningful connections. Learn through reflection and personal exploration. Excel at intuitive insights.",
    stressManagement:
      "Require extensive alone time to recharge. Manage stress through creative expression and nature. Need emotional boundaries.",

    ocean: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "medium",
    },

    disc: {
      dominance: "low",
      influence: "medium",
      steadiness: "high",
      compliance: "high",
      primaryStyle: "S",
    },

    relationships: {
      romantic: ["ENTP", "ENFP", "INTJ", "INFJ"],
      friendship: ["ENFP", "INFP", "INTJ", "ENFJ"],
      professional: ["ENFP", "INFP", "INTJ", "ENTP"],
      challenging: ["ESTP", "ESTJ", "ISTP"],
    },

    careerPaths: {
      ideal: ["Counseling", "Writing", "Coaching", "HR", "Nonprofit Work"],
      suitable: [
        "Education",
        "Healthcare",
        "Arts",
        "Psychology",
        "Social Work",
      ],
      challenging: ["Sales", "High-pressure environments", "Routine tasks"],
      industries: [
        "Healthcare",
        "Education",
        "Nonprofit",
        "Psychology",
        "Creative Arts",
      ],
    },

    lifePath: {
      purpose: "To help others find meaning and reach their full potential",
      values: ["Authenticity", "Growth", "Harmony", "Meaning", "Compassion"],
      growthAreas: [
        "Setting boundaries",
        "Practicality",
        "Self-care",
        "Assertiveness",
      ],
      successFactors: [
        "Meaningful work",
        "Creative expression",
        "Helping others",
        "Personal values alignment",
      ],
    },
  },

  INFP: {
    code: "INFP",
    name: "The Mediator",
    tagline: "Creative Idealist Seeking Meaning and Authenticity",
    description:
      "Creative, empathetic, and idealistic. You seek meaning and authenticity in your work.",
    detailedDescription:
      "INFPs are idealistic dreamers driven by deep personal values. You seek meaning in everything you do and are committed to making the world a better place through authenticity and creativity.",
    strengths: [
      "Deep empathy and understanding",
      "Creative and imaginative",
      "Strong personal values and integrity",
      "Excellent written communication",
      "Open-minded and accepting",
    ],
    weaknesses: [
      "Overly idealistic and impractical",
      "Can be overly sensitive to criticism",
      "Difficulty with deadlines and structure",
      "May struggle with conflict",
      "Can be indecisive",
    ],
    careers: [
      "Writer/Author",
      "Graphic Designer",
      "Therapist/Counselor",
      "Social Worker",
      "Creative Director",
    ],
    workStyle:
      "Need creative freedom and meaningful work. Excel in helping professions and creative fields. Prefer flexible schedules.",
    learningStyle:
      "Learn through personal meaning and creative exploration. Prefer individual study. Excel at understanding symbolism and deeper meanings.",
    stressManagement:
      "Need creative outlets and alone time. Manage stress through artistic expression and nature. Require emotional processing time.",

    ocean: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "high",
    },

    disc: {
      dominance: "low",
      influence: "low",
      steadiness: "high",
      compliance: "medium",
      primaryStyle: "S",
    },

    relationships: {
      romantic: ["ENFJ", "ENTJ", "INFJ", "INFP"],
      friendship: ["INFJ", "ENFP", "INFP", "ENFJ"],
      professional: ["ENFJ", "INFJ", "ENFP", "INFP"],
      challenging: ["ESTJ", "ESTP", "ISTJ"],
    },

    careerPaths: {
      ideal: [
        "Writing",
        "Creative Arts",
        "Counseling",
        "Social Work",
        "Design",
      ],
      suitable: ["Education", "Healthcare", "Nonprofit", "Arts", "Psychology"],
      challenging: [
        "Corporate Management",
        "Sales",
        "Military",
        "Strict routines",
      ],
      industries: [
        "Creative Arts",
        "Mental Health",
        "Education",
        "Nonprofit",
        "Publishing",
      ],
    },

    lifePath: {
      purpose: "To live authentically and help others find meaning and healing",
      values: [
        "Authenticity",
        "Creativity",
        "Compassion",
        "Individuality",
        "Harmony",
      ],
      growthAreas: [
        "Practical skills",
        "Assertiveness",
        "Structure",
        "Realistic expectations",
      ],
      successFactors: [
        "Creative freedom",
        "Meaningful work",
        "Values alignment",
        "Flexible environment",
      ],
    },
  },

  ENFJ: {
    code: "ENFJ",
    name: "The Protagonist",
    tagline: "Charismatic Leader Who Inspires and Empowers Others",
    description:
      "Charismatic, inspiring, and empathetic. You naturally motivate and guide others.",
    detailedDescription:
      "ENFJs are natural-born leaders who inspire others through charisma and genuine care. You excel at understanding people's potential and helping them grow toward their best selves.",
    strengths: [
      "Excellent leadership and communication",
      "Strong empathy and emotional intelligence",
      "Natural ability to inspire and motivate",
      "Organized and goal-oriented",
      "Genuine care for others' wellbeing",
    ],
    weaknesses: [
      "Can be overly idealistic",
      "May neglect own needs for others",
      "Struggle with criticism",
      "Can be too selfless",
      "May avoid conflict to maintain harmony",
    ],
    careers: [
      "Teacher/Educator",
      "HR Manager",
      "Life Coach",
      "Nonprofit Director",
      "Training & Development",
    ],
    workStyle:
      "Excel in people-focused leadership roles. Thrive in collaborative team environments. Need to make positive impact on others.",
    learningStyle:
      "Learn through interaction and group activities. Excel at understanding people and relationships. Prefer hands-on collaborative learning.",
    stressManagement:
      "Process through talking with trusted friends. Manage stress by helping others. Need appreciation and validation.",

    ocean: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "medium",
    },

    disc: {
      dominance: "medium",
      influence: "high",
      steadiness: "high",
      compliance: "medium",
      primaryStyle: "I",
    },

    relationships: {
      romantic: ["INFP", "ISFP", "ENFJ", "INFJ"],
      friendship: ["INFJ", "ENFP", "ENFJ", "INFP"],
      professional: ["INFP", "ENFP", "INFJ", "ENFJ"],
      challenging: ["ISTP", "ESTP", "INTP"],
    },

    careerPaths: {
      ideal: ["Education", "HR", "Coaching", "Counseling", "Training"],
      suitable: ["Nonprofit", "Healthcare", "Public Relations", "Management"],
      challenging: [
        "Highly technical roles",
        "Isolated work",
        "High conflict environments",
      ],
      industries: [
        "Education",
        "Healthcare",
        "Nonprofit",
        "Human Resources",
        "Training",
      ],
    },

    lifePath: {
      purpose: "To inspire and empower others to reach their full potential",
      values: ["Growth", "Harmony", "Community", "Compassion", "Leadership"],
      growthAreas: [
        "Self-care",
        "Setting boundaries",
        "Accepting criticism",
        "Realistic expectations",
      ],
      successFactors: [
        "People interaction",
        "Making impact",
        "Recognition",
        "Collaborative environment",
      ],
    },
  },

  ENFP: {
    code: "ENFP",
    name: "The Campaigner",
    tagline: "Enthusiastic Visionary Who Connects Ideas and People",
    description:
      "Enthusiastic, creative, and sociable. You're passionate about new ideas and helping people.",
    detailedDescription:
      "ENFPs are enthusiastic innovators who see possibilities everywhere. You combine creativity with people skills to inspire others and bring fresh perspectives to every situation.",
    strengths: [
      "Enthusiastic and energetic",
      "Excellent at connecting with people",
      "Creative and imaginative",
      "Flexible and spontaneous",
      "Strong communication and inspiration",
    ],
    weaknesses: [
      "Can be scattered and unfocused",
      "Struggle with routine and follow-through",
      "Overly idealistic",
      "May take criticism personally",
      "Difficulty with practical details",
    ],
    careers: [
      "Marketing Manager",
      "Creative Director",
      "Corporate Trainer",
      "Event Planner",
      "Content Creator",
    ],
    workStyle:
      "Thrive in dynamic creative environments. Excel at brainstorming and people roles. Need variety and flexibility.",
    learningStyle:
      "Learn through interaction and exploration. Excel at seeing connections. Prefer hands-on experiential learning.",
    stressManagement:
      "Process through social interaction and creative outlets. Manage stress with variety and new experiences. Need freedom.",

    ocean: {
      openness: "high",
      conscientiousness: "low",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "medium",
    },

    disc: {
      dominance: "low",
      influence: "high",
      steadiness: "low",
      compliance: "low",
      primaryStyle: "I",
    },

    relationships: {
      romantic: ["INTJ", "INFJ", "ENFP", "INFP"],
      friendship: ["INFJ", "ENFJ", "INFP", "ENTP"],
      professional: ["INTJ", "INFJ", "ENTJ", "ENFJ"],
      challenging: ["ISTJ", "ESTJ", "ISTP"],
    },

    careerPaths: {
      ideal: [
        "Marketing",
        "Creative Fields",
        "Training",
        "Entrepreneurship",
        "Media",
      ],
      suitable: ["Public Relations", "Counseling", "Sales", "Event Management"],
      challenging: ["Data Entry", "Accounting", "Routine Administration"],
      industries: [
        "Marketing",
        "Creative Industries",
        "Education",
        "Media",
        "Entrepreneurship",
      ],
    },

    lifePath: {
      purpose:
        "To inspire others and explore endless possibilities with enthusiasm",
      values: ["Freedom", "Creativity", "Connection", "Growth", "Authenticity"],
      growthAreas: [
        "Focus",
        "Follow-through",
        "Practical planning",
        "Attention to detail",
      ],
      successFactors: [
        "Creative freedom",
        "Variety",
        "People interaction",
        "Flexibility",
      ],
    },
  },

  ISTJ: {
    code: "ISTJ",
    name: "The Logistician",
    tagline: "Reliable Organizer Who Values Order and Tradition",
    description:
      "Practical, organized, and reliable. You excel at creating order and following through.",
    detailedDescription:
      "ISTJs are dependable guardians of tradition and order. You value structure, responsibility, and getting things done correctly. Your reliability makes you the backbone of many organizations.",
    strengths: [
      "Highly organized and systematic",
      "Reliable and responsible",
      "Strong attention to detail",
      "Practical and realistic",
      "Excellent follow-through",
    ],
    weaknesses: [
      "Can be rigid and inflexible",
      "Struggle with change",
      "May seem cold or impersonal",
      "Difficulty expressing emotions",
      "Can be overly critical",
    ],
    careers: [
      "Accountant",
      "Project Manager",
      "Administrator",
      "Quality Assurance",
      "Operations Manager",
    ],
    workStyle:
      "Excel in structured environments with clear procedures. Need organization and predictability. Strong at detail-oriented tasks.",
    learningStyle:
      "Learn through step-by-step instruction and practice. Prefer proven methods. Excel at memorization and structured learning.",
    stressManagement:
      "Manage through organization and routine. Need structure and predictability. Restore balance through practical activities.",

    ocean: {
      openness: "low",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low",
    },

    disc: {
      dominance: "low",
      influence: "low",
      steadiness: "high",
      compliance: "high",
      primaryStyle: "C",
    },

    relationships: {
      romantic: ["ESTP", "ESFP", "ISTJ", "ESTJ"],
      friendship: ["ISTJ", "ESTJ", "ISFJ", "INTJ"],
      professional: ["ESTJ", "ISTJ", "INTJ", "ENTJ"],
      challenging: ["ENFP", "ENTP", "INFP"],
    },

    careerPaths: {
      ideal: [
        "Accounting",
        "Administration",
        "Project Management",
        "Quality Control",
        "Operations",
      ],
      suitable: ["Finance", "Law", "Government", "Healthcare Administration"],
      challenging: ["Creative Arts", "Sales", "Entrepreneurship"],
      industries: [
        "Finance",
        "Government",
        "Healthcare",
        "Manufacturing",
        "Administration",
      ],
    },

    lifePath: {
      purpose:
        "To maintain order and ensure tasks are completed with excellence",
      values: ["Responsibility", "Order", "Tradition", "Loyalty", "Hard work"],
      growthAreas: [
        "Flexibility",
        "Emotional expression",
        "Openness to change",
        "Work-life balance",
      ],
      successFactors: [
        "Clear expectations",
        "Structured environment",
        "Recognition for reliability",
        "Detailed processes",
      ],
    },
  },

  ISFJ: {
    code: "ISFJ",
    name: "The Defender",
    tagline: "Caring Protector Who Nurtures and Supports Others",
    description:
      "Caring, dedicated, and detail-oriented. You protect and support those around you.",
    detailedDescription:
      "ISFJs are warm-hearted protectors who dedicate themselves to supporting others. You combine practical skills with deep caring, making you invaluable in nurturing roles.",
    strengths: [
      "Supportive and nurturing",
      "Highly reliable and responsible",
      "Excellent memory for details",
      "Patient and hard-working",
      "Strong sense of duty",
    ],
    weaknesses: [
      "Can be taken advantage of",
      "Struggle to say no",
      "Resist change",
      "May neglect own needs",
      "Can be overly sensitive",
    ],
    careers: [
      "Nurse",
      "Teacher",
      "Office Administrator",
      "Librarian",
      "Healthcare Professional",
    ],
    workStyle:
      "Excel in supportive helping roles. Need appreciation and stable environment. Strong at detailed caring work.",
    learningStyle:
      "Learn through hands-on practice and clear instruction. Prefer structured proven methods. Excel at practical application.",
    stressManagement:
      "Need harmony and stability. Manage stress through helping others and routine. Require appreciation and validation.",

    ocean: {
      openness: "low",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "medium",
    },

    disc: {
      dominance: "low",
      influence: "low",
      steadiness: "high",
      compliance: "high",
      primaryStyle: "S",
    },

    relationships: {
      romantic: ["ESTP", "ESFP", "ISFJ", "ESFJ"],
      friendship: ["ISFJ", "ESFJ", "ISTJ", "INFJ"],
      professional: ["ESTJ", "ISTJ", "ISFJ", "ESFJ"],
      challenging: ["ENTP", "ENFP", "ESTP"],
    },

    careerPaths: {
      ideal: [
        "Nursing",
        "Education",
        "Administration",
        "Healthcare",
        "Social Services",
      ],
      suitable: [
        "Customer Service",
        "Human Resources",
        "Library Science",
        "Office Management",
      ],
      challenging: ["Sales", "Entrepreneurship", "High-pressure environments"],
      industries: [
        "Healthcare",
        "Education",
        "Social Services",
        "Administration",
        "Nonprofit",
      ],
    },

    lifePath: {
      purpose:
        "To care for and support others with dedication and practical help",
      values: ["Service", "Loyalty", "Tradition", "Harmony", "Responsibility"],
      growthAreas: [
        "Assertiveness",
        "Setting boundaries",
        "Self-care",
        "Embracing change",
      ],
      successFactors: [
        "Appreciation",
        "Stable environment",
        "Clear roles",
        "Helping others",
      ],
    },
  },

  ESTJ: {
    code: "ESTJ",
    name: "The Executive",
    tagline: "Efficient Leader Who Implements Order and Structure",
    description:
      "Organized, practical, and decisive. You excel at managing people and processes.",
    detailedDescription:
      "ESTJs are efficient administrators who bring order to chaos. You value tradition, structure, and getting things done properly through established systems and clear expectations.",
    strengths: [
      "Excellent organizational skills",
      "Decisive and efficient",
      "Strong leadership abilities",
      "Practical and results-oriented",
      "Clear communication",
    ],
    weaknesses: [
      "Can be inflexible and rigid",
      "May be too blunt or insensitive",
      "Struggle with abstract concepts",
      "Resist change and new ideas",
      "Can be domineering",
    ],
    careers: [
      "Business Manager",
      "Administrator",
      "Operations Manager",
      "Military Officer",
      "Financial Manager",
    ],
    workStyle:
      "Excel in leadership and management roles. Need structure and clear hierarchy. Strong at implementing systems.",
    learningStyle:
      "Learn through practical application and proven methods. Prefer structured instruction. Excel at procedural learning.",
    stressManagement:
      "Manage through action and problem-solving. Need control and order. Restore balance through physical activity.",

    ocean: {
      openness: "low",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "low",
      neuroticism: "low",
    },

    disc: {
      dominance: "high",
      influence: "medium",
      steadiness: "medium",
      compliance: "high",
      primaryStyle: "D",
    },

    relationships: {
      romantic: ["ISTP", "ISFP", "ESTJ", "ISTJ"],
      friendship: ["ISTJ", "ESTJ", "ENTJ", "ESTP"],
      professional: ["ISTJ", "ESTJ", "ENTJ", "INTJ"],
      challenging: ["INFP", "ENFP", "INFJ"],
    },

    careerPaths: {
      ideal: [
        "Management",
        "Administration",
        "Operations",
        "Finance",
        "Military",
      ],
      suitable: [
        "Law Enforcement",
        "Government",
        "Business",
        "Healthcare Management",
      ],
      challenging: ["Creative Arts", "Counseling", "Flexible environments"],
      industries: [
        "Business",
        "Government",
        "Military",
        "Finance",
        "Manufacturing",
      ],
    },

    lifePath: {
      purpose:
        "To create efficient systems and lead others toward organizational success",
      values: ["Order", "Efficiency", "Tradition", "Authority", "Results"],
      growthAreas: [
        "Flexibility",
        "Emotional awareness",
        "Innovation",
        "Empathy",
      ],
      successFactors: [
        "Clear authority",
        "Structured environment",
        "Tangible results",
        "Leadership roles",
      ],
    },
  },

  ESFJ: {
    code: "ESFJ",
    name: "The Consul",
    tagline: "Warm Caregiver Who Creates Harmony and Community",
    description:
      "Warm, caring, and organized. You create harmony and help others feel valued.",
    detailedDescription:
      "ESFJs are social caregivers who excel at bringing people together. You create harmonious environments and ensure everyone feels valued and supported through your warmth and organization.",
    strengths: [
      "Warm and caring nature",
      "Excellent at building relationships",
      "Organized and responsible",
      "Strong sense of duty",
      "Natural at creating harmony",
    ],
    weaknesses: [
      "Overly concerned with others' opinions",
      "Can be too selfless",
      "Struggle with conflict",
      "Resist change",
      "May be overly controlling",
    ],
    careers: [
      "Event Coordinator",
      "HR Specialist",
      "Teacher",
      "Nurse",
      "Office Manager",
    ],
    workStyle:
      "Excel in people-focused service roles. Need appreciation and harmony. Strong at coordinating and organizing.",
    learningStyle:
      "Learn through group activities and social interaction. Prefer hands-on structured learning. Excel at people-related skills.",
    stressManagement:
      "Process through social support. Manage stress by helping others. Need harmony and appreciation.",

    ocean: {
      openness: "low",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "medium",
    },

    disc: {
      dominance: "low",
      influence: "high",
      steadiness: "high",
      compliance: "medium",
      primaryStyle: "I",
    },

    relationships: {
      romantic: ["ISTP", "ISFP", "ESFJ", "ISFJ"],
      friendship: ["ISFJ", "ESFJ", "ENFJ", "ESFP"],
      professional: ["ISTJ", "ESTJ", "ESFJ", "ISFJ"],
      challenging: ["INTP", "INTJ", "ENTP"],
    },

    careerPaths: {
      ideal: [
        "Event Planning",
        "Human Resources",
        "Education",
        "Healthcare",
        "Customer Service",
      ],
      suitable: [
        "Hospitality",
        "Nonprofit",
        "Administration",
        "Public Relations",
      ],
      challenging: [
        "Isolated work",
        "High conflict roles",
        "Abstract analysis",
      ],
      industries: [
        "Healthcare",
        "Education",
        "Hospitality",
        "Human Resources",
        "Events",
      ],
    },

    lifePath: {
      purpose:
        "To create harmony and support community through caring and organization",
      values: ["Harmony", "Service", "Tradition", "Community", "Loyalty"],
      growthAreas: [
        "Independence",
        "Handling criticism",
        "Flexibility",
        "Self-focus",
      ],
      successFactors: [
        "Social interaction",
        "Appreciation",
        "Helping others",
        "Stable environment",
      ],
    },
  },

  ISTP: {
    code: "ISTP",
    name: "The Virtuoso",
    tagline: "Practical Problem-Solver Who Masters Tools and Systems",
    description:
      "Bold, practical, and hands-on. You excel at understanding how things work.",
    detailedDescription:
      "ISTPs are practical experimenters who excel at hands-on problem-solving. You understand how things work through direct experience and can quickly adapt to solve practical challenges.",
    strengths: [
      "Excellent hands-on problem-solving",
      "Practical and realistic",
      "Calm under pressure",
      "Flexible and adaptable",
      "Strong technical skills",
    ],
    weaknesses: [
      "Can be insensitive to feelings",
      "Struggle with long-term planning",
      "May seem detached or private",
      "Resist rules and structure",
      "Can be impulsive",
    ],
    careers: [
      "Engineer",
      "Mechanic",
      "Software Developer",
      "Pilot",
      "Forensic Scientist",
    ],
    workStyle:
      "Excel in hands-on technical work. Need independence and flexibility. Strong at troubleshooting and practical solutions.",
    learningStyle:
      "Learn by doing and experimenting. Prefer hands-on practical learning. Excel at understanding systems and mechanics.",
    stressManagement:
      "Need physical activity and independence. Manage stress through action. Require space and freedom.",

    ocean: {
      openness: "medium",
      conscientiousness: "low",
      extraversion: "low",
      agreeableness: "low",
      neuroticism: "low",
    },

    disc: {
      dominance: "medium",
      influence: "low",
      steadiness: "low",
      compliance: "high",
      primaryStyle: "C",
    },

    relationships: {
      romantic: ["ESTJ", "ESFJ", "ISTP", "ESTP"],
      friendship: ["ESTP", "ISTP", "ISTJ", "ENTP"],
      professional: ["ESTJ", "ISTJ", "ISTP", "ENTJ"],
      challenging: ["ENFJ", "INFJ", "ENFP"],
    },

    careerPaths: {
      ideal: [
        "Engineering",
        "Mechanics",
        "Technology",
        "Forensics",
        "Aviation",
      ],
      suitable: ["Construction", "Manufacturing", "IT", "Emergency Services"],
      challenging: ["Counseling", "Teaching", "Sales", "Administrative roles"],
      industries: [
        "Engineering",
        "Technology",
        "Manufacturing",
        "Aviation",
        "Skilled Trades",
      ],
    },

    lifePath: {
      purpose:
        "To understand and master practical systems through hands-on experience",
      values: ["Freedom", "Practicality", "Logic", "Action", "Independence"],
      growthAreas: [
        "Emotional expression",
        "Long-term planning",
        "Commitment",
        "Social skills",
      ],
      successFactors: [
        "Independence",
        "Hands-on work",
        "Problem-solving",
        "Flexibility",
      ],
    },
  },

  ISFP: {
    code: "ISFP",
    name: "The Adventurer",
    tagline: "Artistic Soul Who Lives Authentically in the Moment",
    description:
      "Flexible, artistic, and sensitive. You appreciate beauty and live in the moment.",
    detailedDescription:
      "ISFPs are gentle artists who experience life through their senses. You appreciate beauty in all forms and express yourself through creative and aesthetic pursuits while staying true to your values.",
    strengths: [
      "Artistic and creative",
      "Sensitive to beauty and aesthetics",
      "Flexible and spontaneous",
      "Warm and caring",
      "Live authentically",
    ],
    weaknesses: [
      "Overly sensitive to criticism",
      "Avoid conflict",
      "Struggle with planning",
      "Can be unpredictable",
      "Difficulty with structure",
    ],
    careers: [
      "Graphic Designer",
      "Artist",
      "Chef",
      "Photographer",
      "Interior Designer",
    ],
    workStyle:
      "Excel in creative flexible environments. Need aesthetic freedom. Strong at hands-on creative work.",
    learningStyle:
      "Learn through experience and aesthetic exploration. Prefer hands-on creative learning. Excel at visual and kinesthetic learning.",
    stressManagement:
      "Need creative outlets and nature. Manage stress through artistic expression. Require personal space.",

    ocean: {
      openness: "high",
      conscientiousness: "low",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "medium",
    },

    disc: {
      dominance: "low",
      influence: "low",
      steadiness: "high",
      compliance: "low",
      primaryStyle: "S",
    },

    relationships: {
      romantic: ["ENTJ", "ENFJ", "ESFJ", "ISFP"],
      friendship: ["ISFP", "ESFP", "INFP", "ENFP"],
      professional: ["ENFJ", "ESFJ", "ISFP", "ESFP"],
      challenging: ["ESTJ", "ISTJ", "ENTJ"],
    },

    careerPaths: {
      ideal: ["Design", "Arts", "Culinary", "Photography", "Fashion"],
      suitable: ["Healthcare", "Education", "Crafts", "Entertainment"],
      challenging: ["Management", "Finance", "Law", "Corporate environments"],
      industries: [
        "Creative Arts",
        "Design",
        "Culinary Arts",
        "Fashion",
        "Entertainment",
      ],
    },

    lifePath: {
      purpose: "To experience and create beauty while living authentically",
      values: ["Authenticity", "Beauty", "Freedom", "Creativity", "Harmony"],
      growthAreas: [
        "Planning",
        "Assertiveness",
        "Handling criticism",
        "Structure",
      ],
      successFactors: [
        "Creative freedom",
        "Aesthetic work",
        "Flexibility",
        "Values alignment",
      ],
    },
  },

  ESTP: {
    code: "ESTP",
    name: "The Entrepreneur",
    tagline: "Energetic Risk-Taker Who Thrives on Action",
    description:
      "Energetic, perceptive, and action-oriented. You thrive on excitement and solving problems.",
    detailedDescription:
      "ESTPs are energetic doers who live for excitement and action. You think on your feet, take calculated risks, and excel at turning challenges into opportunities through quick thinking.",
    strengths: [
      "Excellent at crisis management",
      "Energetic and action-oriented",
      "Perceptive and observant",
      "Persuasive and charismatic",
      "Adaptable and resourceful",
    ],
    weaknesses: [
      "Can be impulsive and risky",
      "Struggle with long-term planning",
      "May seem insensitive",
      "Resist structure and rules",
      "Can be competitive to a fault",
    ],
    careers: [
      "Sales Manager",
      "Entrepreneur",
      "Marketing Manager",
      "Paramedic",
      "Real Estate Agent",
    ],
    workStyle:
      "Excel in fast-paced action environments. Need variety and excitement. Strong at negotiations and quick decisions.",
    learningStyle:
      "Learn through experience and action. Prefer hands-on immediate application. Excel in dynamic environments.",
    stressManagement:
      "Need physical activity and excitement. Manage stress through action. Require stimulation and variety.",

    ocean: {
      openness: "medium",
      conscientiousness: "low",
      extraversion: "high",
      agreeableness: "low",
      neuroticism: "low",
    },

    disc: {
      dominance: "high",
      influence: "high",
      steadiness: "low",
      compliance: "low",
      primaryStyle: "D",
    },

    relationships: {
      romantic: ["ISTJ", "ISFJ", "ESTP", "ISTP"],
      friendship: ["ESTP", "ISTP", "ESFP", "ENTP"],
      professional: ["ESTJ", "ISTJ", "ESTP", "ENTJ"],
      challenging: ["INFJ", "INFP", "ISFP"],
    },

    careerPaths: {
      ideal: [
        "Sales",
        "Entrepreneurship",
        "Marketing",
        "Emergency Services",
        "Real Estate",
      ],
      suitable: ["Business", "Sports", "Entertainment", "Hospitality"],
      challenging: ["Research", "Administration", "Routine work"],
      industries: [
        "Sales",
        "Marketing",
        "Entrepreneurship",
        "Emergency Services",
        "Real Estate",
      ],
    },

    lifePath: {
      purpose:
        "To seize opportunities and solve immediate challenges through action",
      values: ["Action", "Freedom", "Excitement", "Practicality", "Results"],
      growthAreas: [
        "Long-term planning",
        "Emotional sensitivity",
        "Patience",
        "Structure",
      ],
      successFactors: ["Variety", "Action", "Competition", "Immediate results"],
    },
  },

  ESFP: {
    code: "ESFP",
    name: "The Entertainer",
    tagline: "Spontaneous Performer Who Brings Joy to Others",
    description:
      "Outgoing, spontaneous, and enthusiastic. You love entertaining and helping others.",
    detailedDescription:
      "ESFPs are spontaneous entertainers who bring energy and joy wherever they go. You live in the moment, love connecting with people, and excel at creating memorable experiences.",
    strengths: [
      "Enthusiastic and energetic",
      "Excellent people skills",
      "Spontaneous and fun-loving",
      "Practical and observant",
      "Natural entertainers",
    ],
    weaknesses: [
      "Can be impulsive",
      "Struggle with long-term planning",
      "Avoid conflict and criticism",
      "May be overly focused on appearance",
      "Difficulty with routine",
    ],
    careers: [
      "Event Planner",
      "Performer",
      "Sales Representative",
      "Flight Attendant",
      "Fitness Trainer",
    ],
    workStyle:
      "Excel in people-focused dynamic roles. Need social interaction and variety. Strong at entertaining and customer service.",
    learningStyle:
      "Learn through social interaction and hands-on experience. Prefer group activities. Excel at experiential learning.",
    stressManagement:
      "Need social connection and fun activities. Manage stress through entertainment. Require positive feedback.",

    ocean: {
      openness: "medium",
      conscientiousness: "low",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low",
    },

    disc: {
      dominance: "low",
      influence: "high",
      steadiness: "low",
      compliance: "low",
      primaryStyle: "I",
    },

    relationships: {
      romantic: ["ISTJ", "ISFJ", "ESFP", "ISFP"],
      friendship: ["ESFP", "ISFP", "ESTP", "ENFP"],
      professional: ["ISTJ", "ESTJ", "ESFJ", "ESFP"],
      challenging: ["INTJ", "INTP", "ENTJ"],
    },

    careerPaths: {
      ideal: [
        "Event Planning",
        "Entertainment",
        "Sales",
        "Hospitality",
        "Fitness",
      ],
      suitable: ["Customer Service", "Healthcare", "Education", "Tourism"],
      challenging: ["Research", "Analysis", "Isolated work"],
      industries: [
        "Entertainment",
        "Hospitality",
        "Events",
        "Sales",
        "Fitness",
      ],
    },

    lifePath: {
      purpose: "To bring joy and create memorable experiences for others",
      values: ["Fun", "Connection", "Freedom", "Spontaneity", "Aesthetics"],
      growthAreas: [
        "Planning",
        "Focus",
        "Handling criticism",
        "Financial management",
      ],
      successFactors: [
        "Social interaction",
        "Variety",
        "Entertainment",
        "Recognition",
      ],
    },
  },
};

// Helper function to get personality data by type code
export function getPersonalityType(code: string): PersonalityType | null {
  return personalityTypes[code] || null;
}

// Helper function to get all personality types
export function getAllPersonalityTypes(): PersonalityType[] {
  return Object.values(personalityTypes);
}
