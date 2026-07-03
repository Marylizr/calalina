import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/site";
import type { PublicBlogPost } from "@/lib/blog";

export type BlogIndexCopy = {
  title: string;
  intro: string;
  empty: string;
  read: string;
  all: string;
};

export const blogIndexCopy: Record<Locale, BlogIndexCopy> = {
  ca: {
    title: "Consells de Calalina",
    intro: "Idees per comprar, conservar i cuinar millor el producte fresc.",
    empty: "Encara no hi ha articles publicats.",
    read: "Llegir article",
    all: "Tots",
  },
  es: {
    title: "Consejos de Calalina",
    intro: "Ideas para comprar, conservar y cocinar mejor el producto fresco.",
    empty: "Todavía no hay artículos publicados.",
    read: "Leer artículo",
    all: "Todos",
  },
  en: {
    title: "Calalina tips",
    intro: "Ideas to shop, store and cook fresh produce better.",
    empty: "No published articles yet.",
    read: "Read article",
    all: "All",
  },
};

type BlogIndexProps = {
  locale: Locale;
  posts: PublicBlogPost[];
  activeCategory?: string;
  basePath: string;
  copy: BlogIndexCopy;
};

export function BlogIndex({ locale, posts, activeCategory, basePath, copy }: BlogIndexProps) {
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-deep-green)]">
          Blog
        </p>
        <h1 className="mt-3 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-5 text-lg font-bold leading-8 text-[var(--color-muted-text)]">
          {copy.intro}
        </p>
      </div>

      {categories.length > 1 ? (
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={basePath}
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm"
          >
            {copy.all}
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={`${basePath}?category=${encodeURIComponent(item)}`}
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm"
            >
              {item}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-[1.5rem] border border-[var(--color-deep-green)]/10 bg-white shadow-[0_14px_34px_rgba(16,43,86,0.08)]"
          >
            <div className="relative aspect-[5/3] bg-[var(--color-soft-cream)]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span className="rounded-full bg-[var(--color-mango-yellow)]/35 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--color-dark-ink)]">
                {post.category}
              </span>
              <h2 className="mt-4 text-xl font-black leading-tight text-[var(--color-dark-ink)]">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted-text)]">
                {post.excerpt}
              </p>
              <Link
                href={`/${locale}/consells/${post.slug}`}
                className="mt-5 inline-flex text-sm font-black text-[var(--color-calalina-red)]"
              >
                {copy.read} →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="mt-10 rounded-[1.5rem] bg-white/75 p-6 text-base font-bold text-[var(--color-muted-text)]">
          {copy.empty}
        </p>
      ) : null}
    </section>
  );
}
