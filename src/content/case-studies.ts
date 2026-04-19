/**
 * Typed case-study content for /projects/[slug] deep-dive routes.
 * M5 (LUNACY) and M6 (Academic Search Engine) both consume this module.
 * VEMS or future projects can be added without changing the template.
 */

export type CaseStudySlug = "lunacy" | "academic-search-engine" | "vems";

export type StatCard = {
  label: string;
  value: string;
  note?: string;
};

export type DecisionCard = {
  decision: string;
  alternative: string;
  why: string;
};

export type LinkEntry = {
  label: string;
  href: string;
  icon?: "github" | "external" | "paper";
};

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  subtitle: string;
  role: string;
  yearRange: string;
  stack: readonly string[];

  /** 2–3 sentence plain-language problem statement. */
  problem: string;

  /** Architecture narrative — a few paragraphs. */
  whatIBuilt: readonly string[];

  /** Architecture diagram caption. If svgId is set, the SVG is embedded elsewhere. */
  diagram?: {
    svgId?: string;
    alt: string;
    caption: string;
  };

  /** 3–5 decisions worth calling out. */
  decisions: readonly DecisionCard[];

  /** Outcome metrics — animated scramble numbers in the UI. */
  outcomes: readonly StatCard[];

  /** External links. */
  links: readonly LinkEntry[];
};
