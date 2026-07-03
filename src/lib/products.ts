import type { ProductUnit, StockStatus } from "@prisma/client";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import type { Locale } from "@/data/site";

export type PublicProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: ProductUnit;
  image: string;
  isActive: boolean;
  availableOnline: boolean;
  stockStatus: StockStatus;
  isFeatured: boolean;
  isSeasonal: boolean;
  isLatin: boolean;
  category?: {
    name: string;
    slug: string;
  } | null;
};

export type PublicCategory = {
  id: string;
  name: string;
  slug: string;
};

export type ProductCatalogFilters = {
  category?: string;
  tag?: string;
  q?: string;
};

export type ProductCatalogData = {
  products: PublicProduct[];
  categories: PublicCategory[];
};

export function localizedName(locale: Locale, product: { nameCa: string; nameEs: string; nameEn: string }) {
  if (locale === "es") return product.nameEs || product.nameCa;
  if (locale === "en") return product.nameEn || product.nameCa;
  return product.nameCa;
}

function localizedDescription(
  locale: Locale,
  product: {
    shortDescriptionCa?: string | null;
    shortDescriptionEs?: string | null;
    shortDescriptionEn?: string | null;
    descriptionCa?: string | null;
    descriptionEs?: string | null;
    descriptionEn?: string | null;
  },
) {
  if (locale === "es") return product.shortDescriptionEs || product.descriptionEs || "";
  if (locale === "en") return product.shortDescriptionEn || product.descriptionEn || "";
  return product.shortDescriptionCa || product.descriptionCa || "";
}

function localizedCategory(locale: Locale, category: { nameCa: string; nameEs: string; nameEn: string }) {
  if (locale === "es") return category.nameEs || category.nameCa;
  if (locale === "en") return category.nameEn || category.nameCa;
  return category.nameCa;
}

function normalizeSearch(value?: string) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function getCatalogPath(locale: Locale) {
  if (locale === "es") return "/es/productos";
  if (locale === "en") return "/en/products";
  return "/ca/productes";
}

export async function getFeaturedProducts(locale: Locale) {
  if (!hasDatabaseUrl()) return [];

  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      orderBy: [{ updatedAt: "desc" }],
      take: 12,
    });

    return products.map((product) => ({
      id: product.id,
      name: localizedName(locale, product),
      description: localizedDescription(locale, product),
      price: Number(product.price),
      unit: product.unit,
      image: product.images[0] || "/images/products/alvocat.svg",
      isActive: product.isActive,
      availableOnline: product.availableOnline,
      stockStatus: product.stockStatus,
      isFeatured: product.isFeatured,
      isSeasonal: product.isSeasonal,
      isLatin: product.isLatin,
      category: null,
    }));
  } catch {
    return [];
  }
}

export async function getProductCatalog(
  locale: Locale,
  filters: ProductCatalogFilters = {},
): Promise<ProductCatalogData> {
  if (!hasDatabaseUrl()) return { products: [], categories: [] };

  try {
    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
        orderBy: [
          { isFeatured: "desc" },
          { isSeasonal: "desc" },
          { createdAt: "desc" },
        ],
      }),
      prisma.category.findMany({
        where: {
          products: {
            some: { isActive: true },
          },
        },
        orderBy: [{ sortOrder: "asc" }, { nameCa: "asc" }],
      }),
    ]);

    const categoryFilter = normalizeSearch(filters.category);
    const tagFilter = normalizeSearch(filters.tag);
    const searchFilter = normalizeSearch(filters.q);

    const mappedCategories = categories.map((category) => ({
      id: category.id,
      name: localizedCategory(locale, category),
      slug: category.slug,
    }));

    const mappedProducts = products.map((product) => {
      const category = product.category
        ? {
            name: localizedCategory(locale, product.category),
            slug: product.category.slug,
          }
        : null;

      return {
        id: product.id,
        name: localizedName(locale, product),
        description: localizedDescription(locale, product),
        price: Number(product.price),
        unit: product.unit,
        image: product.images[0] || "/images/products/alvocat.svg",
        isActive: product.isActive,
        availableOnline: product.availableOnline,
        stockStatus: product.stockStatus,
        isFeatured: product.isFeatured,
        isSeasonal: product.isSeasonal,
        isLatin: product.isLatin,
        category,
        searchText: normalizeSearch(
          [
            product.nameCa,
            product.nameEs,
            product.nameEn,
            product.shortDescriptionCa,
            product.shortDescriptionEs,
            product.shortDescriptionEn,
            product.descriptionCa,
            product.descriptionEs,
            product.descriptionEn,
            category?.name,
          ]
            .filter(Boolean)
            .join(" "),
        ),
      };
    });

    const filteredProducts = mappedProducts.filter((product) => {
      if (categoryFilter && product.category?.slug !== categoryFilter) return false;
      if (tagFilter === "temporada" && !product.isSeasonal) return false;
      if (tagFilter === "destacats" && !product.isFeatured) return false;
      if (tagFilter === "llati" && !product.isLatin) return false;
      if (tagFilter === "online" && !product.availableOnline) return false;
      if (searchFilter && !product.searchText.includes(searchFilter)) return false;
      return true;
    });

    return {
      categories: mappedCategories,
      products: filteredProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        unit: product.unit,
        image: product.image,
        isActive: product.isActive,
        availableOnline: product.availableOnline,
        stockStatus: product.stockStatus,
        isFeatured: product.isFeatured,
        isSeasonal: product.isSeasonal,
        isLatin: product.isLatin,
        category: product.category,
      })),
    };
  } catch {
    return { products: [], categories: [] };
  }
}
