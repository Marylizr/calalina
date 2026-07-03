import Link from "next/link";
import type { Locale } from "@/data/site";
import type { PublicCategory } from "@/lib/products";

type ProductFiltersCopy = {
  all: string;
  searchPlaceholder: string;
  searchSubmit: string;
  quickFilters: {
    seasonal: string;
    featured: string;
    latin: string;
    online: string;
  };
};

type ProductFiltersProps = {
  locale: Locale;
  catalogPath: string;
  categories: PublicCategory[];
  activeCategory?: string;
  activeTag?: string;
  query?: string;
  copy: ProductFiltersCopy;
};

const quickFilterValues = [
  ["temporada", "seasonal"],
  ["destacats", "featured"],
  ["llati", "latin"],
  ["online", "online"],
] as const;

function catalogHref(
  catalogPath: string,
  params: { category?: string; tag?: string; q?: string },
) {
  const search = new URLSearchParams();
  if (params.category) search.set("categoria", params.category);
  if (params.tag) search.set("tag", params.tag);
  if (params.q) search.set("q", params.q);
  const queryString = search.toString();
  return queryString ? `${catalogPath}?${queryString}` : catalogPath;
}

export function ProductFilters({
  catalogPath,
  categories,
  activeCategory,
  activeTag,
  query,
  copy,
}: ProductFiltersProps) {
  const chipClass =
    "inline-flex min-h-10 items-center justify-center rounded-full px-4 text-sm font-black shadow-sm transition hover:-translate-y-0.5";
  const activeClass = "bg-[var(--color-calalina-red)] text-white";
  const inactiveClass = "bg-white/82 text-[var(--color-deep-green)] hover:bg-white";

  return (
    <div className="mt-10 grid gap-5">
      <form
        action={catalogPath}
        className="grid gap-3 rounded-[1.5rem] bg-white/75 p-3 shadow-[0_14px_34px_rgba(16,43,86,0.08)] sm:grid-cols-[1fr_auto]"
      >
        {activeCategory ? <input type="hidden" name="categoria" value={activeCategory} /> : null}
        {activeTag ? <input type="hidden" name="tag" value={activeTag} /> : null}
        <input
          name="q"
          defaultValue={query}
          placeholder={copy.searchPlaceholder}
          className="min-h-12 rounded-full border border-[var(--color-wood-brown)]/15 bg-white px-5 text-sm font-bold text-[var(--color-dark-ink)] outline-none transition focus:border-[var(--color-calalina-red)] focus:ring-4 focus:ring-[var(--color-calalina-red)]/10"
        />
        <button className="min-h-12 rounded-full bg-[var(--color-calalina-red)] px-6 text-sm font-black text-white shadow-[0_12px_24px_rgba(229,38,31,0.2)] transition hover:bg-[var(--color-deep-green)]">
          {copy.searchSubmit}
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        <Link
          href={catalogHref(catalogPath, { tag: activeTag, q: query })}
          className={`${chipClass} ${activeCategory ? inactiveClass : activeClass}`}
        >
          {copy.all}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={catalogHref(catalogPath, {
              category: category.slug,
              tag: activeTag,
              q: query,
            })}
            className={`${chipClass} ${
              activeCategory === category.slug ? activeClass : inactiveClass
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {quickFilterValues.map(([value, key]) => (
          <Link
            key={value}
            href={catalogHref(catalogPath, {
              category: activeCategory,
              tag: activeTag === value ? undefined : value,
              q: query,
            })}
            className={`${chipClass} ${activeTag === value ? activeClass : inactiveClass}`}
          >
            {copy.quickFilters[key]}
          </Link>
        ))}
      </div>
    </div>
  );
}
