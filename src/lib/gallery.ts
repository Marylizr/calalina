import type { GalleryImage } from "@prisma/client";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import type { Locale } from "@/data/site";

export const galleryCategories = [
  { value: "botiga", labelCa: "Botiga", labelEs: "Tienda", labelEn: "Shop" },
  { value: "fruita", labelCa: "Fruita", labelEs: "Fruta", labelEn: "Fruit" },
  { value: "verdura", labelCa: "Verdura", labelEs: "Verdura", labelEn: "Vegetables" },
  { value: "raco-llati", labelCa: "Racó llatí", labelEs: "Rincón latino", labelEn: "Latin corner" },
  { value: "temporada", labelCa: "Temporada", labelEs: "Temporada", labelEn: "Seasonal" },
  { value: "equip", labelCa: "Equip", labelEs: "Equipo", labelEn: "Team" },
  { value: "pissarres", labelCa: "Pissarres", labelEs: "Pizarras", labelEn: "Chalkboards" },
] as const;

export type PublicGalleryImage = {
  id: string;
  image: string;
  title: string;
  alt: string;
  category: string;
};

const fallbackGalleryImages: PublicGalleryImage[] = ["g1", "g2", "g3", "g4", "g5", "g6"].map(
  (name, index) => ({
    id: `fallback-${name}`,
    image: `/images/gallery/calalina/${name}.png`,
    title: `Galeria Calalina ${index + 1}`,
    alt: `Galeria Calalina ${index + 1}`,
    category: "Calalina",
  }),
);

function localizedField(locale: Locale, ca?: string | null, es?: string | null, en?: string | null) {
  if (locale === "es") return es || ca || en || "";
  if (locale === "en") return en || ca || es || "";
  return ca || es || en || "";
}

export function galleryCategoryLabel(category?: string | null, locale: Locale = "ca") {
  const item = galleryCategories.find((categoryItem) => categoryItem.value === category);

  if (!item) return category || (locale === "en" ? "Gallery" : "Galeria");
  if (locale === "es") return item.labelEs;
  if (locale === "en") return item.labelEn;
  return item.labelCa;
}

function toPublicGalleryImage(image: GalleryImage, locale: Locale): PublicGalleryImage {
  const title = localizedField(locale, image.titleCa, image.titleEs, image.titleEn) || localizedField(locale, image.altCa, image.altEs, image.altEn);

  return {
    id: image.id,
    image: image.image,
    title,
    alt: localizedField(locale, image.altCa, image.altEs, image.altEn) || title,
    category: galleryCategoryLabel(image.category, locale),
  };
}

export async function getPublicGalleryImages(locale: Locale, options?: { homeOnly?: boolean; category?: string }) {
  if (!hasDatabaseUrl()) return options?.category ? [] : fallbackGalleryImages;

  try {
    const images = await prisma.galleryImage.findMany({
      where: {
        isVisible: true,
        isArchived: false,
        ...(options?.homeOnly ? { showOnHome: true } : {}),
        ...(options?.category ? { category: options.category } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: options?.homeOnly ? 24 : undefined,
    });

    const mappedImages = images.map((image) => toPublicGalleryImage(image, locale));
    return mappedImages.length || options?.category ? mappedImages : fallbackGalleryImages;
  } catch {
    return options?.category ? [] : fallbackGalleryImages;
  }
}
