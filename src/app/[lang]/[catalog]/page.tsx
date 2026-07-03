import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductCatalog, type ProductCatalogCopy } from "@/components/products/ProductCatalog";
import { getSiteContent, isLocale, locales, type Locale } from "@/data/site";
import { getCatalogPath, getProductCatalog } from "@/lib/products";

type CatalogPageProps = {
  params: Promise<{ lang: string; catalog: string }>;
  searchParams: Promise<{ categoria?: string; tag?: string; q?: string }>;
};

const catalogSegments: Record<Locale, string> = {
  ca: "productes",
  es: "productos",
  en: "products",
};

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  ca: {
    title: "Productes · Calalina Fruiteria Barcelona",
    description:
      "Descobreix la seleccio de fruita, verdura, productes de temporada i raco llati de Calalina a Barcelona.",
  },
  es: {
    title: "Productos · Calalina Frutería Barcelona",
    description:
      "Descubre la seleccion de fruta, verdura, productos de temporada y rincon latino de Calalina en Barcelona.",
  },
  en: {
    title: "Products · Calalina Fruit Shop Barcelona",
    description:
      "Discover Calalina's selection of fruit, vegetables, seasonal products and Latin corner in Barcelona.",
  },
};

const catalogCopy: Record<Locale, ProductCatalogCopy> = {
  ca: {
    eyebrow: "Cataleg",
    title: "Productes de Calalina",
    subtitle:
      "Fruita fresca, verdura de temporada, productes llatins i petits imprescindibles per al dia a dia.",
    all: "Tots",
    searchPlaceholder: "Busca fruita, verdura o productes llatins...",
    searchSubmit: "Buscar",
    empty: "No hem trobat productes amb aquests filtres.",
    clearFilters: "Netejar filtres",
    quickFilters: {
      seasonal: "Temporada",
      featured: "Destacats",
      latin: "Raco llati",
      online: "Disponibles online",
    },
    card: {
      featured: "Destacat",
      seasonal: "Temporada",
      latin: "Raco llati",
      online: "Online",
      askInStore: "Botiga",
      available: "Disponible",
      outOfStock: "Esgotat",
    },
  },
  es: {
    eyebrow: "Catálogo",
    title: "Productos de Calalina",
    subtitle:
      "Fruta fresca, verdura de temporada, productos latinos y pequeños imprescindibles para el día a día.",
    all: "Todos",
    searchPlaceholder: "Busca fruta, verdura o productos latinos...",
    searchSubmit: "Buscar",
    empty: "No hemos encontrado productos con estos filtros.",
    clearFilters: "Limpiar filtros",
    quickFilters: {
      seasonal: "Temporada",
      featured: "Destacados",
      latin: "Rincon latino",
      online: "Disponibles online",
    },
    card: {
      featured: "Destacado",
      seasonal: "Temporada",
      latin: "Rincon latino",
      online: "Online",
      askInStore: "Tienda",
      available: "Disponible",
      outOfStock: "Agotado",
    },
  },
  en: {
    eyebrow: "Catalog",
    title: "Calalina Products",
    subtitle: "Fresh fruit, seasonal vegetables, Latin products and everyday essentials.",
    all: "All",
    searchPlaceholder: "Search fruit, vegetables or Latin products...",
    searchSubmit: "Search",
    empty: "No products found with these filters.",
    clearFilters: "Clear filters",
    quickFilters: {
      seasonal: "Seasonal",
      featured: "Featured",
      latin: "Latin corner",
      online: "Available online",
    },
    card: {
      featured: "Featured",
      seasonal: "Seasonal",
      latin: "Latin",
      online: "Online",
      askInStore: "In store",
      available: "Available",
      outOfStock: "Out of stock",
    },
  },
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang, catalog: catalogSegments[lang] }));
}

function resolveLocaleCatalog(lang: string, catalog: string) {
  if (!isLocale(lang)) return null;
  if (catalogSegments[lang] !== catalog) return null;
  return lang;
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { lang, catalog } = await params;
  const locale = resolveLocaleCatalog(lang, catalog);
  if (!locale) return {};

  return metadataCopy[locale];
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ lang, catalog }, filters] = await Promise.all([params, searchParams]);
  const locale = resolveLocaleCatalog(lang, catalog);

  if (!locale) {
    notFound();
  }

  const content = getSiteContent(locale);
  const catalogPath = getCatalogPath(locale);
  const data = await getProductCatalog(locale, {
    category: filters.categoria,
    tag: filters.tag,
    q: filters.q,
  });

  return (
    <>
      <Header locale={locale} navItems={content.navItems} content={content.header} />
      <main className="brick-section-soft">
        <ProductCatalog
          locale={locale}
          catalogPath={catalogPath}
          data={data}
          activeCategory={filters.categoria}
          activeTag={filters.tag}
          query={filters.q}
          copy={catalogCopy[locale]}
        />
      </main>
      <Footer locale={locale} content={content.footer} />
    </>
  );
}
