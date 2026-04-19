#!/usr/bin/env node
/**
 * Automated a11y audit — fetches each route from the running dev server,
 * parses into jsdom, runs axe-core, prints violations grouped by impact.
 *
 * Usage: node scripts/audit-a11y.mjs [base-url]
 * Prerequisite: dev server up on the given base URL (default 3456).
 */
import { JSDOM } from "jsdom";
import axe from "axe-core";

const BASE = process.argv[2] ?? "http://localhost:3456";
const ROUTES = [
  "/",
  "/cv",
  "/projects/lunacy",
  "/projects/academic-search-engine",
  "/projects/vems",
  "/projects/learning-sphere",
];

const IMPACT_ORDER = ["critical", "serious", "moderate", "minor"];

function impactRank(impact) {
  const i = IMPACT_ORDER.indexOf(impact ?? "minor");
  return i < 0 ? 4 : i;
}

async function auditRoute(route) {
  const url = `${BASE}${route}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${route} returned ${res.status}`);
  }
  const html = await res.text();

  // jsdom with scripts enabled so axe can execute against the window.
  const dom = new JSDOM(html, {
    url,
    pretendToBeVisual: true,
    runScripts: "dangerously",
  });

  const { window } = dom;

  // Run the axe-core source inside the jsdom window. Using Function is more
  // reliable than <script> injection here because JSDOM script timing is async.
  const loader = new window.Function(axe.source + "\nreturn window.axe;");
  const axeInstance = loader();

  const results = await axeInstance.run(window.document, {
    resultTypes: ["violations"],
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
    },
    // color-contrast rule misbehaves in jsdom (no rendering engine) — skip it.
    // We already enforce contrast via the tokens.test.ts unit tests.
    rules: { "color-contrast": { enabled: false } },
  });

  return {
    route,
    violations: results.violations.sort(
      (a, b) => impactRank(a.impact) - impactRank(b.impact),
    ),
  };
}

function formatViolation(v) {
  const nodeCount = v.nodes?.length ?? 0;
  const firstNode = v.nodes?.[0]?.target?.join(" ") ?? "?";
  return `  [${(v.impact ?? "?").toUpperCase().padEnd(8)}] ${v.id} — ${v.help}\n    ${nodeCount} node${nodeCount === 1 ? "" : "s"} · first: ${firstNode}\n    help: ${v.helpUrl}`;
}

async function main() {
  console.log(`\nA11Y AUDIT · base: ${BASE}\n`);
  let totalViolations = 0;
  for (const route of ROUTES) {
    try {
      const { violations } = await auditRoute(route);
      console.log(`\n=== ${route} ===`);
      if (violations.length === 0) {
        console.log("  ✓ no violations");
      } else {
        totalViolations += violations.length;
        for (const v of violations) {
          console.log(formatViolation(v));
        }
      }
    } catch (err) {
      console.error(`\n=== ${route} === FAILED: ${err.message}`);
    }
  }
  console.log(
    `\nTotal violations: ${totalViolations} across ${ROUTES.length} routes.\n`,
  );
  process.exit(totalViolations > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
