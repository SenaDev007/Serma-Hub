import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SERMA HUB – Impact Academy | Formation Entrepreneuriale Parakou, Bénin",
    template: "%s | SERMA HUB",
  },
  description:
    "SERMA HUB forme et accompagne les jeunes et les femmes à créer des activités génératrices de revenus durables à Parakou, Bénin. 5 filières entrepreneuriales appliquées.",
  keywords: [
    "formation entrepreneuriale Parakou",
    "centre formation Bénin",
    "entrepreneur Bénin",
    "SERMA HUB",
    "formation professionnelle Parakou",
    "incubateur Bénin",
  ],
  authors: [{ name: "SERMA HUB – Impact Academy" }],
  creator: "SERMA HUB",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.sermahub.com",
    siteName: "SERMA HUB – Impact Academy",
    title: "SERMA HUB – Impact Academy | Formation Entrepreneuriale Parakou, Bénin",
    description:
      "SERMA HUB forme et accompagne les jeunes et les femmes à créer des activités génératrices de revenus durables à Parakou, Bénin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SERMA HUB – Impact Academy",
    description: "Formation entrepreneuriale appliquée à Parakou, Bénin.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-dm antialiased bg-brand-dark text-brand-light">{children}</body>
    </html>
  );
}
