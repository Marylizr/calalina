import Image from "next/image";
import { AdminCard, AdminPageIntro, StatusPill } from "@/components/admin/AdminShell";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { GalleryImageControls } from "@/components/admin/GalleryImageControls";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveGalleryImageAction } from "@/app/admin/actions";
import { getAdminGallery } from "@/lib/admin-data";
import { galleryCategories } from "@/lib/gallery";

const inputClass = "w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold";

type AdminGalleryPageProps = {
  searchParams: Promise<{ category?: string; visibility?: string; q?: string }>;
};

export default async function AdminGalleryPage({ searchParams }: AdminGalleryPageProps) {
  const filters = await searchParams;
  const adminGallery = await getAdminGallery(filters);

  return (
    <>
      <AdminPageIntro eyebrow="Galería" title="Imágenes de la tienda.">
        Sube fotos, edita textos alternativos por idioma, marca destacadas y controla el orden del carrete público.
      </AdminPageIntro>
      <AdminCard className="mb-6">
        <ImageUploadField
          label="Subir imagen a la galería"
          name="galleryImage"
          helper="Selecciona una foto desde tu ordenador para añadirla al carrete de la galería."
        />
        <div className="mt-5">
          <AdminActionForm action={saveGalleryImageAction} submitLabel="Guardar imagen">
            <input name="image" className={inputClass} placeholder="/uploads/admin/imagen.webp" required />
            <div className="grid gap-4 lg:grid-cols-3">
              <input name="titleCa" className={inputClass} placeholder="Título CA" />
              <input name="titleEs" className={inputClass} placeholder="Título ES" />
              <input name="titleEn" className={inputClass} placeholder="Título EN" />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <input name="altCa" className={inputClass} placeholder="Alt CA" required />
              <input name="altEs" className={inputClass} placeholder="Alt ES" />
              <input name="altEn" className={inputClass} placeholder="Alt EN" />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <select name="category" className={inputClass} defaultValue="botiga">
                {galleryCategories.map((category) => (
                  <option key={category.value} value={category.value}>{category.labelCa}</option>
                ))}
              </select>
              <input name="sortOrder" type="number" className={inputClass} placeholder="Orden" defaultValue={0} />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black">
                <input type="checkbox" name="isFeatured" className="h-5 w-5 accent-[#e5261f]" />
                Destacada
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black">
                <input type="checkbox" name="isVisible" defaultChecked className="h-5 w-5 accent-[#e5261f]" />
                Visible
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black">
                <input type="checkbox" name="showOnHome" defaultChecked className="h-5 w-5 accent-[#e5261f]" />
                Inicio
              </label>
            </div>
          </AdminActionForm>
        </div>
      </AdminCard>
      <AdminCard className="mb-6">
        <form className="grid gap-3 lg:grid-cols-[1fr_12rem_12rem_auto]">
          <input name="q" className={inputClass} placeholder="Buscar por título o alt" defaultValue={filters.q || ""} />
          <select name="category" className={inputClass} defaultValue={filters.category || ""}>
            <option value="">Todas</option>
            {galleryCategories.map((category) => (
              <option key={category.value} value={category.value}>{category.labelCa}</option>
            ))}
          </select>
          <select name="visibility" className={inputClass} defaultValue={filters.visibility || ""}>
            <option value="">Todas</option>
            <option value="visible">Visibles</option>
            <option value="hidden">Ocultas</option>
          </select>
          <button className="rounded-full bg-[#102b56] px-5 py-3 text-sm font-black text-white">Filtrar</button>
        </form>
      </AdminCard>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminGallery.map((item) => (
          <AdminCard key={item.id} className="p-3">
            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-[#fff5e1]">
              <Image src={item.image} alt="" fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="p-3">
              <h2 className="font-serif text-xl font-black">{item.title}</h2>
              <p className="mt-1 text-sm font-bold text-[#4a4842]">{item.category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.featured ? <StatusPill>Destacada</StatusPill> : <StatusPill>Galería</StatusPill>}
                {item.archived ? <StatusPill>Archivada</StatusPill> : null}
              </div>
              <GalleryImageControls item={item} />
            </div>
          </AdminCard>
        ))}
      </section>
    </>
  );
}
