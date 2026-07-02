import Link from "next/link";
import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";
import { adminStats } from "@/data/admin";
import { getAdminOrders, getAdminProducts } from "@/lib/admin-data";

const toneClasses = {
  red: "bg-[#e5261f] text-white",
  green: "bg-[#2f6b35] text-white",
  yellow: "bg-[#ffc83d] text-[#102b56]",
  navy: "bg-[#102b56] text-white",
};

export default async function AdminDashboardPage() {
  const [adminOrders, adminProducts] = await Promise.all([
    getAdminOrders(),
    getAdminProducts(),
  ]);
  return (
    <>
      <AdminPageIntro
        eyebrow="Vista general"
        title="Todo lo importante de Calalina en un vistazo."
        action={<Link className="rounded-full bg-[#e5261f] px-5 py-3 text-sm font-black text-white" href="/admin/products/new">Nuevo producto</Link>}
      >
        Pedidos, stock, temporada, banners y artículos listos para operar sin tocar el código de la web pública.
      </AdminPageIntro>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e5261f]"
            aria-label={`${stat.actionLabel}: ${stat.label}`}
          >
            <AdminCard className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:border-[#e5261f]/30 group-hover:shadow-[0_24px_60px_rgba(229,38,31,0.16)]">
              <div className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-black ${toneClasses[stat.tone]}`}>
                {stat.label}
              </div>
              <p className="font-serif text-5xl font-black">{stat.value}</p>
              <p className="mt-2 text-sm font-bold text-[#4a4842]">{stat.detail}</p>
              <span className="mt-5 inline-flex items-center rounded-full bg-[#fff5e1] px-4 py-2 text-sm font-black text-[#102b56] transition group-hover:bg-[#e5261f] group-hover:text-white">
                {stat.actionLabel} →
              </span>
            </AdminCard>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-black">Pedidos recientes</h2>
            <Link href="/admin/orders" className="text-sm font-black text-[#e5261f]">Ver pedidos</Link>
          </div>
          <div className="grid gap-3">
            {adminOrders.map((order) => (
              <div key={order.id} className="grid gap-2 rounded-2xl bg-[#fff5e1] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-black">{order.id} · {order.customer}</p>
                  <p className="text-sm font-bold text-[#4a4842]">{order.phone} · {order.createdAt}</p>
                </div>
                <p className="font-black text-[#2f6b35]">{order.total} €</p>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-black">Stock sensible</h2>
            <Link href="/admin/products" className="text-sm font-black text-[#e5261f]">Gestionar</Link>
          </div>
          <div className="grid gap-3">
            {adminProducts.filter((product) => product.status !== "Disponible").map((product) => (
              <div key={product.id} className="rounded-2xl bg-[#fff5e1] p-4">
                <p className="font-black">{product.name}</p>
                <p className="text-sm font-bold text-[#4a4842]">{product.category} · {product.status}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </section>
    </>
  );
}
