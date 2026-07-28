import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://zauberstart-mtg.jens-jung95.chatgpt.site";
const title = "Zauberstart – Magic gemeinsam lernen";
const description =
  "Interaktive und druckbare Lernhilfe für Magic: The Gathering mit Zugphasen, Grundregeln, Kartenbegriffen und Lebenspunktezähler.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1740,
        height: 908,
        alt: "Zauberstart – Magic lernen, Zug für Zug",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
