import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ClipReveal, Scene } from "../layout";
import { Squiggle } from "../ui/Squiggle";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

interface Stat {
  count?: number;
  suffix?: string;
  display?: string;
  label: string;
}

const STATS: Stat[] = [
  { count: 48, suffix: " uur", label: "startklaar na akkoord" },
  { display: "1–2 weken", label: "van content naar live" },
  { count: 100, suffix: "%", label: "vaste prijs vooraf" },
  { count: 24, suffix: " uur", label: "max. reactietijd op werkdagen" },
];

/** Scene 5 — trust stinger: "Geen verrassingen." + a 2x2 count-up stat grid. */
export function StatsScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineProg = interpolate(frame, [0, 8], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const squiggle = interpolate(frame, [6, 16], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
  const supportOpacity = interpolate(frame, [32, 44], [0, 1], clamp);
  const supportTy = interpolate(frame, [32, 44], [14, 0], { easing: EASE_OUT_EXPO, ...clamp });

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ClipReveal progress={headlineProg}>
          <span style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 84, letterSpacing: "-0.02em", color: COLORS.navy, lineHeight: 1 }}>
            Geen verrassingen.
          </span>
        </ClipReveal>
        <div style={{ marginTop: 4, alignSelf: "center" }}>
          <Squiggle progress={squiggle} width={440} />
        </div>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "56px 80px",
            width: 880,
          }}
        >
          {STATS.map((stat, i) => {
            const start = 6 + i * 4;
            const pop = spring({ frame: frame - start, fps, config: { damping: 13, stiffness: 180 } });
            const cellScale = interpolate(pop, [0, 1], [0.8, 1]);
            const cellOpacity = interpolate(frame, [start, start + 8], [0, 1], clamp);
            const bar = interpolate(frame, [start + 3, start + 10], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
            const labelOpacity = interpolate(frame, [start + 6, start + 12], [0, 1], clamp);

            let valueText = stat.display ?? "";
            if (stat.count !== undefined) {
              const n = Math.round(interpolate(frame, [start, start + 12], [0, stat.count], clamp));
              valueText = `${n}${stat.suffix ?? ""}`;
            }

            return (
              <div key={stat.label} style={{ textAlign: "center", opacity: cellOpacity, scale: cellScale }}>
                <span style={{ display: "block", width: 56, height: 6, borderRadius: 999, backgroundColor: COLORS.teal, margin: "0 auto", transformOrigin: "center", scale: `${bar} 1` }} />
                <div style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 76, letterSpacing: "-0.02em", color: COLORS.navy, lineHeight: 1.1, marginTop: 18, whiteSpace: "nowrap" }}>
                  {valueText}
                </div>
                <div style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: 36, lineHeight: 1.25, color: COLORS.muted, marginTop: 10, opacity: labelOpacity }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 56,
            maxWidth: 860,
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 44,
            lineHeight: 1.35,
            color: COLORS.ink,
            opacity: supportOpacity,
            translate: `0 ${supportTy}px`,
          }}
        >
          Vooraf duidelijk wat je krijgt, wat het kost en wanneer je live staat.
        </div>
      </div>
    </Scene>
  );
}
