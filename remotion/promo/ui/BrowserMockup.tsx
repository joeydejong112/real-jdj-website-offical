import type { CSSProperties } from "react";
import { Globe } from "lucide-react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { bodyFont, COLORS, displayFont } from "../theme";
import { WhatsAppCard } from "./WhatsAppCard";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function Bar({ w, h = 18, color = COLORS.line, style }: { w: number | string; h?: number; color?: string; style?: CSSProperties }) {
  return <span style={{ display: "block", width: w, height: h, borderRadius: 999, backgroundColor: color, ...style }} />;
}

/** A self-assembling reconstruction of the live Hero.tsx browser + chat mockup. */
export function BrowserMockup() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shell = spring({ frame, fps, config: { stiffness: 260, damping: 18 } });
  const shellScale = interpolate(shell, [0, 1], [0.9, 1]);
  const shellTy = interpolate(shell, [0, 1], [40, 0]);
  const shellRot = interpolate(shell, [0, 1], [-1, 0]);

  const urlPill = interpolate(frame, [10, 26], [0, 1], { ...clamp });
  const urlText = interpolate(frame, [20, 30], [0, 1], clamp);

  const dot = (i: number) => interpolate(spring({ frame: frame - (6 + i * 3), fps, config: { damping: 12, stiffness: 220 } }), [0, 1], [0, 1]);
  const reveal = (a: number, b: number) => ({
    opacity: interpolate(frame, [a, b], [0, 1], clamp),
    translate: `0 ${interpolate(frame, [a, b], [16, 0], clamp)}px`,
  });

  const badge = spring({ frame: frame - 58, fps, config: { stiffness: 260, damping: 16 } });
  const imageScaleY = interpolate(frame, [30, 46], [0, 1], { ...clamp });

  return (
    <div style={{ position: "relative", width: 880 }}>
      <div
        style={{
          scale: shellScale,
          translate: `0 ${shellTy}px`,
          rotate: `${shellRot}deg`,
          transformOrigin: "center top",
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: COLORS.white,
          border: `1px solid ${COLORS.line}`,
          boxShadow: "0 40px 80px -28px rgba(7,23,47,0.28)",
        }}
      >
        {/* chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: COLORS.mist,
            borderBottom: `1px solid ${COLORS.line}`,
            padding: "20px 26px",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {["#f87171", COLORS.amber, COLORS.teal].map((c, i) => (
              <span key={c} style={{ width: 20, height: 20, borderRadius: 999, backgroundColor: c, scale: dot(i) }} />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              transformOrigin: "left center",
              scale: `${urlPill} 1`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              backgroundColor: COLORS.white,
              borderRadius: 999,
              padding: "12px 22px",
              color: COLORS.muted,
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            <Globe size={22} style={{ opacity: urlText }} />
            <span style={{ opacity: urlText }}>www.jouwbedrijf.nl</span>
          </div>
        </div>

        {/* page body skeleton */}
        <div style={{ padding: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...reveal(18, 30) }}>
            <Bar w={120} h={22} color={COLORS.navy} />
            <div style={{ display: "flex", gap: 16 }}>
              <Bar w={64} h={16} />
              <Bar w={64} h={16} />
              <Bar w={86} h={16} color="rgba(46,156,156,0.35)" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 36, alignItems: "center", marginTop: 44 }}>
            <div>
              <Bar w="92%" h={30} color={COLORS.navy} style={reveal(26, 38)} />
              <Bar w="68%" h={30} color="rgba(27,42,74,0.8)" style={{ marginTop: 14, ...reveal(28, 40) }} />
              <Bar w="86%" h={16} style={{ marginTop: 28, ...reveal(34, 44) }} />
              <Bar w="70%" h={16} style={{ marginTop: 12, ...reveal(36, 46) }} />
              <span style={{ display: "block", width: 200, height: 54, borderRadius: 999, backgroundColor: COLORS.teal, marginTop: 34, ...reveal(42, 52) }} />
            </div>
            <div
              style={{
                aspectRatio: "4 / 5",
                borderRadius: 22,
                background: `linear-gradient(140deg, ${COLORS.tealSoft}, ${COLORS.teal} 140%)`,
                transformOrigin: "top",
                scale: `1 ${imageScaleY}`,
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 44 }}>
            {[46, 52, 58].map((a, i) => (
              <div key={a} style={{ borderRadius: 20, border: `1px solid ${COLORS.line}`, backgroundColor: COLORS.paper, padding: 22, ...reveal(a, a + 12) }}>
                <span style={{ display: "block", width: 46, height: 46, borderRadius: 14, backgroundColor: "rgba(46,156,156,0.2)" }} />
                <Bar w="80%" h={16} color="rgba(27,42,74,0.7)" style={{ marginTop: 18 }} />
                <Bar w="60%" h={12} style={{ marginTop: 12 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* delivery badge */}
      <div
        style={{
          position: "absolute",
          top: -24,
          left: -16,
          zIndex: 3,
          scale: interpolate(badge, [0, 1], [0.6, 1]),
          rotate: `${interpolate(badge, [0, 1], [-12, -5])}deg`,
          backgroundColor: COLORS.navy,
          color: COLORS.white,
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 30,
          padding: "14px 28px",
          borderRadius: 999,
          boxShadow: "0 16px 32px -14px rgba(7,23,47,0.5)",
        }}
      >
        1–2 weken live
      </div>

      {/* WhatsApp chat overlapping bottom-right */}
      <div style={{ position: "absolute", right: -10, bottom: -70, zIndex: 4 }}>
        <WhatsAppCard
          width={340}
          appearAt={64}
          bubbles={[
            { side: "in", text: "Hi! Ik wil graag een website voor mijn bedrijf." },
            { side: "out", text: "Leuk! Ik stuur je vandaag nog een voorstel.", time: "14:02" },
          ]}
        />
      </div>
    </div>
  );
}
