"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_MODE,
  DEFAULT_MOTIF,
  STORAGE_KEY_MODE,
  STORAGE_KEY_MOTIF,
  isMode,
  isMotif,
  type Mode,
  type Motif,
} from "@/config/themes";
import { featureFlags } from "@/config/features";

type ThemeContextValue = {
  mode: Mode;
  motif: Motif;
  setMode: (mode: Mode) => void;
  setMotif: (motif: Motif) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    // localStorage can throw SecurityError in locked-down contexts
    // (Safari private mode, cookies-blocked iframes).
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage disabled */
  }
}

function resolveMode(): Mode {
  const stored = readStorage(STORAGE_KEY_MODE);
  if (isMode(stored) && featureFlags.modes[stored]) return stored;
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches &&
    featureFlags.modes.dark
  ) {
    return "dark";
  }
  return DEFAULT_MODE;
}

function resolveMotif(): Motif {
  const stored = readStorage(STORAGE_KEY_MOTIF);
  if (isMotif(stored) && featureFlags.motifs[stored]) return stored;
  return DEFAULT_MOTIF;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start with DEFAULT on both server and client so hydration matches.
  // public/theme-init.js has already set the <html> data-theme-* attributes
  // from localStorage before hydration, so CSS already reflects the real
  // theme. The mount effect below reconciles our React state on the client.
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const [motif, setMotifState] = useState<Motif>(DEFAULT_MOTIF);

  useEffect(() => {
    const actualMode = resolveMode();
    const actualMotif = resolveMotif();
    if (actualMode !== DEFAULT_MODE) setModeState(actualMode);
    if (actualMotif !== DEFAULT_MOTIF) setMotifState(actualMotif);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.themeMode = mode;
    writeStorage(STORAGE_KEY_MODE, mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.themeMotif = motif;
    writeStorage(STORAGE_KEY_MOTIF, motif);
  }, [motif]);

  const setMode = useCallback((next: Mode) => setModeState(next), []);
  const setMotif = useCallback((next: Motif) => setMotifState(next), []);
  const toggleMode = useCallback(
    () => setModeState((m) => (m === "light" ? "dark" : "light")),
    [],
  );

  return (
    <ThemeContext.Provider
      value={{ mode, motif, setMode, setMotif, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
