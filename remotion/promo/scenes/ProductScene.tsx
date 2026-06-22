import { interpolate, useCurrentFrame } from "remotion";
import { ClipReveal, Scene } from "../layout";
import { BrowserMockup } from "../ui/BrowserMockup";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Scene 3 — "Dit is wat je krijgt." with the Hero mockup assembling itself. */
export function ProductScene() {
  const frame = useCurrentFrame();

  const headlineProg = interpolate(frame, [0, 12], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const supportOpacity = interpolate(frame, [4, 16], [0, 1], clamp);

  return (
    <Scene justify="center">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <ClipReveal progress={headlineProg}>
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 80,
                letterSpacing: "-0.02em",
                color: COLORS.navy,
                lineHeight: 1,
              }}
            >
              Dit is wat je krijgt.
            </span>
          </ClipReveal>
          <div style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: 52, color: COLORS.ink, opacity: supportOpacity }}>
            Live in 1–2 weken.
          </div>
        </div>

        <div style={{ scale: 0.9, transformOrigin: "center top" }}>
          <BrowserMockup />
        </div>
      </div>
    </Scene>
  );
}
