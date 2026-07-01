import type { Locale } from "@/data/site";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

type BlogTipsSectionProps = {
  content: {
    label: string;
    title: string;
    readMore: string;
    items: { title: string; category: string; excerpt: string; image: string; slug?: string }[];
  };
  locale: Locale;
};

export function BlogTipsSection({ content, locale }: BlogTipsSectionProps) {
  return (
    <section id="consells" className="wood-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>{content.label}</SectionLabel>
        <h2 className="max-w-3xl font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((tip) => (
            <BlogCard
              key={tip.title}
              {...tip}
              href={tip.slug ? `/${locale}/blog/${tip.slug}` : undefined}
              readMore={content.readMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
