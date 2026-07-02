"use client";

import { useActionState, useEffect, useMemo, useRef } from "react";
import { createOrderAction, type CreateOrderState } from "@/app/actions/orders";
import { getSiteContent, type Locale } from "@/data/site";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/components/cart/CartProvider";

const initialState: CreateOrderState = {
  status: "idle",
  message: "",
};

const inputClass =
  "w-full rounded-2xl border border-[var(--color-wood-brown)]/20 bg-white px-4 py-3 text-sm font-bold text-[var(--color-dark-ink)] outline-none focus:border-[var(--color-calalina-red)]";

export function CheckoutForm({ locale }: { locale: Locale }) {
  const { items, clear } = useCart();
  const [state, formAction, isPending] = useActionState(createOrderAction, initialState);
  const clearedOrderId = useRef<string | null>(null);
  const copy = getSiteContent(locale).cart;
  const itemsPayload = useMemo(
    () => JSON.stringify(items.map((item) => ({ productId: item.id, quantity: item.quantity }))),
    [items],
  );

  useEffect(() => {
    if (state.status === "success" && state.orderId && clearedOrderId.current !== state.orderId) {
      clearedOrderId.current = state.orderId;
      clear();
    }
  }, [clear, state.orderId, state.status]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_26rem] lg:items-start">
      <section className="rounded-[1.75rem] bg-white/75 p-5 shadow-[0_18px_44px_rgba(16,43,86,0.1)]">
        <h2 className="font-serif text-3xl font-black text-[var(--color-dark-ink)]">{copy.checkoutTitle}</h2>
        <p className="mt-3 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
          {copy.checkoutDescription}
        </p>

        <form action={formAction} className="mt-6 grid gap-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="items" value={itemsPayload} />
          <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
            {copy.name}
            <input name="customerName" className={inputClass} required />
          </label>
          <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
            {copy.phone}
            <input name="customerPhone" className={inputClass} required />
          </label>
          <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
            {copy.email}
            <input name="customerEmail" type="email" className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
            {copy.pickupDate}
            <input name="pickupDate" type="datetime-local" className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
            {copy.notes}
            <textarea name="notes" className={`${inputClass} min-h-28`} />
          </label>
          {state.message ? (
            <div
              className={`rounded-2xl px-4 py-3 text-sm font-black ${
                state.status === "success"
                  ? "bg-[#2f6b35]/10 text-[#2f6b35]"
                  : "bg-[#e5261f]/10 text-[#e5261f]"
              }`}
            >
              <p>{state.message}</p>
              {state.status === "success" && state.orderId ? (
                <p className="mt-1">{copy.order}: {state.orderId}</p>
              ) : null}
              {state.whatsappUrl ? (
                <a
                  href={state.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex rounded-full bg-[#2f6b35] px-4 py-2 text-white"
                >
                  {copy.whatsapp}
                </a>
              ) : null}
            </div>
          ) : null}
          <button
            disabled={isPending || items.length === 0}
            className="rounded-full bg-[var(--color-calalina-red)] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[var(--color-deep-green)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? copy.sending : copy.checkoutCta}
          </button>
        </form>
      </section>

      <aside className="rounded-[1.75rem] bg-[#fff5e1]/80 p-5 shadow-[0_18px_44px_rgba(16,43,86,0.08)]">
        <h2 className="mb-4 font-serif text-3xl font-black text-[var(--color-dark-ink)]">{copy.title}</h2>
        <CartSummary locale={locale} checkout />
      </aside>
    </div>
  );
}
