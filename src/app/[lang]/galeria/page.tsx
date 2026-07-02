import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { galleryCategories, getPublicGalleryImages } from "@/lib/gallery";
import { getSiteContent, isLocale, type Locale } from "@/data/site";

type GalleryPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
};

const copy: Record<Locale, { title: string; intro: string; empty: string; label: string; all: string }> = {
  ca: {
    title: "Galeria Calalina",
    intro: "Fotos de la botiga, el producte fresc i els petits detalls del mercat.",
    empty: "Encara no hi ha imatges visibles.",
    label: "Galeria",
    all: "Totes",
  },
  es: {
    title: "Galería Calalina",
    intro: "Fotos de la tienda, el producto fresco y los pequeños detalles del mercado.",
    empty: "Todavía no hay imágenes visibles.",
    label: "Galería",
    all: "Todas",
  },
  en: {
    title: "Calalina gallery",
    intro: "Photos of the shop, fresh produce and small market details.",
    empty: "No visible images yet.",
    label: "Gallery",
    all: "All",
  },
};

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title: `${copy[lang].title} · Calalina`,
    description: copy[lang].intro,
  };
}

export default async function PublicGalleryPage({ params, searchParams }: GalleryPageProps) {
  const [{ lang }, { category }] = await Promise.all([params, searchParams]);

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const content = getSiteContent(locale);
  const images = await getPublicGalleryImages(locale, { category });

  return (
    <>
      <Header locale={locale} navItems={content.navItems} content={content.header} />
      <main className="brick-section-soft">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-deep-green)]">
              {copy[locale].label}
            </p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
              {copy[locale].title}
            </h1>
            <p className="mt-5 text-lg font-bold leading-8 text-[var(--color-muted-text)]">
              {copy[locale].intro}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/galeria`}
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm"
            >
              {copy[locale].all}
            </Link>
            {galleryCategories.map((item) => (
              <Link
                key={item.value}
                href={`/${locale}/galeria?category=${item.value}`}
                className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm"
              >
                {locale === "es" ? item.labelEs : locale === "en" ? item.labelEn : item.labelCa}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((item) => (
              <figure
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_34px_rgba(16,43,86,0.1)]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-[var(--color-dark-ink)] shadow-md">
                  {item.category}
                </figcaption>
              </figure>
            ))}
          </div>

          {images.length === 0 ? (
            <p className="mt-10 rounded-[1.5rem] bg-white/75 p-6 text-base font-bold text-[var(--color-muted-text)]">
              {copy[locale].empty}
            </p>
          ) : null}
        </section>
      </main>
      <Footer locale={locale} content={content.footer} />
    </>
  );
}
