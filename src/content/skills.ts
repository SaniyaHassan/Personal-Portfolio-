/**
 * Skills — canonical data shared by every Skills renderer (Constellation now,
 * Floral garden in a later milestone). Ids are stable; label/description/related
 * drive display. Proficiency caps at 3 so node sizing stays legible.
 *
 * Selection is intentionally a subset of the CV's Technical Skills block — the
 * full list (15 items) would crowd the constellation past readability. We keep
 * the skills that actually back Saniya's projects.
 */
export type SkillCategory = "language" | "core" | "backend" | "tool";

export type Skill = {
  /** Stable id — used as SVG node key and to reference `related`. */
  id: string;
  /** Display label (e.g. "C++"). */
  label: string;
  category: SkillCategory;
  /** 1 = familiar, 2 = comfortable, 3 = strong. Drives node size. */
  proficiency: 1 | 2 | 3;
  /** One-sentence context shown on hover / focus. */
  description: string;
  /** Ids of related skills — drives the edges drawn between nodes. */
  related: readonly string[];
};

export const categoryLabel: Record<SkillCategory, string> = {
  language: "Languages",
  core: "Core CS",
  backend: "Backend & Web",
  tool: "Tools & Platforms",
};

export const skills: readonly Skill[] = [
  {
    id: "cpp",
    label: "C++",
    category: "language",
    proficiency: 3,
    description:
      "Primary language for DSA and the Academic Search Engine. Custom indexes, tries, ranking.",
    related: ["dsa", "system-design"],
  },
  {
    id: "python",
    label: "Python",
    category: "language",
    proficiency: 3,
    description:
      "Backend services and data tooling; FastAPI is the main production surface.",
    related: ["fastapi", "dsa"],
  },
  {
    id: "java",
    label: "Java",
    category: "language",
    proficiency: 2,
    description: "OOP coursework and small JVM utilities.",
    related: ["oop"],
  },
  {
    id: "dsa",
    label: "DSA",
    category: "core",
    proficiency: 3,
    description:
      "Data structures and algorithms. Tries, graphs, hashing, used every day.",
    related: ["cpp", "python", "system-design"],
  },
  {
    id: "system-design",
    label: "System Design",
    category: "core",
    proficiency: 2,
    description:
      "Decomposition, API contracts, storage trade-offs. Practiced in VEMS and the search engine.",
    related: ["dsa", "fastapi", "azure"],
  },
  {
    id: "oop",
    label: "OOP",
    category: "core",
    proficiency: 3,
    description: "Interfaces, inheritance, composition. Applied cross-language.",
    related: ["java", "cpp"],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    category: "backend",
    proficiency: 3,
    description:
      "Typed Python APIs with automatic OpenAPI docs; backbone of VEMS.",
    related: ["python", "react", "system-design"],
  },
  {
    id: "react",
    label: "React",
    category: "backend",
    proficiency: 2,
    description:
      "Component-driven frontends. VEMS dashboard and this portfolio.",
    related: ["fastapi"],
  },
  {
    id: "git",
    label: "Git",
    category: "tool",
    proficiency: 3,
    description:
      "Branching, rebasing, worktrees. Parallel workflows depend on it.",
    related: ["linux"],
  },
  {
    id: "linux",
    label: "Linux",
    category: "tool",
    proficiency: 2,
    description:
      "Shell workflows and deployment targets; Azure VM host for the search engine.",
    related: ["git", "azure"],
  },
  {
    id: "azure",
    label: "Azure",
    category: "tool",
    proficiency: 2,
    description:
      "Cloud host for the Academic Search Engine. VM provisioning and deployment.",
    related: ["linux", "system-design"],
  },
] as const;
