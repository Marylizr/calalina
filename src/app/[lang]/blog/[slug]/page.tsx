import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, getBlogPost } from "@/data/blog";
import { getSiteContent, isLocale, locales, type Locale } from "@/data/site";

type BlogPostPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    blogPosts.map((post) => ({
      lang,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const blogPost = getBlogPost(lang, slug);

  if (!blogPost) {
    return {};
  }

  return {
    title: `${blogPost.title} · Calalina`,
    description: blogPost.excerpt,
    openGraph: {
      title: blogPost.title,
      description: blogPost.excerpt,
      type: "article",
      locale: getSiteContent(lang).metadata.ogLocale,
      siteName: "Calalina",
      images: [
        {
          url: blogPost.coverImage,
          width: 1200,
          height: 800,
          alt: blogPost.title,
        },
      ],
    },
  };
}

const backLabels: Record<Locale, string> = {
  ca: "← Tornar als consells",
  es: "← Volver a consejos",
  en: "← Back to tips",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const blogPost = getBlogPost(locale, slug);

  if (!blogPost) {
    notFound();
  }

  const content = getSiteContent(locale);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogPost.title,
    description: blogPost.excerpt,
    image: blogPost.coverImage,
    author: {
      "@type": "Organization",
      name: "Calalina",
    },
    publisher: {
      "@type": "Organization",
      name: "Calalina",
    },
    inLanguage: locale,
  };

  return (
    <>
      <Header locale={locale} navItems={content.navItems} content={content.header} />
      <main className="wood-section-soft">
        <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}#consells`}
            className="mb-8 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[var(--color-deep-green)] shadow-sm transition hover:bg-white"
          >
            {backLabels[locale]}
          </Link>

          <header className="rounded-[2rem] bg-white/78 p-6 shadow-[0_18px_44px_rgba(16,43,86,0.1)] sm:p-8">
            <div className="flex flex-wrap gap-3 text-sm font-black text-[var(--color-deep-green)]">
              <span className="rounded-full bg-[var(--color-mango-yellow)]/35 px-3 py-1">
                {blogPost.category}
              </span>
              <span className="rounded-full bg-[var(--color-soft-cream)] px-3 py-1">
                {blogPost.readingTime}
              </span>
            </div>
            <h1 className="mt-6 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
              {blogPost.title}
            </h1>
            <p className="mt-6 text-xl font-bold leading-8 text-[var(--color-muted-text)]">
              {blogPost.excerpt}
            </p>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[var(--color-soft-cream)]">
              <Image
                src={blogPost.coverImage}
                alt={blogPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </header>

          <div className="mt-8 grid gap-6">
            {blogPost.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-[1.5rem] bg-white/82 p-6 shadow-[0_14px_34px_rgba(16,43,86,0.08)] sm:p-8"
              >
                <h2 className="font-serif text-3xl font-black leading-tight text-[var(--color-dark-ink)]">
                  {section.heading}
                </h2>

                {"paragraphs" in section && section.paragraphs ? (
                  <div className="mt-5 grid gap-4 text-lg font-semibold leading-8 text-[var(--color-muted-text)]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {"intro" in section && section.intro ? (
                  <p className="mt-5 text-lg font-black text-[var(--color-dark-ink)]">
                    {section.intro}
                  </p>
                ) : null}

                {"items" in section && section.items ? (
                  <ul className="mt-4 grid gap-2 text-base font-semibold leading-7 text-[var(--color-muted-text)] sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item} className="rounded-2xl bg-[var(--color-soft-cream)]/70 px-4 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {"secondIntro" in section && section.secondIntro ? (
                  <p className="mt-6 text-lg font-black text-[var(--color-dark-ink)]">
                    {section.secondIntro}
                  </p>
                ) : null}

                {"secondItems" in section && section.secondItems ? (
                  <ul className="mt-4 grid gap-2 text-base font-semibold leading-7 text-[var(--color-muted-text)] sm:grid-cols-2">
                    {section.secondItems.map((item) => (
                      <li key={item} className="rounded-2xl bg-[var(--color-soft-cream)]/70 px-4 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {"tips" in section && section.tips ? (
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

                {"note" in section && section.note ? (
                  <p className="mt-6 rounded-2xl bg-[var(--color-mango-yellow)]/28 p-4 text-base font-bold leading-7 text-[var(--color-dark-ink)]">
                    {section.note}
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer locale={locale} content={content.footer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
