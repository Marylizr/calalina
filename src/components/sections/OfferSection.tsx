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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="group rounded-[1.5rem] border border-[var(--color-deep-green)]/10 bg-white/78 p-6 text-center shadow-[0_14px_34px_rgba(16,43,86,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center">
                <Image
                  src={offerIconUrls[card.icon]}
                  alt=""
                  width={96}
                  height={96}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 text-xl font-black text-[var(--color-dark-ink)]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted-text)]">
                {card.text}
              </p>
              <a
                className="mt-5 inline-flex text-sm font-black text-[var(--color-deep-green)]"
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
