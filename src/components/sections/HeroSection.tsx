import { Button } from "@/components/ui/Button";
import { FloatingProduce } from "@/components/ui/FloatingProduce";
import { HeroAnimationShowcase } from "@/components/ui/HeroAnimationShowcase";

type HeroSectionProps = {
  content: {
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    animations: {
      title: string;
      label: string;
      image: string;
      video: string;
    }[];
  };
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="inici"
      className="wood-hero relative isolate overflow-hidden"
    >
      <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="relative z-10 min-w-0 text-center">
          <h1 className="mx-auto max-w-[21rem] text-balance font-serif text-[2.75rem] font-black leading-[0.98] text-[var(--color-dark-ink)] min-[390px]:max-w-[23rem] min-[390px]:text-[3.15rem] sm:max-w-3xl sm:text-6xl sm:leading-[0.95] lg:text-7xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[22rem] text-base font-bold leading-7 text-[var(--color-muted-text)] min-[390px]:max-w-[24rem] sm:mt-8 sm:max-w-2xl sm:text-xl sm:leading-8">
            {content.text}
          </p>
          <div className="mx-auto mt-8 flex max-w-[24rem] flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button href="#temporada" className="w-full sm:w-auto">{content.primaryCta}</Button>
            <Button href="#ubicacio" variant="secondary" className="w-full sm:w-auto">
              {content.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="relative min-w-0">
          <FloatingProduce className="-left-5 top-12" tone="red" />
          <FloatingProduce className="right-6 top-0 h-10 w-10" tone="green" delay="0.8s" />
          <FloatingProduce className="bottom-28 left-4 h-9 w-9" tone="yellow" delay="1.4s" />
          <HeroAnimationShowcase items={content.animations} />
        </div>
      </div>
    </section>
  );
}
