import type { Locale } from "@/data/site";
import { GalleryCarousel } from "@/components/sections/GalleryCarousel";
import { getPublicGalleryImages } from "@/lib/gallery";

type GallerySectionProps = {
  content: {
    label: string;
    title: string;
    empty: string;
  };
  locale: Locale;
};

export async function GallerySection({ content, locale }: GallerySectionProps) {
  const items = await getPublicGalleryImages(locale, { homeOnly: true });

  return (
    <section id="galeria" className="brick-section-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <GalleryCarousel label={content.label} title={content.title} items={items} />
        ) : (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-deep-green)]">
              {content.label}
            </p>
            <h2 className="max-w-3xl font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-8 rounded-[1.25rem] bg-white/70 p-5 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
              {content.empty}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
