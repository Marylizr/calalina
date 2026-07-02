import Link from "next/link";
import { AdminCard, AdminPageIntro, AdminPrimaryLink, StatusPill } from "@/components/admin/AdminShell";
import { deleteProductAction, updateProductStockAction } from "@/app/admin/actions";
import { getAdminCategories, getAdminProducts } from "@/lib/admin-data";

type AdminProductsPageProps = {
  searchParams: Promise<{ stock?: string }>;
};

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const { stock } = await searchParams;
  const [filteredProducts, categories] = await Promise.all([
    getAdminProducts(stock),
    getAdminCategories(),
  ]);
  const activeFilter =
    stock === "low" ? "Mostrando productos con bajo stock" : stock === "out" ? "Mostrando productos sin stock" : "";

  return (
    <>
      <AdminPageIntro
        eyebrow="Catálogo"
        title="Productos e inventario."
        action={<AdminPrimaryLink href="/admin/products/new">Nuevo producto</AdminPrimaryLink>}
      >
        Busca, filtra y prepara productos para venta online, temporada, destacados y rincón latino.
      </AdminPageIntro>

      <AdminCard className="mb-6">
        {activeFilter ? (
          <p className="mb-4 rounded-2xl bg-[#fff5e1] px-4 py-3 text-sm font-black text-[#102b56]">
            {activeFilter}
          </p>
        ) : null}
        <div className="grid gap-3 lg:grid-cols-[1fr_14rem_14rem_14rem]">
          <input className="rounded-2xl border border-[#a96532]/20 px-4 py-3 text-sm font-bold" placeholder="Buscar por nombre" />
          <select className="rounded-2xl border border-[#a96532]/20 px-4 py-3 text-sm font-bold">
            <option>Todas las categorías</option>
            {categories.map((category) => <option key={category.id}>{category.name}</option>)}
          </select>
          <select className="rounded-2xl border border-[#a96532]/20 px-4 py-3 text-sm font-bold" defaultValue={stock || "all"}>
            <option value="all">Todos los estados</option>
            <option value="available">Disponible</option>
            <option value="low">Bajo stock</option>
            <option value="out">Agotado</option>
          </select>
          <button className="rounded-2xl bg-[#102b56] px-4 py-3 text-sm font-black text-white">Acciones masivas</button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-[#4a4842]">
              <tr>
                <th className="px-3 py-3">Producto</th>
                <th className="px-3 py-3">Categoría</th>
                <th className="px-3 py-3">Precio</th>
                <th className="px-3 py-3">Stock</th>
                <th className="px-3 py-3">Flags</th>
                <th className="px-3 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-[#a96532]/10">
                  <td className="px-3 py-4 font-black">{product.name}</td>
                  <td className="px-3 py-4 font-bold text-[#4a4842]">{product.category}</td>
                  <td className="px-3 py-4 font-black">{product.price} € / {product.unit}</td>
                  <td className="px-3 py-4"><StatusPill>{product.status}</StatusPill></td>
                  <td className="px-3 py-4 text-xs font-black text-[#4a4842]">
                    {[product.featured && "Destacado", product.seasonal && "Temporada", product.latin && "Latino"].filter(Boolean).join(" · ") || "Normal"}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="rounded-full bg-[#fff5e1] px-3 py-1 font-black text-[#e5261f]">Editar</Link>
                      <form action={updateProductStockAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="stockStatus" value="outOfStock" />
                        <button className="rounded-full bg-[#102b56] px-3 py-1 font-black text-white">Agotar</button>
                      </form>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className="rounded-full bg-[#e5261f] px-3 py-1 font-black text-white">Eliminar</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 ? (
          <p className="mt-5 rounded-2xl bg-[#fff5e1] px-4 py-3 text-sm font-black text-[#4a4842]">
            No hay productos para este filtro.
          </p>
        ) : null}
      </AdminCard>
    </>
  );
}
