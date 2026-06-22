import { COLORS } from "../theme";

interface SquiggleProps {
  /** Draw-on progress, 0 (hidden) -> 1 (fully drawn). */
  progress: number;
  width?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * The site's hand-drawn underline (exact path from Hero.tsx). Uses SVG
 * pathLength normalization so the draw-on works without runtime measurement.
 */
export function Squiggle({
  progress,
  width = 520,
  color = COLORS.amber,
  strokeWidth = 10,
}: SquiggleProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <svg
      width={width}
      height={(width * 14) / 200}
      viewBox="0 0 200 14"
      fill="none"
      style={{ overflow: "visible", display: "block" }}
    >
      <path
        d="M3 10C40 4 80 3 197 8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - clamped}
      />
    </svg>
  );
}
