import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { CopyEmailButton } from "./CopyEmailButton";

// lucide-react 1.8.0 dropped the branded Github and Linkedin marks for
// trademark reasons, so those two chips render hand-rolled inline SVGs in
// the same 24x24 viewBox and currentColor stroke style as lucide icons.
function GithubGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.4-.7.9-.8 1.5-.1.6-.1 1.3 0 2V22" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  const { email, links } = profile;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-6 py-24 md:px-12 lg:px-20 border-t border-border"
    >
      <div className="max-w-3xl">
        <h2
          id="contact-heading"
          className="font-display font-medium tracking-tight leading-[1.02] text-4xl md:text-5xl lg:text-6xl text-primary-deep"
        >
          Let&apos;s talk.
        </h2>
        <p className="mt-6 text-base md:text-lg text-fg-muted leading-relaxed max-w-xl">
          I&apos;m looking for summer 2026 internships in backend, systems,
          or platform engineering. Email works best, but any of these
          reach me.
        </p>

        <ul className="mt-10 flex flex-wrap items-center gap-3 list-none p-0 m-0">
          <li className="inline-flex items-center gap-2">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary-deep px-4 py-2 text-sm font-medium transition-[transform,background-color,box-shadow] duration-200 hover:bg-primary/20 hover:-translate-y-0.5"
              aria-label={`Email ${email}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Email</span>
              <span className="font-mono text-xs text-primary-deep/70 hidden sm:inline">
                {email}
              </span>
            </a>
            <CopyEmailButton email={email} />
          </li>

          <li>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-fg/5 text-fg px-4 py-2 text-sm font-medium transition-[transform,background-color] duration-200 hover:bg-fg/10 hover:-translate-y-0.5"
              aria-label="GitHub profile"
            >
              <GithubGlyph className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </li>

          <li>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-fg/5 text-fg px-4 py-2 text-sm font-medium transition-[transform,background-color] duration-200 hover:bg-fg/10 hover:-translate-y-0.5"
              aria-label="LinkedIn profile"
            >
              <LinkedinGlyph className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
