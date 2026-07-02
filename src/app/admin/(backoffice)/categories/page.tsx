import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { CategoryEditControls } from "@/components/admin/CategoryEditControls";
import { saveCategoryAction } from "@/app/admin/actions";
import { getAdminCategories } from "@/lib/admin-data";

const inputClass =
  "w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56]";

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <>
      <AdminPageIntro eyebrow="Taxonomía" title="Categorías del catálogo.">
        La estructura inicial separa fruta, verdura, hortalizas, productos latinos, despensa y temporada.
      </AdminPageIntro>
      <AdminCard className="mb-6">
        <AdminActionForm action={saveCategoryAction} submitLabel="Crear categoría">
          <div className="grid gap-4 lg:grid-cols-3">
            <input name="nameEs" className={inputClass} placeholder="Nombre ES" required />
            <input name="nameCa" className={inputClass} placeholder="Nombre CA" />
            <input name="nameEn" className={inputClass} placeholder="Nombre EN" />
          </div>
        </AdminActionForm>
      </AdminCard>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <AdminCard key={category.id}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f6b35]">Orden {index + 1}</p>
            <h2 className="mt-2 font-serif text-2xl font-black">{category.name}</h2>
            <p className="mt-2 text-sm font-bold text-[#4a4842]">Activa para productos, filtros y destacados.</p>
            <CategoryEditControls id={category.id} name={category.name} />
          </AdminCard>
        ))}
      </section>
    </>
  );
}
