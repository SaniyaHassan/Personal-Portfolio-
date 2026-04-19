import { profile } from "@/content/profile";
import { MotifConstellation } from "@/components/theme/MotifConstellation";
import { MotifFloral } from "@/components/theme/MotifFloral";
import { ScrambleText } from "@/components/interactions/ScrambleText";
import { MagneticLink } from "@/components/interactions/MagneticButton";

export function Hero() {
  const { hero, name } = profile;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden min-h-[92svh] px-6 py-28 md:px-12 lg:px-20 flex flex-col justify-between"
    >
      {/* Ornamental motif layer — both rendered, CSS hides the inactive one */}
      <MotifConstellation className="motif motif-constellation pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />
      <MotifFloral className="motif motif-floral pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-80" />

      {/* Top row — wordmark + tag */}
      <div className="flex items-start justify-between gap-6">
        <p className="text-xs uppercase tracking-[0.24em] text-fg-muted">
          {name}
        </p>
        <p className="hidden md:block text-right text-xs uppercase tracking-[0.18em] text-fg-muted max-w-xs">
          {hero.locationLabel}
        </p>
      </div>

      {/* Middle — hero statement */}
      <div className="max-w-4xl">
        <h1
          id="hero-heading"
          className="font-display font-medium tracking-tight leading-[0.98] text-5xl md:text-7xl lg:text-8xl"
        >
          {hero.openingLine}
          <br />
          <span className="block">
            {hero.buildsLead}{" "}
            <ScrambleText
              words={hero.rotatingWords}
              className="text-primary-deep"
            />
            <span aria-hidden="true" className="text-primary-deep">
              .
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-fg-muted leading-relaxed">
          {hero.intro}
        </p>
      </div>

      {/* Bottom — calls to action */}
      <div className="flex flex-wrap items-center gap-3">
        <MagneticLink href={hero.primaryCta.href} variant="primary">
          {hero.primaryCta.label}
          <span aria-hidden="true">→</span>
        </MagneticLink>
        <MagneticLink
          href={hero.secondaryCta.href}
          variant="outline"
          pullStrength={0.22}
          maxTranslate={10}
        >
          {hero.secondaryCta.label}
        </MagneticLink>
      </div>
    </section>
  );
}
