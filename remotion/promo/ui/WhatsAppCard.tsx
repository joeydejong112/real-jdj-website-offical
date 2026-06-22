import { CheckCheck, MessageCircle } from "lucide-react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { bodyFont, COLORS } from "../theme";

export interface ChatBubble {
  side: "in" | "out";
  text: string;
  time?: string;
}

interface WhatsAppCardProps {
  width?: number;
  /** Scene-local frame at which the card springs in. */
  appearAt?: number;
  bubbles: ChatBubble[];
}

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** The site's WhatsApp conversation card (Hero.tsx), with a pulsing online dot. */
export function WhatsAppCard({ width = 300, appearAt = 0, bubbles }: WhatsAppCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 22, stiffness: 300 },
  });
  const scale = interpolate(enter, [0, 1], [0.95, 1]);
  const ty = interpolate(enter, [0, 1], [48, 0]);
  const opacity = interpolate(frame, [appearAt, appearAt + 8], [0, 1], clamp);
  const dotPulse = 0.55 + 0.45 * Math.sin(frame / 9);

  return (
    <div
      style={{
        width,
        scale,
        translate: `0 ${ty}px`,
        opacity,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 26,
        padding: 22,
        boxShadow: "0 28px 56px -20px rgba(7,23,47,0.32)",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderBottom: `1px solid ${COLORS.line}`,
          paddingBottom: 16,
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            backgroundColor: COLORS.wa,
            color: COLORS.white,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <MessageCircle size={28} strokeWidth={2.4} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: 26,
              color: COLORS.navy,
            }}
          >
            JDJ Webdevelopment
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 22,
              color: COLORS.tealDeep,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: COLORS.wa,
                opacity: dotPulse,
              }}
            />
            online
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
        {bubbles.map((b, i) => {
          const at = appearAt + 14 + i * 12;
          const bOpacity = interpolate(frame, [at, at + 8], [0, 1], clamp);
          const bTy = interpolate(frame, [at, at + 10], [14, 0], clamp);
          const isOut = b.side === "out";
          return (
            <div
              key={b.text}
              style={{
                alignSelf: isOut ? "flex-end" : "flex-start",
                maxWidth: "88%",
                opacity: bOpacity,
                translate: `0 ${bTy}px`,
                backgroundColor: isOut ? COLORS.tealSoft : COLORS.mist,
                color: isOut ? COLORS.navy : COLORS.ink,
                borderRadius: 18,
                borderBottomRightRadius: isOut ? 6 : 18,
                borderBottomLeftRadius: isOut ? 18 : 6,
                padding: "14px 18px",
                fontFamily: bodyFont,
                fontSize: 24,
                lineHeight: 1.3,
                fontWeight: 500,
              }}
            >
              {b.text}
              {b.time && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 6,
                    marginTop: 4,
                    fontSize: 18,
                    color: COLORS.tealDeep,
                  }}
                >
                  {b.time}
                  <CheckCheck size={18} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
