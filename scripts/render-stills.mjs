// Dev QA helper: bundle the Remotion project once and render representative
// stills from every scene of JDJPromo so layout/colour/timing can be reviewed
// without re-bundling per frame. Usage: node scripts/render-stills.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "..");
const entry = path.resolve(root, "remotion", "index.ts");

// One frame from each beat across the 780-frame timeline.
const frames = [50, 130, 255, 305, 369, 410, 535, 645, 720, 776];

const serveUrl = await bundle({
  entryPoint: entry,
  outDir: path.join(root, "out", "bundle"),
});
console.log("bundled");

const composition = await selectComposition({ serveUrl, id: "JDJPromo" });
console.log("composition:", composition.width, "x", composition.height, composition.durationInFrames, "frames");

for (const frame of frames) {
  const output = path.join(root, "out", "stills", `f${String(frame).padStart(3, "0")}.png`);
  await renderStill({ serveUrl, composition, output, frame, scale: 0.5, overwrite: true });
  console.log("rendered frame", frame);
}
console.log("DONE");
