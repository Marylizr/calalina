"use client";

import { useRef } from "react";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { PublicGalleryImage } from "@/lib/gallery";

export function GalleryCarousel({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: PublicGalleryImage[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: -1 | 1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.9, 720),
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="max-w-3xl font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollGallery(-1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white/80 text-2xl font-black text-[var(--color-dark-ink)] shadow transition hover:bg-white"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => scrollGallery(1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white/80 text-2xl font-black text-[var(--color-dark-ink)] shadow transition hover:bg-white"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="mt-10 flex snap-x gap-4 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <GalleryCard key={item.id} title={item.title} category={item.category} image={item.image} />
        ))}
      </div>
    </>
  );
}
