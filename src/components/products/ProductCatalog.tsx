import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Locale } from "@/data/site";
import type { ProductCatalogData } from "@/lib/products";

export type ProductCatalogCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  all: string;
  searchPlaceholder: string;
  searchSubmit: string;
  empty: string;
  clearFilters: string;
  quickFilters: {
    seasonal: string;
    featured: string;
    latin: string;
    online: string;
  };
  card: {
    featured: string;
    seasonal: string;
    latin: string;
    online: string;
    askInStore: string;
    available: string;
    outOfStock: string;
  };
};

type ProductCatalogProps = {
  locale: Locale;
  catalogPath: string;
  data: ProductCatalogData;
  activeCategory?: string;
  activeTag?: string;
  query?: string;
  copy: ProductCatalogCopy;
};

export function ProductCatalog({
  locale,
  catalogPath,
  data,
  activeCategory,
  activeTag,
  query,
  copy,
}: ProductCatalogProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full bg-white/78 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-deep-green)] shadow-sm">
          {copy.eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-5 text-lg font-bold leading-8 text-[var(--color-muted-text)]">
          {copy.subtitle}
        </p>
      </div>

      <ProductFilters
        locale={locale}
        catalogPath={catalogPath}
        categories={data.categories}
        activeCategory={activeCategory}
        activeTag={activeTag}
        query={query}
        copy={{
          all: copy.all,
          searchPlaceholder: copy.searchPlaceholder,
          searchSubmit: copy.searchSubmit,
          quickFilters: copy.quickFilters,
        }}
      />

      <ProductGrid
        products={data.products}
        locale={locale}
        catalogPath={catalogPath}
        copy={{
          empty: copy.empty,
          clearFilters: copy.clearFilters,
          card: copy.card,
        }}
      />
    </section>
  );
}
