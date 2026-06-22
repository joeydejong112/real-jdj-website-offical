import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "./theme";

// Same fractal-noise grain used on the live site (app/globals.css body::after).
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const MASK =
  "radial-gradient(ellipse 80% 70% at 60% 36%, black 28%, transparent 76%)";

/**
 * Persistent background rendered behind every scene for continuity: warm paper,
 * a navy dot-grid masked toward the upper-center, one drifting teal glow blob
 * that brightens on the three peaks (Hook / Plus / CTA), and a printed grain.
 */
export function Background() {
  const frame = useCurrentFrame();

  const glowOpacity = interpolate(
    frame,
    [0, 66, 200, 540, 654, 726, 780],
    [0.2, 0.16, 0.15, 0.2, 0.16, 0.2, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const glowY = interpolate(frame, [0, 780], [0, 70]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(27,42,74,0.10) 1.6px, transparent 1.6px)",
          backgroundSize: "26px 26px",
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          left: 480,
          top: -20 + glowY,
          borderRadius: "50%",
          backgroundColor: COLORS.teal,
          opacity: glowOpacity,
          filter: "blur(110px)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `url("${GRAIN}")`,
          opacity: 0.035,
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
}
