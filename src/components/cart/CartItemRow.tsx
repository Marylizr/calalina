"use client";

import Image from "next/image";
import { getSiteContent, type Locale } from "@/data/site";
import type { CartItem } from "@/lib/cart";
import { formatMoney, unitLabel } from "@/lib/cart";
import { useCart } from "@/components/cart/CartProvider";

export function CartItemRow({ item, locale }: { item: CartItem; locale: Locale }) {
  const { increase, decrease, remove } = useCart();
  const copy = getSiteContent(locale).cart;

  return (
    <div className="grid grid-cols-[4rem_1fr] gap-3 rounded-2xl bg-white/75 p-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-[var(--color-soft-cream)]">
        <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-black text-[var(--color-dark-ink)]">{item.name}</p>
            <p className="text-sm font-bold text-[var(--color-muted-text)]">
              {formatMoney(item.price, locale)} / {unitLabel(item.unit, locale)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(item.id)}
            className="grid h-8 w-8 place-items-center rounded-full bg-[#e5261f] text-sm font-black text-white"
            aria-label={copy.remove}
          >
            ×
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full bg-[var(--color-soft-cream)] p-1">
            <button type="button" onClick={() => decrease(item.id)} className="h-8 w-8 rounded-full bg-white font-black">
              −
            </button>
            <span className="min-w-10 text-center text-sm font-black">{item.quantity}</span>
            <button type="button" onClick={() => increase(item.id)} className="h-8 w-8 rounded-full bg-white font-black">
              +
            </button>
          </div>
          <p className="font-black text-[var(--color-dark-ink)]">{formatMoney(item.price * item.quantity, locale)}</p>
        </div>
      </div>
    </div>
  );
}
