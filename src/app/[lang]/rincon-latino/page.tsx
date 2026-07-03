import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getSiteContent, isLocale, locales, type Locale } from "@/data/site";
import { getCatalogPath, getProductCollection } from "@/lib/products";
import { getShopWhatsAppUrl } from "@/lib/store-settings";

type RinconLatinoPageProps = {
  params: Promise<{ lang: string }>;
};

const galleryImages = [
  "latino1",
  "latino2",
  "latino3",
  "latino4",
  "latino5",
  "latino6",
  "latino7",
  "latino8",
].map((name) => `/images/latino/${name}.png`);

const pageContent: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    productsTitle: string;
    products: string[];
    cta: string;
    whatsappCta: string;
    galleryTitle: string;
    productsGridTitle: string;
    productsGridText: string;
    empty: string;
    clearFilters: string;
    back: string;
    imageAlt: string;
  }
> = {
  ca: {
    eyebrow: "Racó llatí a Barcelona",
    title: "Un trosset de casa, a prop teu.",
    intro:
      "A Calalina trobaràs productes veneçolans i llatins dels que més es busquen quan apareix l'enyorança.",
    body: [
      "Hi ha sabors que no són només menjar. Són una tarda a casa, una conversa a la cuina, una festa familiar, una arepa acabada de fer o aquell producte que et recorda d'on vens.",
      "El nostre racó llatí neix d'aquest sentiment: que et sentis a prop de la teva terra encara que estiguis lluny. Vine a buscar-nos quan et vingui de gust cuinar amb memòria, compartir alguna cosa de casa o simplement tenir al rebost allò que et reconforta.",
      "Sempre intentem tenir formatge fresc i una selecció de productes veneçolans de molta demanda, juntament amb marques i sabors que connecten amb la vida llatina de cada dia.",
    ],
    productsTitle: "El que hi acostumes a trobar",
    products: [
      "Formatge fresc per a arepes, esmorzars i sopars de casa.",
      "Productes veneçolans de molta demanda.",
      "Dolços, galetes, begudes i bàsics del rebost llatí.",
      "Ingredients per preparar plats que fan olor de família.",
    ],
    cta: "Vine a comprar els teus productes",
    whatsappCta: "Consultar per WhatsApp",
    galleryTitle: "Sabors que abracen",
    productsGridTitle: "Productes llatins disponibles",
    productsGridText: "La disponibilitat pot variar segons arribades i temporada.",
    empty: "Aviat destacarem productes del raco llati.",
    clearFilters: "Veure cataleg",
    back: "Tornar a Calalina",
    imageAlt: "Productes del racó llatí de Calalina",
  },
  es: {
    eyebrow: "Rincón latino en Barcelona",
    title: "Un pedacito de casa, cerca de ti.",
    intro:
      "En Calalina encuentras productos venezolanos y latinos de los más buscados cuando pega la nostalgia.",
    body: [
      "Hay sabores que no son solo comida. Son una tarde en casa, una conversación en la cocina, una fiesta familiar, una arepa recién hecha o ese producto que te recuerda de dónde vienes.",
      "Nuestro rincón latino nace de ese sentimiento: que te sientas cerca de tu tierra aunque estés lejos. Ven a buscarnos cuando quieras cocinar con memoria, compartir algo de casa o simplemente tener en la despensa eso que te reconforta.",
      "Siempre intentamos tener queso fresco y una selección de productos venezolanos de alta demanda, junto con marcas y sabores que conectan con la vida latina de todos los días.",
    ],
    productsTitle: "Lo que sueles encontrar",
    products: [
      "Queso fresco para arepas, desayunos y cenas de casa.",
      "Productos venezolanos de alta demanda.",
      "Dulces, galletas, bebidas y básicos de la despensa latina.",
      "Ingredientes para preparar platos que huelen a familia.",
    ],
    cta: "Ven a comprar tus productos",
    whatsappCta: "Consultar por WhatsApp",
    galleryTitle: "Sabores que abrazan",
    productsGridTitle: "Productos latinos disponibles",
    productsGridText: "La disponibilidad puede variar según llegadas y temporada.",
    empty: "Pronto destacaremos productos del rincon latino.",
    clearFilters: "Ver catalogo",
    back: "Volver a Calalina",
    imageAlt: "Productos del rincón latino de Calalina",
  },
  en: {
    eyebrow: "Latin corner in Barcelona",
    title: "A little piece of home, close to you.",
    intro:
      "At Calalina you will find some of the most requested Venezuelan and Latin products for those days when homesickness arrives.",
    body: [
      "Some flavours are not just food. They are an afternoon at home, a kitchen conversation, a family celebration, a fresh arepa or that one product that reminds you where you come from.",
      "Our Latin corner was born from that feeling: helping you feel close to your land even when you are far away. Come by when you want to cook with memory, share something from home or simply keep a comforting favourite in your pantry.",
      "We always try to have fresh cheese and a selection of high-demand Venezuelan products, along with brands and flavours connected to everyday Latin life.",
    ],
    productsTitle: "What you will often find",
    products: [
      "Fresh cheese for arepas, breakfasts and home-style dinners.",
      "High-demand Venezuelan products.",
      "Sweets, biscuits, drinks and Latin pantry basics.",
      "Ingredients for dishes that smell like family.",
    ],
    cta: "Come shop your favourites",
    whatsappCta: "Ask on WhatsApp",
    galleryTitle: "Flavours that feel close",
    productsGridTitle: "Available Latin products",
    productsGridText: "Availability may vary depending on deliveries and season.",
    empty: "Latin corner products will be featured soon.",
    clearFilters: "View catalog",
    back: "Back to Calalina",
    imageAlt: "Products from Calalina's Latin corner",
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: RinconLatinoPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const content = pageContent[lang];

  return {
    title: `${content.eyebrow} · Calalina`,
    description: content.intro,
    openGraph: {
      title: content.title,
      description: content.intro,
      type: "website",
      locale: getSiteContent(lang).metadata.ogLocale,
      siteName: "Calalina",
      images: [
        {
          url: galleryImages[0],
          width: 1200,
          height: 900,
          alt: content.imageAlt,
        },
      ],
    },
  };
}

export default async function RinconLatinoPage({ params }: RinconLatinoPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const siteContent = getSiteContent(locale);
  const content = pageContent[locale];
  const [latinProducts, whatsappUrl] = await Promise.all([
    getProductCollection(locale, "latin"),
    getShopWhatsAppUrl(locale),
  ]);
  const catalogPath = getCatalogPath(locale);
  const cardCopy = {
    featured: locale === "es" ? "Destacado" : locale === "en" ? "Featured" : "Destacat",
    seasonal: locale === "es" ? "Temporada" : locale === "en" ? "Seasonal" : "Temporada",
    latin: locale === "es" ? "Rincon latino" : locale === "en" ? "Latin" : "Raco llati",
    online: "Online",
    askInStore: locale === "es" ? "Tienda" : locale === "en" ? "In store" : "Botiga",
    available: locale === "es" ? "Disponible" : locale === "en" ? "Available" : "Disponible",
    outOfStock: locale === "es" ? "Agotado" : locale === "en" ? "Out of stock" : "Esgotat",
  };

  return (
    <>
      <Header locale={locale} navItems={siteContent.navItems} content={siteContent.header} />
      <main className="brick-section-soft">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm">
              {content.eyebrow}
            </p>
            <h1 className="mt-6 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-8 text-[var(--color-muted-text)]">
              {content.intro}
            </p>
            <div className="mt-6 grid gap-4 text-lg font-bold leading-8 text-[var(--color-muted-text)]">
              {content.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}#ubicacio`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-calalina-red)] px-6 text-sm font-black text-white shadow-[0_14px_28px_rgba(229,38,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--color-tomato-red)]"
              >
                {content.cta} →
              </Link>
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/82 px-6 text-sm font-black text-[var(--color-deep-green)] shadow-sm transition hover:bg-white"
                >
                  {content.whatsappCta}
                </a>
              ) : null}
              <Link
                href={`/${locale}#temporada`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/82 px-6 text-sm font-black text-[var(--color-deep-green)] shadow-sm transition hover:bg-white"
              >
                {content.back}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border-[8px] border-white/80 bg-white shadow-[0_28px_64px_rgba(117,64,28,0.25)] sm:min-h-[620px]">
              <Image
                src={galleryImages[0]}
                alt={content.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-5 right-5 rotate-[-1.5deg] rounded-2xl bg-[var(--color-chalkboard-black)] px-5 py-4 text-center text-white shadow-[0_16px_30px_rgba(30,30,26,0.3)] sm:left-10 sm:right-10">
              <p className="chalk-hand text-2xl leading-none sm:text-3xl">
                {content.galleryTitle}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)]">
              {content.productsGridTitle}
            </h2>
            <p className="mt-4 text-base font-bold leading-7 text-[var(--color-muted-text)]">
              {content.productsGridText}
            </p>
          </div>
          <ProductGrid
            products={latinProducts}
            locale={locale}
            catalogPath={catalogPath}
            copy={{
              empty: content.empty,
              clearFilters: content.clearFilters,
              card: cardCopy,
            }}
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[1.5rem] bg-white/80 p-6 shadow-[0_16px_36px_rgba(16,43,86,0.08)] sm:p-8">
              <h2 className="font-serif text-3xl font-black text-[var(--color-dark-ink)]">
                {content.productsTitle}
              </h2>
              <ul className="mt-6 grid gap-3">
                {content.products.map((product) => (
                  <li
                    key={product}
                    className="rounded-2xl bg-[var(--color-soft-cream)]/70 px-4 py-3 text-base font-bold leading-7 text-[var(--color-muted-text)]"
                  >
                    {product}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-[1.25rem] border-4 border-white/80 bg-white shadow-[0_14px_30px_rgba(117,64,28,0.16)] ${
                    index === 1 || index === 6 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${content.imageAlt} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} content={siteContent.footer} />
    </>
  );
}
