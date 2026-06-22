import { interpolate, useCurrentFrame } from "remotion";
import { ClipReveal, Scene } from "../layout";
import { Squiggle } from "../ui/Squiggle";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Scene 6 — opens the pricing centerpiece with the verbatim site heading. */
export function PakkettenIntroScene() {
  const frame = useCurrentFrame();

  const eyebrowOpacity = interpolate(frame, [0, 8], [0, 1], clamp);
  const eyebrowTy = interpolate(frame, [0, 8], [-16, 0], { easing: EASE_OUT_EXPO, ...clamp });
  const squiggle = interpolate(frame, [20, 30], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const supOpacity = interpolate(frame, [24, 36], [0, 1], clamp);
  const supTy = interpolate(frame, [24, 36], [14, 0], { easing: EASE_OUT_EXPO, ...clamp });

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            opacity: eyebrowOpacity,
            translate: `0 ${eyebrowTy}px`,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 38,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.tealDeep,
            marginBottom: 36,
          }}
        >
          03 — Pakketten
        </div>

        <ClipReveal progress={interpolate(frame, [4, 22], [0, 1], { easing: EASE_OUT_EXPO, ...clamp })}>
          <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 96, letterSpacing: "-0.02em", color: COLORS.navy, lineHeight: 1.05 }}>
            Kies het pakket dat
          </span>
        </ClipReveal>
        <ClipReveal progress={interpolate(frame, [10, 28], [0, 1], { easing: EASE_OUT_EXPO, ...clamp })}>
          <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 96, letterSpacing: "-0.02em", color: COLORS.navy, lineHeight: 1.05 }}>
            bij jouw bedrijf past.
          </span>
        </ClipReveal>
        <div style={{ marginTop: 6, alignSelf: "flex-end", marginRight: 120 }}>
          <Squiggle progress={squiggle} width={360} />
        </div>

        <div
          style={{
            marginTop: 48,
            maxWidth: 880,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 50,
            lineHeight: 1.35,
            color: COLORS.muted,
            opacity: supOpacity,
            translate: `0 ${supTy}px`,
          }}
        >
          Eén vaste opstartprijs, één vast maandbedrag. Geen kleine lettertjes, geen verrassingen achteraf.
        </div>
      </div>
    </Scene>
  );
}
