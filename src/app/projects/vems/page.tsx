import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { vems } from "@/content/case-studies/vems";

export const metadata: Metadata = {
  title: "Visitor & Employee Management System — Saniya Hassan",
  description: vems.subtitle,
};

export default function VemsPage() {
  return <CaseStudyPage study={vems} />;
}
