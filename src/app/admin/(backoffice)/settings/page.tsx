import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveSettingsAction } from "@/app/admin/actions";
import { getAdminSettings } from "@/lib/admin-data";

const inputClass =
  "w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56]";

export default async function AdminSettingsPage() {
  const adminSettings = await getAdminSettings();

  return (
    <>
      <AdminPageIntro eyebrow="Tienda" title="Ajustes generales.">
        Mantén datos de contacto, horarios, mapa y configuración de pedidos en un solo lugar.
      </AdminPageIntro>
      <AdminCard className="mb-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <ImageUploadField
            label="Logo del sitio"
            name="logoImage"
            helper="Sube el logo desde tu ordenador para usarlo en cabecera, footer y backoffice."
          />
          <ImageUploadField
            label="Imagen general del sitio"
            name="siteImage"
            helper="Sube una imagen para secciones principales como portada, quiénes somos o promociones."
          />
        </div>
      </AdminCard>
      <AdminCard>
        <AdminActionForm action={saveSettingsAction} submitLabel="Guardar ajustes" className="grid gap-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Nombre comercial
              <input name="businessName" className={inputClass} defaultValue={adminSettings.businessName} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Email
              <input name="email" className={inputClass} defaultValue={adminSettings.email} />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-black">
            Dirección
            <input name="address" className={inputClass} defaultValue={adminSettings.address} />
          </label>
          <div className="grid gap-5 lg:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Teléfono
              <input name="phone" className={inputClass} defaultValue={adminSettings.phone} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              WhatsApp
              <input name="whatsapp" className={inputClass} defaultValue={adminSettings.whatsapp} />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-black">
            Google Place ID
            <input
              className={inputClass}
              name="googlePlaceId"
              defaultValue={adminSettings.googlePlaceId}
              placeholder="Ej. ChIJ..."
            />
          </label>
          <div className="grid gap-5 lg:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Google Maps URL
              <input name="googleMapsUrl" className={inputClass} defaultValue={adminSettings.googleMapsUrl} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Google Maps Embed URL
              <input name="googleMapsEmbedUrl" className={inputClass} defaultValue={adminSettings.googleMapsEmbedUrl} />
            </label>
          </div>
          <label className="rounded-2xl bg-[#fff5e1] p-4 text-sm font-black text-[#102b56]">
            <span className="flex items-start gap-3">
              <input
                type="checkbox"
                name="useGoogleHours"
                defaultChecked={adminSettings.useGoogleHours}
                className="mt-1 h-5 w-5 accent-[#e5261f]"
              />
              <span>
                Usar horarios de Google Maps
                <span className="mt-2 block text-sm font-bold leading-6 text-[#4a4842]">
                  Si activas esta opción, los horarios públicos se leerán desde Google Maps. Mantén actualizado el perfil de Google Business.
                </span>
              </span>
            </span>
          </label>
          <div className="grid gap-5 lg:grid-cols-3">
            <label className="grid gap-2 text-sm font-black">
              Horarios manuales CA
              <textarea name="manualOpeningHoursCa" className={`${inputClass} min-h-40`} defaultValue={adminSettings.manualOpeningHoursCa} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Horarios manuales ES
              <textarea name="manualOpeningHoursEs" className={`${inputClass} min-h-40`} defaultValue={adminSettings.manualOpeningHoursEs} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Horarios manuales EN
              <textarea name="manualOpeningHoursEn" className={`${inputClass} min-h-40`} defaultValue={adminSettings.manualOpeningHoursEn} />
            </label>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <label className="grid gap-2 text-sm font-black">
              Aviso especial CA
              <textarea name="specialNoticeCa" className={`${inputClass} min-h-28`} defaultValue={adminSettings.specialNoticeCa} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Aviso especial ES
              <textarea name="specialNoticeEs" className={`${inputClass} min-h-28`} defaultValue={adminSettings.specialNoticeEs} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Aviso especial EN
              <textarea name="specialNoticeEn" className={`${inputClass} min-h-28`} defaultValue={adminSettings.specialNoticeEn} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Pedidos online", "Recogida", "Solicitud de entrega"].map((setting) => (
              <label key={setting} className="flex items-center gap-3 rounded-2xl bg-[#fff5e1] px-4 py-3 text-sm font-black">
                <input type="checkbox" defaultChecked={setting !== "Pedidos online"} className="h-5 w-5 accent-[#e5261f]" />
                {setting}
              </label>
            ))}
          </div>
        </AdminActionForm>
      </AdminCard>
    </>
  );
}
