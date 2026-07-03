import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex, blogIndexCopy } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductCatalog, type ProductCatalogCopy } from "@/components/products/ProductCatalog";
import {
  ProductCollectionLanding,
  type ProductCollectionCopy,
} from "@/components/pages/ProductCollectionLanding";
import { getSiteContent, isLocale, locales, type Locale } from "@/data/site";
import { getPublishedBlogPosts } from "@/lib/blog";
import {
  getCatalogPath,
  getProductCatalog,
  getProductCollection,
  type ProductCollectionKind,
} from "@/lib/products";
import { getShopWhatsAppUrl } from "@/lib/store-settings";

type CatalogPageProps = {
  params: Promise<{ lang: string; catalog: string }>;
  searchParams: Promise<{ category?: string; categoria?: string; tag?: string; q?: string }>;
};

const catalogSegments: Record<Locale, string> = {
  ca: "productes",
  es: "productos",
  en: "products",
};

const seasonalSegments: Record<Locale, string> = {
  ca: "temporada",
  es: "temporada",
  en: "seasonal",
};

const vegetableSegments: Record<Locale, string> = {
  ca: "verdures",
  es: "verduras",
  en: "vegetables",
};

const latinSegments: Record<Locale, string> = {
  ca: "raco-llati",
  es: "rincon-latino",
  en: "latin-corner",
};

const tipsSegments: Record<Locale, string> = {
  ca: "consells",
  es: "consejos",
  en: "tips",
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

const collectionCopy: Record<
  ProductCollectionKind,
  Record<Locale, Omit<ProductCollectionCopy, "card">>
> = {
  seasonal: {
    ca: {
      eyebrow: "Temporada",
      title: "Fruita de temporada",
      intro:
        "Descobreix quines fruites i productes estan en el seu millor moment ara mateix a Calalina.",
      catalogCta: "Veure cataleg complet",
      relatedTitle: "Consells de temporada",
      relatedCta: "Llegir article",
      empty: "Aviat destacarem productes de temporada.",
      clearFilters: "Veure cataleg",
    },
    es: {
      eyebrow: "Temporada",
      title: "Fruta de temporada",
      intro:
        "Descubre qué frutas y productos están en su mejor momento ahora mismo en Calalina.",
      catalogCta: "Ver catalogo completo",
      relatedTitle: "Consejos de temporada",
      relatedCta: "Leer artículo",
      empty: "Pronto destacaremos productos de temporada.",
      clearFilters: "Ver catalogo",
    },
    en: {
      eyebrow: "Seasonal",
      title: "Seasonal fruit",
      intro: "Discover which fruits and products are at their best right now at Calalina.",
      catalogCta: "View full catalog",
      relatedTitle: "Seasonal tips",
      relatedCta: "Read article",
      empty: "Seasonal products will be featured soon.",
      clearFilters: "View catalog",
    },
  },
  vegetables: {
    ca: {
      eyebrow: "Mercat fresc",
      title: "Verdures fresques",
      intro:
        "Verdures i hortalisses de mercat, triades cada dia amb cura i pensades per cuinar fresc a casa.",
      catalogCta: "Veure cataleg complet",
      empty: "Aviat destacarem verdures fresques.",
      clearFilters: "Veure cataleg",
    },
    es: {
      eyebrow: "Mercado fresco",
      title: "Verduras frescas",
      intro:
        "Verduras y hortalizas de mercado, elegidas cada día con cuidado y pensadas para cocinar fresco en casa.",
      catalogCta: "Ver catalogo completo",
      empty: "Pronto destacaremos verduras frescas.",
      clearFilters: "Ver catalogo",
    },
    en: {
      eyebrow: "Fresh market",
      title: "Fresh vegetables",
      intro:
        "Market vegetables and greens, chosen with care every day for fresh cooking at home.",
      catalogCta: "View full catalog",
      empty: "Fresh vegetables will be featured soon.",
      clearFilters: "View catalog",
    },
  },
  latin: {
    ca: {
      eyebrow: "Raco llati",
      title: "Productes llatins i veneçolans",
      intro:
        "Una selecció de productes llatins i veneçolans per apropar-te els teus sabors preferits a Barcelona.",
      catalogCta: "Veure cataleg complet",
      whatsappCta: "Consultar per WhatsApp",
      availabilityNote: "La disponibilitat pot variar segons arribades i temporada.",
      empty: "Aviat destacarem productes del raco llati.",
      clearFilters: "Veure cataleg",
    },
    es: {
      eyebrow: "Rincon latino",
      title: "Productos latinos y venezolanos",
      intro:
        "Una selección de productos latinos y venezolanos para acercarte tus sabores favoritos en Barcelona.",
      catalogCta: "Ver catalogo completo",
      whatsappCta: "Consultar por WhatsApp",
      availabilityNote: "La disponibilidad puede variar según llegadas y temporada.",
      empty: "Pronto destacaremos productos del rincon latino.",
      clearFilters: "Ver catalogo",
    },
    en: {
      eyebrow: "Latin corner",
      title: "Latin and Venezuelan products",
      intro:
        "A selection of Latin and Venezuelan products to bring your favorite flavors closer in Barcelona.",
      catalogCta: "View full catalog",
      whatsappCta: "Ask on WhatsApp",
      availabilityNote: "Availability may vary depending on deliveries and season.",
      empty: "Latin corner products will be featured soon.",
      clearFilters: "View catalog",
    },
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
  return locales.flatMap((lang) => {
    const params = [
    { lang, catalog: catalogSegments[lang] },
    { lang, catalog: seasonalSegments[lang] },
    { lang, catalog: vegetableSegments[lang] },
    ];

    if (lang !== "es") params.push({ lang, catalog: latinSegments[lang] });
    if (lang !== "ca") params.push({ lang, catalog: tipsSegments[lang] });

    return params;
  });
}

type ResolvedPage =
  | { locale: Locale; type: "catalog" }
  | { locale: Locale; type: "collection"; kind: ProductCollectionKind }
  | { locale: Locale; type: "tips" };

function resolveLocaleCatalog(lang: string, catalog: string): ResolvedPage | null {
  if (!isLocale(lang)) return null;
  if (catalogSegments[lang] === catalog) return { locale: lang, type: "catalog" };
  if (seasonalSegments[lang] === catalog) return { locale: lang, type: "collection", kind: "seasonal" };
  if (vegetableSegments[lang] === catalog) return { locale: lang, type: "collection", kind: "vegetables" };
  if (latinSegments[lang] === catalog) return { locale: lang, type: "collection", kind: "latin" };
  if (tipsSegments[lang] === catalog) return { locale: lang, type: "tips" };
  return null;
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { lang, catalog } = await params;
  const resolved = resolveLocaleCatalog(lang, catalog);
  if (!resolved) return {};

  if (resolved.type === "catalog") return metadataCopy[resolved.locale];
  if (resolved.type === "tips") {
    return {
      title: `${blogIndexCopy[resolved.locale].title} · Calalina`,
      description: blogIndexCopy[resolved.locale].intro,
    };
  }

  const copy = collectionCopy[resolved.kind][resolved.locale];
  return {
    title: `${copy.title} · Calalina`,
    description: copy.intro,
  };
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ lang, catalog }, filters] = await Promise.all([params, searchParams]);
  const resolved = resolveLocaleCatalog(lang, catalog);

  if (!resolved) {
    notFound();
  }

  const locale = resolved.locale;
  const content = getSiteContent(locale);
  const catalogPath = getCatalogPath(locale);

  if (resolved.type === "tips") {
    const posts = await getPublishedBlogPosts(locale);

    return (
      <>
        <Header locale={locale} navItems={content.navItems} content={content.header} />
        <main className="wood-section-soft">
          <BlogIndex
            locale={locale}
            posts={posts}
            activeCategory={filters.category ?? filters.categoria}
            basePath={`/${locale}/${tipsSegments[locale]}`}
            copy={blogIndexCopy[locale]}
          />
        </main>
        <Footer locale={locale} content={content.footer} />
      </>
    );
  }

  if (resolved.type === "collection") {
    const [products, posts, whatsappUrl] = await Promise.all([
      getProductCollection(locale, resolved.kind),
      resolved.kind === "seasonal" ? getPublishedBlogPosts(locale, 3) : Promise.resolve([]),
      resolved.kind === "latin" ? getShopWhatsAppUrl(locale) : Promise.resolve(""),
    ]);
    const copy = collectionCopy[resolved.kind][locale];
    const relatedPosts =
      resolved.kind === "seasonal"
        ? posts.filter((post) =>
            `${post.category} ${post.title}`.toLowerCase().match(/temporada|seasonal|fruta|fruit|fruita/),
          )
        : posts;

    return (
      <>
        <Header locale={locale} navItems={content.navItems} content={content.header} />
        <main className="brick-section-soft">
          <ProductCollectionLanding
            locale={locale}
            products={products}
            catalogPath={catalogPath}
            copy={{ ...copy, card: catalogCopy[locale].card }}
            relatedPosts={relatedPosts.length ? relatedPosts : posts}
            whatsappUrl={whatsappUrl}
          />
        </main>
        <Footer locale={locale} content={content.footer} />
      </>
    );
  }

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
