#!/usr/bin/env node
/**
 * Export design tokens (hex) from figma-plugin/src/tokens.js → docs/static/tokens.json
 * Source of truth for web/mobile vendoring (same pattern as OpenAPI).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../..");
const outPath = join(root, "static/tokens.json");

const colors = {
  primary: "#0B3A5C",
  primaryDark: "#072A42",
  primaryBright: "#1A6FA8",
  primarySoft: "#E8F2F8",
  primarySubtle: "#F3F8FB",
  onPrimary: "#FFFFFF",
  accent: "#0E7490",
  accentSoft: "#ECFEFF",
  success: "#15803D",
  successSoft: "#F0FDF4",
  warning: "#B45309",
  warningSoft: "#FFFBEB",
  error: "#B91C1C",
  errorSoft: "#FEF2F2",
  info: "#1D4ED8",
  infoSoft: "#EFF6FF",
  ink950: "#0B1220",
  ink900: "#111827",
  ink700: "#374151",
  ink500: "#6B7280",
  ink400: "#9CA3AF",
  ink300: "#D1D5DB",
  ink200: "#E5E7EB",
  ink100: "#F3F4F6",
  surface: "#FFFFFF",
  background: "#F4F7FA",
  overlay: "#0B1220",
};

const radius = { sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, pill: 999 };
const spacing = { page: 20, card: 16, section: 24, option: 12 };

const payload = {
  $schema: "https://nexus-ops.local/tokens.schema.json",
  version: "1.0.0",
  source: "figma-plugin/src/tokens.js",
  updated: new Date().toISOString().slice(0, 10),
  colors,
  radius,
  spacing,
  typography: {
    fontFamily: "Inter, Roboto, system-ui, sans-serif",
    display: { size: 32, weight: 700 },
    title: { size: 24, weight: 700 },
    heading: { size: 18, weight: 600 },
    body: { size: 15, weight: 400 },
    label: { size: 13, weight: 600 },
    caption: { size: 12, weight: 500 },
    overline: { size: 11, weight: 600 },
  },
  vendor: {
    web: "web/src/styles/tokens.ts",
    mobile: "mobile/src/theme/tokens.ts",
  },
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log("Wrote", outPath);
