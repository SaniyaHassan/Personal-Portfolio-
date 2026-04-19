export const profile = {
  name: "Saniya Hassan",
  tagline: "Software Engineer",
  hero: {
    openingLine: "I'm Saniya.",
    buildsLead: "I build",
    rotatingWords: ["backend systems", "search engines", "space tools"] as const,
    intro:
      "Software engineering student at NUST Islamabad. I like building things from the ground up: a trie-indexed search engine over 5K papers, a 3D solar-system visualizer for NASA Space Apps, a full-stack visitor management platform. Looking for a summer 2026 internship.",
    primaryCta: { label: "See projects", href: "#projects" },
    secondaryCta: { label: "View CV", href: "/cv" },
    locationLabel: "NUST · NASA Space Apps 2025 Global Nominee",
  },
  email: "saniyahassan26032006@gmail.com",
  links: {
    github: "https://github.com/SaniyaHassan" as string,
    linkedin: "https://www.linkedin.com/in/saniya-hassan/" as string,
  },
} as const;
