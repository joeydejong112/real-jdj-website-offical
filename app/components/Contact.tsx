"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Clock, Mail, ShieldCheck } from "lucide-react";
import { EMAIL } from "../lib/content";
import { Magnetic, MaskWords, Reveal, WhatsAppButton } from "./motion-primitives";

const promises = [
  { icon: Clock, text: "Reactie binnen 24 uur op werkdagen" },
  { icon: ShieldCheck, text: "Vrijblijvend advies, zonder verplichting" },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [80, reduceMotion ? 80 : -80]);

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-28">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[32px] bg-navy px-7 py-16 text-white sm:px-12 lg:px-20 lg:py-20">
          <motion.div
            className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-teal/20 blur-[100px]"
            style={{ y: glowY }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-teal/10 blur-[90px]"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-display text-[clamp(32px,9vw,44px)] font-extrabold leading-[1.04] tracking-tight sm:text-[clamp(36px,4.6vw,60px)] sm:leading-[1.02]">
                <span className="block sm:hidden">
                  Klaar om snel
                  <br />
                  online te gaan?
                </span>
                <span className="hidden sm:block">
                  <MaskWords text="Klaar voor een website binnen 1-2 weken?" />
                </span>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-full text-[16px] leading-7 text-white/70 sm:mt-6 sm:max-w-[48ch] sm:text-[17px] sm:leading-8">
                  Stuur een bericht. Binnen 24 uur krijg je pakketadvies op basis van je
                  pagina's, content en planning.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
                  <Magnetic className="w-full sm:w-auto">
                    <WhatsAppButton
                      size="lg"
                      className="w-full px-5 text-[15px] sm:w-auto sm:px-8 sm:text-[17px]"
                    >
                      <span className="sm:hidden">Stuur WhatsApp</span>
                      <span className="hidden sm:inline">Stuur een WhatsApp</span>
                    </WhatsAppButton>
                  </Magnetic>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group inline-flex min-h-11 max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    <Mail className="h-4.5 w-4.5 text-teal" />
                    Liever mailen?{" "}
                    <span className="break-all underline underline-offset-4 decoration-teal group-hover:decoration-white">
                      {EMAIL}
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="lg:justify-self-end">
              <div className="grid w-full max-w-[340px] gap-4">
                {promises.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/15 text-teal">
                      <Icon className="h-5.5 w-5.5" strokeWidth={2.2} />
                    </span>
                    <p className="text-[15px] font-semibold leading-snug text-white/85">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
