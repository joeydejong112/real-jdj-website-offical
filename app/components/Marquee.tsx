"use client";

import { Sparkle } from "lucide-react";
import { marqueeItems } from "../lib/content";

/** Infinite brand ticker between hero and content. */
export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="relative z-10 overflow-hidden border-y border-white/10 bg-navy py-5"
      aria-label={`Kernpunten: ${marqueeItems.join(", ")}`}
    >
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= marqueeItems.length}
            className="font-display flex items-center gap-10 text-[15px] font-bold uppercase tracking-[0.18em] text-white/90"
          >
            {item}
            <Sparkle className="h-4 w-4 text-amber" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
