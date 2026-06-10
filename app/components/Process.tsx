"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { steps } from "../lib/content";
import { EASE_OUT_EXPO, Reveal, SectionHeading, WhatsAppButton } from "./motion-primitives";

export function Process() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.72", "end 0.72"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="werkwijze" className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28">
      <div
        className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-teal/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="02"
            eyebrow="Werkwijze"
            title="Van eerste appje naar live website"
            dark
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-[44ch] text-[17px] leading-8 text-white/65">
              Vijf duidelijke stappen, zonder verrassingen. Jij weet altijd waar we staan
              en wat de volgende stap is — gewoon via WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-9">
            <WhatsAppButton variant="inverted">Start stap 1 — app me</WhatsAppButton>
          </Reveal>
        </div>

        <ol ref={timelineRef} className="relative grid gap-6">
          {/* Track + scroll-linked fill */}
          <span
            className="absolute bottom-8 left-[21px] top-8 w-[2px] bg-white/12 sm:left-[27px]"
            aria-hidden="true"
          />
          <motion.span
            className="absolute bottom-8 left-[21px] top-8 w-[2px] origin-top bg-teal sm:left-[27px]"
            style={{ scaleY: reduceMotion ? 1 : lineProgress }}
            aria-hidden="true"
          />

          {steps.map(({ icon: Icon, title, text }, index) => (
            <motion.li
              key={title}
              className="relative grid min-w-0 grid-cols-[44px_minmax(0,1fr)] gap-3 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: EASE_OUT_EXPO }}
            >
              <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-navy text-teal shadow-[0_0_0_4px_var(--color-navy-deep)] sm:h-14 sm:w-14 sm:shadow-[0_0_0_6px_var(--color-navy-deep)]">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-teal/40 hover:bg-white/[0.07] sm:p-6">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-teal">
                  Stap {index + 1}
                </span>
                <h3 className="font-display mt-1.5 text-[21px] font-bold text-white">{title}</h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-7 text-white/65">{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
