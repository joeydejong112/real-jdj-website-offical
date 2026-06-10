"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { packages, whatsappUrl } from "../lib/content";
import type { Package } from "../lib/content";
import { Reveal, SectionHeading, useMotionTiming } from "./motion-primitives";

export function Pricing() {
  return (
    <section id="pakketten" className="relative py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Pakketten"
          title="Kies het pakket dat bij jouw bedrijf past"
          align="center"
          className="mx-auto max-w-[700px]"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-[52ch] text-center text-[17px] leading-8 text-muted">
            Eén vaste opstartprijs, één vast maandbedrag. Geen kleine lettertjes,
            geen verrassingen achteraf.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {packages.map((pkg, index) => (
            <PricingCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-[14px] font-medium text-muted">
            Maandbedrag dekt hosting, SSL, updates en fair-use wijzigingen ·{" "}
            <a
              href="#faq"
              className="inline-flex min-h-11 min-w-11 items-center font-bold text-teal-deep underline underline-offset-4 hover:text-navy lg:min-h-0 lg:min-w-0"
            >
              zie veelgestelde vragen
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PricingCard({ pkg, index }: { pkg: Package; index: number }) {
  const isFeatured = pkg.featured === true;
  const timing = useMotionTiming();

  return (
    <Reveal delay={index * 0.12} y={48} className="h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={
          timing.isMobile
            ? { type: "spring", stiffness: 420, damping: 28 }
            : { type: "spring", stiffness: 280, damping: 24 }
        }
        className={`relative flex h-full flex-col rounded-3xl p-8 lg:p-9 ${
          isFeatured
            ? "bg-navy text-white shadow-[0_36px_72px_-24px_rgba(7,23,47,0.5)] lg:-mt-5 lg:mb-5"
            : "bg-white shadow-[0_4px_16px_rgba(7,23,47,0.06)]"
        }`}
      >
        {isFeatured && (
          <span className="font-display absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber px-5 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy shadow-md">
            Meest gekozen
          </span>
        )}

        <h3
          className={`font-display text-[26px] font-extrabold ${isFeatured ? "text-white" : "text-navy"}`}
        >
          {pkg.name}
        </h3>
        <p
          className={`mt-1 text-[15px] font-semibold ${isFeatured ? "text-teal" : "text-teal-deep"}`}
        >
          {pkg.subtitle}
        </p>

        <div className={`mt-7 border-t pt-7 ${isFeatured ? "border-white/15" : "border-line"}`}>
          <div className="flex flex-wrap items-end gap-x-2.5 gap-y-1">
            <strong className="font-display text-[46px] font-extrabold leading-none tracking-tight">
              {pkg.setup}
            </strong>
            <span className={`pb-1.5 text-[13px] font-semibold ${isFeatured ? "text-white/55" : "text-muted"}`}>
              eenmalig
            </span>
          </div>
          <p className={`mt-2 text-[15px] font-bold ${isFeatured ? "text-teal" : "text-teal-deep"}`}>
            + {pkg.monthly} per maand
          </p>
        </div>

        <ul className="mt-7 grid flex-1 content-start gap-3.5 text-[15px]">
          {pkg.basedOn && (
            <li
              className={`text-[13px] font-bold uppercase tracking-[0.08em] ${
                isFeatured ? "text-white/50" : "text-muted"
              }`}
            >
              {pkg.basedOn}
            </li>
          )}
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  isFeatured ? "bg-teal text-navy" : "bg-teal-soft text-teal-deep"
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className={isFeatured ? "text-white/85" : "text-ink"}>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={whatsappUrl(`Hi JDJ, ik heb interesse in het ${pkg.name}-pakket. Kun je me meer vertellen?`)}
          className={`mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-[15px] font-bold transition-colors ${
            isFeatured
              ? "bg-teal text-white hover:bg-teal-deep"
              : "border-2 border-navy/15 text-navy hover:border-teal hover:text-teal-deep"
          }`}
        >
          Start met {pkg.name}
        </a>
      </motion.article>
    </Reveal>
  );
}
