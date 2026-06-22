import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { bodyFont, COLORS } from "../theme";

interface CheckRowProps {
  text: string;
  /** True on the navy featured (Plus) card. */
  dark?: boolean;
  fontSize?: number;
  style?: CSSProperties;
}

/** A single package feature: teal check badge + Dutch label, left-aligned. */
export function CheckRow({ text, dark = false, fontSize = 44, style }: CheckRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 22,
        textAlign: "left",
        ...style,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          marginTop: 2,
          backgroundColor: dark ? COLORS.teal : COLORS.tealSoft,
          color: dark ? COLORS.navy : COLORS.tealDeep,
        }}
      >
        <Check size={26} strokeWidth={3.2} />
      </span>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize,
          fontWeight: 500,
          lineHeight: 1.25,
          color: dark ? "rgba(255,255,255,0.85)" : COLORS.ink,
        }}
      >
        {text}
      </span>
    </div>
  );
}
