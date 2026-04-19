"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = {
  email: string;
};

/**
 * Small secondary button that copies the user's email to the clipboard and
 * flashes a "Copied" confirmation via an aria-live region. Falls back to a
 * no-op-but-still-announces pattern if the Clipboard API is unavailable so
 * screen-reader users always hear something.
 */
export function CopyEmailButton({ email }: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // Swallow errors — copy is a nicety, not critical. The mailto link
      // immediately to the left is the primary interaction.
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  }, [email]);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email address"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-transparent text-fg-muted transition-colors hover:text-fg hover:bg-fg/5 focus-visible:outline-none"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
      <span
        role="status"
        aria-live="polite"
        className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-fg text-bg text-[10px] font-medium uppercase tracking-wider px-2 py-1 transition-opacity duration-200"
        style={{ opacity: copied ? 1 : 0 }}
      >
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}
