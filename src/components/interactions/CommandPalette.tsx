"use client";

import {
  Accessibility,
  Briefcase,
  Command as CommandIcon,
  Download,
  FileText,
  Flower2,
  Home,
  Mail,
  Moon,
  Palette,
  Route,
  Search,
  Sparkles,
  Star,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";
import {
  isForcedReducedMotion,
  setForcedReducedMotion,
} from "@/lib/useReducedMotionPreference";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/components/theme/ThemeProvider";

type RunContext = {
  setMode: (m: "light" | "dark") => void;
  toggleMode: () => void;
  setMotif: (m: "constellation" | "floral") => void;
};

type BaseCommand = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  icon: ReactNode;
  shortcut?: string;
};

type ActionCommand = BaseCommand & {
  kind: "action";
  run: (ctx: RunContext) => void;
};

type LinkCommand = BaseCommand & {
  kind: "link";
  href: string;
  download?: boolean;
  external?: boolean;
};

type Command = ActionCommand | LinkCommand;

const EMAIL = "saniyahassan26032006@gmail.com";

const COMMANDS: Command[] = [
  {
    kind: "link",
    id: "go-hero",
    label: "Go to Hero",
    keywords: ["home", "top", "intro"],
    icon: <Home className="h-4 w-4" aria-hidden="true" />,
    href: "#hero",
  },
  {
    kind: "link",
    id: "go-projects",
    label: "Go to Projects",
    keywords: ["work", "portfolio", "lunacy", "search engine"],
    icon: <Briefcase className="h-4 w-4" aria-hidden="true" />,
    href: "#projects",
  },
  {
    kind: "link",
    id: "go-skills",
    label: "Go to Skills",
    keywords: ["stack", "tech", "tools"],
    icon: <Wrench className="h-4 w-4" aria-hidden="true" />,
    href: "#skills",
  },
  {
    kind: "link",
    id: "go-journey",
    label: "Go to Journey",
    keywords: ["about", "education", "experience", "timeline"],
    icon: <Route className="h-4 w-4" aria-hidden="true" />,
    href: "#journey",
  },
  {
    kind: "link",
    id: "go-honors",
    label: "Go to Honors",
    keywords: ["achievements", "awards", "certifications"],
    icon: <Star className="h-4 w-4" aria-hidden="true" />,
    href: "#honors",
  },
  {
    kind: "link",
    id: "go-contact",
    label: "Go to Contact",
    keywords: ["email", "reach", "message"],
    icon: <Mail className="h-4 w-4" aria-hidden="true" />,
    href: "#contact",
  },
  {
    kind: "link",
    id: "go-cv",
    label: "Go to CV",
    keywords: ["resume", "curriculum vitae"],
    icon: <FileText className="h-4 w-4" aria-hidden="true" />,
    href: "/cv",
  },
  {
    kind: "action",
    id: "mode-light",
    label: "Switch to Light Mode",
    keywords: ["theme", "bright"],
    icon: <Sun className="h-4 w-4" aria-hidden="true" />,
    run: ({ setMode }) => setMode("light"),
  },
  {
    kind: "action",
    id: "mode-dark",
    label: "Switch to Dark Mode",
    keywords: ["theme", "night"],
    icon: <Moon className="h-4 w-4" aria-hidden="true" />,
    run: ({ setMode }) => setMode("dark"),
  },
  {
    kind: "action",
    id: "mode-toggle",
    label: "Toggle Mode",
    keywords: ["theme", "switch"],
    icon: <Palette className="h-4 w-4" aria-hidden="true" />,
    run: ({ toggleMode }) => toggleMode(),
  },
  {
    kind: "action",
    id: "motif-constellation",
    label: "Use Constellation Motif",
    keywords: ["theme", "stars", "space"],
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
    run: ({ setMotif }) => setMotif("constellation"),
  },
  {
    kind: "action",
    id: "motif-floral",
    label: "Use Floral Motif",
    keywords: ["theme", "bloom", "flower"],
    icon: <Flower2 className="h-4 w-4" aria-hidden="true" />,
    run: ({ setMotif }) => setMotif("floral"),
  },
  {
    kind: "link",
    id: "download-cv",
    label: "Download CV",
    keywords: ["resume", "pdf"],
    icon: <Download className="h-4 w-4" aria-hidden="true" />,
    href: "/cv.pdf",
    download: true,
  },
  {
    kind: "link",
    id: "send-email",
    label: "Send Email",
    keywords: ["mailto", "contact", "reach"],
    icon: <Mail className="h-4 w-4" aria-hidden="true" />,
    href: `mailto:${EMAIL}`,
    external: true,
  },
  {
    kind: "action",
    id: "motion-reduce",
    label: "Reduce Motion",
    keywords: ["a11y", "accessibility", "calm", "disable animation"],
    icon: <Accessibility className="h-4 w-4" aria-hidden="true" />,
    run: () => setForcedReducedMotion(true),
  },
  {
    kind: "action",
    id: "motion-restore",
    label: "Restore Motion",
    keywords: [
      "a11y",
      "accessibility",
      "enable animation",
      "bring it back",
    ],
    icon: <Zap className="h-4 w-4" aria-hidden="true" />,
    run: () => setForcedReducedMotion(false),
  },
];

function matchesQuery(cmd: Command, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const haystack = [cmd.label, ...(cmd.keywords ?? [])]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { setMode, setMotif, toggleMode } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global Ctrl+K / Cmd+K listener + Escape (when open).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key === "k" || e.key === "K";
      if (isK && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reset query + selection when opening; focus input next tick.
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(
    () => COMMANDS.filter((c) => matchesQuery(c, query)),
    [query],
  );

  // Clamp selection when the filtered list shrinks.
  useEffect(() => {
    if (selectedIdx >= filtered.length && filtered.length > 0) {
      setSelectedIdx(0);
    }
  }, [filtered.length, selectedIdx]);

  const close = useCallback(() => setOpen(false), []);

  const runCommand = useCallback(
    (cmd: Command) => {
      if (cmd.kind === "action") {
        cmd.run({ setMode, setMotif, toggleMode });
        close();
        return;
      }
      // link: hash → smooth scroll; otherwise navigate.
      if (cmd.href.startsWith("#")) {
        const id = cmd.href.slice(1);
        const el =
          typeof document !== "undefined"
            ? document.getElementById(id)
            : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.location.hash = cmd.href;
        }
        close();
        return;
      }
      if (cmd.download) {
        // Trigger the anchor's native download by creating a one-off click.
        const a = document.createElement("a");
        a.href = cmd.href;
        a.download = "";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        close();
        return;
      }
      if (cmd.external || cmd.href.startsWith("mailto:")) {
        window.location.href = cmd.href;
        close();
        return;
      }
      window.location.href = cmd.href;
      close();
    },
    [close, setMode, setMotif, toggleMode],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) =>
          filtered.length === 0 ? 0 : (i + 1) % filtered.length,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) =>
          filtered.length === 0
            ? 0
            : (i - 1 + filtered.length) % filtered.length,
        );
      } else if (e.key === "Home") {
        e.preventDefault();
        setSelectedIdx(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setSelectedIdx(Math.max(0, filtered.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[selectedIdx];
        if (cmd) runCommand(cmd);
      }
    },
    [filtered, selectedIdx, runCommand],
  );

  if (!mounted || !open) return null;

  const dialog = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150"
      onKeyDown={onKeyDown}
      role="presentation"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl"
      >
        {/* search input row */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search
            className="h-4 w-4 shrink-0 text-fg-muted"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-autocomplete="list"
            aria-activedescendant={
              filtered[selectedIdx]
                ? `cmd-opt-${filtered[selectedIdx].id}`
                : undefined
            }
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-fg-muted"
          />
          <kbd className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fg-muted sm:inline-flex">
            <CommandIcon className="h-3 w-3" aria-hidden="true" />K
          </kbd>
        </div>

        {/* results */}
        <div
          ref={listRef}
          id="command-palette-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-[50vh] overflow-y-auto py-1"
        >
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-fg-muted">
              No commands match “{query}”.
            </p>
          ) : (
            filtered.map((cmd, i) => {
              const selected = i === selectedIdx;
              const className = [
                "flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                selected
                  ? "bg-primary/10 text-primary-deep"
                  : "text-fg hover:bg-fg/5",
              ].join(" ");

              const body = (
                <>
                  <span
                    className={
                      selected ? "text-primary-deep" : "text-fg-muted"
                    }
                  >
                    {cmd.icon}
                  </span>
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="rounded border border-border bg-bg px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-fg-muted">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </>
              );

              // Link commands render an <a> inside the option so
              // right-click "open in new tab" and real href semantics work.
              if (cmd.kind === "link") {
                return (
                  <div
                    key={cmd.id}
                    id={`cmd-opt-${cmd.id}`}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <a
                      href={cmd.href}
                      download={cmd.download ? "" : undefined}
                      target={cmd.external ? "_self" : undefined}
                      rel={cmd.external ? "noopener" : undefined}
                      className={className}
                      onClick={(e) => {
                        // Intercept so we can close the palette + smooth-scroll hash.
                        e.preventDefault();
                        runCommand(cmd);
                      }}
                    >
                      {body}
                    </a>
                  </div>
                );
              }

              return (
                <div
                  key={cmd.id}
                  id={`cmd-opt-${cmd.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setSelectedIdx(i)}
                >
                  <button
                    type="button"
                    className={className}
                    onClick={() => runCommand(cmd)}
                  >
                    {body}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-fg-muted">
          <span>
            <kbd className="font-sans">↑↓</kbd> navigate ·{" "}
            <kbd className="font-sans">↵</kbd> select ·{" "}
            <kbd className="font-sans">esc</kbd> close
          </span>
          <span aria-hidden="true">✦</span>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
