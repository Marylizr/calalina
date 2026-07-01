import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calalina",
  description:
    "Fruiteria de barri a Barcelona amb fruita fresca, verdura de temporada i sabors llatins.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Calalina",
    description:
      "Fruiteria de barri a Barcelona amb fruita fresca, verdura de temporada i sabors llatins.",
    type: "website",
    siteName: "Calalina",
    images: [
      {
        url: "/images/hero/animation-reference.svg",
        width: 1200,
        height: 900,
        alt: "Calalina fruiteria de barri a Barcelona",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ca"
      className={`${fraunces.variable} ${nunito.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
