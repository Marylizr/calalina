"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type AnimationItem = {
  title: string;
  label: string;
  image: string;
  video: string;
};

type HeroAnimationShowcaseProps = {
  items: AnimationItem[];
};

const AUTOPLAY_INTERVAL_MS = 6500;
const VIDEO_FADE_OUT_MS = 280;

export function HeroAnimationShowcase({ items }: HeroAnimationShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTimeoutRef = useRef<number | null>(null);

  const activeItem = items[activeIndex] ?? items[0];

  const transitionToIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex || items.length === 0) {
        return;
      }

      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }

      setIsFading(true);
      fadeTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        window.requestAnimationFrame(() => setIsFading(false));
      }, VIDEO_FADE_OUT_MS);
    },
    [activeIndex, items.length],
  );

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      transitionToIndex((activeIndex + 1) % items.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, items.length, transitionToIndex]);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // Browsers can pause autoplay in low-power or restrictive modes.
    });
  }, [activeIndex]);

  if (!activeItem) {
    return null;
  }

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden sm:overflow-visible">
      <div className="relative min-h-[330px] overflow-hidden rounded-[1.5rem] bg-[var(--color-soft-cream)] shadow-[0_28px_70px_rgba(16,43,86,0.2)] min-[390px]:min-h-[390px] sm:min-h-[600px] sm:rounded-[2rem] lg:min-h-[760px]">
        <video
          key={activeItem.video}
          ref={videoRef}
          className={`h-full w-full object-cover transition duration-700 ease-out ${
            isFading ? "opacity-0 scale-[1.01]" : "opacity-100 scale-100"
          }`}
          src={activeItem.video}
          poster={activeItem.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className="mt-4 grid max-w-full grid-flow-col auto-cols-[88px] gap-3 overflow-x-auto px-1 pb-3 sm:auto-cols-fr sm:grid-flow-row sm:grid-cols-4 sm:gap-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.video}
              type="button"
              aria-pressed={isActive}
              onClick={() => transitionToIndex(index)}
              className={`h-[5.5rem] min-w-0 snap-start overflow-hidden rounded-2xl p-0 text-center shadow-[0_14px_28px_rgba(117,64,28,0.18)] transition hover:-translate-y-0.5 min-[390px]:h-24 sm:h-28 ${
                isActive
                  ? "bg-white ring-2 ring-[var(--color-calalina-red)]"
                  : "bg-white/86 hover:bg-white"
              }`}
            >
              <span className="relative block h-full overflow-hidden bg-[var(--color-soft-cream)]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 88px, 160px"
                  className="object-cover"
                />
                <span className="absolute inset-x-1 bottom-1 truncate rounded-full bg-white/90 px-2 py-1 text-[11px] font-black text-[var(--color-dark-ink)] shadow-sm sm:text-xs">
                  {item.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
