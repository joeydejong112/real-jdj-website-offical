import { MessageCircle } from "lucide-react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ClipReveal, Scene } from "../layout";
import { Squiggle } from "../ui/Squiggle";
import { WhatsAppCard } from "../ui/WhatsAppCard";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Scene 10 — WhatsApp CTA: the only frame where green dominates. */
export function CtaScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const squiggle = interpolate(frame, [8, 18], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });

  const buttonSpring = spring({ frame: frame - 22, fps, config: { damping: 11, stiffness: 180 } });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.85, 1]) * (1 + 0.03 * Math.sin(frame / 14));
  const buttonOpacity = interpolate(frame, [22, 30], [0, 1], clamp);

  const tail = (at: number) => ({
    opacity: interpolate(frame, [at, at + 10], [0, 1], clamp),
    translate: `0 ${interpolate(frame, [at, at + 10], [14, 0], { easing: EASE_OUT_EXPO, ...clamp })}px`,
  });

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ClipReveal progress={interpolate(frame, [0, 14], [0, 1], { easing: EASE_OUT_EXPO, ...clamp })}>
            <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 88, letterSpacing: "-0.02em", color: COLORS.navy, lineHeight: 1.05 }}>
              App ons.
            </span>
          </ClipReveal>
          <ClipReveal progress={interpolate(frame, [5, 19], [0, 1], { easing: EASE_OUT_EXPO, ...clamp })}>
            <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 88, letterSpacing: "-0.02em", color: COLORS.teal, lineHeight: 1.05 }}>
              Vandaag nog antwoord.
            </span>
          </ClipReveal>
          <div style={{ marginTop: 6, alignSelf: "flex-end", marginRight: 60 }}>
            <Squiggle progress={squiggle} width={420} />
          </div>
        </div>

        <WhatsAppCard
          width={520}
          appearAt={10}
          bubbles={[{ side: "out", text: "Leuk! Ik stuur je vandaag nog een voorstel.", time: "14:02" }]}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            backgroundColor: COLORS.wa,
            color: COLORS.white,
            borderRadius: 999,
            padding: "30px 60px",
            opacity: buttonOpacity,
            scale: buttonScale,
            boxShadow: "0 26px 52px -18px rgba(63,191,115,0.6)",
          }}
        >
          <MessageCircle size={48} strokeWidth={2.4} />
          <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 50 }}>Stuur een WhatsApp</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 46, color: COLORS.navy, ...tail(30) }}>
            jdjwebdevelopment.com
          </div>
          <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 42, color: COLORS.ink, ...tail(34) }}>
            +31 6 14374491
          </div>
          <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 44, color: COLORS.ink, marginTop: 8, ...tail(38) }}>
            Moderne website zonder gedoe.
          </div>
        </div>
      </div>
    </Scene>
  );
}
