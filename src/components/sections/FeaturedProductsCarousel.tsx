"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Locale } from "@/data/site";
import type { PublicProduct } from "@/lib/products";

export function FeaturedProductsCarousel({
  products,
  locale,
}: {
  products: PublicProduct[];
  locale: Locale;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const labels = {
    ca: { previous: "Anterior", next: "Seguent" },
    es: { previous: "Anterior", next: "Siguiente" },
    en: { previous: "Previous", next: "Next" },
  }[locale];

  function scrollProducts(direction: -1 | 1) {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.88, 360),
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="mt-6 flex justify-end gap-2 sm:hidden">
        <button
          type="button"
          aria-label={labels.previous}
          onClick={() => scrollProducts(-1)}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/80 text-2xl font-black text-[var(--color-dark-ink)] shadow transition hover:bg-white"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={labels.next}
          onClick={() => scrollProducts(1)}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/80 text-2xl font-black text-[var(--color-dark-ink)] shadow transition hover:bg-white"
        >
          →
        </button>
      </div>
      <div
        ref={scrollerRef}
        className="mt-6 flex snap-x gap-6 overflow-x-auto pb-7 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-12 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 lg:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </>
  );
}
