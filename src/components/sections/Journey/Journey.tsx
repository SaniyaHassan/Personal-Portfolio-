import { about, journey } from "@/content/journey";
import { TimelineItem } from "./TimelineItem";

export function Journey() {
  const entries = journey.filter(
    (entry) => entry.kind !== "experience" || entry.title.length > 0,
  );

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="px-6 py-24 md:px-12 lg:px-20 border-t border-border"
    >
      <h2
        id="journey-heading"
        className="font-display text-3xl md:text-4xl font-medium"
      >
        Journey
      </h2>

      <div className="mt-8 max-w-2xl space-y-4">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-sm md:text-base text-fg-muted">
            {paragraph}
          </p>
        ))}
        <p className="text-sm md:text-base text-fg">{about.closing}</p>
      </div>

      <ol
        aria-label="Education and experience timeline"
        className="mt-16 border-l border-border pl-0"
      >
        {entries.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </ol>
    </section>
  );
}
