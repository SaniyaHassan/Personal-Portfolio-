import { honors, type HonorKind } from "@/content/honors";
import { HonorCard } from "./HonorCard";

type Column = {
  kind: HonorKind;
  label: string;
};

const COLUMNS: readonly Column[] = [
  { kind: "achievement", label: "Achievements" },
  { kind: "certification", label: "Certifications" },
  { kind: "leadership", label: "Leadership" },
];

export function Honors() {
  return (
    <section
      id="honors"
      aria-labelledby="honors-heading"
      className="px-6 py-24 md:px-12 lg:px-20 border-t border-border"
    >
      <h2
        id="honors-heading"
        className="font-display text-3xl md:text-4xl font-medium text-primary-deep"
      >
        Honors
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {COLUMNS.map(({ kind, label }) => {
          const items = honors.filter((h) => h.kind === kind);
          return (
            <div key={kind} className="flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-widest text-fg-muted font-mono">
                {label}
              </h3>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {items.map((honor) => (
                  <li key={honor.id}>
                    <HonorCard honor={honor} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
