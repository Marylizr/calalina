import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutSection } from "@/components/sections/AboutSection";
import { BlogTipsSection } from "@/components/sections/BlogTipsSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteContent, isLocale, locales, type Locale } from "@/data/site";

type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const content = getSiteContent(lang);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      type: "website",
      locale: content.metadata.ogLocale,
      siteName: "Calalina",
      images: [
        {
          url: "/images/hero/animation-reference.svg",
          width: 1200,
          height: 900,
          alt: content.metadata.imageAlt,
        },
      ],
    },
  };
}

export default async function LocalizedHome({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const content = getSiteContent(locale);
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: "Calalina",
    alternateName: "Fruteria Calalina / Ca la Lina",
    description: content.jsonLdDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Passeig de Sant Joan, 195 - CALALINA",
      postalCode: "08037",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
    telephone: "+34 932 10 21 53",
    email: "hola@calalina.cat",
    url: "https://calalina.com",
    openingHours: [
      "Tu-Th 09:00-14:00",
      "Tu-Th 17:00-20:00",
      "Fr 09:00-15:00",
      "Fr 17:00-20:00",
      "Sa 09:00-14:00",
    ],
    priceRange: "€€",
    inLanguage: locale,
  };

  return (
    <>
      <Header locale={locale} navItems={content.navItems} content={content.header} />
      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <OfferSection content={content.offer} />
        <FeaturedProductsSection content={content.products} />
        <div id="raco-llati" className="scroll-mt-24" aria-hidden="true" />
        <BlogTipsSection content={content.blog} locale={locale} />
        <GallerySection content={content.gallery} />
        <LocationSection content={content.location} />
      </main>
      <Footer locale={locale} content={content.footer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </>
  );
}
