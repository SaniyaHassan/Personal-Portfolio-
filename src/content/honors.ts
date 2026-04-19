export type HonorKind = "achievement" | "certification" | "leadership";

export type Honor = {
  id: string;
  kind: HonorKind;
  title: string;
  detail?: string;
  issuer?: string;
  year?: string;
  bullets?: readonly string[];
};

export const honors: readonly Honor[] = [
  // ─── Achievements ──────────────────────────────────────────────
  {
    id: "nasa-space-apps-2025",
    kind: "achievement",
    title: "NASA Space Apps Hackathon: Global Nominee",
    detail: "Top teams worldwide",
    year: "2025",
  },
  {
    id: "fsc-board-topper",
    kind: "achievement",
    title: "Board Topper, FSc Pre-Engineering",
    detail: "95%",
  },
  {
    id: "matric-high-distinction",
    kind: "achievement",
    title: "High Distinction, Matriculation",
    detail: "99%",
  },

  // ─── Certifications ────────────────────────────────────────────
  {
    id: "cert-nasa-galactic-problem-solver",
    kind: "certification",
    title: "Galactic Problem Solver",
    issuer: "NASA International Space Apps Challenge 2025",
  },
  {
    id: "cert-git-github",
    kind: "certification",
    title: "Introduction to Git and GitHub",
    issuer: "Coursera",
  },
  {
    id: "cert-google-python-crash",
    kind: "certification",
    title: "Google Crash Course on Python",
    issuer: "Coursera",
  },
  {
    id: "cert-python-os",
    kind: "certification",
    title: "Using Python to Interact with the Operating System",
    issuer: "Google (Coursera)",
  },
  {
    id: "cert-ai-for-everyone",
    kind: "certification",
    title: "AI for Everyone",
    issuer: "Coursera",
  },

  // ─── Leadership ────────────────────────────────────────────────
  {
    id: "ieee-nust-publications-executive",
    kind: "leadership",
    title: "Publications Executive",
    issuer: "IEEE NUST Student Chapter",
    year: "Current",
    // TODO(saniya): real accomplishments pending — replace placeholders below.
    bullets: [
      "Coordinated publication pipeline for chapter newsletter",
      "Edited and published articles across the chapter's channels",
    ],
  },
];
