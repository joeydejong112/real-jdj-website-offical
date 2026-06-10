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
import { Counter, EASE_OUT_EXPO, Reveal, SectionHeading } from "./motion-primitives";

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

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <BentoCard span="lg:col-span-7" delay={0}>
            <CardHeader icon={Bolt} number="01" />
            <h3 className="font-display mt-6 text-[24px] font-bold text-navy">Snel online</h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-7 text-muted">
              Geen maandenlange trajecten. Vandaag akkoord betekent deze week nog de eerste
              stap. Binnen twee weken sta je live.
            </p>
            <DeliveryTimeline />
          </BentoCard>

          <BentoCard span="lg:col-span-5" surface="bg-navy" delay={0.1}>
            <CardHeader icon={HeartHandshake} number="02" dark />
            <h3 className="font-display mt-6 text-[24px] font-bold text-white">
              Persoonlijk contact
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-white/65">
              Je appt met mij via WhatsApp. Ik antwoord binnen 24 uur en pak je vraag
              zelf op.
            </p>
            <ChatPreview />
          </BentoCard>

          <BentoCard span="lg:col-span-5" delay={0.15}>
            <CardHeader icon={ShieldCheck} number="03" />
            <h3 className="font-display mt-6 text-[24px] font-bold text-navy">
              Technisch netjes
            </h3>
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
            <CardHeader icon={Search} number="04" />
            <div className="grid items-center gap-7 sm:grid-cols-[1fr_1.1fr]">
              <div>
                <h3 className="font-display mt-6 text-[24px] font-bold text-navy sm:mt-0">
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
          <dl className="grid gap-y-10 rounded-2xl border border-line bg-white px-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line lg:gap-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:px-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[clamp(36px,3.4vw,48px)] font-extrabold leading-none tracking-tight text-navy">
                  {stat.value === null ? (
                    <span>
                      {stat.display}
                      {stat.suffix}
                    </span>
                  ) : (
                    <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </dd>
                <dd className="mt-2.5 text-[14px] font-semibold text-muted">{stat.label}</dd>
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
  return (
    <Reveal delay={delay} className={`h-full min-w-0 ${span}`}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`h-full overflow-hidden rounded-3xl p-8 shadow-[0_2px_10px_rgba(7,23,47,0.05)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(7,23,47,0.25)] ${surface}`}
      >
        {children}
      </motion.article>
    </Reveal>
  );
}

function CardHeader({ icon: Icon, number, dark = false }: { icon: LucideIcon; number: string; dark?: boolean }) {
  return (
    <div className="flex items-start justify-between">
      <span
        className={`grid h-12 w-12 place-items-center rounded-xl ${
          dark ? "bg-teal/20 text-teal" : "bg-teal-soft text-teal-deep"
        }`}
      >
        <Icon className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <span className={`font-display text-[15px] font-bold ${dark ? "text-white/25" : "text-navy/20"}`}>
        {number}
      </span>
    </div>
  );
}

/** Akkoord → 48u → live, with a dashed line that draws itself in view. */
function DeliveryTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-8 flex items-start gap-2 sm:gap-3">
      {deliveryTimeline.map(({ icon: Icon, label }, index) => (
        <div key={label} className="flex min-w-0 flex-1 items-start gap-1.5 sm:gap-3 sm:last:flex-none">
          <motion.div
            className="flex min-w-0 flex-1 flex-col items-center gap-2.5 text-center sm:w-[104px] sm:flex-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 + index * 0.25 }}
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
              transition={{ duration: 0.5, delay: 0.35 + index * 0.25, ease: EASE_OUT_EXPO }}
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

  return (
    <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wa text-white">
          <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <div className="min-w-0">
          <strong className="block truncate text-[13.5px] font-bold text-white">
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
              transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16, ease: "easeInOut" }}
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
    <div className="rounded-2xl bg-white p-4 shadow-[0_14px_32px_-16px_rgba(7,23,47,0.25)] sm:mt-6" aria-hidden="true">
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
