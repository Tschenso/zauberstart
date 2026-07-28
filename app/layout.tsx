import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zauberstart – Magic gemeinsam lernen",
  description:
    "Interaktive Lernhilfe für Magic: The Gathering mit Zugphasen, Grundregeln, Kartenbegriffen und Lebenspunktezähler.",
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
