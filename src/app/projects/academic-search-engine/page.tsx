import type { Metadata } from "next";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { academicSearchEngine } from "@/content/case-studies/academic-search-engine";

export const metadata: Metadata = {
  title: "Academic Search Engine — Saniya Hassan",
  description:
    "Case study: a from-scratch C++ search engine with custom forward and inverted indexes, Trie-backed autocomplete, and a multi-factor ranker deployed on Azure.",
};

/**
 * `/projects/academic-search-engine` — deep-dive case study.
 *
 * Server Component. Composes the shared `CaseStudyPage` template with
 * the typed content module, so the layout stays consistent across all
 * case-study routes.
 */
export default function AcademicSearchEnginePage() {
  return <CaseStudyPage study={academicSearchEngine} />;
}
