import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = localFont({
  src: "../fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-sans",
  display: "swap",
});

const plexSerif = localFont({
  src: [
    {
      path: "../fonts/IBM_Plex_Serif/IBMPlexSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IBM_Plex_Serif/IBMPlexSerif-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/IBM_Plex_Serif/IBMPlexSerif-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-mono",
  display: "swap",
});

const unifrakturCook = localFont({
  src: "../fonts/UnifrakturCook/UnifrakturCook-Bold.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-blackletter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nilay Sharan",
    template: "%s | Nilay Sharan",
  },
  description: "Notes on systems, technology, and strategy.",
  keywords: [
    "Nilay Sharan",
    "systems",
    "technology",
    "strategy",
    "essays",
    "zettelkasten",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Nilay Sharan",
    description: "Notes on systems, technology, and strategy.",
    siteName: "Nilay Sharan",
  },
  twitter: {
    card: "summary",
    title: "Nilay Sharan",
    description: "Notes on systems, technology, and strategy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexSerif.variable} ${jetbrainsMono.variable} ${unifrakturCook.variable}`}
    >
      <body className="antialiased">
        <Navbar />
        {children}
        {modal}
        <Footer />
      </body>
    </html>
  );
}
