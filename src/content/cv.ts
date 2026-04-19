/**
 * Canonical CV content for the typed site render.
 *
 * This module mirrors the LaTeX source at cv/saniya_hassan_cv.tex. Keep the
 * two in sync when editing. The LaTeX compiles to public/cv.pdf; this module
 * drives the inline /cv page.
 */

export type CvHeader = {
  name: string;
  headline: string;
  contactLine: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    portfolio?: string;
  };
};

export type CvEducation = {
  institution: string;
  degree: string;
  detail?: string;
  dates: string;
};

export type CvSkillGroup = {
  label: string;
  items: readonly string[];
};

export type CvProject = {
  title: string;
  url?: string;
  stack: readonly string[];
  bullets: readonly string[];
};

export type CvExperience = {
  role: string;
  organization: string;
  dates: string;
  employmentType?: string;
  bullets: readonly string[];
};

export type CvLeadershipRole = {
  title: string;
  bullets?: readonly string[];
};

export type Cv = {
  header: CvHeader;
  profile: string;
  profileHighlight: string;
  education: readonly CvEducation[];
  skills: readonly CvSkillGroup[];
  experience: readonly CvExperience[];
  projects: readonly CvProject[];
  certifications: readonly string[];
  achievements: readonly string[];
  leadership: readonly CvLeadershipRole[];
  lastUpdated: string;
};

export const cv: Cv = {
  header: {
    name: "Saniya Hassan",
    headline: "SWE, NUST",
    contactLine: "+92 342 6525197",
    email: "saniyahassan26032006@gmail.com",
    phone: "+92 342 6525197",
    links: {
      github: "https://github.com/SaniyaHassan",
      linkedin: "https://www.linkedin.com/in/saniya-hassan/",
      portfolio: "https://web-tau-kohl-16.vercel.app/",
    },
  },
  profile:
    "Second-year Software Engineering student at NUST with a strong foundation in Data Structures, Algorithms, and backend systems, and a track record of academic excellence as a Board Topper. Experienced in building scalable backend systems, full-stack applications, and data-driven projects spanning academic search engines, space-tech visualization, and organizational management tools.",
  profileHighlight:
    "Seeking a Summer 2026 paid internship in backend development, system design, or software engineering where I can contribute to production-grade systems and deliver measurable impact.",
  education: [
    {
      institution: "National University of Sciences and Technology (NUST)",
      degree: "BS Software Engineering",
      detail: "CGPA: 3.56",
      dates: "2024 – 2028",
    },
    {
      institution: "Superior College Bahawalpur",
      degree: "FSc Pre-Engineering, Board Topper (95%)",
      dates: "2022 – 2024",
    },
    {
      institution: "Umm-ul-Qura Public School, Bahawalpur",
      degree: "Matriculation, 99%",
      dates: "2020 – 2022",
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["C++", "Java", "Python", "C#", "HTML", "CSS"],
    },
    {
      label: "Frameworks & Libraries",
      items: ["FastAPI", "React", "REST APIs"],
    },
    {
      label: "Databases",
      items: ["MySQL", "Relational Database Design"],
    },
    {
      label: "Core Computer Science",
      items: [
        "Data Structures and Algorithms",
        "System Design",
        "Object-Oriented Programming",
        "Database Systems",
      ],
    },
    {
      label: "Tools & Platforms",
      items: [
        "Git",
        "GitHub",
        "Linux",
        "Azure Virtual Machines",
        "Godot Engine",
        "Canva",
        "LaTeX",
      ],
    },
    {
      label: "Languages (Spoken)",
      items: ["Urdu (Native)", "English (Fluent)"],
    },
  ],
  experience: [
    {
      role: "Freelance Image Researcher & Content Formatter",
      organization: "Private Client, Remote",
      employmentType: "Part-time",
      dates: "Oct 2025 – Feb 2026",
      bullets: [
        "Delivered ~250 article-ready image sets across five months, averaging ~50 assets per month on topics ranging from travel and lifestyle to sports and history.",
        "Sourced relevant imagery from Pexels, Pixabay, and Wikimedia Commons, ensuring each selection aligned with the article's topic and client-specified format (image, header, and descriptive caption).",
        "Formatted and resized assets in Canva to meet the client's standardized template, consistently meeting deadlines and maintaining deliverable quality across diverse subject areas.",
      ],
    },
  ],
  projects: [
    {
      title: "LUNACY: 3D Solar System & Planetary Visualization System",
      url: "https://github.com/SE-15A/Lunacy",
      stack: [
        "Godot Engine",
        "C#",
        "Solar System Open Data API",
        "ESA NEO API",
      ],
      bullets: [
        "Built a 3D interactive simulator rendering 30,000+ planetary bodies with real-scale orbital mechanics, developed for the NASA Space Apps Challenge 2025.",
        "Integrated live astronomical data from the Solar System Open Data API and ESA NEO API to compute accurate orbital trajectories.",
        "Engineered a free-fly camera system and efficient rendering pipeline to handle large-scale celestial data in real time.",
      ],
    },
    {
      title: "Academic Search Engine (DSA-Based System)",
      url: "https://github.com/Abdullah2240/DSA-project-search-engine",
      stack: ["C++", "Custom Indexing", "Trie Autocomplete", "Azure Deployment"],
      bullets: [
        "Built a large-scale academic search engine indexing 50,000+ documents with custom forward and inverted indexing techniques.",
        "Implemented Trie-based autocomplete and a multi-factor document ranking algorithm, achieving sub-second query response times.",
        "Optimized memory usage and deployed the backend on a Microsoft Azure virtual machine.",
      ],
    },
    {
      title: "Visitor & Employee Management System",
      url: "https://github.com/Asim-Shoaib/Visitor-Management-System",
      stack: ["FastAPI", "React (Vite)", "MySQL"],
      bullets: [
        "Designed and developed a secure full-stack system reflecting real organizational workflows.",
        "Implemented visitor logging, employee attendance, and salary computation modules.",
        "Added role-based access control, audit logs, and report generation features.",
      ],
    },
    {
      title: "Learning Sphere: Java OOP Application",
      url: "https://www.linkedin.com/posts/fatima-zunaira-8a25a9313_excited-to-share-our-end-semester-project-activity-7337922889926561793-OWai",
      stack: ["Java", "Object-Oriented Design"],
      bullets: [
        "Developed a desktop application demonstrating core OOP principles including inheritance, polymorphism, and encapsulation.",
      ],
    },
  ],
  certifications: [
    "NASA International Space Apps Challenge 2025, Galactic Problem Solver",
    "Introduction to Git and GitHub (Coursera)",
    "Google Crash Course on Python (Coursera)",
    "Using Python to Interact with the Operating System (Google, Coursera)",
    "AI for Everyone (Coursera)",
  ],
  achievements: [
    "NASA Space Apps Challenge 2025, Global Nominee. Selected among the top teams worldwide from over 15,000 participating teams across 160+ countries for the LUNACY project.",
    "Board Topper in FSc Pre-Engineering (95%) and High Distinction in Matriculation (99%).",
  ],
  leadership: [
    {
      title: "Publications Executive, IEEE NUST Student Chapter",
      bullets: [
        "Coordinated the chapter's technical publication pipeline across Fall 2025. Reviewed and shipped several newsletters.",
      ],
    },
  ],
  lastUpdated: "2026-04-19",
};
