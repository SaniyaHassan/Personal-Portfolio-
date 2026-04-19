import type { CaseStudy } from "@/content/case-studies";

/**
 * LUNACY — 3D Solar System & near-Earth asteroid visualizer built for
 * NASA Space Apps 2025 (team: Luna-7 / SE-15A). Godot Engine + C#, with
 * live planetary and asteroid data from open astronomical APIs.
 */
export const lunacy: CaseStudy = {
  slug: "lunacy",
  title: "LUNACY: 3D Solar System & Planetary Visualization System",
  subtitle:
    "A real-scale, interactive 3D simulator for the Solar System and near-Earth asteroids. Team project for NASA Space Apps 2025, selected as a Global Nominee.",
  role: "Team project, Luna-7 / SE-15A",
  yearRange: "2025",
  stack: [
    "Godot Engine 4",
    "C#",
    "Solar System Open Data API",
    "ESA NEO API",
  ],
  problem:
    "Near-Earth objects are tracked continuously by NASA and ESA, but the public feeds land as dense JSON. Close-approach dates, orbital elements, miss distances: most people will never parse that. Awareness of what's zipping past Earth gets lost in tables. LUNACY exists to make the data legible. A live, free-fly 3D scene where every planet and asteroid sits on its real orbit, at real scale.",
  whatIBuilt: [
    "A scene-based Godot 4 structure with C# scripts rendering all eight planets with accurate orbital mechanics, alongside 30,000+ individual bodies (planetary satellites plus the near-Earth asteroid catalog). A free-fly camera with WASD plus mouse plus shift-to-sprint lets you travel anywhere in the system without loading screens.",
    "Two live data feeds run the scene. The Solar System Open Data API for planetary orbital elements, and the ESA NEO API for asteroid trajectories and miss distances. Both get normalized into a common schema the renderer can consume, with a caching layer so the scene stays usable offline during demos.",
    "The rendering pipeline is tuned for large-scale celestial data in real time. Pooled meshes for small bodies, LOD on planets, and per-orbit trajectory integration so scrubbing the time slider evaluates motion smoothly instead of snapping between samples.",
  ],
  diagram: {
    svgId: "lunacy-arch",
    alt: "Architecture: Solar System Open Data + ESA NEO APIs feed a normalization layer that writes into a Godot scene graph with a free-fly camera.",
    caption:
      "Data flow: open astronomical APIs, normalization layer, Godot scene graph.",
  },
  decisions: [
    {
      decision: "Godot 4 + C# over Unity or Three.js",
      alternative: "Three.js in the browser",
      why: "Godot gave the team faster iteration on physics and a single executable that jurors could run offline. Browser WebGL would have hit memory ceilings long before we reached 30,000 bodies.",
    },
    {
      decision: "Two upstream APIs instead of one",
      alternative: "Scrape everything from a single NASA feed",
      why: "The Solar System Open Data API has better planetary orbital elements. ESA NEO is authoritative on asteroid trajectories. Pulling each from its best source gave the scene consistent physics without hand-tuning.",
    },
    {
      decision: "Real-scale orbital mechanics with a perception toggle",
      alternative: "Exaggerate every body so it's visible at default zoom",
      why: "Accurate scale is the whole point, but at true scale most asteroids are sub-pixel next to Earth. A perception toggle swaps between dramatic and true-scale modes so the demo communicates both intuition and honest numbers.",
    },
    {
      decision: "Free-fly camera instead of on-rails tours",
      alternative: "Guided camera paths that auto-pan between planets",
      why: "Curiosity-first exploration matches how recruiters and students actually interact with a solar-system scene. A free-fly rig with shift-to-sprint lets anyone get where they want in seconds.",
    },
  ],
  outcomes: [
    {
      label: "Bodies rendered",
      value: "30,000+",
      note: "Planets, satellites, and the near-Earth asteroid catalog",
    },
    {
      label: "Live data sources",
      value: "2 APIs",
      note: "Solar System Open Data · ESA NEO",
    },
    {
      label: "NASA Space Apps 2025",
      value: "Global Nominee",
      note: "Selected from 15,000+ teams across 160+ countries",
    },
    {
      label: "Stack",
      value: "Godot 4 + C#",
      note: "100% C# codebase, GPL-3.0 licensed",
    },
  ],
  links: [
    {
      label: "Source on GitHub",
      href: "https://github.com/SE-15A/Lunacy",
      icon: "github",
    },
    {
      label: "NASA Space Apps challenge",
      href: "https://www.spaceappschallenge.org/",
      icon: "external",
    },
  ],
};
