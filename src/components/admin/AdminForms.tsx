"use client";

import { useActionState, useId, useState, type ComponentProps, type ReactNode } from "react";
import {
  saveBlogPostAction,
  saveProductAction,
  type ProductFormState,
} from "@/app/admin/actions";
import { adminCategories } from "@/data/admin";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const inputClass =
  "w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56] outline-none transition focus:border-[#e5261f] focus:ring-4 focus:ring-[#e5261f]/10";

const labelClass = "grid gap-2 text-sm font-black text-[#102b56]";

const initialProductState: ProductFormState = {
  status: "idle",
  message: "",
};

export function ProductForm({ mode, id }: { mode: "create" | "edit"; id?: string }) {
  const formId = useId();
  const [state, formAction, isPending] = useActionState(saveProductAction, initialProductState);
  const [isToastDismissed, setIsToastDismissed] = useState(false);
  const shouldShowToast = state.status !== "idle" && !isToastDismissed;

  return (
    <div className="grid gap-5">
      {shouldShowToast ? <AdminToast state={state} onClose={() => setIsToastDismissed(true)} /> : null}

      <form id={formId} action={formAction} className="grid gap-5">
        <input type="hidden" name="mode" value={mode} />
        {id ? <input type="hidden" name="id" value={id} /> : null}
        <div className="grid gap-5 lg:grid-cols-3">
          <label className={labelClass}>
            Nombre ES
            <input
              name="nameEs"
              className={inputClass}
              defaultValue={mode === "edit" ? "Aguacate Hass" : ""}
              required
            />
          </label>
          <label className={labelClass}>
            Nombre CA
            <input name="nameCa" className={inputClass} defaultValue={mode === "edit" ? "Alvocat Hass" : ""} />
          </label>
          <label className={labelClass}>
            Nombre EN
            <input name="nameEn" className={inputClass} defaultValue={mode === "edit" ? "Hass avocado" : ""} />
          </label>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_12rem_12rem]">
          <label className={labelClass}>
            Categoría
            <select name="category" className={inputClass} defaultValue="Fruta">
              {adminCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Precio
            <input
              name="price"
              className={inputClass}
              inputMode="decimal"
              defaultValue={mode === "edit" ? "2.95" : ""}
              required
            />
          </label>
          <label className={labelClass}>
            Unidad
            <select name="unit" className={inputClass} defaultValue="unit">
              <option value="kg">kg</option>
              <option value="unit">unidad</option>
              <option value="tray">bandeja</option>
              <option value="pack">pack</option>
              <option value="box">caja</option>
              <option value="bottle">botella</option>
            </select>
          </label>
        </div>

        <label className={labelClass}>
          Descripción corta
          <textarea
            name="shortDescriptionEs"
            className={`${inputClass} min-h-24`}
            defaultValue={mode === "edit" ? "Cremoso, listo para ensaladas y arepas." : ""}
          />
        </label>
        <label className={labelClass}>
          Ruta de imagen
          <input name="imageUrl" className={inputClass} placeholder="/uploads/admin/imagen.webp" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {["Activo", "Disponible online", "Destacado", "Temporada", "Rincón latino", "Nuevo"].map((flag) => (
            <label key={flag} className="flex items-center gap-3 rounded-2xl bg-[#fff5e1] px-4 py-3 text-sm font-black">
              <input type="checkbox" name={flag} defaultChecked={flag === "Activo"} className="h-5 w-5 accent-[#e5261f]" />
              {flag}
            </label>
          ))}
        </div>
      </form>

      <ImageUploadField
        label="Imágenes del producto"
        name="productImage"
        helper="Carga JPG, PNG, WebP o GIF desde tu ordenador. La ruta generada se puede guardar como imagen del producto."
      />

      <button
        type="submit"
        form={formId}
        disabled={isPending}
        onClick={() => setIsToastDismissed(false)}
        className="w-full rounded-full bg-[#e5261f] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-[#102b56] disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
      >
        {isPending ? "Guardando..." : mode === "create" ? "Crear producto" : "Guardar cambios"}
      </button>
    </div>
  );
}

function AdminToast({
  state,
  onClose,
}: {
  state: ProductFormState;
  onClose: () => void;
}) {
  const isSuccess = state.status === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-4 top-4 z-[80] w-[min(24rem,calc(100vw-2rem))] rounded-3xl border p-4 shadow-[0_20px_50px_rgba(16,43,86,0.18)] ${
        isSuccess
          ? "border-[#2f6b35]/20 bg-[#f2fbef] text-[#2f6b35]"
          : "border-[#e5261f]/20 bg-[#fff1ef] text-[#e5261f]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lg font-black">
          {isSuccess ? "✓" : "!"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black">{isSuccess ? "Listo" : "Revisa el producto"}</p>
          <p className="mt-1 text-sm font-bold leading-6 text-[#4a4842]">{state.message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/80 text-sm font-black text-[#102b56]"
          aria-label="Cerrar aviso"
        >
          ×
        </button>
      </div>
    </div>
  );
}

type BlogFormPost = {
  id: string;
  titleEs: string;
  titleCa: string;
  titleEn: string;
  slug: string;
  excerptEs: string;
  excerptCa: string;
  excerptEn: string;
  contentEs: string;
  contentCa: string;
  contentEn: string;
  category: string;
  coverImage: string | null;
  status: "draft" | "published";
  publishedAt: string | null;
  seoTitleEs: string | null;
  seoTitleCa: string | null;
  seoTitleEn: string | null;
  seoDescriptionEs: string | null;
  seoDescriptionCa: string | null;
  seoDescriptionEn: string | null;
};

export function BlogForm({ mode, post }: { mode: "create" | "edit"; post?: BlogFormPost | null }) {
  return (
    <AdminActionFormWrapper action={saveBlogPostAction} submitLabel={mode === "create" ? "Crear artículo" : "Guardar artículo"}>
      <input type="hidden" name="mode" value={mode} />
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="grid gap-5 lg:grid-cols-3">
        <label className={labelClass}>
          Título ES
          <input name="titleEs" className={inputClass} defaultValue={post?.titleEs || ""} required />
        </label>
        <label className={labelClass}>
          Título CA
          <input name="titleCa" className={inputClass} defaultValue={post?.titleCa || ""} />
        </label>
        <label className={labelClass}>
          Título EN
          <input name="titleEn" className={inputClass} defaultValue={post?.titleEn || ""} />
        </label>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <label className={labelClass}>
          Slug
          <input name="slug" className={inputClass} defaultValue={post?.slug || ""} placeholder="nevera-si-o-no" />
        </label>
        <label className={labelClass}>
          Categoría
          <input name="category" className={inputClass} defaultValue={post?.category || "Consejos de conservación"} required />
        </label>
        <label className={labelClass}>
          Estado
          <select name="status" className={inputClass} defaultValue={post?.status || "draft"}>
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </select>
        </label>
      </div>
      <label className={labelClass}>
        Extracto ES
        <textarea name="excerptEs" className={`${inputClass} min-h-24`} defaultValue={post?.excerptEs || ""} required />
      </label>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className={labelClass}>
          Extracto CA
          <textarea name="excerptCa" className={`${inputClass} min-h-24`} defaultValue={post?.excerptCa || ""} />
        </label>
        <label className={labelClass}>
          Extracto EN
          <textarea name="excerptEn" className={`${inputClass} min-h-24`} defaultValue={post?.excerptEn || ""} />
        </label>
      </div>
      <label className={labelClass}>
        Contenido ES
        <textarea name="contentEs" className={`${inputClass} min-h-64 font-mono text-xs`} defaultValue={post?.contentEs || ""} placeholder="Markdown o JSON estructurado" required />
      </label>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className={labelClass}>
          Contenido CA
          <textarea name="contentCa" className={`${inputClass} min-h-48 font-mono text-xs`} defaultValue={post?.contentCa || ""} />
        </label>
        <label className={labelClass}>
          Contenido EN
          <textarea name="contentEn" className={`${inputClass} min-h-48 font-mono text-xs`} defaultValue={post?.contentEn || ""} />
        </label>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className={labelClass}>
          Ruta de portada
          <input name="coverImage" className={inputClass} defaultValue={post?.coverImage || ""} placeholder="/uploads/admin/imagen.webp" />
        </label>
        <label className={labelClass}>
          Fecha de publicación
          <input
            name="publishedAt"
            type="datetime-local"
            className={inputClass}
            defaultValue={post?.publishedAt ? post.publishedAt.slice(0, 16) : ""}
          />
        </label>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <label className={labelClass}>
          SEO title ES
          <input name="seoTitleEs" className={inputClass} defaultValue={post?.seoTitleEs || ""} />
        </label>
        <label className={labelClass}>
          SEO title CA
          <input name="seoTitleCa" className={inputClass} defaultValue={post?.seoTitleCa || ""} />
        </label>
        <label className={labelClass}>
          SEO title EN
          <input name="seoTitleEn" className={inputClass} defaultValue={post?.seoTitleEn || ""} />
        </label>
      </div>
      <label className={labelClass}>
        SEO description ES
        <textarea name="seoDescriptionEs" className={`${inputClass} min-h-24`} defaultValue={post?.seoDescriptionEs || ""} />
      </label>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className={labelClass}>
          SEO description CA
          <textarea name="seoDescriptionCa" className={`${inputClass} min-h-24`} defaultValue={post?.seoDescriptionCa || ""} />
        </label>
        <label className={labelClass}>
          SEO description EN
          <textarea name="seoDescriptionEn" className={`${inputClass} min-h-24`} defaultValue={post?.seoDescriptionEn || ""} />
        </label>
      </div>
    </AdminActionFormWrapper>
  );
}

function AdminActionFormWrapper({
  action,
  submitLabel,
  children,
}: {
  action: ComponentProps<typeof AdminActionForm>["action"];
  submitLabel: string;
  children: ReactNode;
}) {
  return (
    <AdminActionForm action={action} submitLabel={submitLabel}>
      {children}
    </AdminActionForm>
  );
}
