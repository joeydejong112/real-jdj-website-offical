import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClipReveal } from "../layout";
import { Squiggle } from "../ui/Squiggle";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO, SAFE } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PAIN = ["Duur.", "Traag.", "Gedoe."];

/** Scene 2 — reframe the cost-anxiety objection, then land the promise. */
export function ReframeScene() {
  const frame = useCurrentFrame();

  // Phase A: pain words appear one at a time, then exit together.
  const painExit = interpolate(frame, [30, 40], [1, 0], clamp);
  const painExitTy = interpolate(frame, [30, 40], [0, -30], { easing: EASE_OUT_EXPO, ...clamp });

  // Phase B: promise headline + squiggle + support.
  const squiggle = interpolate(frame, [58, 74], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const supportOpacity = interpolate(frame, [64, 78], [0, 1], clamp);
  const supportTy = interpolate(frame, [64, 78], [16, 0], { easing: EASE_OUT_EXPO, ...clamp });

  const layer: React.CSSProperties = {
    paddingTop: SAFE.top,
    paddingBottom: SAFE.bottom,
    paddingLeft: SAFE.side,
    paddingRight: SAFE.side,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <AbsoluteFill>
      {/* Phase A — pain words */}
      <AbsoluteFill style={{ ...layer, opacity: painExit, translate: `0 ${painExitTy}px` }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56, alignItems: "center" }}>
          {PAIN.map((word, i) => {
            const start = i * 9;
            const opacity = interpolate(frame, [start, start + 8], [0, 1], clamp);
            const tx = interpolate(frame, [start, start + 8], [-24, 0], { easing: EASE_OUT_EXPO, ...clamp });
            const strike = interpolate(frame, [start + 6, start + 16], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
            return (
              <div key={word} style={{ position: "relative", opacity, translate: `${tx}px 0` }}>
                <span
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 800,
                    fontSize: 88,
                    letterSpacing: "-0.02em",
                    color: COLORS.muted,
                  }}
                >
                  {word}
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: -8,
                    right: -8,
                    top: "50%",
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: COLORS.navy,
                    transformOrigin: "left center",
                    scale: `${strike} 1`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Phase B — promise */}
      <AbsoluteFill style={layer}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ClipReveal progress={interpolate(frame, [40, 58], [0, 1], { easing: EASE_OUT_EXPO, ...clamp })}>
            <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 104, letterSpacing: "-0.02em", color: COLORS.navy, lineHeight: 1.04 }}>
              Snel online.
            </span>
          </ClipReveal>
          <ClipReveal progress={interpolate(frame, [46, 64], [0, 1], { easing: EASE_OUT_EXPO, ...clamp })}>
            <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 104, letterSpacing: "-0.02em", color: COLORS.teal, lineHeight: 1.04 }}>
              Vaste prijs.
            </span>
          </ClipReveal>
          <div style={{ marginTop: 8 }}>
            <Squiggle progress={squiggle} width={460} />
          </div>
          <div
            style={{
              marginTop: 44,
              maxWidth: 760,
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 54,
              lineHeight: 1.3,
              color: COLORS.ink,
              opacity: supportOpacity,
              translate: `0 ${supportTy}px`,
            }}
          >
            Moderne website. Geen verrassingen achteraf.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
