import type { BlogPost as PrismaBlogPost } from "@prisma/client";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import type { Locale } from "@/data/site";

export type BlogTip = {
  title: string;
  text: string;
};

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
  secondIntro?: string;
  secondItems?: string[];
  tips?: BlogTip[];
  note?: string;
};

export type PublicBlogPost = {
  id: string;
  slug: string;
  category: string;
  readingTime: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: Date | null;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};

const fallbackCoverImage = "/images/blog/nevera.png";

const fallbackPosts: PublicBlogPost[] = [
  {
    id: "fallback-nevera",
    slug: "nevera-si-o-no-que-guardem-i-que-no",
    category: "Consells de conservació",
    readingTime: "4 min",
    title: "Nevera sí o no? Què guardem i què no",
    excerpt:
      "Una guia senzilla per saber quines fruites i verdures van a la nevera, quines és millor deixar fora i com evitar que madurin massa ràpid.",
    coverImage: "/images/blog/nevera.png",
    publishedAt: null,
    seoTitle: "Nevera sí o no? Què guardem i què no",
    seoDescription:
      "Una guia senzilla per saber quines fruites i verdures van a la nevera, quines és millor deixar fora i com evitar que madurin massa ràpid.",
    sections: [
      {
        heading: "Nevera sí o no? La guia ràpida de Calalina",
        paragraphs: [
          "La nevera conserva, però no sempre millora. Alguns productes agraeixen el fred i altres perden sabor o textura si els refredem massa aviat.",
        ],
      },
    ],
  },
  {
    id: "fallback-temporada",
    slug: "fruita-de-temporada-que-mengem-cada-mes",
    category: "Fruita de temporada",
    readingTime: "5 min",
    title: "Fruita de temporada: què mengem cada mes",
    excerpt:
      "Una guia visual i senzilla per descobrir quines fruites estan en el seu millor moment durant cada època de l’any.",
    coverImage: "/images/blog/temporada.png",
    publishedAt: null,
    seoTitle: "Fruita de temporada: què mengem cada mes",
    seoDescription:
      "Una guia visual i senzilla per descobrir quines fruites estan en el seu millor moment durant cada època de l’any.",
    sections: [
      {
        heading: "Per què menjar fruita de temporada",
        paragraphs: [
          "Menjar fruita de temporada és una manera de gaudir de més sabor, millor textura i una compra amb més sentit.",
        ],
      },
    ],
  },
  {
    id: "fallback-verdures",
    slug: "com-conservar-les-verdures-fresques-mes-temps",
    category: "Consells de conservació",
    readingTime: "4 min",
    title: "Com conservar les verdures fresques més temps",
    excerpt:
      "Petits canvis a l’hora de guardar les verdures poden ajudar-te a mantenir-les fresques, cruixents i saboroses durant més dies.",
    coverImage: "/images/blog/frescas.png",
    publishedAt: null,
    seoTitle: "Com conservar les verdures fresques més temps",
    seoDescription:
      "Petits canvis a l’hora de guardar les verdures poden ajudar-te a mantenir-les fresques, cruixents i saboroses durant més dies.",
    sections: [
      {
        heading: "La nevera ajuda, però l'ordre també",
        paragraphs: [
          "La clau és controlar humitat, aire i maduració. No totes les verdures demanen el mateix.",
        ],
      },
    ],
  },
  {
    id: "fallback-idees",
    slug: "idees-rapides-amb-productes-del-mercat",
    category: "Receptes fàcils",
    readingTime: "3 min",
    title: "Idees ràpides amb productes del mercat",
    excerpt:
      "Receptes simples, fresques i amb molt sabor per resoldre el dia a dia amb fruita, verdura i productes de temporada.",
    coverImage: "/images/blog/recetas.png",
    publishedAt: null,
    seoTitle: "Idees ràpides amb productes del mercat",
    seoDescription:
      "Receptes simples, fresques i amb molt sabor per resoldre el dia a dia amb fruita, verdura i productes de temporada.",
    sections: [
      {
        heading: "Cuinar bé sense complicar-se",
        paragraphs: [
          "Amb bons productes del mercat pots preparar plats ràpids, frescos i saborosos en pocs minuts.",
        ],
      },
    ],
  },
];

const fallbackTranslations: Partial<Record<Locale, Partial<Record<string, Partial<PublicBlogPost>>>>> = {
  es: {
    "nevera-si-o-no-que-guardem-i-que-no": {
      category: "Consejos de conservación",
      title: "¿Nevera sí o no? Qué guardamos y qué no",
      excerpt:
        "Una guía sencilla para saber qué frutas y verduras van a la nevera, cuáles es mejor dejar fuera y cómo evitar que maduren demasiado rápido.",
      seoTitle: "¿Nevera sí o no? Qué guardamos y qué no",
      seoDescription:
        "Una guía sencilla para saber qué frutas y verduras van a la nevera, cuáles es mejor dejar fuera y cómo evitar que maduren demasiado rápido.",
      sections: [
        {
          heading: "Nevera sí o no? La guía rápida de Calalina",
          paragraphs: [
            "La nevera conserva, pero no siempre mejora. Algunos productos agradecen el frío y otros pierden sabor o textura si los enfriamos demasiado pronto.",
          ],
        },
      ],
    },
    "fruita-de-temporada-que-mengem-cada-mes": {
      category: "Fruta de temporada",
      title: "Fruta de temporada: qué comemos cada mes",
      excerpt:
        "Una guía visual y sencilla para descubrir qué frutas están en su mejor momento durante cada época del año.",
      seoTitle: "Fruta de temporada: qué comemos cada mes",
      seoDescription:
        "Una guía visual y sencilla para descubrir qué frutas están en su mejor momento durante cada época del año.",
      sections: [
        {
          heading: "Por qué comer fruta de temporada",
          paragraphs: [
            "Comer fruta de temporada es una manera de disfrutar más sabor, mejor textura y una compra con más sentido.",
          ],
        },
      ],
    },
    "com-conservar-les-verdures-fresques-mes-temps": {
      category: "Consejos de conservación",
      title: "Cómo conservar las verduras frescas más tiempo",
      excerpt:
        "Pequeños cambios al guardar las verduras pueden ayudarte a mantenerlas frescas, crujientes y sabrosas durante más días.",
      seoTitle: "Cómo conservar las verduras frescas más tiempo",
      seoDescription:
        "Pequeños cambios al guardar las verduras pueden ayudarte a mantenerlas frescas, crujientes y sabrosas durante más días.",
      sections: [
        {
          heading: "La nevera ayuda, pero el orden también",
          paragraphs: [
            "La clave es controlar humedad, aire y maduración. No todas las verduras piden lo mismo.",
          ],
        },
      ],
    },
    "idees-rapides-amb-productes-del-mercat": {
      category: "Recetas fáciles",
      title: "Ideas rápidas con productos del mercado",
      excerpt:
        "Recetas simples, frescas y con mucho sabor para resolver el día a día con fruta, verdura y productos de temporada.",
      seoTitle: "Ideas rápidas con productos del mercado",
      seoDescription:
        "Recetas simples, frescas y con mucho sabor para resolver el día a día con fruta, verdura y productos de temporada.",
      sections: [
        {
          heading: "Cocinar bien sin complicarse",
          paragraphs: [
            "Con buenos productos del mercado puedes preparar platos rápidos, frescos y sabrosos en pocos minutos.",
          ],
        },
      ],
    },
  },
  en: {
    "nevera-si-o-no-que-guardem-i-que-no": {
      category: "Storage tips",
      title: "Fridge or not? What to store cold and what to keep out",
      excerpt:
        "A simple guide to know which fruit and vegetables go in the fridge, which are better outside and how to slow ripening.",
      seoTitle: "Fridge or not? What to store cold and what to keep out",
      seoDescription:
        "A simple guide to know which fruit and vegetables go in the fridge, which are better outside and how to slow ripening.",
      sections: [
        {
          heading: "Fridge or not? Calalina's quick guide",
          paragraphs: [
            "The fridge preserves, but it does not always improve. Some produce likes the cold, while other items lose flavour or texture if chilled too early.",
          ],
        },
      ],
    },
    "fruita-de-temporada-que-mengem-cada-mes": {
      category: "Seasonal fruit",
      title: "Seasonal fruit: what to eat each month",
      excerpt:
        "A simple visual guide to discover which fruits are at their best during each season of the year.",
      seoTitle: "Seasonal fruit: what to eat each month",
      seoDescription:
        "A simple visual guide to discover which fruits are at their best during each season of the year.",
      sections: [
        {
          heading: "Why eat seasonal fruit",
          paragraphs: [
            "Eating seasonal fruit is a way to enjoy more flavour, better texture and a more thoughtful shop.",
          ],
        },
      ],
    },
    "com-conservar-les-verdures-fresques-mes-temps": {
      category: "Storage tips",
      title: "How to keep fresh vegetables for longer",
      excerpt:
        "Small changes in how you store vegetables can help keep them fresh, crisp and tasty for more days.",
      seoTitle: "How to keep fresh vegetables for longer",
      seoDescription:
        "Small changes in how you store vegetables can help keep them fresh, crisp and tasty for more days.",
      sections: [
        {
          heading: "The fridge helps, but order matters too",
          paragraphs: [
            "The key is controlling humidity, airflow and ripening. Not every vegetable needs the same care.",
          ],
        },
      ],
    },
    "idees-rapides-amb-productes-del-mercat": {
      category: "Easy recipes",
      title: "Quick ideas with market produce",
      excerpt:
        "Simple, fresh and flavourful recipes for everyday meals with fruit, vegetables and seasonal produce.",
      seoTitle: "Quick ideas with market produce",
      seoDescription:
        "Simple, fresh and flavourful recipes for everyday meals with fruit, vegetables and seasonal produce.",
      sections: [
        {
          heading: "Cooking well without overcomplicating it",
          paragraphs: [
            "With good market produce you can prepare quick, fresh and tasty dishes in just a few minutes.",
          ],
        },
      ],
    },
  },
};

function getFallbackPosts(locale: Locale, limit?: number) {
  return fallbackPosts
    .map((post) => ({
      ...post,
      ...(fallbackTranslations[locale]?.[post.slug] || {}),
    }))
    .slice(0, limit);
}

function getFallbackPost(locale: Locale, slug: string) {
  return getFallbackPosts(locale).find((post) => post.slug === slug) || null;
}

const legacySlugMap: Record<string, string> = {
  "fruta-de-temporada-que-comemos-cada-mes": "fruita-de-temporada-que-mengem-cada-mes",
  "como-conservar-las-verduras-frescas-mas-tiempo": "com-conservar-les-verdures-fresques-mes-temps",
};

function localizedField<T extends string | null | undefined>(
  locale: Locale,
  ca: T,
  es: T,
  en: T,
) {
  if (locale === "es") return es || ca;
  if (locale === "en") return en || ca;
  return ca;
}

function parseContent(content: string): { readingTime: string; sections: BlogSection[] } {
  try {
    const parsed = JSON.parse(content) as { readingTime?: string; sections?: BlogSection[] };
    if (Array.isArray(parsed.sections)) {
      return {
        readingTime: parsed.readingTime || "4 min",
        sections: parsed.sections,
      };
    }
  } catch {
    // Plain text/markdown is allowed from the backoffice.
  }

  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    readingTime: "4 min",
    sections: [
      {
        heading: "Article",
        paragraphs: paragraphs.length ? paragraphs : [content],
      },
    ],
  };
}

function toPublicBlogPost(post: PrismaBlogPost, locale: Locale): PublicBlogPost {
  const fallbackTranslation = fallbackTranslations[locale]?.[post.slug];
  const title = localizedField(locale, post.titleCa, post.titleEs, post.titleEn);
  const excerpt = localizedField(locale, post.excerptCa, post.excerptEs, post.excerptEn);
  const content = localizedField(locale, post.contentCa, post.contentEs, post.contentEn);
  const seoTitle = localizedField(locale, post.seoTitleCa, post.seoTitleEs, post.seoTitleEn) || title;
  const seoDescription =
    localizedField(locale, post.seoDescriptionCa, post.seoDescriptionEs, post.seoDescriptionEn) || excerpt;
  const needsFallbackContent = locale !== "ca" && content === post.contentCa && Boolean(fallbackTranslation?.sections);
  const parsedContent = needsFallbackContent
    ? { readingTime: "4 min", sections: fallbackTranslation?.sections || [] }
    : parseContent(content);

  return {
    id: post.id,
    slug: post.slug,
    category: fallbackTranslation?.category || post.category,
    readingTime: parsedContent.readingTime,
    title: fallbackTranslation?.title || title,
    excerpt: fallbackTranslation?.excerpt || excerpt,
    coverImage: post.coverImage || fallbackCoverImage,
    publishedAt: post.publishedAt,
    seoTitle: fallbackTranslation?.seoTitle || seoTitle,
    seoDescription: fallbackTranslation?.seoDescription || seoDescription,
    sections: parsedContent.sections,
  };
}

export async function getPublishedBlogPosts(locale: Locale, limit?: number) {
  if (!hasDatabaseUrl()) return getFallbackPosts(locale, limit);

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
      take: limit,
    });

    const mappedPosts = posts.map((post) => toPublicBlogPost(post, locale));
    return mappedPosts.length ? mappedPosts : getFallbackPosts(locale, limit);
  } catch {
    return getFallbackPosts(locale, limit);
  }
}

export async function getPublishedBlogPost(locale: Locale, slug: string) {
  const normalizedSlug = legacySlugMap[slug] || slug;

  if (!hasDatabaseUrl()) return getFallbackPost(locale, normalizedSlug);

  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: normalizedSlug,
        status: "published",
      },
    });

    return post ? toPublicBlogPost(post, locale) : getFallbackPost(locale, normalizedSlug);
  } catch {
    return getFallbackPost(locale, normalizedSlug);
  }
}

export async function getPublishedBlogSlugs() {
  if (!hasDatabaseUrl()) return [];

  try {
    return prisma.blogPost.findMany({
      where: { status: "published" },
      select: { slug: true },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}
