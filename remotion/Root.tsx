import { Composition } from "remotion";
import { HelloWorld } from "./Composition";
import { Promo, PROMO_DURATION } from "./promo/Promo";

// Each <Composition> defines a renderable video: its dimensions, fps, duration
// and default props. Add more <Composition> entries here as you build videos.
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="JDJPromo"
        component={Promo}
        durationInFrames={PROMO_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "JDJ Freelance",
          subtitleText: "Web Development",
        }}
      />
    </>
  );
}
