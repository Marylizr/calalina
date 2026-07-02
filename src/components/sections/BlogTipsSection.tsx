import type { Locale } from "@/data/site";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPublishedBlogPosts } from "@/lib/blog";

type BlogTipsSectionProps = {
  content: {
    label: string;
    title: string;
    readMore: string;
    empty: string;
  };
  locale: Locale;
};

export async function BlogTipsSection({ content, locale }: BlogTipsSectionProps) {
  const posts = await getPublishedBlogPosts(locale, 4);

  return (
    <section id="consells" className="wood-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>{content.label}</SectionLabel>
        <h2 className="max-w-3xl font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((tip) => (
            <BlogCard
              key={tip.id}
              title={tip.title}
              category={tip.category}
              excerpt={tip.excerpt}
              image={tip.coverImage}
              href={`/${locale}/consells/${tip.slug}`}
              readMore={content.readMore}
            />
          ))}
        </div>
        {posts.length === 0 ? (
          <p className="mt-8 rounded-[1.25rem] bg-white/70 p-5 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
            {content.empty}
          </p>
        ) : null}
      </div>
    </section>
  );
}
