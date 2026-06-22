import { Search } from "lucide-react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { bodyFont, COLORS, displayFont } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** The site's SearchResultPreview — makes "lokale SEO / vindbaar" concrete. */
export function SeoPreview({ frame }: { frame: number }) {
  const { fps } = useVideoConfig();

  const bar = interpolate(frame, [6, 14], [0, 1], clamp);
  const rowOpacity = interpolate(frame, [10, 18], [0, 1], clamp);
  const rowTy = interpolate(frame, [10, 18], [20, 0], clamp);
  const badge = spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 200 } });

  return (
    <div
      style={{
        width: 760,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 26,
        padding: 30,
        boxShadow: "0 24px 52px -22px rgba(7,23,47,0.25)",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 999,
          padding: "18px 26px",
          opacity: bar,
          color: COLORS.muted,
        }}
      >
        <Search size={28} strokeWidth={2.4} />
        <span style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 30, color: COLORS.ink }}>
          kapper utrecht
        </span>
      </div>

      <div style={{ marginTop: 26, opacity: rowOpacity, translate: `0 ${rowTy}px` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "grid",
              placeItems: "center",
              backgroundColor: COLORS.amber,
              color: COLORS.navy,
              fontFamily: displayFont,
              fontWeight: 800,
              fontSize: 24,
              scale: interpolate(badge, [0, 1], [0, 1]),
            }}
          >
            1
          </span>
          <span style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 26, color: COLORS.tealDeep }}>
            www.jouwbedrijf.nl
          </span>
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.2,
            color: COLORS.navy,
            marginTop: 14,
          }}
        >
          Jouw Bedrijf: duidelijk online in Utrecht
        </div>
        <span style={{ display: "block", width: "90%", height: 14, borderRadius: 999, backgroundColor: COLORS.line, marginTop: 16 }} />
        <span style={{ display: "block", width: "65%", height: 14, borderRadius: 999, backgroundColor: COLORS.line, marginTop: 10 }} />
      </div>
    </div>
  );
}
