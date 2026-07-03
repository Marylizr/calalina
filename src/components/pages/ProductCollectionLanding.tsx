import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Locale } from "@/data/site";
import type { PublicBlogPost } from "@/lib/blog";
import type { PublicProduct } from "@/lib/products";

export type ProductCollectionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  catalogCta: string;
  whatsappCta?: string;
  availabilityNote?: string;
  relatedTitle?: string;
  relatedCta?: string;
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

type ProductCollectionLandingProps = {
  locale: Locale;
  products: PublicProduct[];
  catalogPath: string;
  copy: ProductCollectionCopy;
  relatedPosts?: PublicBlogPost[];
  whatsappUrl?: string;
};

export function ProductCollectionLanding({
  locale,
  products,
  catalogPath,
  copy,
  relatedPosts = [],
  whatsappUrl,
}: ProductCollectionLandingProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full bg-white/78 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-deep-green)] shadow-sm">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 text-lg font-bold leading-8 text-[var(--color-muted-text)]">
            {copy.intro}
          </p>
          {copy.availabilityNote ? (
            <p className="mt-4 rounded-2xl bg-white/72 px-5 py-4 text-sm font-black leading-6 text-[var(--color-deep-green)] shadow-sm">
              {copy.availabilityNote}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link
            href={catalogPath}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-calalina-red)] px-6 text-sm font-black text-white shadow-[0_14px_28px_rgba(229,38,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--color-tomato-red)]"
          >
            {copy.catalogCta} →
          </Link>
          {whatsappUrl && copy.whatsappCta ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/84 px-6 text-sm font-black text-[var(--color-deep-green)] shadow-sm transition hover:bg-white"
            >
              {copy.whatsappCta}
            </a>
          ) : null}
        </div>
      </div>

      <ProductGrid
        products={products}
        locale={locale}
        catalogPath={catalogPath}
        copy={{
          empty: copy.empty,
          clearFilters: copy.clearFilters,
          card: copy.card,
        }}
      />

      {relatedPosts.length ? (
        <div className="mt-14 rounded-[1.5rem] bg-white/72 p-6 shadow-[0_16px_34px_rgba(16,43,86,0.08)]">
          <h2 className="font-serif text-3xl font-black text-[var(--color-dark-ink)]">
            {copy.relatedTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/consells/${post.slug}`}
                className="rounded-2xl bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--color-deep-green)]">
                  {post.category}
                </span>
                <h3 className="mt-3 text-xl font-black leading-tight text-[var(--color-dark-ink)]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex text-sm font-black text-[var(--color-calalina-red)]">
                  {copy.relatedCta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
