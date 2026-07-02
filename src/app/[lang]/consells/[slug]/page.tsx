import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPublishedBlogPost } from "@/lib/blog";
import { getSiteContent, isLocale, type Locale } from "@/data/site";

type BlogPostPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const post = await getPublishedBlogPost(lang, slug);
  if (!post) return {};

  return {
    title: `${post.seoTitle} · Calalina`,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      locale: getSiteContent(lang).metadata.ogLocale,
      siteName: "Calalina",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const post = await getPublishedBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const content = getSiteContent(locale);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt?.toISOString(),
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
        <BlogArticle post={post} locale={locale} />
      </main>
      <Footer locale={locale} content={content.footer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
