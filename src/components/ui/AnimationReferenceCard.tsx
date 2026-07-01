import Image from "next/image";

type AnimationReferenceCardProps = {
  title: string;
  label: string;
  image: string;
  active?: boolean;
};

export function AnimationReferenceCard({
  title,
  label,
  image,
  active = false,
}: AnimationReferenceCardProps) {
  return (
    <article
      className={`min-w-32 snap-start rounded-2xl border p-3 transition ${
        active
          ? "border-[var(--color-calalina-red)] bg-white shadow-[0_12px_24px_rgba(229,38,31,0.18)]"
          : "border-white/70 bg-white/60 hover:bg-white"
      }`}
    >
      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-soft-cream)]">
        <Image src={image} alt="" fill sizes="140px" className="object-cover" />
      </div>
      <h3 className="text-sm font-black text-[var(--color-dark-ink)]">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-[var(--color-muted-text)]">{label}</p>
    </article>
  );
}
