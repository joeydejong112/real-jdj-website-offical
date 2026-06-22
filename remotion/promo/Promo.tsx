import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { Scene } from "./layout";
import { COLORS } from "./theme";
import { PackageCard } from "./ui/PackageCard";
import type { PackageCardProps } from "./ui/PackageCard";
import { HookScene } from "./scenes/HookScene";
import { ReframeScene } from "./scenes/ReframeScene";
import { ProductScene } from "./scenes/ProductScene";
import { WaaromScene } from "./scenes/WaaromScene";
import { StatsScene } from "./scenes/StatsScene";
import { PakkettenIntroScene } from "./scenes/PakkettenIntroScene";
import { CtaScene } from "./scenes/CtaScene";

/** Total length of the promo in frames @ 30fps (26s). */
export const PROMO_DURATION = 780;

// Package data — verbatim from app/lib/content.ts.
const START: PackageCardProps = {
  stepIndex: 1,
  name: "Start",
  subtitle: "Binnen 1-2 weken online",
  priceTarget: 299,
  monthly: "€29",
  features: [
    "1–3 pagina's",
    "Basis-SEO & snelle laadtijd",
    "Mobielvriendelijk ontwerp",
    "1 revisieronde",
  ],
};

const PLUS: PackageCardProps = {
  featured: true,
  stepIndex: 2,
  name: "Plus",
  subtitle: "Meer pagina's en lokale SEO",
  priceTarget: 699,
  monthly: "€49",
  basedOn: "Alles uit Start, plus:",
  features: [
    "5–7 pagina's",
    "Offerteblok en WhatsApp-CTA's",
    "Paginatitels, meta descriptions en lokale zoektermen",
    "2 revisierondes",
  ],
};

const PRO: PackageCardProps = {
  stepIndex: 3,
  name: "Pro",
  subtitle: "CMS en extra secties",
  priceTarget: 1299,
  monthly: "€79",
  basedOn: "Bovenop Plus:",
  features: [
    "8–12+ pagina's",
    "CMS: zelf secties aanpassen",
    "Projecten, prijslijsten of teamleden",
    "3 revisierondes",
  ],
};

/**
 * JDJ Webdevelopment Instagram promo (1080x1920, 30fps, 780f).
 * Scenes hard-cut over one continuous Background for "same world, new type".
 */
export function Promo() {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      <Background />

      <Sequence durationInFrames={66}>
        <HookScene />
      </Sequence>
      <Sequence from={66} durationInFrames={99}>
        <ReframeScene />
      </Sequence>
      <Sequence from={165} durationInFrames={99}>
        <ProductScene />
      </Sequence>
      <Sequence from={264} durationInFrames={108}>
        <WaaromScene />
      </Sequence>
      <Sequence from={372} durationInFrames={48}>
        <StatsScene />
      </Sequence>
      <Sequence from={420} durationInFrames={48}>
        <PakkettenIntroScene />
      </Sequence>
      <Sequence from={468} durationInFrames={72}>
        <Scene>
          <PackageCard {...START} />
        </Scene>
      </Sequence>
      <Sequence from={540} durationInFrames={114}>
        <Scene>
          <PackageCard {...PLUS} />
        </Scene>
      </Sequence>
      <Sequence from={654} durationInFrames={72}>
        <Scene>
          <PackageCard {...PRO} />
        </Scene>
      </Sequence>
      <Sequence from={726} durationInFrames={54}>
        <CtaScene />
      </Sequence>
    </AbsoluteFill>
  );
}
