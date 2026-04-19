export type JourneyEntry = {
  id: string;
  kind: "experience" | "education";
  title: string;
  organization: string;
  location?: string;
  dates: string;
  detail?: string;
  highlight?: string;
};

export type About = {
  paragraphs: readonly string[];
  closing: string;
};

export const about: About = {
  paragraphs: [
    "Second-year Software Engineering student at NUST Islamabad. I build backend systems. A Trie-indexed academic search engine deployed on Azure, a 3D NASA visualizer that got named a Space Apps Global Nominee, a full-stack visitor platform with QR workflows.",
    "I care about system design, algorithmic correctness, and keeping things quietly fast. I pick the language per problem, not per habit. C++ for hot retrieval loops, Python for ingestion and tooling, TypeScript for anything I want typed end to end.",
    "Outside the terminal: IEEE NUST Publications Executive, former FSc board topper, and an unreasonable interest in space-tech.",
  ],
  closing:
    "Currently looking for backend / systems / space-tech internships.",
} as const;

export const journey: readonly JourneyEntry[] = [
  // Experience is an intentionally empty slot in v1.
  // New entries will be prepended here once provided.
  {
    id: "nust-bs-se",
    kind: "education",
    title: "BS Software Engineering",
    organization: "National University of Sciences and Technology (NUST)",
    location: "Islamabad, Pakistan",
    dates: "2024 – 2028",
    detail: "Current student. Coursework: DSA, OOP, DB Systems, Discrete Math.",
    highlight: "CGPA 3.56",
  },
  {
    id: "superior-fsc",
    kind: "education",
    title: "FSc Pre-Engineering",
    organization: "Superior College",
    location: "Bahawalpur, Pakistan",
    dates: "2022 – 2024",
    highlight: "Board Topper (95%)",
  },
  {
    id: "ummul-qura-matric",
    kind: "education",
    title: "Matriculation",
    organization: "Umm-ul-Qura Public School",
    location: "Bahawalpur, Pakistan",
    dates: "2020 – 2022",
    highlight: "99%",
  },
] as const;
