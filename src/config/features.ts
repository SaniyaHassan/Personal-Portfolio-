export const featureFlags = {
  sections: {
    hero: true,
    projects: true,
    skills: true,
    journey: true,
    honors: true,
    contact: true,
  },
  motifs: {
    constellation: true,
    floral: true,
  },
  modes: {
    light: true,
    dark: true,
  },
  interactions: {
    commandPalette: true,
    magneticButtons: true,
    scrambleText: true,
    scrollReveal: true,
  },
} as const;

export type FeatureFlags = typeof featureFlags;
