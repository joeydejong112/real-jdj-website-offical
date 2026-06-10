"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { WHATSAPP_DEFAULT } from "../lib/content";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function useMotionTiming() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return {
    isMobile,
    duration: (desktop: number, mobile = Math.max(0.18, desktop * 0.55)) =>
      isMobile ? mobile : desktop,
    delay: (desktop: number, mobile = desktop * 0.42) => (isMobile ? mobile : desktop),
    stagger: (desktop: number, mobile = desktop * 0.55) => (isMobile ? mobile : desktop),
    y: (desktop: number, mobile = Math.round(desktop * 0.6)) => (isMobile ? mobile : desktop),
  };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fade-up reveal when the element scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 32, once = true }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();
  const revealY = timing.y(y);

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: revealY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: timing.duration(0.8, 0.38), delay: timing.delay(delay), ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

interface MaskWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}

/**
 * Per-word mask reveal: words slide up out of an invisible "letterbox".
 * The viewport observer watches the unclipped container — the clipped words
 * themselves never "intersect", so they can't be observed directly.
 */
export function MaskWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  inView = true,
}: MaskWordsProps) {
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: timing.stagger(stagger), delayChildren: timing.delay(delay) } },
  };

  const wordVariants = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: timing.duration(0.9, 0.42), ease: EASE_OUT_EXPO } },
  };

  return (
    <motion.span
      className={className}
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
          >
            <motion.span className="inline-block will-change-transform" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

/** Numbered eyebrow + masked display heading; the shared section opener. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  align = "left",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <Reveal y={16}>
        <p
          className={`inline-flex items-baseline gap-3 text-[13px] font-bold uppercase tracking-[0.22em] ${
            dark ? "text-teal" : "text-teal-deep"
          }`}
        >
          <span className={dark ? "text-amber" : "text-navy/40"}>{index}</span>
          {eyebrow}
        </p>
      </Reveal>
      <h2
        className={`font-display mt-4 text-[clamp(34px,4.2vw,56px)] font-bold leading-[1.04] tracking-tight ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        <MaskWords text={title} delay={0.1} />
      </h2>
    </div>
  );
}

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Counts up from zero once scrolled into view. */
export function Counter({ to, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();
  const countDuration = timing.duration(1.6, 0.75);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: countDuration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [countDuration, isInView, reduceMotion, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Element gently follows the cursor while hovered. */
export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`inline-block ${className ?? ""}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}

interface WhatsAppButtonProps {
  children?: ReactNode;
  href?: string;
  size?: "md" | "lg";
  variant?: "solid" | "inverted";
  className?: string;
}

export function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M12.04 2a9.85 9.85 0 0 0-8.5 14.83L2.15 22l5.3-1.35A9.92 9.92 0 0 0 12.04 21.77h.01A9.89 9.89 0 0 0 21.95 12 9.9 9.9 0 0 0 12.04 2Zm.01 18.08h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.14.8.84-3.04-.2-.31A8.16 8.16 0 1 1 12.05 20.08Zm4.48-6.11c-.25-.12-1.45-.71-1.67-.79-.22-.08-.38-.12-.54.12-.16.25-.62.79-.76.95-.14.16-.28.18-.53.06-.25-.12-1.03-.38-1.96-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.16 1.72 2.62 4.17 3.67.58.25 1.04.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/** Primary conversion action; identical look everywhere it appears. */
export function WhatsAppButton({
  children = "Stuur een WhatsApp",
  href = WHATSAPP_DEFAULT,
  size = "md",
  variant = "solid",
  className = "",
}: WhatsAppButtonProps) {
  const timing = useMotionTiming();
  const sizing =
    size === "lg"
      ? "min-h-14 px-8 py-4 text-[17px]"
      : "min-h-12 px-6 py-3 text-[15px]";
  const colors =
    variant === "inverted"
      ? "bg-white text-navy hover:bg-paper"
      : "bg-teal text-white hover:bg-teal-deep";

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-full font-bold transition-colors ${sizing} ${colors} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={
        timing.isMobile
          ? { type: "spring", stiffness: 520, damping: 26 }
          : { type: "spring", stiffness: 380, damping: 20 }
      }
    >
      <WhatsAppMark className="h-5 w-5 shrink-0" />
      {children}
    </motion.a>
  );
}
