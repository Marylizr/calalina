import Image from "next/image";

type ProductCardProps = {
  name: string;
  price?: string;
  image: string;
};

export function ProductCard({ name, image }: ProductCardProps) {
  return (
    <article className="group min-w-[300px] snap-start pb-9 transition duration-300 hover:-translate-y-1 sm:min-w-0">
      <div className="relative">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.65rem] border-[6px] border-white/80 bg-[var(--color-warm-cream)] shadow-[0_22px_46px_rgba(117,64,28,0.24)] sm:aspect-[4/3]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 50vw, 390px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute -bottom-7 left-5 right-5 rotate-[-1.5deg] rounded-xl border border-white/10 bg-[var(--color-chalkboard-black)]/94 px-5 py-3 text-center text-white shadow-[0_14px_26px_rgba(30,30,26,0.28)]">
          <h3 className="chalk-hand text-xl leading-none text-white sm:text-2xl">
            {name}
          </h3>
        </div>
      </div>
    </article>
  );
}
