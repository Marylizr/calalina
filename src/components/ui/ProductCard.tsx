import Image from "next/image";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Locale } from "@/data/site";
import { formatMoney, unitLabel } from "@/lib/cart";
import type { PublicProduct } from "@/lib/products";

type ProductCardProps = {
  product: PublicProduct;
  locale: Locale;
};

export function ProductCard({ product, locale }: ProductCardProps) {
  const disabled =
    !product.isActive || !product.availableOnline || product.stockStatus === "outOfStock";

  return (
    <article className="group min-w-[300px] snap-start pb-9 transition duration-300 hover:-translate-y-1 sm:min-w-0">
      <div className="relative">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.65rem] border-[6px] border-white/80 bg-[var(--color-warm-cream)] shadow-[0_22px_46px_rgba(117,64,28,0.24)] sm:aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 50vw, 390px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute -bottom-7 left-5 right-5 rotate-[-1.5deg] rounded-xl border border-white/10 bg-[var(--color-chalkboard-black)]/94 px-5 py-3 text-center text-white shadow-[0_14px_26px_rgba(30,30,26,0.28)]">
          <h3 className="chalk-hand text-xl leading-none text-white sm:text-2xl">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-black text-white/90">
            {formatMoney(product.price, locale)} / {unitLabel(product.unit, locale)}
          </p>
        </div>
      </div>
      <div className="mt-10">
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
    </article>
  );
}
