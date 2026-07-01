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

const AUTOPLAY_INTERVAL_MS = 5000;
const VIDEO_CROSSFADE_MS = 850;
const VIDEO_END_BUFFER_MS = 700;

export function HeroAnimationShowcase({ items }: HeroAnimationShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [videoDurations, setVideoDurations] = useState<Record<string, number>>({});
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const handoffVideoRef = useRef<string | null>(null);
  const handoffTimeRef = useRef(0);
  const autoplayTimeoutRef = useRef<number | null>(null);
  const crossfadeTimeoutRef = useRef<number | null>(null);
  const hasStartedCrossfadeRef = useRef(false);

  const activeItem = items[activeIndex] ?? items[0];
  const nextItem = nextIndex === null ? null : items[nextIndex];
  const visibleIndex = nextIndex ?? activeIndex;

  const playVideo = useCallback((video: HTMLVideoElement, item: AnimationItem) => {
    if (Number.isFinite(video.duration)) {
      setVideoDurations((current) => ({
        ...current,
        [item.video]: video.duration,
      }));
    }

    if (handoffVideoRef.current === item.video) {
      const maxHandoffTime = Number.isFinite(video.duration)
        ? Math.max(video.duration - 0.1, 0)
        : handoffTimeRef.current;

      video.currentTime = Math.min(handoffTimeRef.current, maxHandoffTime);
      handoffVideoRef.current = null;
      handoffTimeRef.current = 0;
    } else {
      video.currentTime = 0;
    }

    video.play().catch(() => {
      // Browsers can pause autoplay in low-power or restrictive modes.
    });
  }, []);

  const getAutoplayDelay = useCallback(
    (item: AnimationItem) => {
      const duration = videoDurations[item.video];

      if (!duration || !Number.isFinite(duration)) {
        return AUTOPLAY_INTERVAL_MS;
      }

      return Math.max(
        1600,
        Math.min(AUTOPLAY_INTERVAL_MS, duration * 1000 - VIDEO_END_BUFFER_MS),
      );
    },
    [videoDurations],
  );

  const startCrossfade = useCallback(() => {
    if (nextIndex === null || hasStartedCrossfadeRef.current) {
      return;
    }

    hasStartedCrossfadeRef.current = true;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsCrossfading(true);
      });
    });

    crossfadeTimeoutRef.current = window.setTimeout(() => {
      const handoffTime = nextVideoRef.current?.currentTime ?? 0;

      handoffVideoRef.current = items[nextIndex]?.video ?? null;
      handoffTimeRef.current = handoffTime;
      setActiveIndex(nextIndex);
      setNextIndex(null);
      setIsCrossfading(false);
      hasStartedCrossfadeRef.current = false;
    }, VIDEO_CROSSFADE_MS + 120);
  }, [items, nextIndex]);

  const transitionToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex === visibleIndex || nextIndex !== null || items.length === 0) {
        return;
      }

      if (crossfadeTimeoutRef.current) {
        window.clearTimeout(crossfadeTimeoutRef.current);
      }

      setNextIndex(targetIndex);
      setIsCrossfading(false);
      hasStartedCrossfadeRef.current = false;
    },
    [items.length, nextIndex, visibleIndex],
  );

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    if (autoplayTimeoutRef.current) {
      window.clearTimeout(autoplayTimeoutRef.current);
    }

    autoplayTimeoutRef.current = window.setTimeout(() => {
      transitionToIndex((visibleIndex + 1) % items.length);
    }, getAutoplayDelay(items[visibleIndex]));

    return () => {
      if (autoplayTimeoutRef.current) {
        window.clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [getAutoplayDelay, items, transitionToIndex, visibleIndex]);

  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        window.clearTimeout(autoplayTimeoutRef.current);
      }

      if (crossfadeTimeoutRef.current) {
        window.clearTimeout(crossfadeTimeoutRef.current);
      }
    };
  }, []);

  if (!activeItem) {
    return null;
  }

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden sm:overflow-visible">
      <div className="relative min-h-[330px] overflow-hidden rounded-[1.5rem] bg-[var(--color-soft-cream)] shadow-[0_28px_70px_rgba(16,43,86,0.2)] min-[390px]:min-h-[390px] sm:min-h-[600px] sm:rounded-[2rem] lg:min-h-[760px]">
        <video
          key={activeItem.video}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isCrossfading && nextItem ? "opacity-0 scale-[1.015]" : "opacity-100 scale-100"
          }`}
          src={activeItem.video}
          poster={activeItem.image}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={() => transitionToIndex((activeIndex + 1) % items.length)}
          onLoadedMetadata={(event) => playVideo(event.currentTarget, activeItem)}
        />
        {nextItem ? (
          <video
            key={nextItem.video}
            ref={nextVideoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCrossfading ? "opacity-100 scale-100" : "opacity-0 scale-[1.015]"
            }`}
            src={nextItem.video}
            poster={nextItem.image}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={startCrossfade}
            onLoadedMetadata={(event) => playVideo(event.currentTarget, nextItem)}
          />
        ) : null}
      </div>

      <div className="mt-4 grid max-w-full grid-flow-col auto-cols-[88px] gap-3 overflow-x-auto px-1 pb-3 sm:auto-cols-fr sm:grid-flow-row sm:grid-cols-4 sm:gap-4">
        {items.map((item, index) => {
          const isActive = index === visibleIndex;

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
