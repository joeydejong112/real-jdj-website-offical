import { Easing } from "remotion";
import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Loaded at module top-level so every scene that imports the theme blocks
// rendering until the fonts are ready (no fallback-font flash in the render).
const bricolage = loadBricolage("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

/** Bricolage Grotesque — display / headlines / price numerals. */
export const displayFont = bricolage.fontFamily;
/** Inter — body, labels, qualifiers. */
export const bodyFont = inter.fontFamily;

// Palette mirrors app/globals.css (oklch tokens converted to hex for Remotion).
export const COLORS = {
  paper: "#FBF9F2",
  navy: "#1B2A4A",
  ink: "#3E4A5C",
  muted: "#76808F",
  teal: "#2E9C9C",
  tealDeep: "#237A7A",
  tealSoft: "#E2F2F0",
  amber: "#F2C45A",
  wa: "#3FBF73",
  line: "#E4E6EC",
  mist: "#F3F1EA",
  white: "#FFFFFF",
} as const;

/** The site's signature ease (matches EASE_OUT_EXPO in motion-primitives). */
export const EASE_OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);

/** Instagram Reels/Stories safe area for a 1080x1920 frame. */
export const SAFE = { side: 80, top: 200, bottom: 320 } as const;

/**
 * Insert dot thousands separators (nl-NL style) without relying on Intl locale
 * data being present in the render environment. 1299 -> "1.299", 299 -> "299".
 */
export function formatThousands(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
