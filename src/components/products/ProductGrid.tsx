import Link from "next/link";
import { PublicProductCard } from "@/components/products/PublicProductCard";
import type { Locale } from "@/data/site";
import type { PublicProduct } from "@/lib/products";

type ProductGridCopy = {
  empty: string;
  clearFilters: string;
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

type ProductGridProps = {
  products: PublicProduct[];
  locale: Locale;
  catalogPath: string;
  copy: ProductGridCopy;
};

export function ProductGrid({ products, locale, catalogPath, copy }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="mt-10 rounded-[1.5rem] bg-white/75 p-6 text-center shadow-[0_14px_34px_rgba(16,43,86,0.08)]">
        <p className="text-base font-black text-[var(--color-muted-text)]">{copy.empty}</p>
        <Link
          href={catalogPath}
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-calalina-red)] px-6 text-sm font-black text-white shadow-[0_12px_24px_rgba(229,38,31,0.2)] transition hover:bg-[var(--color-deep-green)]"
        >
          {copy.clearFilters}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <PublicProductCard key={product.id} product={product} locale={locale} copy={copy.card} />
      ))}
    </div>
  );
}
