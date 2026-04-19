import Link from "next/link";
import { profile } from "@/content/profile";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { MotifToggle } from "@/components/theme/MotifToggle";
import { Hero } from "@/components/sections/Hero/Hero";
import { Projects } from "@/components/sections/Projects/Projects";
import { Skills } from "@/components/sections/Skills/Skills";
import { Journey } from "@/components/sections/Journey/Journey";
import { Honors } from "@/components/sections/Honors/Honors";
import { Contact } from "@/components/sections/Contact/Contact";
import { FooterMark } from "@/components/theme/FooterMark";
import { SectionDivider } from "@/components/theme/SectionDivider";
import { featureFlags } from "@/config/features";

export default function Home() {
  const { sections } = featureFlags;
  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 md:px-12 lg:px-20 py-4 backdrop-blur-md bg-bg/75 border-b border-border">
        <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
          {profile.name}
        </p>
        <div className="flex items-center gap-2 md:gap-3">
          <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-fg-muted">
            <a href="/#projects" className="hover:text-fg focus-visible:outline-focus-ring">Work</a>
            <Link href="/cv" className="hover:text-fg focus-visible:outline-focus-ring">CV</Link>
            <a href="/#contact" className="hover:text-fg focus-visible:outline-focus-ring">Contact</a>
          </nav>
          <span aria-hidden="true" className="hidden md:inline h-4 w-px bg-border mx-1" />
          <MotifToggle />
          <ModeToggle />
        </div>
      </header>
      <main id="main">
        {sections.hero && <Hero />}
        {sections.projects && <Projects />}
        {sections.projects && sections.skills && <SectionDivider />}
        {sections.skills && <Skills />}
        {sections.journey && <Journey />}
        {sections.honors && <Honors />}
        {sections.contact && <Contact />}
      </main>
      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-border text-xs text-fg-muted flex justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <FooterMark />
      </footer>
    </>
  );
}
