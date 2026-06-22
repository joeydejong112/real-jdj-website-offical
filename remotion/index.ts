import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

// Entry point the Remotion CLI / Studio auto-detects (remotion/index.ts).
// Never import this file from Next.js code — registerRoot() must only run
// inside the Remotion bundler.
registerRoot(RemotionRoot);
