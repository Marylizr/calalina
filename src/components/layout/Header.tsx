"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { localeLabels, locales, type Locale } from "@/data/site";

const LOGO_SRC = "/images/brand/logo.png";

type HeaderProps = {
  locale: Locale;
  navItems: { label: string; href: string }[];
  content: {
    brandSubtitle: string;
    homeAriaLabel: string;
    navAriaLabel: string;
    mobileNavAriaLabel: string;
    menuAriaLabel: string;
  };
};

export function Header({ locale, navItems, content }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="wood-header sticky top-0 z-50 border-b border-[var(--color-wood-brown)]/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#inici`}
          className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-mandarin-orange)]"
          aria-label={content.homeAriaLabel}
        >
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white/90 shadow-[0_10px_20px_rgba(117,64,28,0.18)] ring-1 ring-[var(--color-wood-brown)]/15">
            <Image
              src={LOGO_SRC}
              alt=""
              width={42}
              height={47}
              priority
              className="h-10 w-auto object-contain"
            />
          </span>
          <span>
            <span className="block font-serif text-2xl font-black leading-none text-[var(--color-dark-ink)]">
              Calalina
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-muted-text)]">
              {content.brandSubtitle}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label={content.navAriaLabel}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="rounded-full px-2 py-2 text-sm font-bold text-[var(--color-dark-ink)] transition hover:text-[var(--color-calalina-red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-mandarin-orange)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} />
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-deep-green)]/20 bg-white/75 text-[var(--color-dark-ink)] lg:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={content.menuAriaLabel}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-menu" className="wood-header border-t border-[var(--color-wood-brown)]/10 px-4 pb-5 lg:hidden">
          <nav className="grid gap-1 py-3" aria-label={content.mobileNavAriaLabel}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-extrabold text-[var(--color-dark-ink)] hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      ) : null}
    </header>
  );
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="inline-flex rounded-full border border-[var(--color-deep-green)]/20 bg-white/80 px-2 py-1 text-xs font-black text-[var(--color-dark-ink)]">
      {locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={`/${targetLocale}`}
          aria-current={targetLocale === locale ? "page" : undefined}
          className={`rounded-full px-2 py-1 transition hover:bg-white ${
            targetLocale === locale
              ? "bg-[var(--color-mango-yellow)] text-[var(--color-dark-ink)]"
              : "text-[var(--color-muted-text)]"
          }`}
        >
          {localeLabels[targetLocale]}
        </Link>
      ))}
    </div>
  );
}
