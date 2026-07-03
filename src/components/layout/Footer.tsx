import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/data/site";

const LOGO_SRC = "/images/brand/logo.png";

type FooterProps = {
  locale: Locale;
  content: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    newsletterTitle: string;
    newsletterText: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    copyright: string;
  };
};

export function Footer({ locale, content }: FooterProps) {
  return (
    <footer className="bg-[var(--color-dark-ink)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1.4fr_1fr] lg:px-8">
        <div>
          <Link href={`/${locale}#inici`} className="inline-flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center overflow-hidden">
              <Image
                src={LOGO_SRC}
                alt=""
                width={46}
                height={52}
                className="h-12 w-auto object-contain"
              />
            </span>
            <span>
              <span className="block font-serif text-3xl font-black">Calalina</span>
              <span className="text-sm font-bold text-white/70">
                {content.tagline}
              </span>
            </span>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {content.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-mango-yellow)]">
                {column.title}
              </h3>
              <ul className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="text-sm font-semibold text-white/76 hover:text-white" href="#inici">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <form className="rounded-[1.5rem] bg-white/10 p-5">
          <h3 className="font-serif text-2xl font-black">{content.newsletterTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-white/72">
            {content.newsletterText}
          </p>
          <label className="mt-5 block">
            <span className="sr-only">{content.emailLabel}</span>
            <input
              type="email"
              placeholder={content.emailPlaceholder}
              className="min-h-12 w-full rounded-full border border-white/15 bg-white px-4 text-sm font-semibold text-[var(--color-dark-ink)] outline-none focus:border-[var(--color-mango-yellow)]"
            />
          </label>
          <Button className="mt-3 w-full" type="submit">
            {content.submit}
          </Button>
        </form>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/62">
        <p>{content.copyright}</p>
        <p className="mt-2">
          Powered by:{" "}
          <a
            href="https://pixeltrendstudio.com/en"
            target="_blank"
            rel="noreferrer"
            className="font-black text-white transition hover:text-[var(--color-mango-yellow)]"
          >
            PixelTrend Studio LLC
          </a>
        </p>
      </div>
    </footer>
  );
}
