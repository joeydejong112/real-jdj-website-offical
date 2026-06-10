"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { CheckCheck, CheckCircle2, Globe, MessageCircle, Undo2 } from "lucide-react";
import { EASE_OUT_EXPO, MaskWords, WhatsAppButton, useMotionTiming } from "./motion-primitives";

const heroPoints = [
  "Oplevering in 1–2 weken na ontvangst content",
  "Start binnen 48 uur na akkoord",
  "Voor bedrijven",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const artY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const chatY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduceMotion ? 1 : 0.25]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-[76px]">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <motion.div
        className="absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-teal/15 blur-[110px]"
        style={{ y: glowY }}
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-10 pb-16 pt-10 sm:gap-14 sm:pb-20 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pb-28 lg:pt-20">
        <motion.div className="min-w-0" style={{ opacity: copyOpacity }}>
          <h1 className="font-display max-w-full pl-1 text-[clamp(32px,9.4vw,44px)] font-extrabold leading-[1.04] tracking-tight text-navy sm:pl-0 sm:text-[clamp(50px,6vw,84px)] sm:leading-[0.98]">
            <span className="block sm:hidden">
              <span className="block whitespace-nowrap">Moderne website</span>
            </span>
            <span className="hidden sm:block">
              <MaskWords text="Moderne website" inView={false} delay={0.15} />
            </span>
            <span className="relative block text-teal">
              <span className="block sm:hidden">
                <span className="block whitespace-nowrap">zonder gedoe.</span>
              </span>
              <span className="hidden sm:block">
                <MaskWords text="zonder gedoe." inView={false} delay={0.35} />
              </span>
              <svg
                className="absolute -bottom-3 left-1 w-[58%] max-w-[260px] text-amber"
                viewBox="0 0 200 14"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M3 10C40 4 80 3 197 8"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: timing.duration(0.8, 0.34), delay: timing.delay(1, 0.18), ease: "easeOut" }}
                />
              </svg>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-full text-[clamp(18px,5vw,22px)] font-semibold leading-snug text-ink sm:mt-7 sm:max-w-[34ch] sm:text-[clamp(19px,1.7vw,23px)]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: timing.duration(0.7, 0.3), delay: timing.delay(0.55, 0.14), ease: EASE_OUT_EXPO }}
          >
            Vaste pakketten. Vaste prijs.{" "}
            <br className="sm:hidden" />
            <span className="text-teal-deep">Snel online.</span>
          </motion.p>

          <motion.ul
            className="mt-6 grid gap-3 text-[15px] text-ink sm:mt-7 sm:gap-3.5 sm:text-[16px]"
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            transition={{ staggerChildren: timing.stagger(0.09, 0.04), delayChildren: timing.delay(0.65, 0.16) }}
          >
            {heroPoints.map((point) => (
              <motion.li
                key={point}
                className="flex items-center gap-3"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  show: { opacity: 1, x: 0, transition: { duration: timing.duration(0.6, 0.26), ease: EASE_OUT_EXPO } },
                }}
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" strokeWidth={2.4} />
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: timing.duration(0.7, 0.3), delay: timing.delay(0.95, 0.2), ease: EASE_OUT_EXPO }}
          >
            <WhatsAppButton
              size="lg"
              className="w-[calc(100vw-32px)] max-w-full px-5 text-[15px] sm:w-auto sm:px-8 sm:text-[17px]"
            >
              <span className="sm:hidden">Stuur WhatsApp</span>
              <span className="hidden sm:inline">Stuur een WhatsApp</span>
            </WhatsAppButton>
            <span className="hand-note -rotate-2 items-center gap-3 text-[15px] font-semibold leading-tight text-ink/80">
              <Undo2
                className="h-8 w-8 -rotate-[24deg] text-ink/60"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span>
                Snel persoonlijk
                <br />
                contact
              </span>
            </span>
          </motion.div>
        </motion.div>

        <HeroArt artY={artY} chatY={chatY} />
      </div>
    </section>
  );
}

interface HeroArtProps {
  artY: ReturnType<typeof useTransform<number, number>>;
  chatY: ReturnType<typeof useTransform<number, number>>;
}

/** Hand-built browser + WhatsApp mockup: the offer and the conversion path in one image. */
function HeroArt({ artY, chatY }: HeroArtProps) {
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();

  return (
    <div
      className="relative mx-auto min-w-0 w-[calc(100vw-32px)] max-w-full sm:w-full sm:max-w-[560px] lg:max-w-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ y: artY }}
        initial={reduceMotion ? false : { opacity: 0, y: timing.y(40, 22), rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: timing.duration(1, 0.42), delay: timing.delay(0.4, 0.1), ease: EASE_OUT_EXPO }}
        className="relative"
      >
        {/* Browser window */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_32px_64px_-24px_rgba(7,23,47,0.25)]">
          <div className="flex items-center gap-3 border-b border-line bg-mist px-5 py-3">
            <span className="flex gap-1.5">
              <i className="h-3 w-3 rounded-full bg-[#f87171]" />
              <i className="h-3 w-3 rounded-full bg-amber" />
              <i className="h-3 w-3 rounded-full bg-teal" />
            </span>
            <span className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-muted sm:px-4 sm:text-[12px]">
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">www.jouwbedrijf.nl</span>
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="h-3.5 w-20 rounded-full bg-navy" />
              <span className="flex gap-3">
                <i className="h-2.5 w-6 rounded-full bg-line sm:w-10" />
                <i className="h-2.5 w-6 rounded-full bg-line sm:w-10" />
                <i className="h-2.5 w-8 rounded-full bg-teal/30 sm:w-14" />
              </span>
            </div>

            <div className="mt-8 grid grid-cols-[1.3fr_1fr] items-center gap-6">
              <div>
                <span className="block h-5 w-[92%] rounded-full bg-navy" />
                <span className="mt-2.5 block h-5 w-[68%] rounded-full bg-navy/80" />
                <span className="mt-5 block h-2.5 w-[85%] rounded-full bg-line" />
                <span className="mt-2 block h-2.5 w-[70%] rounded-full bg-line" />
                <span className="mt-6 inline-block h-9 w-32 rounded-full bg-teal" />
              </div>
              <div className="aspect-[4/5] rounded-xl bg-[linear-gradient(140deg,var(--color-teal-soft),var(--color-teal)_140%)]" />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((card) => (
                <div key={card} className="rounded-xl border border-line bg-paper p-3.5">
                  <span className="block h-7 w-7 rounded-lg bg-teal/20" />
                  <span className="mt-3 block h-2.5 w-[80%] rounded-full bg-navy/70" />
                  <span className="mt-2 block h-2 w-[60%] rounded-full bg-line" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery badge */}
        <motion.span
          className="font-display absolute -left-3 -top-5 z-10 inline-block rounded-full bg-navy px-5 py-2.5 text-[14px] font-bold text-white shadow-lg sm:-left-7"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={
            timing.isMobile
              ? { type: "spring", stiffness: 380, damping: 20, delay: 0.22 }
              : { type: "spring", stiffness: 260, damping: 16, delay: 1.05 }
          }
        >
          1–2 weken live
        </motion.span>
      </motion.div>

      {/* WhatsApp conversation card */}
      <motion.div
        style={{ y: chatY }}
        initial={reduceMotion ? false : { opacity: 0, y: timing.y(48, 24), scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: timing.duration(0.9, 0.38), delay: timing.delay(0.85, 0.18), ease: EASE_OUT_EXPO }}
        className="absolute -bottom-10 right-2 z-10 w-[min(270px,calc(100%-24px))] sm:-right-6 sm:w-[270px]"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: timing.duration(5.5, 3.2), repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-line bg-white p-4 shadow-[0_24px_48px_-16px_rgba(7,23,47,0.3)]"
        >
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-wa text-white">
              <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span>
              <strong className="block text-[13px] font-bold text-navy">JDJ Webdevelopment</strong>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-teal-deep">
                <i className="h-1.5 w-1.5 rounded-full bg-wa" />
                online
              </span>
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            <p className="max-w-[88%] justify-self-start rounded-xl rounded-bl-sm bg-mist px-3 py-2 text-[12.5px] leading-snug text-ink">
              Hi! Ik wil graag een website voor mijn bedrijf.
            </p>
            <p className="max-w-[88%] justify-self-end rounded-xl rounded-br-sm bg-teal-soft px-3 py-2 text-[12.5px] leading-snug text-navy">
              Leuk! Ik stuur je vandaag nog een voorstel.
              <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-teal-deep">
                14:02 <CheckCheck className="h-3 w-3" />
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
