import { AdminCard, AdminPageIntro, AdminPrimaryLink, StatusPill } from "@/components/admin/AdminShell";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { deleteBannerAction, saveBannerAction } from "@/app/admin/actions";
import { getAdminBanners } from "@/lib/admin-data";

const inputClass = "rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold";

type AdminBannersPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminBannersPage({ searchParams }: AdminBannersPageProps) {
  const { status } = await searchParams;
  const adminBanners = await getAdminBanners(status);

  return (
    <>
      <AdminPageIntro
        eyebrow="Promociones"
        title="Promociones y avisos."
        action={<AdminPrimaryLink href="/admin/banners">Nuevo banner</AdminPrimaryLink>}
      >
        Programa mensajes para el hero, la barra superior, temporada o rincón latino sin tocar el inicio.
      </AdminPageIntro>
      <AdminCard className="mb-6">
        <ImageUploadField
          label="Imagen de promoción"
          name="bannerImage"
          helper="Sube desde tu ordenador la imagen para un banner, aviso o promoción."
        />
        <div className="mt-5">
          <AdminActionForm action={saveBannerAction} submitLabel="Guardar promoción">
            <div className="grid gap-3 lg:grid-cols-2">
              <input name="titleEs" className={inputClass} placeholder="Título" required />
              <input name="image" className={inputClass} placeholder="/uploads/admin/imagen.webp" />
              <input name="descriptionEs" className={inputClass} placeholder="Descripción" />
              <input name="ctaLabelEs" className={inputClass} placeholder="Texto del botón" />
              <input name="ctaHref" className={inputClass} placeholder="/es#temporada" />
              <select name="placement" className={inputClass}>
                <option value="homeHero">Hero de inicio</option>
                <option value="topBar">Barra superior</option>
                <option value="seasonal">Temporada</option>
                <option value="latinCorner">Rincón latino</option>
              </select>
            </div>
            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black">
              <input type="checkbox" name="isActive" className="h-5 w-5 accent-[#e5261f]" />
              Activar promoción
            </label>
          </AdminActionForm>
        </div>
      </AdminCard>
      <section className="grid gap-4 lg:grid-cols-2">
        {adminBanners.map((banner) => (
          <AdminCard key={banner.title}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f6b35]">{banner.placement}</p>
            <h2 className="mt-2 font-serif text-3xl font-black">{banner.title}</h2>
            <p className="mt-2 text-sm font-bold text-[#4a4842]">{banner.date}</p>
            <div className="mt-4"><StatusPill>{banner.status}</StatusPill></div>
            {"id" in banner ? (
              <form action={deleteBannerAction} className="mt-4">
                <input type="hidden" name="id" value={banner.id} />
                <button className="rounded-full bg-[#e5261f] px-4 py-2 text-sm font-black text-white">
                  Eliminar
                </button>
              </form>
            ) : null}
          </AdminCard>
        ))}
      </section>
    </>
  );
}
