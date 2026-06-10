"use client";

import { Mail, MessageCircle } from "lucide-react";
import { EMAIL, navItems, WHATSAPP_DEFAULT } from "../lib/content";
import { scrollToAnchor } from "../lib/scroll";
import { MaskWords } from "./motion-primitives";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="overflow-hidden bg-navy-deep pt-16 text-white">
      <div className="shell">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <span className="font-display block text-[30px] font-extrabold leading-none tracking-tight">
              JDJ<span className="text-teal">.</span>
            </span>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-7 text-white/60">
              Moderne websites voor lokale bedrijven in Utrecht en omgeving.
              Vaste pakketten, vaste prijs, snel online.
            </p>
          </div>

          <nav aria-label="Footernavigatie" className="grid min-w-0 content-start gap-3 text-[15px]">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
              Navigatie
            </span>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={scrollToAnchor}
                className="inline-flex min-h-11 min-w-11 w-fit items-center text-white/75 transition-colors hover:text-teal lg:min-h-0 lg:min-w-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="grid min-w-0 content-start gap-3 text-[15px]">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
              Contact
            </span>
            <a
              href={WHATSAPP_DEFAULT}
              className="inline-flex min-h-11 min-w-11 w-fit max-w-full items-center gap-2.5 text-white/75 transition-colors hover:text-teal lg:min-h-0 lg:min-w-0"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-teal" />
              <span>WhatsApp — reactie &lt; 24 uur</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 min-w-11 w-fit max-w-full items-center gap-2.5 text-white/75 transition-colors hover:text-teal lg:min-h-0 lg:min-w-0"
            >
              <Mail className="h-4 w-4 shrink-0 text-teal" />
              <span className="break-all">{EMAIL}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-7 text-[13px] text-white/45">
          <span>© {CURRENT_YEAR} JDJ Webdevelopment. Alle rechten voorbehouden.</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-white lg:min-h-0 lg:min-w-0">
              Privacyverklaring
            </a>
            <a href="/voorwaarden" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-white lg:min-h-0 lg:min-w-0">
              Algemene voorwaarden
            </a>
          </span>
        </div>
      </div>

      {/* Oversized wordmark sliding up from the page edge */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="font-display -mb-[0.23em] text-center text-[clamp(90px,17.5vw,260px)] font-extrabold leading-none tracking-tight text-white/[0.06]">
          <MaskWords text="JDJ Webdev" stagger={0.1} />
        </p>
      </div>
    </footer>
  );
}
