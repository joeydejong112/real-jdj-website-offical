"use client";

import { Player } from "@remotion/player";
import { HelloWorld } from "../../remotion/Composition";

// Example of embedding a Remotion composition on a website page with the
// interactive <Player>. Import and render <RemotionPlayerExample /> from any
// page/component. Safe to delete once you wire in your own player usage.
export function RemotionPlayerExample() {
  return (
    <Player
      component={HelloWorld}
      inputProps={{ titleText: "JDJ Freelance", subtitleText: "Web Development" }}
      durationInFrames={150}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      style={{ width: "100%", aspectRatio: "16 / 9" }}
      controls
    />
  );
}
