import type { JourneyEntry } from "@/content/journey";

type TimelineItemProps = {
  entry: JourneyEntry;
};

export function TimelineItem({ entry }: TimelineItemProps) {
  const kindLabel = entry.kind === "experience" ? "Experience" : "Education";

  return (
    <li className="relative pl-8 pb-10 last:pb-0">
      {/* dot on the line */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
      />

      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
        {/* meta column — dates + kind */}
        <div className="shrink-0 md:w-40">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
            {entry.dates}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-natural">
            {kindLabel}
          </p>
        </div>

        {/* content column */}
        <div className="min-w-0">
          <h3 className="font-display text-xl text-primary-deep">
            {entry.title}
          </h3>
          <p className="mt-1 text-sm text-fg">
            {entry.organization}
            {entry.location ? (
              <span className="text-fg-muted">{` · ${entry.location}`}</span>
            ) : null}
          </p>
          {entry.highlight ? (
            <p className="mt-2 inline-block rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-fg">
              {entry.highlight}
            </p>
          ) : null}
          {entry.detail ? (
            <p className="mt-2 max-w-prose text-sm text-fg-muted">
              {entry.detail}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}
