import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  bodyFont,
  COLORS,
  displayFont,
  EASE_OUT_EXPO,
  formatThousands,
} from "../theme";
import { CheckRow } from "./CheckRow";

export interface PackageCardProps {
  featured?: boolean;
  stepIndex: number;
  name: string;
  subtitle: string;
  /** Numeric setup price the count-up lands on (299 / 699 / 1299). */
  priceTarget: number;
  /** Monthly price label, e.g. "€29". */
  monthly: string;
  basedOn?: string;
  features: string[];
}

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * One full-screen package card. Start/Pro render as white cards; the featured
 * Plus renders as the larger navy card with the amber "Meest gekozen" pill, a
 * bigger price, the longest dwell and a subtle breathing motion. All entrance
 * motion is driven by useCurrentFrame() (local to the card's Sequence).
 */
export function PackageCard(props: PackageCardProps) {
  const { featured = false } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: featured
      ? { damping: 15, stiffness: 130 }
      : { damping: 18, stiffness: 140 },
  });
  const cardScale = interpolate(enter, [0, 1], [featured ? 0.9 : 0.94, 1]);
  const cardTy = interpolate(enter, [0, 1], [featured ? 50 : 60, featured ? -12 : 0]);
  const cardOpacity = interpolate(frame, [0, 8], [0, 1], clamp);
  const breathe = featured ? 1 + 0.012 * Math.sin(frame / 22) : 1;

  const nameProg = interpolate(frame, featured ? [20, 32] : [9, 21], [0, 1], {
    easing: EASE_OUT_EXPO,
    ...clamp,
  });
  const nameTy = interpolate(nameProg, [0, 1], [40, 0]);

  const [cStart, cEnd] = featured ? [32, 52] : [18, 34];
  const priceVal = interpolate(frame, [cStart, cEnd], [0, props.priceTarget], clamp);
  const priceStr = `€${formatThousands(priceVal)}`;
  const priceSettle = interpolate(
    frame,
    [cStart, cStart + 12],
    [featured ? 1.12 : 1.1, 1],
    { easing: EASE_OUT_EXPO, ...clamp },
  );
  const eenmaligOpacity = interpolate(frame, [cEnd, cEnd + 6], [0, 1], clamp);
  const monthlyOpacity = interpolate(frame, [cEnd + 2, cEnd + 12], [0, 1], clamp);
  const monthlyTx = interpolate(frame, [cEnd + 2, cEnd + 12], [-16, 0], {
    easing: EASE_OUT_EXPO,
    ...clamp,
  });

  const pillSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const pillTy = interpolate(pillSpring, [0, 1], [-30, 0]);
  const pillScale = interpolate(pillSpring, [0, 1], [0.6, 1]);
  const pillRotate = interpolate(frame, [12, 26], [-6, 0], {
    easing: EASE_OUT_EXPO,
    ...clamp,
  });

  const featStart = featured ? 60 : props.basedOn ? 44 : 42;
  const featStep = featured ? 6 : 3;

  const priceFontSize = featured ? 160 : props.priceTarget >= 1000 ? 132 : 150;

  return (
    <div
      style={{
        position: "relative",
        opacity: cardOpacity,
        scale: cardScale * breathe,
        translate: `0 ${cardTy}px`,
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: -28,
            left: "50%",
            translate: "-50% 0",
            zIndex: 2,
          }}
        >
          <div
            style={{
              translate: `0 ${pillTy}px`,
              scale: pillScale,
              rotate: `${pillRotate}deg`,
              backgroundColor: COLORS.amber,
              color: COLORS.navy,
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "12px 30px",
              borderRadius: 999,
              boxShadow: "0 14px 30px -12px rgba(7,23,47,0.45)",
              whiteSpace: "nowrap",
            }}
          >
            Meest gekozen
          </div>
        </div>
      )}

      <div
        style={{
          width: featured ? 900 : 800,
          boxSizing: "border-box",
          backgroundColor: featured ? COLORS.navy : COLORS.white,
          border: featured ? "none" : `1px solid ${COLORS.line}`,
          borderRadius: 44,
          padding: featured ? "70px 60px 58px" : "58px 56px",
          boxShadow: featured
            ? "0 40px 80px -28px rgba(7,23,47,0.5)"
            : "0 26px 60px -30px rgba(7,23,47,0.2)",
          position: "relative",
          textAlign: "left",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 34,
            right: 40,
            fontFamily: bodyFont,
            fontSize: 34,
            fontWeight: 600,
            color: featured ? "rgba(255,255,255,0.5)" : COLORS.muted,
          }}
        >
          Pakket {props.stepIndex} / 3
        </div>

        <div style={{ overflow: "hidden" }}>
          <div style={{ translate: `0 ${nameTy}px`, opacity: nameProg }}>
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: featured ? 66 : 60,
                letterSpacing: "-0.02em",
                color: featured ? COLORS.white : COLORS.navy,
                lineHeight: 1,
              }}
            >
              {props.name}
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 600,
                fontSize: 40,
                color: featured ? COLORS.teal : COLORS.tealDeep,
                marginTop: 12,
              }}
            >
              {props.subtitle}
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            backgroundColor: featured ? "rgba(255,255,255,0.15)" : COLORS.line,
            margin: "34px 0",
          }}
        />

        <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 800,
              fontSize: priceFontSize,
              letterSpacing: "-0.04em",
              color: featured ? COLORS.white : COLORS.navy,
              lineHeight: 0.9,
              scale: priceSettle,
              transformOrigin: "left bottom",
            }}
          >
            {priceStr}
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 40,
              color: featured ? "rgba(255,255,255,0.55)" : COLORS.muted,
              opacity: eenmaligOpacity,
              paddingBottom: 16,
            }}
          >
            eenmalig
          </div>
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 48,
            color: featured ? COLORS.teal : COLORS.tealDeep,
            marginTop: 14,
            opacity: monthlyOpacity,
            translate: `${monthlyTx}px 0`,
          }}
        >
          + {props.monthly} per maand
        </div>

        <div style={{ marginTop: 38, display: "flex", flexDirection: "column", gap: 22 }}>
          {props.basedOn && (
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 700,
                fontSize: 34,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: featured ? "rgba(255,255,255,0.5)" : COLORS.muted,
                opacity: interpolate(frame, [featStart - 6, featStart], [0, 1], clamp),
              }}
            >
              {props.basedOn}
            </div>
          )}
          {props.features.map((f, i) => {
            const s = featStart + i * featStep;
            return (
              <CheckRow
                key={f}
                text={f}
                dark={featured}
                style={{
                  opacity: interpolate(frame, [s, s + 8], [0, 1], clamp),
                  translate: `${interpolate(frame, [s, s + 10], [-14, 0], {
                    easing: EASE_OUT_EXPO,
                    ...clamp,
                  })}px 0`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
