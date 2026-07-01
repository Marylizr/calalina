type FloatingProduceProps = {
  className?: string;
  tone?: "red" | "green" | "yellow" | "orange";
  delay?: string;
};

const tones = {
  red: "bg-[var(--color-calalina-red)]",
  green: "bg-[var(--color-leaf-green)]",
  yellow: "bg-[var(--color-mango-yellow)]",
  orange: "bg-[var(--color-mandarin-orange)]",
};

export function FloatingProduce({
  className = "",
  tone = "red",
  delay = "0s",
}: FloatingProduceProps) {
  return (
    <span
      aria-hidden="true"
      className={`floating-produce absolute h-12 w-12 rounded-[45%_55%_48%_52%] ${tones[tone]} shadow-lg ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="absolute -top-2 left-1/2 h-4 w-2 -translate-x-1/2 rounded-full bg-[var(--color-deep-green)]" />
    </span>
  );
}
