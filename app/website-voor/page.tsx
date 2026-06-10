import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/motion-primitives";
import { branches } from "../lib/branches";
import { whatsappUrl } from "../lib/content";

export const metadata: Metadata = {
  title: "Websites per branche",
  description:
    "Websites op maat voor kappers, hoveniers, schilders, restaurants en meer. Vaste prijs vanaf €299, binnen 1–2 weken live. Bekijk jouw branche.",
  alternates: {
    canonical: "/website-voor",
  },
};

export default function BranchesPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-paper pt-[76px]">
        <section className="relative overflow-hidden">
          <div className="dot-grid absolute inset-0" aria-hidden="true" />
          <div className="shell relative py-16 lg:py-24">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-teal-deep">
                Branches
              </p>
              <h1 className="font-display mt-4 text-[clamp(34px,6vw,60px)] font-extrabold leading-[1.04] tracking-tight text-navy">
                Een website voor jouw branche
              </h1>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-8 text-ink">
                Elke branche heeft andere klanten en andere vragen. Daarom
                bouw ik geen standaardsites, maar websites die passen bij hoe
                jouw klanten zoeken en kiezen.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 lg:pb-24">
          <div className="shell">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {branches.map((branche) => (
                <a
                  key={branche.slug}
                  href={`/website-voor/${branche.slug}`}
                  className="group rounded-2xl border border-line bg-white p-6 shadow-[0_2px_6px_rgba(7,23,47,0.04)] transition-all hover:-translate-y-0.5 hover:border-teal hover:shadow-[0_14px_30px_-14px_rgba(7,23,47,0.2)]"
                >
                  <h2 className="font-display text-[19px] font-bold leading-snug text-navy">
                    {branche.label}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-6 text-muted">
                    {branche.heroTitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-bold text-teal-deep">
                    Bekijk
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-[22px] font-bold">
                  Staat jouw branche er niet bij?
                </p>
                <p className="mt-1 text-[15px] text-white/65">
                  Elke onderneming kan een goede website krijgen. App me en ik
                  denk met je mee.
                </p>
              </div>
              <WhatsAppButton
                href={whatsappUrl(
                  "Hi JDJ, ik wil een website voor mijn bedrijf. Kun je me meer info sturen?",
                )}
              >
                Stuur een WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
