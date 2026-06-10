import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JDJ Webdevelopment — Moderne website zonder gedoe",
  description:
    "Moderne websites voor lokale bedrijven in Utrecht en omgeving. Vaste pakketten, vaste prijs en snel online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Direct naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}
