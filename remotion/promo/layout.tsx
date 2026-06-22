import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { bodyFont, COLORS, SAFE } from "./theme";

interface SceneProps {
  children: ReactNode;
  justify?: CSSProperties["justifyContent"];
  style?: CSSProperties;
}

/** Full-frame scene container that keeps all content inside the IG safe area. */
export function Scene({ children, justify = "center", style }: SceneProps) {
  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: justify,
        textAlign: "center",
        fontFamily: bodyFont,
        color: COLORS.ink,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

interface ClipRevealProps {
  progress: number;
  children: ReactNode;
  style?: CSSProperties;
}

/** Mask-style reveal: the child rises from under a clip box as progress 0 -> 1. */
export function ClipReveal({ progress, children, style }: ClipRevealProps) {
  const ty = interpolate(progress, [0, 1], [115, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(progress, [0, 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        paddingBottom: "0.1em",
        ...style,
      }}
    >
      <span style={{ display: "block", translate: `0 ${ty}%`, opacity }}>
        {children}
      </span>
    </span>
  );
}
