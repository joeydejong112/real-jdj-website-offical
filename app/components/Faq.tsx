"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { MessageCircleQuestion, Plus } from "lucide-react";
import { faqs } from "../lib/content";
import { EASE_OUT_EXPO, Reveal, SectionHeading, WhatsAppButton } from "./motion-primitives";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-mist py-20 lg:py-28">
      <div
        className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading index="04" eyebrow="FAQ" title="Veelgestelde vragen" />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-[40ch] text-[17px] leading-8 text-muted">
              Alles wat je wilt weten voordat je begint — over snelheid, kosten,
              looptijd en wat je zelf aanlevert.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="relative mt-9 max-w-[360px] overflow-hidden rounded-3xl bg-navy p-7 text-white">
              <span
                className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-teal/20 blur-2xl"
                aria-hidden="true"
              />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/20 text-teal">
                <MessageCircleQuestion className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <p className="font-display mt-5 text-[20px] font-bold">Staat je vraag er niet bij?</p>
              <p className="mt-2 text-[14.5px] leading-6 text-white/65">
                Geen contactformulieren of wachtrijen — gewoon even appen. Je krijgt binnen
                24 uur persoonlijk antwoord.
              </p>
              <WhatsAppButton className="mt-5">Stel je vraag</WhatsAppButton>
            </div>
          </Reveal>
        </div>

        <div className="grid content-start gap-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.06} y={24}>
              <FaqItem
                icon={faq.icon}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FaqItemProps {
  icon: LucideIcon;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ icon: Icon, question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div
      className={`rounded-2xl bg-white transition-all duration-300 ${
        isOpen
          ? "shadow-[0_20px_44px_-18px_rgba(7,23,47,0.22)] ring-1 ring-teal/30"
          : "shadow-[0_2px_6px_rgba(7,23,47,0.04)] hover:shadow-[0_10px_24px_-12px_rgba(7,23,47,0.15)]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
      >
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
            isOpen ? "bg-teal text-white" : "bg-teal-soft text-teal-deep"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <span className="font-display flex-1 text-[17px] font-bold leading-snug text-navy">
          {question}
        </span>
        <motion.span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
            isOpen ? "bg-navy text-white" : "bg-mist text-navy"
          }`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
        >
          <Plus className="h-4 w-4" strokeWidth={2.6} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-6 pl-[84px] pr-6 text-[15px] leading-7 text-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
