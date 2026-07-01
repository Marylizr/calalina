import Image from "next/image";

type GalleryCardProps = {
  title: string;
  category: string;
  image: string;
  href?: string;
};

export function GalleryCard({ title, category, image, href }: GalleryCardProps) {
  const className =
    "group relative block w-[240px] shrink-0 snap-start overflow-hidden rounded-[1.25rem] bg-white shadow-[0_16px_34px_rgba(16,43,86,0.1)] sm:w-[280px] lg:w-[310px]";

  const content = (
    <>
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-[var(--color-dark-ink)] shadow-md">
        {category}
      </figcaption>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={title}
        className={className}
      >
        <figure>{content}</figure>
      </a>
    );
  }

  return (
    <figure
      className={className}
    >
      {content}
    </figure>
  );
}
