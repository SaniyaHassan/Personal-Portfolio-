import type { Metadata } from "next";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { lunacy } from "@/content/case-studies/lunacy";

export const metadata: Metadata = {
  title: "LUNACY — Saniya Hassan",
  description: lunacy.subtitle,
};

/**
 * `/projects/lunacy` — case study deep-dive for LUNACY (NASA NeoWs
 * 3D visualization). Server Component composing the shared template
 * with the typed content module.
 */
export default function LunacyCaseStudyPage() {
  return <CaseStudyPage study={lunacy} />;
}
