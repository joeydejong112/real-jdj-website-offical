import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Remotion's <Composition>/<Player> require props assignable to
// Record<string, unknown>; a TS `interface` does not satisfy that index-signature
// constraint, so composition props must be declared as a `type` alias.
export type HelloWorldProps = {
  titleText: string;
  subtitleText: string;
};

// Sample composition. Animate with useCurrentFrame() + interpolate(), keep the
// interpolate() call inline in `style`, and use individual transform properties
// (scale/translate/rotate) so the animation stays editable in Remotion Studio.
// CSS transitions/animations do NOT render correctly and must not be used here.
export function HelloWorld({ titleText, subtitleText }: HelloWorldProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0b0f",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          opacity: interpolate(frame, [0, fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          scale: interpolate(frame, [0, fps], [0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          {titleText}
        </h1>
        <p
          style={{
            margin: 0,
            marginTop: 16,
            color: "#8b8b97",
            fontSize: 44,
            fontWeight: 500,
            opacity: interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            }),
            translate: interpolate(
              frame,
              [fps * 0.5, fps * 1.5],
              ["0px 24px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              },
            ),
          }}
        >
          {subtitleText}
        </p>
      </div>
    </AbsoluteFill>
  );
}
