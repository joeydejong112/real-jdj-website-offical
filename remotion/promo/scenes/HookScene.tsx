import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ClipReveal, Scene } from "../layout";
import { Squiggle } from "../ui/Squiggle";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Scene 1 — price-first hook: "Een website vanaf €299." */
export function HookScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const priceSpring = spring({ frame, fps, config: { damping: 12, stiffness: 140 } });
  const priceScale = interpolate(priceSpring, [0, 1], [0.7, 1]);
  const priceTy = interpolate(priceSpring, [0, 1], [60, 0]);
  const priceOpacity = interpolate(frame, [0, 6], [0, 1], clamp);

  const lineProg = interpolate(frame, [6, 20], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const vanafOpacity = interpolate(frame, [10, 18], [0, 1], clamp);
  const vanafTx = interpolate(frame, [10, 18], [-16, 0], { easing: EASE_OUT_EXPO, ...clamp });
  const squiggle = interpolate(frame, [20, 44], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const supportOpacity = interpolate(frame, [28, 40], [0, 1], clamp);
  const supportTy = interpolate(frame, [28, 40], [18, 0], { easing: EASE_OUT_EXPO, ...clamp });

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ClipReveal progress={lineProg}>
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 800,
              fontSize: 108,
              letterSpacing: "-0.02em",
              color: COLORS.navy,
              lineHeight: 1,
            }}
          >
            Een website
          </span>
        </ClipReveal>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 44,
            marginTop: 22,
            opacity: priceOpacity,
            scale: priceScale,
            translate: `0 ${priceTy}px`,
            transformOrigin: "center bottom",
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 56,
              color: COLORS.ink,
              opacity: vanafOpacity,
              translate: `${vanafTx}px 0`,
              paddingBottom: 30,
            }}
          >
            vanaf
          </span>
          <span
            style={{
              fontFamily: displayFont,
              fontWeight: 800,
              fontSize: 200,
              letterSpacing: "-0.04em",
              color: COLORS.navy,
              lineHeight: 0.9,
            }}
          >
            €299
          </span>
        </div>

        <div style={{ marginTop: 6, alignSelf: "flex-end", marginRight: 70 }}>
          <Squiggle progress={squiggle} width={430} />
        </div>

        <div
          style={{
            marginTop: 48,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 56,
            color: COLORS.ink,
            opacity: supportOpacity,
            translate: `0 ${supportTy}px`,
          }}
        >
          Vaste prijs. Zonder gedoe.
        </div>
      </div>
    </Scene>
  );
}
