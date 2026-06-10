"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Bolt,
  Handshake,
  HeartHandshake,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";
import { stats } from "../lib/content";
import { Counter, EASE_OUT_EXPO, Reveal, SectionHeading, useMotionTiming } from "./motion-primitives";

const techChips = [
  { icon: Zap, label: "Snelle laadtijd" },
  { icon: ShieldCheck, label: "SSL & veilig" },
  { icon: Smartphone, label: "Mobielvriendelijk" },
  { icon: Wrench, label: "Onderhoudsarm" },
];

const deliveryTimeline = [
  { icon: Handshake, label: "Akkoord" },
  { icon: Bolt, label: "Start binnen 48 uur" },
  { icon: Rocket, label: "Live in 1–2 weken" },
];

export function Benefits() {
  return (
    <section id="waarom-jdj" className="relative py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionHeading
            index="01"
            eyebrow="Waarom JDJ"
            title="Een website die werkt, zonder agency-circus"
          />
          <Reveal delay={0.2}>
            <p className="max-w-[46ch] text-[17px] leading-8 text-muted lg:justify-self-end">
              Geen lange offertes, geen vage uurtarieven en geen wekenlang wachten op antwoord.
              Je weet vooraf wat je krijgt, wat het kost en wanneer het live staat.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-0 pl-[62px] before:absolute before:left-[26px] before:top-3 before:bottom-10 before:w-px before:bg-gradient-to-b before:from-teal/55 before:via-line before:to-transparent lg:grid-cols-12 lg:gap-5 lg:pl-0 lg:before:hidden">
          <BentoCard span="lg:col-span-7" delay={0}>
            <div className="flex items-center gap-3 lg:block">
              <CardHeader icon={Bolt} number="01" />
              <h3 className="font-display min-w-0 text-[24px] font-bold leading-tight text-navy lg:mt-6">
                Snel online
              </h3>
            </div>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-7 text-muted">
              Geen maandenlange trajecten. Vandaag akkoord betekent deze week nog de eerste
              stap. Binnen twee weken sta je live.
            </p>
            <DeliveryTimeline />
          </BentoCard>

          <BentoCard span="lg:col-span-5" surface="bg-navy" delay={0.1}>
            <div className="flex items-center gap-3 lg:block">
              <CardHeader icon={HeartHandshake} number="02" dark />
              <h3 className="font-display min-w-0 text-[24px] font-bold leading-tight text-navy lg:mt-6 lg:text-white">
                Persoonlijk contact
              </h3>
            </div>
            <p className="mt-3 text-[15px] leading-7 text-muted lg:text-white/65">
              Je appt met mij via WhatsApp. Ik antwoord binnen 24 uur en pak je vraag
              zelf op.
            </p>
            <ChatPreview />
          </BentoCard>

          <BentoCard span="lg:col-span-5" delay={0.15}>
            <div className="flex items-center gap-3 lg:block">
              <CardHeader icon={ShieldCheck} number="03" />
              <h3 className="font-display min-w-0 text-[24px] font-bold leading-tight text-navy lg:mt-6">
                Technisch netjes
              </h3>
            </div>
            <p className="mt-3 text-[15px] leading-7 text-muted">
              Ik bouw de site op een nette technische basis, zodat hosting en onderhoud
              beheersbaar blijven.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {techChips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-[13px] font-semibold text-ink"
                >
                  <Icon className="h-4 w-4 text-teal-deep" strokeWidth={2.3} />
                  {label}
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard span="lg:col-span-7" surface="bg-teal-soft" delay={0.2}>
            <div className="flex items-center gap-3 lg:hidden">
              <CardHeader icon={Search} number="04" />
              <h3 className="font-display min-w-0 text-[24px] font-bold leading-tight text-navy">
                Titels en lokale zoektermen
              </h3>
            </div>
            <div className="hidden lg:block">
              <CardHeader icon={Search} number="04" />
            </div>
            <div className="grid items-center gap-7 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <h3 className="hidden font-display text-[24px] font-bold text-navy lg:block">
                  Titels en lokale zoektermen
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-teal-deep/90">
                  Ik zet de pagina's op met logische headings, paginatitels en lokale
                  zoektermen.
                </p>
              </div>
              <SearchResultPreview />
            </div>
          </BentoCard>
        </div>

        <Reveal delay={0.15} className="mt-16">
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-4 lg:divide-x lg:divide-line lg:px-8 lg:py-10">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 px-3 py-5 text-center sm:px-5 sm:py-7 lg:px-6 lg:py-0 ${
                  index % 2 === 0 ? "border-r border-line/70 lg:border-r-0" : ""
                } ${index < 2 ? "border-b border-line/70 lg:border-b-0" : ""}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display whitespace-nowrap text-[clamp(27px,7vw,34px)] font-extrabold leading-none tracking-tight text-navy sm:text-[clamp(36px,3.4vw,48px)]">
                  {stat.value === null ? (
                    <span>
                      {stat.display}
                      {stat.suffix}
                    </span>
                  ) : (
                    <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </dd>
                <dd className="mx-auto mt-2 max-w-[15ch] text-[12px] font-semibold leading-snug text-muted sm:text-[14px] lg:mt-2.5 lg:max-w-none lg:leading-normal">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

interface BentoCardProps {
  children: ReactNode;
  span: string;
  surface?: string;
  delay?: number;
}

function BentoCard({ children, span, surface = "bg-white", delay = 0 }: BentoCardProps) {
  const timing = useMotionTiming();
  const desktopSurface =
    surface === "bg-navy"
      ? "lg:bg-navy"
      : surface === "bg-teal-soft"
        ? "lg:bg-teal-soft"
        : "lg:bg-white";

  return (
    <Reveal delay={delay} className={`h-full min-w-0 ${span}`}>
      <motion.article
        whileHover={timing.isMobile ? undefined : { y: -6 }}
        transition={
          timing.isMobile
            ? { type: "spring", stiffness: 440, damping: 28 }
            : { type: "spring", stiffness: 300, damping: 24 }
        }
        className={`relative h-full overflow-visible bg-transparent pb-11 pt-1 transition-shadow duration-300 lg:overflow-hidden lg:rounded-3xl lg:p-8 lg:shadow-[0_2px_10px_rgba(7,23,47,0.05)] lg:hover:shadow-[0_28px_56px_-24px_rgba(7,23,47,0.25)] ${desktopSurface}`}
      >
        {children}
      </motion.article>
    </Reveal>
  );
}

function CardHeader({ icon: Icon, number, dark = false }: { icon: LucideIcon; number: string; dark?: boolean }) {
  return (
    <div className="relative flex shrink-0 items-start justify-between">
      <span
        className={`absolute -left-[58px] top-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-teal/20 bg-paper text-teal-deep shadow-[0_12px_28px_-18px_rgba(7,23,47,0.45)] lg:static lg:h-12 lg:w-12 lg:rounded-xl lg:border-0 lg:shadow-none ${
          dark ? "lg:bg-teal/20 lg:text-teal" : "lg:bg-teal-soft lg:text-teal-deep"
        }`}
      >
        <Icon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2.2} />
      </span>
      <span
        className={`font-display inline-flex h-7 shrink-0 items-center rounded-full border border-line bg-white px-2.5 text-[12px] font-bold text-navy/45 shadow-[0_10px_24px_-20px_rgba(7,23,47,0.35)] lg:block lg:h-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:text-[15px] lg:shadow-none ${
          dark ? "lg:text-white/25" : "lg:text-navy/20"
        }`}
      >
        {number}
      </span>
    </div>
  );
}

/** Akkoord → 48u → live, with a dashed line that draws itself in view. */
function DeliveryTimeline() {
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();

  return (
    <div className="mt-8 flex items-start gap-2 sm:gap-3">
      {deliveryTimeline.map(({ icon: Icon, label }, index) => (
        <div key={label} className="flex min-w-0 flex-1 items-start gap-1.5 sm:gap-3 sm:last:flex-none">
          <motion.div
            className="flex min-w-0 flex-1 flex-col items-center gap-2.5 text-center sm:w-[104px] sm:flex-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={
              timing.isMobile
                ? { type: "spring", stiffness: 420, damping: 24, delay: 0.08 + index * 0.08 }
                : { type: "spring", stiffness: 260, damping: 18, delay: 0.2 + index * 0.25 }
            }
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-full ${
                index === deliveryTimeline.length - 1
                  ? "bg-teal text-white"
                  : "border-2 border-teal/30 bg-paper text-teal-deep"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={2.3} />
            </span>
            <span className="text-[12.5px] font-bold leading-tight text-ink">{label}</span>
          </motion.div>
          {index < deliveryTimeline.length - 1 && (
            <motion.span
              className="mt-6 h-0 flex-1 origin-left border-t-2 border-dashed border-teal/40"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: timing.duration(0.5, 0.24),
                delay: timing.delay(0.35 + index * 0.25, 0.12 + index * 0.08),
                ease: EASE_OUT_EXPO,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/** WhatsApp row with a live typing indicator. */
function ChatPreview() {
  const reduceMotion = useReducedMotion();
  const timing = useMotionTiming();

  return (
    <div className="mt-7 rounded-2xl border border-line bg-white p-4 lg:border-white/10 lg:bg-white/[0.06]">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wa text-white">
          <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <div className="min-w-0">
          <strong className="block truncate text-[13.5px] font-bold text-navy lg:text-white">
            JDJ Webdevelopment
          </strong>
          <span className="text-[12px] font-medium text-teal">is aan het typen…</span>
        </div>
        <span className="ml-auto flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.i
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-teal"
              animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: timing.duration(1, 0.58),
                repeat: Infinity,
                delay: timing.delay(dot * 0.16, dot * 0.08),
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/** Miniature search result: what "vindbaar" actually looks like. */
function SearchResultPreview() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_14px_32px_-16px_rgba(7,23,47,0.25)] lg:mt-6" aria-hidden="true">
      <div className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5">
        <Search className="h-4 w-4 text-muted" strokeWidth={2.4} />
        <span className="text-[13px] font-medium text-ink">kapper utrecht</span>
      </div>
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-amber text-[10px] font-extrabold text-navy">
            1
          </span>
          <span className="text-[12px] font-medium text-teal-deep">www.jouwbedrijf.nl</span>
        </div>
        <p className="mt-1.5 text-[14.5px] font-bold leading-snug text-navy">
          Jouw Bedrijf: duidelijk online in Utrecht
        </p>
        <span className="mt-2 block h-2 w-[90%] rounded-full bg-line" />
        <span className="mt-1.5 block h-2 w-[65%] rounded-full bg-line" />
      </div>
    </div>
  );
}
