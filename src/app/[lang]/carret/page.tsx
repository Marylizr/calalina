import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent, isLocale, type Locale } from "@/data/site";
import { getPublicFulfillmentSettings } from "@/lib/fulfillment-settings";

type CartPageProps = {
  params: Promise<{ lang: string }>;
};

const cartMetadata: Record<Locale, { title: string; description: string }> = {
  ca: {
    title: "Carret · Calalina",
    description: "Finalitza la teva comanda de recollida a Calalina.",
  },
  es: {
    title: "Carrito · Calalina",
    description: "Finaliza tu pedido de recogida en Calalina.",
  },
  en: {
    title: "Cart · Calalina",
    description: "Finish your pickup order at Calalina.",
  },
};

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return cartMetadata[lang];
}

export default async function CartPage({ params }: CartPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const content = getSiteContent(locale);
  const fulfillmentSettings = await getPublicFulfillmentSettings(locale);

  return (
    <>
      <Header locale={locale} navItems={content.navItems} content={content.header} />
      <main className="wood-section-soft">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-deep-green)]">
              {content.cart.pickup}
            </p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none text-[var(--color-dark-ink)] sm:text-6xl">
              {content.cart.title}
            </h1>
          </div>
          <CheckoutForm locale={locale} fulfillmentSettings={fulfillmentSettings} />
        </section>
      </main>
      <Footer locale={locale} content={content.footer} />
    </>
  );
}
