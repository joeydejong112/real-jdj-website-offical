import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { EMAIL } from "../lib/content";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Lees hoe JDJ Webdevelopment omgaat met je persoonsgegevens: welke gegevens worden verwerkt, waarom, hoe lang ze worden bewaard en welke rechten je hebt.",
  alternates: {
    canonical: "/privacy",
  },
};

const LAST_UPDATED = "10 juni 2026";

export default function PrivacyPage() {
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
              Privacyverklaring
            </h1>
            <p className="mt-4 text-muted">Laatst bijgewerkt: {LAST_UPDATED}</p>

            <h2>1. Wie ben ik?</h2>
            <p>
              JDJ Webdevelopment bouwt en onderhoudt websites voor
              ondernemers in heel Nederland. JDJ Webdevelopment is de
              verwerkingsverantwoordelijke voor de persoonsgegevens die via
              deze website en bijbehorende communicatie worden verwerkt.
            </p>
            <ul>
              <li>
                <strong>Bedrijfsnaam:</strong> JDJ Webdevelopment
              </li>
              <li>
                <strong>KvK-nummer:</strong> 95095268
              </li>
              <li>
                <strong>E-mail:</strong>{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <strong>Telefoon / WhatsApp:</strong> 06 14374491
              </li>
            </ul>

            <h2>2. Welke persoonsgegevens verwerk ik?</h2>
            <p>
              Deze website heeft geen contactformulier en gebruikt geen
              accounts. Ik verwerk alleen gegevens die je zelf met mij deelt
              wanneer je contact opneemt via WhatsApp of e-mail:
            </p>
            <ul>
              <li>naam en (bedrijfs)naam;</li>
              <li>telefoonnummer en/of e-mailadres;</li>
              <li>de inhoud van je bericht en eventuele bijlagen;</li>
              <li>
                gegevens die nodig zijn voor een offerte of opdracht, zoals
                adres- en factuurgegevens.
              </li>
            </ul>
            <p>
              Daarnaast kan de hostingprovider van deze website technische
              gegevens registreren (zoals IP-adres en browsertype) in
              serverlogs ten behoeve van beveiliging en stabiliteit.
            </p>

            <h2>3. Waarom en op welke grondslag?</h2>
            <p>Ik gebruik je gegevens uitsluitend voor:</p>
            <ul>
              <li>
                het beantwoorden van je vraag en het opstellen van een
                offerte (gerechtvaardigd belang / precontractuele fase);
              </li>
              <li>
                het uitvoeren van de overeenkomst wanneer je klant wordt
                (uitvoering overeenkomst);
              </li>
              <li>
                facturatie en administratie (wettelijke verplichting).
              </li>
            </ul>
            <p>Ik verkoop je gegevens nooit aan derden.</p>

            <h2>4. Hoe lang bewaar ik je gegevens?</h2>
            <ul>
              <li>
                <strong>Offertes en correspondentie zonder opdracht:</strong>{" "}
                maximaal 1 jaar na het laatste contact.
              </li>
              <li>
                <strong>Klantgegevens en projectbestanden:</strong> voor de
                duur van de samenwerking en tot 2 jaar daarna.
              </li>
              <li>
                <strong>Facturen en administratie:</strong> 7 jaar, conform de
                fiscale bewaarplicht van de Belastingdienst.
              </li>
            </ul>

            <h2>5. Met wie deel ik gegevens?</h2>
            <p>
              Ik deel gegevens alleen met partijen die nodig zijn om mijn
              diensten te leveren:
            </p>
            <ul>
              <li>
                <strong>Hostingprovider</strong> — voor het hosten van deze
                website en klantwebsites;
              </li>
              <li>
                <strong>WhatsApp (Meta)</strong> — als je via WhatsApp contact
                opneemt, verloopt die communicatie via de servers van Meta.
                Daarop is het privacybeleid van WhatsApp van toepassing;
                daarbij kunnen gegevens buiten de EER worden verwerkt onder
                het EU-VS Data Privacy Framework;
              </li>
              <li>
                <strong>Boekhouding</strong> — factuurgegevens worden gedeeld
                voor zover nodig voor de administratie.
              </li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              Deze website plaatst geen tracking- of marketingcookies en
              gebruikt geen analytische diensten die persoonsgegevens
              verzamelen. Daarom is er geen cookiebanner nodig. Mocht dit in
              de toekomst veranderen, dan wordt deze verklaring aangepast en
              wordt waar nodig eerst toestemming gevraagd.
            </p>

            <h2>7. Beveiliging</h2>
            <p>
              Deze website wordt via een beveiligde verbinding (SSL/HTTPS)
              aangeboden. Ik neem passende technische en organisatorische
              maatregelen om je gegevens te beschermen tegen verlies of
              onrechtmatige verwerking.
            </p>

            <h2>8. Jouw rechten</h2>
            <p>Op grond van de AVG heb je het recht om:</p>
            <ul>
              <li>je gegevens in te zien;</li>
              <li>onjuiste gegevens te laten corrigeren;</li>
              <li>je gegevens te laten verwijderen;</li>
              <li>de verwerking te beperken of er bezwaar tegen te maken;</li>
              <li>je gegevens overgedragen te krijgen (dataportabiliteit).</li>
            </ul>
            <p>
              Stuur je verzoek naar{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Ik reageer binnen 30
              dagen. Ben je niet tevreden over de afhandeling? Dan kun je een
              klacht indienen bij de{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                rel="noopener noreferrer"
                target="_blank"
              >
                Autoriteit Persoonsgegevens
              </a>
              .
            </p>

            <h2>9. Wijzigingen</h2>
            <p>
              Deze privacyverklaring kan worden aangepast, bijvoorbeeld bij
              wijzigingen in de dienstverlening of wetgeving. De meest actuele
              versie staat altijd op deze pagina.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
