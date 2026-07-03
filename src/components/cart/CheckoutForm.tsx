"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { createOrderAction, type CreateOrderState } from "@/app/actions/orders";
import { getSiteContent, type Locale } from "@/data/site";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/components/cart/CartProvider";
import type { PublicFulfillmentSettings } from "@/lib/fulfillment";
import { formatMoney } from "@/lib/cart";

const initialState: CreateOrderState = {
  status: "idle",
  message: "",
};

const inputClass =
  "w-full rounded-2xl border border-[var(--color-wood-brown)]/20 bg-white px-4 py-3 text-sm font-bold text-[var(--color-dark-ink)] outline-none focus:border-[var(--color-calalina-red)]";

export function CheckoutForm({
  locale,
  fulfillmentSettings,
}: {
  locale: Locale;
  fulfillmentSettings: PublicFulfillmentSettings;
}) {
  const { items, clear } = useCart();
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"pickup" | "delivery">(
    fulfillmentSettings.pickupEnabled ? "pickup" : "delivery",
  );
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

  const effectiveFulfillmentMethod =
    fulfillmentMethod === "delivery" && fulfillmentSettings.deliveryEnabled
      ? "delivery"
      : fulfillmentSettings.pickupEnabled
        ? "pickup"
        : "delivery";
  const hasFulfillmentMethod =
    fulfillmentSettings.pickupEnabled || fulfillmentSettings.deliveryEnabled;

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
          <input type="hidden" name="fulfillmentMethod" value={effectiveFulfillmentMethod} />
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          {hasFulfillmentMethod ? (
            <fieldset className="grid gap-3">
              <legend className="text-sm font-black text-[var(--color-dark-ink)]">
                {copy.fulfillmentTitle}
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {fulfillmentSettings.pickupEnabled ? (
                  <FulfillmentCard
                    name="fulfillmentChoice"
                    value="pickup"
                    checked={effectiveFulfillmentMethod === "pickup"}
                    title={copy.pickupOption}
                    description={copy.pickupDescription}
                    onChange={() => setFulfillmentMethod("pickup")}
                  />
                ) : null}
                {fulfillmentSettings.deliveryEnabled ? (
                  <FulfillmentCard
                    name="fulfillmentChoice"
                    value="delivery"
                    checked={effectiveFulfillmentMethod === "delivery"}
                    title={copy.deliveryOption}
                    description={copy.deliveryDescription}
                    onChange={() => setFulfillmentMethod("delivery")}
                  />
                ) : null}
              </div>
            </fieldset>
          ) : (
            <div className="rounded-2xl bg-[#e5261f]/10 px-4 py-3 text-sm font-black text-[#e5261f]">
              {copy.ordersUnavailable}
            </div>
          )}
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
          {effectiveFulfillmentMethod === "pickup" ? (
            <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
              {copy.pickupDate}
              <input name="pickupDate" type="datetime-local" className={inputClass} />
            </label>
          ) : (
            <div className="grid gap-4 rounded-[1.5rem] bg-[#fff5e1]/80 p-4">
              <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
                {copy.deliveryAddress}
                <input name="deliveryAddress" className={inputClass} required />
              </label>
              <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
                <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
                  {copy.deliveryAddressExtra}
                  <input name="deliveryAddressExtra" className={inputClass} />
                </label>
                <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
                  {copy.deliveryPostalCode}
                  <input
                    name="deliveryPostalCode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={inputClass}
                    required
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-black text-[var(--color-dark-ink)]">
                {copy.deliveryInstructions}
                <textarea name="deliveryInstructions" className={`${inputClass} min-h-24`} />
              </label>
            </div>
          )}
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
                <div className="mt-2 grid gap-1">
                  <p>
                    {copy.order}: {state.orderShortId || state.orderId.slice(-6).toUpperCase()}
                  </p>
                  {state.fulfillmentLabel ? <p>{state.fulfillmentLabel}</p> : null}
                  {typeof state.total === "number" ? (
                    <p>
                      {copy.estimatedTotal}: {formatMoney(state.total, locale)}
                    </p>
                  ) : null}
                </div>
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
              ) : state.status === "success" ? (
                <p className="mt-3">{copy.whatsappMissing}</p>
              ) : null}
            </div>
          ) : null}
          <button
            disabled={isPending || items.length === 0 || !hasFulfillmentMethod}
            className="rounded-full bg-[var(--color-calalina-red)] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[var(--color-deep-green)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? copy.sending : copy.checkoutCta}
          </button>
        </form>
      </section>

      <aside className="rounded-[1.75rem] bg-[#fff5e1]/80 p-5 shadow-[0_18px_44px_rgba(16,43,86,0.08)]">
        <h2 className="mb-4 font-serif text-3xl font-black text-[var(--color-dark-ink)]">{copy.title}</h2>
        <CartSummary
          locale={locale}
          checkout
          fulfillmentMethod={effectiveFulfillmentMethod}
          deliveryFee={fulfillmentSettings.deliveryFee}
        />
      </aside>
    </div>
  );
}

function FulfillmentCard({
  name,
  value,
  checked,
  title,
  description,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  title: string;
  description: string;
  onChange: () => void;
}) {
  return (
    <label
      className={`cursor-pointer rounded-[1.25rem] border-2 p-4 transition ${
        checked
          ? "border-[var(--color-calalina-red)] bg-[var(--color-calalina-red)]/8 shadow-[0_12px_26px_rgba(229,38,31,0.12)]"
          : "border-[var(--color-deep-green)]/12 bg-white/80 hover:bg-white"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="block text-base font-black text-[var(--color-dark-ink)]">{title}</span>
      <span className="mt-2 block text-sm font-bold leading-6 text-[var(--color-muted-text)]">
        {description}
      </span>
    </label>
  );
}
