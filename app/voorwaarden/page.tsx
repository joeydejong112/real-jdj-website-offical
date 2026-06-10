import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { EMAIL } from "../lib/content";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van JDJ Webdevelopment: offertes, oplevering, revisierondes, looptijd van pakketten, betaling en eigendom van je website en domein.",
  alternates: {
    canonical: "/voorwaarden",
  },
};

const LAST_UPDATED = "10 juni 2026";

export default function VoorwaardenPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-paper pt-[76px]">
        <article className="shell py-16 lg:py-24">
          <div className="legal-prose mx-auto max-w-[720px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-teal-deep">
              Juridisch
            </p>
            <h1 className="font-display mt-3 text-[clamp(34px,5vw,52px)] font-bold leading-[1.06] tracking-tight text-navy">
              Algemene voorwaarden
            </h1>
            <p className="mt-4 text-muted">Laatst bijgewerkt: {LAST_UPDATED}</p>

            <h2>1. Wie ben ik?</h2>
            <p>
              Deze voorwaarden gelden voor alle offertes, overeenkomsten en
              diensten van JDJ Webdevelopment (KvK: 95095268), hierna
              &ldquo;JDJ&rdquo;. Vragen? Mail naar{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> of app naar 06 14374491.
            </p>

            <h2>2. Offertes en prijzen</h2>
            <ul>
              <li>
                Na een intake ontvang je binnen 48 uur een voorstel met
                vaste prijs, scope en startdatum.
              </li>
              <li>Offertes zijn 30 dagen geldig.</li>
              <li>
                De afgesproken prijs is vast: meerwerk buiten de scope wordt
                altijd vooraf besproken en apart geoffreerd.
              </li>
              <li>
                Alle prijzen zijn exclusief btw, tenzij anders vermeld.
              </li>
            </ul>

            <h2>3. Uitvoering en planning</h2>
            <ul>
              <li>De bouw start binnen 48 uur na akkoord op het voorstel.</li>
              <li>
                Oplevering volgt in de regel binnen 1 tot 2 weken nadat alle
                content (teksten, foto&apos;s en praktische informatie) is
                aangeleverd.
              </li>
              <li>
                Genoemde termijnen zijn streeftermijnen; vertraging door het
                later aanleveren van content schuift de planning evenredig op.
              </li>
            </ul>

            <h2>4. Aanleveren van content</h2>
            <p>
              Jij levert de teksten, foto&apos;s en praktische informatie aan
              de hand van een checklist. Jij staat ervoor in dat je het recht
              hebt om aangeleverd materiaal te gebruiken (bijvoorbeeld
              auteursrechten op foto&apos;s en teksten).
            </p>

            <h2>5. Revisierondes</h2>
            <p>
              Het aantal revisierondes hangt af van het gekozen pakket (Start:
              1, Plus: 2, Pro: 3). Een revisieronde omvat één verzamelde set
              feedback. Extra rondes of grotere wijzigingen buiten de scope
              worden vooraf geoffreerd.
            </p>

            <h2>6. Pakketten, looptijd en opzeggen</h2>
            <ul>
              <li>
                De maandelijkse pakketten (hosting, onderhoud en support)
                hebben een minimale looptijd van 6 maanden.
              </li>
              <li>
                Na de minimale looptijd is het pakket maandelijks opzegbaar,
                met een opzegtermijn van één maand.
              </li>
              <li>
                Onder fair-use wijzigingen vallen kleine contentaanpassingen
                binnen bestaande pagina&apos;s, zoals het vervangen van
                tekst, beeld of links. Grotere uitbreidingen worden vooraf
                besproken.
              </li>
            </ul>

            <h2>7. Betaling</h2>
            <ul>
              <li>
                De eenmalige setupkosten worden gefactureerd bij de start van
                het project; de maandelijkse kosten vanaf livegang.
              </li>
              <li>De betalingstermijn is 14 dagen na factuurdatum.</li>
              <li>
                Bij uitblijvende betaling kan JDJ de werkzaamheden of de
                website tijdelijk opschorten na een herinnering.
              </li>
            </ul>

            <h2>8. Eigendom, domein en data</h2>
            <ul>
              <li>
                Jouw domeinnaam staat op jouw naam en blijft altijd jouw
                eigendom. JDJ regelt alleen de technische koppelingen.
              </li>
              <li>
                Na volledige betaling krijg je een gebruiksrecht op het
                ontwerp en de inhoud van je website.
              </li>
              <li>
                Bij beëindiging van een pakket ontvang je op verzoek een
                export van je content.
              </li>
            </ul>

            <h2>9. Aansprakelijkheid</h2>
            <p>
              JDJ werkt zorgvuldig, maar is niet aansprakelijk voor indirecte
              schade zoals gederfde omzet of gevolgschade. Eventuele
              aansprakelijkheid is beperkt tot het bedrag dat in de 6 maanden
              voorafgaand aan de schade voor de betreffende dienst is
              gefactureerd.
            </p>

            <h2>10. Toepasselijk recht</h2>
            <p>
              Op alle overeenkomsten is Nederlands recht van toepassing.
              Geschillen worden eerst onderling besproken; komen we er niet
              uit, dan is de rechtbank in het arrondissement van JDJ bevoegd.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
