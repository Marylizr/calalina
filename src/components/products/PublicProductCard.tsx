import Image from "next/image";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Locale } from "@/data/site";
import { formatMoney, unitLabel } from "@/lib/cart";
import type { PublicProduct } from "@/lib/products";

type PublicProductCardCopy = {
  featured: string;
  seasonal: string;
  latin: string;
  online: string;
  askInStore: string;
  available: string;
  outOfStock: string;
};

type PublicProductCardProps = {
  product: PublicProduct;
  locale: Locale;
  copy: PublicProductCardCopy;
};

export function PublicProductCard({ product, locale, copy }: PublicProductCardProps) {
  const isOutOfStock = product.stockStatus === "outOfStock";
  const disabled = !product.isActive || !product.availableOnline || isOutOfStock;

  return (
    <article className="group flex h-full flex-col rounded-[1.5rem] bg-white/82 p-3 shadow-[0_16px_34px_rgba(16,43,86,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-white">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] border-[5px] border-white/90 bg-[var(--color-warm-cream)] shadow-[0_16px_34px_rgba(117,64,28,0.2)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.isSeasonal ? <Badge>{copy.seasonal}</Badge> : null}
          {product.isLatin ? <Badge>{copy.latin}</Badge> : null}
          {product.isFeatured ? <Badge>{copy.featured}</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          {product.category ? (
            <span className="rounded-full bg-[var(--color-mango-yellow)]/30 px-3 py-1 text-xs font-black text-[var(--color-dark-ink)]">
              {product.category.name}
            </span>
          ) : null}
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              disabled
                ? "bg-[var(--color-calalina-red)]/10 text-[var(--color-calalina-red)]"
                : "bg-[var(--color-leaf-green)]/15 text-[var(--color-deep-green)]"
            }`}
          >
            {isOutOfStock ? copy.outOfStock : product.availableOnline ? copy.online : copy.askInStore}
          </span>
        </div>

        <h2 className="mt-4 font-serif text-2xl font-black leading-tight text-[var(--color-dark-ink)]">
          {product.name}
        </h2>
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[var(--color-muted-text)]">
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto pt-5">
          <div className="rotate-[-1deg] rounded-xl bg-[var(--color-chalkboard-black)] px-4 py-3 text-center text-white shadow-[0_12px_24px_rgba(30,30,26,0.18)]">
            <p className="chalk-hand text-2xl leading-none text-white">
              {formatMoney(product.price, locale)}
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/76">
              / {unitLabel(product.unit, locale)}
            </p>
          </div>
          <AddToCartButton
            locale={locale}
            disabled={disabled}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              unit: product.unit,
              image: product.image,
            }}
          />
        </div>
      </div>
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.1em] text-[var(--color-deep-green)] shadow-sm">
      {children}
    </span>
  );
}
