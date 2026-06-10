import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  ClipboardList,
  Code2,
  Globe,
  ImageIcon,
  PenLine,
  Repeat2,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const EMAIL = "joeydejong1112work@gmail.com";

export const WHATSAPP_NUMBER = "31614374491";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappUrl(
  "Hi JDJ, ik wil een website. Kun je me meer info sturen?",
);

export interface NavItem {
  label: string;
  href: string;
}

// "/#" prefix keeps the anchors working from subpages like /privacy
export const navItems: NavItem[] = [
  { label: "Waarom JDJ", href: "/#waarom-jdj" },
  { label: "Werkwijze", href: "/#werkwijze" },
  { label: "Pakketten", href: "/#pakketten" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const marqueeItems = [
  "Supersnel",
  "SEO basis",
  "Mobiel vriendelijk",
  "SSL & veilig",
  "Vaste prijs",
  "Persoonlijk contact",
];

export interface Stat {
  value: number | null;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 48, suffix: " uur", label: "startklaar na akkoord" },
  { value: null, display: "1–2", suffix: " weken", label: "van content naar live" },
  { value: 100, suffix: "%", label: "vaste prijs vooraf" },
  { value: 24, prefix: "< ", suffix: " uur", label: "reactie op werkdagen" },
];

export interface Step {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const steps: Step[] = [
  {
    icon: Users,
    title: "Intake & doelen",
    text: "We bespreken je wensen, doelen en planning. Binnen 48 uur krijg je prijs, scope en startdatum.",
  },
  {
    icon: ImageIcon,
    title: "Content verzamelen",
    text: "Jij levert teksten, foto's en praktische info aan. Ik help waar nodig met een simpele checklist.",
  },
  {
    icon: PenLine,
    title: "Ontwerp",
    text: "Je krijgt een opzet met diensten, bewijs, WhatsApp-knoppen en een offerteblok boven de vouw.",
  },
  {
    icon: Code2,
    title: "Bouw & revisies",
    text: "Ik bouw je site responsive, met SSL en korte laadtijden. Je feedback verwerk ik per revisieronde.",
  },
  {
    icon: Rocket,
    title: "Live & support",
    text: "Na controle op mobiel, formulieren en links gaat je site live. Daarna blijf ik bereikbaar via WhatsApp.",
  },
];

export interface Package {
  name: string;
  subtitle: string;
  basedOn?: string;
  features: string[];
  setup: string;
  monthly: string;
  featured?: boolean;
}

export const packages: Package[] = [
  {
    name: "Start",
    subtitle: "Binnen 1-2 weken online",
    features: ["1–3 pagina's", "Basis-SEO & snelle laadtijd", "Mobielvriendelijk ontwerp", "1 revisieronde"],
    setup: "€299",
    monthly: "€29",
  },
  {
    name: "Plus",
    subtitle: "Meer pagina's en lokale SEO",
    basedOn: "Alles uit Start, plus:",
    features: [
      "5–7 pagina's",
      "Offerteblok en WhatsApp-CTA's",
      "Paginatitels, meta descriptions en lokale zoektermen",
      "2 revisierondes",
    ],
    setup: "€699",
    monthly: "€49",
    featured: true,
  },
  {
    name: "Pro",
    subtitle: "CMS en extra secties",
    basedOn: "Bovenop Plus:",
    features: [
      "8–12+ pagina's",
      "CMS: zelf secties aanpassen",
      "Projecten, prijslijsten of teamleden",
      "3 revisierondes",
    ],
    setup: "€1.299",
    monthly: "€79",
  },
];

export interface Faq {
  icon: LucideIcon;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    icon: Zap,
    question: "Hoe snel staat mijn website online?",
    answer:
      "Na akkoord plannen we de start binnen 48 uur. Met teksten en foto's binnen staat je site in 1-2 weken live.",
  },
  {
    icon: TrendingUp,
    question: "Kan ik later upgraden van Start naar Plus of Pro?",
    answer:
      "Ja. Voor de upgrade krijg je eerst een nieuwe scope met prijs, pagina's en planning.",
  },
  {
    icon: ClipboardList,
    question: "Wat moet ik zelf aanleveren?",
    answer:
      "Teksten, foto's en praktische info zoals openingstijden. Ik stuur je een korte checklist.",
  },
  {
    icon: Repeat2,
    question: "Wat valt onder fair-use wijzigingen?",
    answer:
      "Kleine contentwijzigingen binnen bestaande pagina's: tekst, beeld of links vervangen. Grotere uitbreidingen bespreken we vooraf.",
  },
  {
    icon: Globe,
    question: "Wat als ik al een domein heb?",
    answer:
      "Geen probleem. Jij blijft eigenaar van je domein; ik regel de DNS-instellingen en koppelingen.",
  },
  {
    icon: CalendarClock,
    question: "Wat is de minimale looptijd?",
    answer:
      "Minimaal 6 maanden, daarna maandelijks opzegbaar. De maandprijs en fair-use afspraken staan in je voorstel.",
  },
];
