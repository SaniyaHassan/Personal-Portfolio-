export const MODES = ["light", "dark"] as const;
export type Mode = (typeof MODES)[number];

export const MOTIFS = ["constellation", "floral"] as const;
export type Motif = (typeof MOTIFS)[number];

export const DEFAULT_MODE: Mode = "light";
export const DEFAULT_MOTIF: Motif = "constellation";

export const STORAGE_KEY_MODE = "theme-mode";
export const STORAGE_KEY_MOTIF = "theme-motif";

export function isMode(value: unknown): value is Mode {
  return typeof value === "string" && (MODES as readonly string[]).includes(value);
}

export function isMotif(value: unknown): value is Motif {
  return typeof value === "string" && (MOTIFS as readonly string[]).includes(value);
}
