import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/motion-primitives";
import { branches, getBranche } from "../../lib/branches";
import { whatsappUrl } from "../../lib/content";
import { brancheJsonLd, breadcrumbJsonLd, jsonLdString } from "../../lib/seo";

interface BranchePageProps {
  params: Promise<{ branche: string }>;
}

export function generateStaticParams() {
  return branches.map((branche) => ({ branche: branche.slug }));
}

export async function generateMetadata({ params }: BranchePageProps): Promise<Metadata> {
  const { branche: slug } = await params;
  const branche = getBranche(slug);
  if (!branche) return {};

  return {
    title: branche.metaTitle,
    description: branche.metaDescription,
    alternates: {
      canonical: `/website-voor/${branche.slug}`,
    },
  };
}

export default async function BranchePage({ params }: BranchePageProps) {
  const { branche: slug } = await params;
  const branche = getBranche(slug);
  if (!branche) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(brancheJsonLd(branche)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(branche)) }}
      />
      <Header />
      <main id="main" className="min-h-screen bg-paper pt-[76px]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="dot-grid absolute inset-0" aria-hidden="true" />
          <div className="shell relative py-16 lg:py-24">
            <div className="max-w-[680px]">
              <p className="inline-flex items-baseline gap-3 text-[13px] font-bold uppercase tracking-[0.22em] text-teal-deep">
                <span className="text-navy/40">Website voor</span>
                {branche.label}
              </p>
              <h1 className="font-display mt-4 text-[clamp(34px,6vw,60px)] font-extrabold leading-[1.04] tracking-tight text-navy">
                {branche.heroTitle}
              </h1>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-8 text-ink">
                {branche.intro}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <WhatsAppButton size="lg" href={whatsappUrl(branche.whatsappMessage)}>
                  Stuur een WhatsApp
                </WhatsAppButton>
                <a
                  href="/#pakketten"
                  className="inline-flex min-h-11 items-center gap-2 font-bold text-teal-deep underline underline-offset-4 hover:text-navy"
                >
                  Bekijk de pakketten
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pains */}
        <section className="bg-mist py-16 lg:py-20">
          <div className="shell">
            <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold leading-tight tracking-tight text-navy">
              Herkenbaar?
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {branche.pains.map((pain, index) => (
                <div
                  key={pain.title}
                  className="rounded-2xl border border-line bg-white p-6 shadow-[0_2px_6px_rgba(7,23,47,0.04)]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-amber text-[13px] font-extrabold text-navy">
                    {index + 1}
                  </span>
                  <h3 className="font-display mt-4 text-[19px] font-bold leading-snug text-navy">
                    {pain.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">{pain.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features + price */}
        <section className="py-16 lg:py-20">
          <div className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold leading-tight tracking-tight text-navy">
                {branche.featuresTitle}
              </h2>
              <ul className="mt-8 grid gap-4">
                {branche.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[16px] leading-7 text-ink">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-soft text-teal-deep">
                      <Check className="h-4 w-4" strokeWidth={2.6} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white">
              <span
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal/20 blur-2xl"
                aria-hidden="true"
              />
              <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-teal">
                Vaste prijs
              </p>
              <p className="font-display mt-3 text-[34px] font-extrabold leading-none">
                Vanaf €299
              </p>
              <p className="mt-2 text-[15px] text-white/65">
                eenmalig + €29 per maand voor hosting, SSL, updates en
                fair-use wijzigingen.
              </p>
              <ul className="mt-6 grid gap-2.5 text-[14.5px] text-white/80">
                <li>Start binnen 48 uur na akkoord</li>
                <li>Live binnen 1–2 weken na ontvangst content</li>
                <li>Persoonlijk contact via WhatsApp</li>
              </ul>
              <WhatsAppButton
                className="mt-7 w-full"
                href={whatsappUrl(branche.whatsappMessage)}
              >
                Vraag vrijblijvend info
              </WhatsAppButton>
              <a
                href="/#pakketten"
                className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-bold text-teal underline underline-offset-4 hover:text-white"
              >
                Vergelijk alle pakketten
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Other branches */}
        <section className="border-t border-line bg-mist py-14">
          <div className="shell">
            <h2 className="font-display text-[22px] font-bold text-navy">
              Ook websites voor andere branches
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {branches
                .filter((other) => other.slug !== branche.slug)
                .map((other) => (
                  <a
                    key={other.slug}
                    href={`/website-voor/${other.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-[14.5px] font-semibold text-navy transition-colors hover:border-teal hover:text-teal-deep"
                  >
                    {other.label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
