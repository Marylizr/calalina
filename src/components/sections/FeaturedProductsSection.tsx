"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useRef } from "react";

type FeaturedProductsSectionProps = {
  content: {
    label: string;
    title: string;
    viewAll: string;
    items: { name: string; price?: string; image: string }[];
  };
};

export function FeaturedProductsSection({ content }: FeaturedProductsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollProducts(direction: -1 | 1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.88, 360),
      behavior: "smooth",
    });
  }

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
        <div className="mt-6 flex justify-end gap-2 sm:hidden">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollProducts(-1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white/80 text-2xl font-black text-[var(--color-dark-ink)] shadow transition hover:bg-white"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Siguiente"
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
          {content.items.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
