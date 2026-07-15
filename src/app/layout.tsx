import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ANDREA LE KING — Planning Jeux Vidéo",
  description: "ANDREA LE KING, DES JEUX EN LIGNE — Planning de jeux vidéo multi-consoles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} font-[family-name:var(--font-rajdhani)] antialiased grid-bg`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
