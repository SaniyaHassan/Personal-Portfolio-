export type Project = {
  slug: string | null;
  title: string;
  subtitle: string;
  stack: readonly string[];
  pitch: string;
  metric: string;
  metricLabel: string;
  yearRange?: string;
  /** Optional direct link (GitHub, live demo, post). Case-study routes still
   *  take priority when slug is set; this is used when slug is null. */
  externalHref?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "lunacy",
    title: "LUNACY",
    subtitle: "3D Solar System and near-Earth asteroid visualizer",
    stack: ["Godot 4", "C#", "Solar System Open Data", "ESA NEO API"],
    pitch:
      "Team build for NASA Space Apps 2025. A real-scale 3D simulator for planetary bodies and near-Earth asteroids, with a free-fly camera and live orbital data feeding into the scene.",
    metric: "30,000+ bodies",
    metricLabel: "Rendered in real scale",
    yearRange: "2025",
  },
  {
    slug: "academic-search-engine",
    title: "Academic Search Engine",
    subtitle: "Trie-indexed DSA build over 5K research papers",
    stack: ["C++17", "CMake", "Trie / Inverted Index", "BM25", "React"],
    pitch:
      "Three-tier search engine. Python does ingestion, C++ does retrieval, React does the UI. Custom Trie, inverted index, and BM25 ranking. Sub-100 ms query latency on 5,000 papers.",
    metric: "< 100 ms",
    metricLabel: "Query latency (p95)",
    yearRange: "2024 – 2025",
  },
  {
    slug: "vems",
    title: "Visitor & Employee Management System",
    subtitle: "Full-stack operations platform with JWT + QR workflows",
    stack: ["FastAPI", "React · Vite", "MySQL", "JWT", "QR"],
    pitch:
      "A production-ready platform for visitor logging, QR-code check-ins, real-time attendance, salary computation, audit trails, and role-based access.",
    metric: "13 tables · 10 APIs",
    metricLabel: "Production-ready v1.0",
    yearRange: "2025",
  },
  {
    slug: "learning-sphere",
    title: "Learning Sphere",
    subtitle: "Java OOP desktop application",
    stack: ["Java", "OOP"],
    pitch:
      "End-semester OOP project. A desktop learning app that exercises inheritance, polymorphism, and encapsulation across a real feature surface.",
    metric: "Demo on LinkedIn",
    metricLabel: "Classroom project",
    yearRange: "2025",
  },
] as const;
