import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CommandPalette } from "@/components/interactions/CommandPalette";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saniya Hassan — Software Engineer",
  description:
    "Software Engineering student at NUST Islamabad. Backend systems, DSA, space-tech.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased bg-bg text-fg">
        {/* Runs before hydration; sets data-theme-* on <html> to avoid FOUC. */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:border focus-visible:border-border focus-visible:bg-bg focus-visible:px-4 focus-visible:py-2"
          >
            Skip to content
          </a>
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
