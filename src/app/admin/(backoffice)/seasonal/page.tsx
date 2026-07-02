import { AdminCard, AdminPageIntro, AdminPrimaryLink, StatusPill } from "@/components/admin/AdminShell";
import { updateSeasonalProductAction } from "@/app/admin/actions";
import { getAdminProducts, getAdminSeasonalHighlights } from "@/lib/admin-data";

export default async function AdminSeasonalPage() {
  const [adminSeasonalHighlights, products] = await Promise.all([
    getAdminSeasonalHighlights(),
    getAdminProducts(),
  ]);

  return (
    <>
      <AdminPageIntro
        eyebrow="Temporada"
        title="Destacados de temporada."
        action={<AdminPrimaryLink href="/admin/products">Marcar productos</AdminPrimaryLink>}
      >
        Gestiona los productos que aparecen como temporada y prepara campañas por fechas.
      </AdminPageIntro>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminSeasonalHighlights.map((product) => (
          <AdminCard key={product}>
            <StatusPill>Activo</StatusPill>
            <h2 className="mt-4 font-serif text-3xl font-black">{product}</h2>
            <p className="mt-2 text-sm font-bold text-[#4a4842]">
              Visible en destacados, filtros de catálogo y bloque de temporada.
            </p>
          </AdminCard>
        ))}
      </section>
      <AdminCard className="mt-6">
        <h2 className="font-serif text-2xl font-black">Marcar productos de temporada</h2>
        <div className="mt-4 grid gap-3">
          {products.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fff5e1] p-4">
              <div>
                <p className="font-black">{product.name}</p>
                <p className="text-sm font-bold text-[#4a4842]">{product.category}</p>
              </div>
              <div className="flex gap-2">
                <form action={updateSeasonalProductAction}>
                  <input type="hidden" name="id" value={product.id} />
                  <input type="hidden" name="isSeasonal" value="true" />
                  <button className="rounded-full bg-[#2f6b35] px-4 py-2 text-sm font-black text-white">Marcar</button>
                </form>
                <form action={updateSeasonalProductAction}>
                  <input type="hidden" name="id" value={product.id} />
                  <input type="hidden" name="isSeasonal" value="false" />
                  <button className="rounded-full bg-[#102b56] px-4 py-2 text-sm font-black text-white">Quitar</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </>
  );
}
