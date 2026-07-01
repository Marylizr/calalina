type SectionLabelProps = {
  children: string;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="mb-4 inline-flex rounded-full border border-[var(--color-wood-brown)]/25 bg-white/60 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-deep-green)] shadow-sm">
      {children}
    </p>
  );
}
