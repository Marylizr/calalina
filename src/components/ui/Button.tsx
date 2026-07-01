import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonBase = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type LinkButton = ButtonBase &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButton = ButtonBase &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variants = {
  primary:
    "bg-[var(--color-calalina-red)] text-white shadow-[0_12px_26px_rgba(229,38,31,0.22)] hover:bg-[var(--color-tomato-red)]",
  secondary:
    "border border-[var(--color-deep-green)]/25 bg-white/70 text-[var(--color-deep-green)] hover:bg-white",
  ghost:
    "text-[var(--color-dark-ink)] hover:bg-[var(--color-soft-cream)]",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: LinkButton | NativeButton) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-extrabold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-mandarin-orange)] ${variants[variant]} ${className}`;

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props as Omit<LinkButton, keyof ButtonBase> & {
      href: string;
    };
    return (
      <Link className={classes} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as Omit<NativeButton, keyof ButtonBase>;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
