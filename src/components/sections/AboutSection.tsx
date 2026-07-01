import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ABOUT_IMAGE =
  "https://res.cloudinary.com/doroh5hbv/image/upload/v1782916236/Screenshot_2026-06-30_at_15.38.43_cklhnt.png";

type AboutSectionProps = {
  content: {
    label: string;
    title: string;
    text: string;
    imageAlt: string;
    badgeTitle: string;
    badgeText: string;
    cta: string;
  };
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="qui-som" className="brick-section-soft py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border-4 border-white/80 bg-white shadow-[0_26px_60px_rgba(117,64,28,0.24)] sm:min-h-[540px] lg:min-h-[620px]">
            <Image
              src={ABOUT_IMAGE}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition duration-500 hover:scale-[1.02]"
            />
          </div>
          <div className="absolute -bottom-5 right-5 rotate-[-3deg] rounded-2xl bg-[var(--color-chalkboard-black)] px-5 py-4 text-white shadow-lg">
            <span className="block text-sm font-black text-[var(--color-mango-yellow)]">
              {content.badgeTitle}
            </span>
            <span className="text-sm">{content.badgeText}</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg font-bold leading-8 text-[var(--color-muted-text)]">
            {content.text}
          </p>
          <a
            href="#ubicacio"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-calalina-red)] px-6 text-sm font-black text-white shadow-[0_14px_28px_rgba(229,38,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--color-tomato-red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-mandarin-orange)]"
          >
            {content.cta} →
          </a>
        </div>
      </div>
    </section>
  );
}
