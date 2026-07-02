import type { Locale } from "@/data/site";
import { FeaturedProductsCarousel } from "@/components/sections/FeaturedProductsCarousel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getFeaturedProducts } from "@/lib/products";

type FeaturedProductsSectionProps = {
  content: {
    label: string;
    title: string;
    viewAll: string;
    empty: string;
  };
  locale: Locale;
};

export async function FeaturedProductsSection({ content, locale }: FeaturedProductsSectionProps) {
  const products = await getFeaturedProducts(locale);

  return (
    <section id="productes" className="brick-section-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <a
            href="#productes"
            className="font-black text-[var(--color-calalina-red)] hover:text-[var(--color-tomato-red)]"
          >
            {content.viewAll} →
          </a>
        </div>
        {products.length ? (
          <FeaturedProductsCarousel products={products} locale={locale} />
        ) : (
          <p className="mt-8 rounded-[1.25rem] bg-white/70 p-5 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
            {content.empty}
          </p>
        )}
      </div>
    </section>
  );
}
