import type { ProductUnit, StockStatus } from "@prisma/client";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import type { Locale } from "@/data/site";

export type PublicProduct = {
  id: string;
  name: string;
  price: number;
  unit: ProductUnit;
  image: string;
  isActive: boolean;
  availableOnline: boolean;
  stockStatus: StockStatus;
};

function localizedName(locale: Locale, product: { nameCa: string; nameEs: string; nameEn: string }) {
  if (locale === "es") return product.nameEs || product.nameCa;
  if (locale === "en") return product.nameEn || product.nameCa;
  return product.nameCa;
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
      price: Number(product.price),
      unit: product.unit,
      image: product.images[0] || "/images/products/alvocat.svg",
      isActive: product.isActive,
      availableOnline: product.availableOnline,
      stockStatus: product.stockStatus,
    }));
  } catch {
    return [];
  }
}
