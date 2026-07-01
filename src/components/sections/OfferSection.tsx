import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

const offerIconUrls: Record<string, string> = {
  fruit:
    "https://res.cloudinary.com/doroh5hbv/image/upload/v1782920660/frutas_nu94n5.png",
  leaf:
    "https://res.cloudinary.com/doroh5hbv/image/upload/v1782920157/verduras_c2nogi.png",
  sun:
    "https://res.cloudinary.com/doroh5hbv/image/upload/v1782920156/latino_wstode.png",
  jar:
    "https://res.cloudinary.com/doroh5hbv/image/upload/v1782920157/conservacion_hf3knn.png",
};

type OfferSectionProps = {
  content: {
    label: string;
    title: string;
    discover: string;
    cards: { title: string; text: string; icon: string; href?: string }[];
  };
};

export function OfferSection({ content }: OfferSectionProps) {
  return (
    <section id="temporada" className="wood-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>{content.label}</SectionLabel>
        <h2 className="max-w-3xl font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="group rounded-[1.2rem] border border-[var(--color-deep-green)]/10 bg-white/78 p-4 text-center shadow-[0_14px_34px_rgba(16,43,86,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-white sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center sm:h-24 sm:w-24">
                <Image
                  src={offerIconUrls[card.icon]}
                  alt=""
                  width={96}
                  height={96}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-base font-black leading-tight text-[var(--color-dark-ink)] sm:mt-6 sm:text-xl">
                {card.title}
              </h3>
              <p className="mt-2 text-xs font-semibold leading-5 text-[var(--color-muted-text)] sm:mt-3 sm:text-sm sm:font-normal sm:leading-6">
                {card.text}
              </p>
              <a
                className="mt-3 inline-flex text-xs font-black text-[var(--color-deep-green)] sm:mt-5 sm:text-sm"
                href={card.href ?? "#productes"}
              >
                {content.discover} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
