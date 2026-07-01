import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readMore: string;
  href?: string;
};

export function BlogCard({ title, category, excerpt, image, readMore, href = "#consells" }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-[var(--color-deep-green)]/10 bg-white shadow-[0_14px_34px_rgba(16,43,86,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[5/3] overflow-hidden bg-[var(--color-soft-cream)]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-[var(--color-mango-yellow)]/35 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--color-dark-ink)]">
          {category}
        </span>
        <h3 className="mt-4 text-xl font-black leading-tight text-[var(--color-dark-ink)]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted-text)]">{excerpt}</p>
        <Link
          href={href}
          className="mt-5 inline-flex text-sm font-black text-[var(--color-calalina-red)] transition hover:text-[var(--color-tomato-red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-mandarin-orange)]"
        >
          {readMore} →
        </Link>
      </div>
    </article>
  );
}
