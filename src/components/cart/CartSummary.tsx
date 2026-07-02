"use client";

import Link from "next/link";
import { getSiteContent, type Locale } from "@/data/site";
import { cartSubtotal, formatMoney } from "@/lib/cart";
import { useCart } from "@/components/cart/CartProvider";
import { CartItemRow } from "@/components/cart/CartItemRow";

export function CartSummary({ locale, checkout = false }: { locale: Locale; checkout?: boolean }) {
  const { items } = useCart();
  const subtotal = cartSubtotal(items);
  const copy = getSiteContent(locale).cart;

  return (
    <div className="grid gap-4">
      {items.length ? items.map((item) => <CartItemRow key={item.id} item={item} locale={locale} />) : (
        <p className="rounded-2xl bg-white/75 p-4 text-sm font-bold text-[var(--color-muted-text)]">
          {copy.empty}
        </p>
      )}
      <div className="rounded-2xl bg-white/85 p-4">
        <div className="flex items-center justify-between text-lg font-black text-[var(--color-dark-ink)]">
          <span>{copy.estimatedTotal}</span>
          <span>{formatMoney(subtotal, locale)}</span>
        </div>
        <p className="mt-3 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
          {copy.estimatedNote}
        </p>
        {!checkout && items.length ? (
          <Link
            href={`/${locale}/carret`}
            className="mt-4 inline-flex w-full justify-center rounded-full bg-[var(--color-calalina-red)] px-5 py-3 text-sm font-black text-white"
          >
            {copy.checkoutCta}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
