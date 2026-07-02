import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/site";
import type { PublicBlogPost } from "@/lib/blog";

const backLabels: Record<Locale, string> = {
  ca: "← Tornar als consells",
  es: "← Volver a consejos",
  en: "← Back to tips",
};

export function BlogArticle({ post, locale }: { post: PublicBlogPost; locale: Locale }) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/consells`}
        className="mb-8 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm transition hover:bg-white"
      >
        {backLabels[locale]}
      </Link>

      <header className="rounded-[2rem] bg-white/78 p-6 shadow-[0_18px_44px_rgba(16,43,86,0.1)] sm:p-8">
        <div className="flex flex-wrap gap-3 text-sm font-black text-[var(--color-deep-green)]">
          <span className="rounded-full bg-[var(--color-mango-yellow)]/35 px-3 py-1">
            {post.category}
          </span>
          <span className="rounded-full bg-[var(--color-soft-cream)] px-3 py-1">
            {post.readingTime}
          </span>
        </div>
        <h1 className="mt-6 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl font-bold leading-8 text-[var(--color-muted-text)]">
          {post.excerpt}
        </p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[var(--color-soft-cream)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mt-8 grid gap-6">
        {post.sections.map((section, index) => (
          <section
            key={`${section.heading}-${index}`}
            className="rounded-[1.5rem] bg-white/82 p-6 shadow-[0_14px_34px_rgba(16,43,86,0.08)] sm:p-8"
          >
            {section.heading ? (
              <h2 className="font-serif text-3xl font-black leading-tight text-[var(--color-dark-ink)]">
                {section.heading}
              </h2>
            ) : null}

            {section.paragraphs ? (
              <div className="mt-5 grid gap-4 text-lg font-semibold leading-8 text-[var(--color-muted-text)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {section.intro ? (
              <p className="mt-5 text-lg font-black text-[var(--color-dark-ink)]">
                {section.intro}
              </p>
            ) : null}

            {section.items ? <ArticleList items={section.items} /> : null}

            {section.secondIntro ? (
              <p className="mt-6 text-lg font-black text-[var(--color-dark-ink)]">
                {section.secondIntro}
              </p>
            ) : null}

            {section.secondItems ? <ArticleList items={section.secondItems} /> : null}

            {section.tips ? (
              <div className="mt-5 grid gap-4">
                {section.tips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl bg-[var(--color-soft-cream)]/70 p-4">
                    <h3 className="font-black text-[var(--color-dark-ink)]">{tip.title}</h3>
                    <p className="mt-2 font-semibold leading-7 text-[var(--color-muted-text)]">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {section.note ? (
              <p className="mt-6 rounded-2xl bg-[var(--color-mango-yellow)]/28 p-4 text-base font-bold leading-7 text-[var(--color-dark-ink)]">
                {section.note}
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

function ArticleList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2 text-base font-semibold leading-7 text-[var(--color-muted-text)] sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="rounded-2xl bg-[var(--color-soft-cream)]/70 px-4 py-3">
          {item}
        </li>
      ))}
    </ul>
  );
}
