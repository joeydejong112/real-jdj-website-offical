import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Squiggle } from "../ui/Squiggle";
import { SeoPreview } from "../ui/SeoPreview";
import { bodyFont, COLORS, displayFont, EASE_OUT_EXPO, SAFE } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PROP_LEN = 27;

const PROPS = [
  { kw: "Snel online", sup: "Live in 1–2 weken na content" },
  { kw: "Persoonlijk contact", sup: "Appen via WhatsApp, antwoord binnen 24 uur" },
  { kw: "Technisch netjes", sup: "Snelle laadtijd · SSL & veilig · mobielvriendelijk" },
  { kw: "Vindbaar", sup: "Paginatitels, meta descriptions en lokale zoektermen", seo: true },
];

/** Scene 4 — "Waarom JDJ": four value props, one at a time; prop 4 = lokale SEO. */
export function WaaromScene() {
  const frame = useCurrentFrame();

  const eyebrowOpacity = interpolate(frame, [0, 10], [0, 1], clamp);
  const eyebrowTx = interpolate(frame, [0, 10], [-20, 0], { easing: EASE_OUT_EXPO, ...clamp });

  return (
    <AbsoluteFill
      style={{
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
        fontFamily: bodyFont,
      }}
    >
      {/* eyebrow pinned near top */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: eyebrowOpacity,
          translate: `${eyebrowTx}px 0`,
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: COLORS.tealDeep,
        }}
      >
        01 — Waarom JDJ
      </div>

      {PROPS.map((prop, i) => {
        const start = i * PROP_LEN;
        const p = frame - start;
        const isLast = i === PROPS.length - 1;

        const enterOpacity = interpolate(p, [0, 7], [0, 1], clamp);
        const enterTx = interpolate(p, [0, 7], [-40, 0], { easing: EASE_OUT_EXPO, ...clamp });
        const exitOpacity = isLast ? 1 : interpolate(p, [21, 27], [1, 0], clamp);
        const exitTx = isLast ? 0 : interpolate(p, [21, 27], [0, 40], { easing: EASE_OUT_EXPO, ...clamp });
        const squiggle = interpolate(p, [7, 16], [0, 1], { easing: EASE_OUT_EXPO, ...clamp });
        const supOpacity = interpolate(p, [10, 18], [0, 1], clamp);
        const supTy = interpolate(p, [10, 18], [14, 0], { easing: EASE_OUT_EXPO, ...clamp });

        return (
          <AbsoluteFill
            key={prop.kw}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingLeft: SAFE.side,
              paddingRight: SAFE.side,
              opacity: enterOpacity * exitOpacity,
              translate: `${enterTx + exitTx}px 0`,
            }}
          >
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontSize: 92,
                letterSpacing: "-0.02em",
                color: COLORS.navy,
                lineHeight: 1,
              }}
            >
              {prop.kw}
            </div>
            {!prop.seo && (
              <div style={{ marginTop: 6 }}>
                <Squiggle progress={squiggle} width={380} />
              </div>
            )}
            <div
              style={{
                marginTop: prop.seo ? 28 : 18,
                maxWidth: 820,
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: 50,
                lineHeight: 1.3,
                color: COLORS.ink,
                opacity: supOpacity,
                translate: `0 ${supTy}px`,
              }}
            >
              {prop.sup}
            </div>
            {prop.seo && (
              <div style={{ marginTop: 40 }}>
                <SeoPreview frame={p} />
              </div>
            )}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
}
