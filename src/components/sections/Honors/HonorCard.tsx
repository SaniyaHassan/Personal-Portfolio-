import type { Honor } from "@/content/honors";

type HonorCardProps = {
  honor: Honor;
};

export function HonorCard({ honor }: HonorCardProps) {
  const { title, detail, issuer, year, bullets, kind } = honor;

  return (
    <article className="border border-border rounded-xl p-4 bg-bg text-fg">
      <h4 className="font-display text-lg leading-snug text-primary-deep">
        {title}
      </h4>

      {detail ? (
        <p className="mt-1 text-sm text-fg">{detail}</p>
      ) : null}

      {(issuer || year) && (
        <p className="mt-2 text-xs text-fg-muted font-mono">
          {issuer}
          {issuer && year ? " · " : ""}
          {year}
        </p>
      )}

      {kind === "leadership" && bullets && bullets.length > 0 ? (
        <>
          <ul className="mt-3 space-y-1 text-sm text-fg italic list-disc list-inside">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}
