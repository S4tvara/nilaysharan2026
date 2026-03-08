import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif, JetBrains_Mono , UnifrakturCook } from "next/font/google";
import "../style/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const unifrakturCook = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-blackletter",
});

export const metadata: Metadata = {
  title: "Nilay Sharan",
  description: "Notes on systems, technology, and strategy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexSerif.variable} ${jetbrainsMono.variable} ${unifrakturCook.variable}`}
    >
      <body className="antialiased">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}