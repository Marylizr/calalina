"use client";

import type { CartProduct } from "@/lib/cart";
import { getSiteContent, type Locale } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
  product: CartProduct;
  locale: Locale;
  disabled?: boolean;
};

export function AddToCartButton({ product, locale, disabled = false }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const copy = getSiteContent(locale).cart;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => addItem(product)}
      className="mt-3 w-full rounded-full bg-[var(--color-calalina-red)] px-4 py-2 text-sm font-black text-white shadow-[0_10px_20px_rgba(229,38,31,0.18)] transition hover:bg-[var(--color-deep-green)] disabled:cursor-not-allowed disabled:bg-[#4a4842]/40"
    >
      {disabled ? copy.soldOut : copy.add}
    </button>
  );
}
