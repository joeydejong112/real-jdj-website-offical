export interface BranchePain {
  title: string;
  text: string;
}

export interface Branche {
  /** URL segment under /website-voor/ */
  slug: string;
  /** Lowercase plural, used in running text ("websites voor kappers") */
  name: string;
  /** Short label for cards and footer links */
  label: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  intro: string;
  pains: BranchePain[];
  featuresTitle: string;
  features: string[];
  whatsappMessage: string;
}

export const branches: Branche[] = [
  {
    slug: "kappers",
    name: "kappers",
    label: "Kappers",
    metaTitle: "Website voor kappers – vaste prijs",
    metaDescription:
      "Een website voor je kapsalon met prijslijst, online afspraken en koppeling naar je Instagram. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een kapperswebsite die je agenda vult",
    intro:
      "Nieuwe klanten zoeken op 'kapper + woonplaats' en kiezen binnen een paar seconden. Een snelle site met je prijslijst, foto's en een afspraakknop maakt dat zij voor jouw stoel kiezen.",
    pains: [
      {
        title: "Je staat niet tussen de zoekresultaten",
        text: "Klanten vinden de salon om de hoek wél, omdat die een vindbare website met openingstijden en reviews heeft.",
      },
      {
        title: "Instagram is geen prijslijst",
        text: "Je werk staat op social media, maar prijzen, openingstijden en een afspraak maken horen op een plek die altijd klopt.",
      },
      {
        title: "Bellen tijdens het knippen",
        text: "Elke telefoontje onderbreekt een behandeling. Een duidelijke site met afspraakknop vangt dat af.",
      },
    ],
    featuresTitle: "Wat er op jouw salonwebsite komt",
    features: [
      "Prijslijst per behandeling, simpel zelf aan te leveren",
      "Knop naar je online agenda (zoals Salonized of Treatwell) of WhatsApp",
      "Koppeling naar je Instagram zodat je werk zichtbaar is",
      "Google-reviews in beeld voor vertrouwen",
      "Openingstijden, route en parkeerinfo op één plek",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een kapsalon en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "hoveniers",
    name: "hoveniers",
    label: "Hoveniers",
    metaTitle: "Website voor hoveniers – vaste prijs",
    metaDescription:
      "Een website voor je hoveniersbedrijf met projectfoto's, werkgebied en een offerteknop. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een hovenierswebsite die offerteaanvragen binnenhaalt",
    intro:
      "Tuinklussen worden gegund op vertrouwen. Voor- en na-foto's van eigen projecten, een duidelijk werkgebied en een snelle offerteknop doen het werk terwijl jij buiten staat.",
    pains: [
      {
        title: "Je werk is onzichtbaar",
        text: "De mooiste tuinen die je hebt aangelegd staan nu alleen op je telefoon. Online zijn ze je beste verkoper.",
      },
      {
        title: "Aanvragen komen versnipperd binnen",
        text: "Via via, een appje, een belletje op de zaterdag. Eén centrale offerteknop houdt het overzichtelijk.",
      },
      {
        title: "Seizoenspieken vlak je niet af",
        text: "In het voorjaar te druk, in de winter te stil. Een site die het hele jaar vindbaar is, vult de rustige maanden.",
      },
    ],
    featuresTitle: "Wat er op jouw hovenierswebsite komt",
    features: [
      "Projectgalerij met voor- en na-foto's van eigen werk",
      "Offerteknop en WhatsApp-knop bovenaan elke pagina",
      "Dienstenoverzicht: aanleg, onderhoud, bestrating, snoeiwerk",
      "Je werkgebied duidelijk benoemd, goed voor lokale vindbaarheid",
      "Reviews van tevreden tuineigenaren in beeld",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een hoveniersbedrijf en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "schilders",
    name: "schilders",
    label: "Schilders",
    metaTitle: "Website voor schilders – vaste prijs",
    metaDescription:
      "Een website voor je schildersbedrijf met voor- en na-foto's, reviews en een snelle offerteknop. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een schilderswebsite die klussen binnenhaalt",
    intro:
      "Mensen laten geen onbekende binnen. Een verzorgde site met je eigen projecten, echte reviews en een duidelijke offerteknop neemt die drempel weg voordat ze bellen.",
    pains: [
      {
        title: "Concurrentie op prijs",
        text: "Zonder zichtbaar bewijs van kwaliteit ben je alleen vergelijkbaar op prijs. Goede foto's van je werk veranderen dat gesprek.",
      },
      {
        title: "Geen aanvragen buiten je netwerk",
        text: "Mond-tot-mond is goud, maar eindig. Een vindbare website ontsluit de straten waar ze je nog niet kennen.",
      },
      {
        title: "Offertes kosten avonduren",
        text: "Een offerteknop met de juiste vragen (binnen/buiten, oppervlakte, planning) scheelt heen-en-weer gebel.",
      },
    ],
    featuresTitle: "Wat er op jouw schilderswebsite komt",
    features: [
      "Voor- en na-foto's van eigen schilderwerk",
      "Offerteknop met de juiste intake-vragen",
      "Diensten: binnenschilderwerk, buitenschilderwerk, houtrot, behang",
      "Reviews en keurmerken zichtbaar voor vertrouwen",
      "Werkgebied benoemd voor lokale zoekopdrachten",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een schildersbedrijf en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "klusbedrijven",
    name: "klusbedrijven",
    label: "Klusbedrijven",
    metaTitle: "Website voor klusbedrijven – vaste prijs",
    metaDescription:
      "Een website voor je klusbedrijf met dienstenoverzicht, projectfoto's en een directe offerteknop. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een klusbedrijf-website die de juiste klussen oplevert",
    intro:
      "Jij kunt veel, maar klanten zoeken specifiek: een badkamer, een dakkapel, een verbouwing. Een site die je diensten helder opsomt, trekt precies de klussen aan die jij wilt doen.",
    pains: [
      {
        title: "“Wat doe je precies?”",
        text: "Zonder duidelijk dienstenoverzicht bellen mensen voor klussen die je niet doet — of helemaal niet.",
      },
      {
        title: "Je bent onvindbaar tussen de platforms",
        text: "Op klusplatforms betaal je per lead en concurreer je op prijs. Een eigen site levert directe aanvragen op.",
      },
      {
        title: "Geen tijd voor administratie",
        text: "Een offerteknop die de juiste informatie uitvraagt, scheelt belrondes en maakt je offertes sneller.",
      },
    ],
    featuresTitle: "Wat er op jouw klusbedrijf-website komt",
    features: [
      "Helder dienstenoverzicht per type klus",
      "Projectfoto's die je vakmanschap laten zien",
      "Offerteknop en WhatsApp-knop op elke pagina",
      "Reviews van opdrachtgevers in beeld",
      "Werkgebied en beschikbaarheid duidelijk vermeld",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een klusbedrijf en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "restaurants",
    name: "restaurants",
    label: "Restaurants & horeca",
    metaTitle: "Website voor restaurants – vaste prijs",
    metaDescription:
      "Een restaurantwebsite met menukaart, reserveerknop en openingstijden die altijd kloppen. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een restaurantwebsite die tafels reserveert",
    intro:
      "Gasten beslissen op hun telefoon: menukaart bekijken, openingstijden checken, reserveren. Als dat niet in drie tikken lukt, staan ze bij de buren aan tafel.",
    pains: [
      {
        title: "Je menukaart is een foto-PDF",
        text: "Onleesbaar op mobiel en verouderd na elke wijziging. Een echte menupagina is leesbaar én door Google te vinden.",
      },
      {
        title: "Reserveringen lopen via de telefoon",
        text: "Tijdens de service opnemen kost aandacht. Een reserveerknop (of koppeling met je reserveringssysteem) vangt dat af.",
      },
      {
        title: "Verouderde info op Google",
        text: "Kloppen je feestdagen-openingstijden niet, dan staan er gasten voor een dichte deur — en dat lees je terug in de reviews.",
      },
    ],
    featuresTitle: "Wat er op jouw restaurantwebsite komt",
    features: [
      "Menukaart als echte pagina, leesbaar op elke telefoon",
      "Reserveerknop of koppeling met je reserveringssysteem",
      "Openingstijden, route en contact direct vindbaar",
      "Sfeerfoto's die je zaak verkopen",
      "Koppeling naar je social media en Google-reviews",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een restaurant en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "sportscholen",
    name: "sportscholen en personal trainers",
    label: "Sportscholen & PT's",
    metaTitle: "Website voor sportscholen & personal trainers – vaste prijs",
    metaDescription:
      "Een website voor je sportschool of PT-praktijk met rooster, proefles-aanmelding en ledenwerving. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een sportschoolwebsite die leden aanmeldt",
    intro:
      "Iemand die wil beginnen met sporten is gemotiveerd — vandaag. Een site die meteen een proefles of intake laat boeken, verzilvert dat moment voordat het wegzakt.",
    pains: [
      {
        title: "Interesse zonder aanmelding",
        text: "Volgers op Instagram zijn nog geen leden. Een duidelijke proefles-knop maakt van interesse een afspraak.",
      },
      {
        title: "Steeds dezelfde vragen",
        text: "Rooster, tarieven, abonnementsvormen: zet het op je site en je appt er niet meer dagelijks over.",
      },
      {
        title: "Je verhaal komt niet over",
        text: "Persoonlijke aandacht en sfeer zijn jouw verschil met de budgetketen — maar dan moet het wel ergens te zien zijn.",
      },
    ],
    featuresTitle: "Wat er op jouw sportwebsite komt",
    features: [
      "Proefles- of intakeknop bovenaan elke pagina",
      "Lesrooster en tarieven, simpel zelf aan te passen (Pro-pakket)",
      "Voorstelpagina: wie je bent en hoe je traint",
      "Resultaten en reviews van leden",
      "Koppeling naar je Instagram en Google-profiel",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een sportschool / ben personal trainer en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "schoonheidssalons",
    name: "schoonheidssalons",
    label: "Schoonheidssalons",
    metaTitle: "Website voor schoonheidssalons – vaste prijs",
    metaDescription:
      "Een website voor je schoonheidssalon met behandelmenu, prijzen en online boeken. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een salonwebsite die rust en vertrouwen uitstraalt",
    intro:
      "Klanten kiezen een salon op gevoel: oogt het verzorgd, professioneel en duidelijk? Je website is dat eerste gevoel — nog vóór de eerste behandeling.",
    pains: [
      {
        title: "Boekingen alleen via DM",
        text: "Berichtjes op drie kanalen tegelijk is foutgevoelig. Eén boekingsknop op je site houdt je agenda kloppend.",
      },
      {
        title: "Prijzen zijn nergens te vinden",
        text: "Wie de prijs niet vindt, durft vaak niet te vragen — en boekt nergens. Een helder behandelmenu neemt die twijfel weg.",
      },
      {
        title: "Je uitstraling is je product",
        text: "Een rommelige of verouderde site past niet bij de zorg die jij in je werk stopt.",
      },
    ],
    featuresTitle: "Wat er op jouw salonwebsite komt",
    features: [
      "Behandelmenu met prijzen en duur per behandeling",
      "Boekingsknop naar je agenda of WhatsApp",
      "Rustig, verzorgd ontwerp dat bij je salon past",
      "Foto's van je salon en je werk",
      "Cadeaubonnen of acties uitgelicht",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een schoonheidssalon en wil een website. Kun je me meer info sturen?",
  },
  {
    slug: "autobedrijven",
    name: "autobedrijven",
    label: "Autobedrijven",
    metaTitle: "Website voor autobedrijven – vaste prijs",
    metaDescription:
      "Een website voor je garage of autobedrijf met diensten, APK-afspraken en occasions. Vaste prijs vanaf €299, binnen 1–2 weken live.",
    heroTitle: "Een garagewebsite die afspraken inplant",
    intro:
      "Een APK, een vreemd geluid, een occasion zoeken: het begint online. Een duidelijke site met je diensten en een afspraakknop brengt de auto naar jouw brug in plaats van naar de keten.",
    pains: [
      {
        title: "De keten wint het online",
        text: "Grote ketens staan bovenaan in Google. Een eigen, vindbare site met reviews zet jouw garage daarnaast.",
      },
      {
        title: "Telefoon roodgloeiend, brug vol",
        text: "Een afspraakknop voor APK en onderhoud plant je werkplaats zonder dat de telefoon je werk onderbreekt.",
      },
      {
        title: "Occasions zonder bereik",
        text: "Auto's die alleen op het terrein staan, verkopen traag. Een occasionpagina vergroot je bereik.",
      },
    ],
    featuresTitle: "Wat er op jouw garagewebsite komt",
    features: [
      "Afspraakknop voor APK, onderhoud en reparatie",
      "Dienstenoverzicht met heldere uitleg en indicatieprijzen",
      "Occasionoverzicht, zelf aan te passen (Pro-pakket)",
      "Google-reviews zichtbaar voor vertrouwen",
      "Merken en specialisaties duidelijk benoemd",
    ],
    whatsappMessage:
      "Hi JDJ, ik heb een autobedrijf en wil een website. Kun je me meer info sturen?",
  },
];

export function getBranche(slug: string): Branche | undefined {
  return branches.find((branche) => branche.slug === slug);
}
