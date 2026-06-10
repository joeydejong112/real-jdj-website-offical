import { EMAIL, faqs, packages, WHATSAPP_NUMBER } from "./content";

export const SITE_URL = "https://jdjwebdevelopment.com";
export const SITE_NAME = "JDJ Webdevelopment";

export const SITE_TITLE = "Website laten maken in Utrecht | JDJ Webdevelopment";
export const SITE_DESCRIPTION =
  "Moderne websites voor lokale bedrijven in Utrecht en omgeving. Vaste prijs vanaf €299, live binnen 1–2 weken en persoonlijk contact via WhatsApp.";

function parsePrice(price: string): string {
  return price.replace(/[^\d]/g, "");
}

/** LocalBusiness (ProfessionalService) schema for the homepage. */
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: EMAIL,
  telephone: `+${WHATSAPP_NUMBER}`,
  areaServed: {
    "@type": "City",
    name: "Utrecht",
  },
  priceRange: "€299 - €1.299",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Websitepakketten",
    itemListElement: packages.map((pkg) => ({
      "@type": "Offer",
      name: `${pkg.name} pakket`,
      description: pkg.subtitle,
      price: parsePrice(pkg.setup),
      priceCurrency: "EUR",
    })),
  },
};

/** FAQPage schema generated from the FAQ content rendered on the page. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/** Serialize JSON-LD for a script tag; escapes "<" to prevent tag injection. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
