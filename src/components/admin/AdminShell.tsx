"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { adminNavItems } from "@/data/admin";

type AdminShellProps = {
  children: ReactNode;
  userEmail?: string;
  logoutAction: () => Promise<void>;
};

const sectionTitles: Record<string, string> = {
  "/admin": "Panel de control",
  "/admin/products": "Productos",
  "/admin/categories": "Categorías",
  "/admin/orders": "Pedidos",
  "/admin/blog": "Blog",
  "/admin/gallery": "Galería",
  "/admin/banners": "Promociones",
  "/admin/settings": "Ajustes",
  "/admin/seasonal": "Temporada",
};

export function AdminShell({ children, userEmail, logoutAction }: AdminShellProps) {
  const pathname = usePathname();
  const basePath = pathname.includes("/new")
    ? pathname.replace("/new", "")
    : pathname.includes("/edit")
      ? pathname.split("/").slice(0, 3).join("/")
      : pathname;
  const title = sectionTitles[basePath] || "Panel de administración";

  return (
    <div className="min-h-screen bg-[#f8efe2] text-[var(--color-dark-ink)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#a96532]/15 bg-[#fff5e1]/95 px-5 py-6 shadow-[18px_0_48px_rgba(169,101,50,0.08)] lg:block">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white shadow-sm">
            <Image src="/images/brand/logo.png" alt="" width={40} height={44} className="h-10 w-auto object-contain" />
          </span>
          <span>
            <span className="block font-serif text-2xl font-black">Calalina</span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#4a4842]">
              Administración
            </span>
          </span>
        </Link>

        <nav className="mt-8 grid gap-2" aria-label="Navegación admin">
          {adminNavItems.map((item) => (
            <AdminNavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[#a96532]/15 bg-[#fff5e1]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6b35]">
                Calalina admin
              </p>
              <h1 className="font-serif text-2xl font-black sm:text-3xl">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/es"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-black text-[#102b56] shadow-sm transition hover:bg-[#102b56] hover:text-white"
              >
                Ver website
              </Link>
              <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#4a4842] shadow-sm sm:inline-flex">
                {userEmail || "Admin"}
              </span>
              <form action={logoutAction}>
                <button className="rounded-full bg-[#102b56] px-4 py-2 text-sm font-black text-white transition hover:bg-[#e5261f]">
                  Salir
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 pb-28 sm:px-6 lg:px-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-[#a96532]/15 bg-[#fff5e1]/95 px-2 py-2 shadow-[0_-18px_48px_rgba(169,101,50,0.15)] backdrop-blur-xl lg:hidden">
        {adminNavItems.slice(0, 5).map((item) => (
          <AdminMobileNavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
    </div>
  );
}

function AdminNavLink({
  item,
  pathname,
}: {
  item: (typeof adminNavItems)[number];
  pathname: string;
}) {
  const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${
        isActive
          ? "bg-[#e5261f] text-white shadow-[0_12px_28px_rgba(229,38,31,0.18)]"
          : "text-[#102b56] hover:bg-white"
      }`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/30 text-base">
        {item.icon}
      </span>
      {item.label}
    </Link>
  );
}

function AdminMobileNavLink({
  item,
  pathname,
}: {
  item: (typeof adminNavItems)[number];
  pathname: string;
}) {
  const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`grid justify-items-center gap-1 rounded-2xl px-1 py-2 text-[0.68rem] font-black ${
        isActive ? "bg-[#e5261f] text-white" : "text-[#102b56]"
      }`}
    >
      <span className="text-base leading-none">{item.icon}</span>
      <span className="max-w-full truncate">{item.label}</span>
    </Link>
  );
}

export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.5rem] border border-white/80 bg-white/75 p-5 shadow-[0_18px_50px_rgba(169,101,50,0.12)] ${className}`}
    >
      {children}
    </section>
  );
}

export function AdminPageIntro({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 rounded-[1.75rem] bg-[#fff5e1] p-5 shadow-sm sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f6b35]">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-[#102b56] sm:text-4xl">{title}</h2>
        <div className="mt-2 max-w-3xl text-sm font-bold leading-7 text-[#4a4842]">{children}</div>
      </div>
      {action}
    </div>
  );
}

export function AdminPrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#e5261f] px-5 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(229,38,31,0.2)] transition hover:bg-[#102b56]"
    >
      {children}
    </Link>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[#fff5e1] px-3 py-1 text-xs font-black text-[#2f6b35]">
      {children}
    </span>
  );
}
