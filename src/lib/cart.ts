import type { ProductUnit } from "@prisma/client";
import type { Locale } from "@/data/site";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  unit: ProductUnit;
  image: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

export function formatMoney(value: number, locale: Locale = "ca") {
  const numberLocale: Record<Locale, string> = {
    ca: "ca-ES",
    es: "es-ES",
    en: "en-US",
  };

  return new Intl.NumberFormat(numberLocale[locale], {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function unitLabel(unit: ProductUnit, locale: Locale = "ca") {
  const labels: Record<Locale, Record<ProductUnit, string>> = {
    ca: {
      kg: "kg",
      unit: "u",
      tray: "safata",
      pack: "pack",
      box: "caixa",
      bottle: "ampolla",
    },
    es: {
      kg: "kg",
      unit: "ud",
      tray: "bandeja",
      pack: "pack",
      box: "caja",
      bottle: "botella",
    },
    en: {
      kg: "kg",
      unit: "unit",
      tray: "tray",
      pack: "pack",
      box: "box",
      bottle: "bottle",
    },
  };

  return labels[locale][unit];
}
