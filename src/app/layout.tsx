import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, DM_Serif_Display } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: {
    default: "SERMA HUB – Impact Academy | Centre de Formation Parakou Bénin",
    template: "%s | SERMA HUB – Centre de Formation Parakou Bénin",
  },
  description:
    "Éveiller les esprits, transformer l'avenir entrepreneurial en Afrique. ENTREPRENDRE • INNOVER • IMPACTER. Centre de Formation Professionnelle Entrepreneuriale Appliquée à Parakou.",
  keywords: ["formation entrepreneuriale", "Parakou", "Bénin", "SERMA HUB", "Impact Academy", "CFPEA"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen font-body bg-white text-serma-navy">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
