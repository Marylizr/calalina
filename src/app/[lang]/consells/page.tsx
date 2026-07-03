import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex, blogIndexCopy } from "@/components/blog/BlogIndex";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPublishedBlogPosts } from "@/lib/blog";
import { getSiteContent, isLocale, type Locale } from "@/data/site";

type BlogIndexPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: BlogIndexPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title: `${blogIndexCopy[lang].title} · Calalina`,
    description: blogIndexCopy[lang].intro,
  };
}

export default async function BlogIndexPage({ params, searchParams }: BlogIndexPageProps) {
  const [{ lang }, { category }] = await Promise.all([params, searchParams]);

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const content = getSiteContent(locale);
  const posts = await getPublishedBlogPosts(locale);

  return (
    <>
      <Header locale={locale} navItems={content.navItems} content={content.header} />
      <main className="wood-section-soft">
        <BlogIndex
          locale={locale}
          posts={posts}
          activeCategory={category}
          basePath={`/${locale}/consells`}
          copy={blogIndexCopy[locale]}
        />
      </main>
      <Footer locale={locale} content={content.footer} />
    </>
  );
}
