"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getSiteContent, type Locale } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { CartSummary } from "@/components/cart/CartSummary";

export function CartDrawer({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();
  const copy = getSiteContent(locale).cart;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const drawer = isOpen ? (
    <div className="fixed inset-0 z-[100]" role="presentation">
      <button
        type="button"
        aria-label={copy.close}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 h-full w-full bg-[#050810]/50 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="fixed right-0 top-0 flex h-dvh w-full max-w-md flex-col overflow-hidden bg-[#fff5e1] shadow-2xl motion-safe:animate-[cartDrawerIn_180ms_ease-out]"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-[var(--color-wood-brown)]/15 px-5 py-4">
          <h2 id="cart-drawer-title" className="font-serif text-3xl font-black text-[var(--color-dark-ink)]">
            {copy.title}
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-black text-[var(--color-dark-ink)] shadow-sm"
            aria-label={copy.close}
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <CartSummary locale={locale} />
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-dark-ink)] shadow-sm"
      >
        {copy.button}
        {count ? (
          <span className="ml-2 rounded-full bg-[var(--color-calalina-red)] px-2 py-0.5 text-xs text-white">{count}</span>
        ) : null}
      </button>
      {drawer ? createPortal(drawer, document.body) : null}
    </>
  );
}
