"use client";

import { useActionState, useState } from "react";
import {
  archiveGalleryImageStateAction,
  deleteGalleryImageStateAction,
  saveGalleryImageAction,
  saveGalleryImageDirectAction,
} from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/AdminActionForm";

const inputClass =
  "w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56]";

const buttonClass =
  "grid h-10 place-items-center rounded-full px-3 text-xs font-black text-white transition";

const initialState = {
  status: "idle" as const,
  message: "",
};

type GalleryImageItem = {
  id: string;
  image: string;
  title: string;
  titleCa: string;
  titleEs: string;
  titleEn: string;
  alt: string;
  altCa: string;
  altEs: string;
  altEn: string;
  category: string;
  featured: boolean;
  visible: boolean;
  showOnHome: boolean;
  archived: boolean;
  sortOrder: number;
};

export function GalleryImageControls({ item }: { item: GalleryImageItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bulkAction, setBulkAction] = useState(item.archived ? "restore" : "archive");
  const [archiveState, archiveAction, isArchivePending] = useActionState(
    archiveGalleryImageStateAction,
    initialState,
  );
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteGalleryImageStateAction,
    initialState,
  );

  return (
    <div className="mt-4 grid gap-3">
      {isEditing ? (
        <div className="rounded-2xl bg-[#fff5e1] p-3">
          <AdminActionForm action={saveGalleryImageAction} submitLabel="Guardar">
            <input type="hidden" name="id" value={item.id} />
            <input name="image" className={inputClass} defaultValue={item.image} placeholder="Ruta de imagen" />
            <input name="titleCa" className={inputClass} defaultValue={item.titleCa} placeholder="Título CA" />
            <input name="titleEs" className={inputClass} defaultValue={item.titleEs} placeholder="Título ES" />
            <input name="titleEn" className={inputClass} defaultValue={item.titleEn} placeholder="Título EN" />
            <input name="altCa" className={inputClass} defaultValue={item.altCa} placeholder="Alt CA" required />
            <input name="altEs" className={inputClass} defaultValue={item.altEs} placeholder="Alt ES" />
            <input name="altEn" className={inputClass} defaultValue={item.altEn} placeholder="Alt EN" />
            <input name="category" className={inputClass} defaultValue={item.category} placeholder="Categoría" />
            <input name="sortOrder" type="number" className={inputClass} defaultValue={item.sortOrder} placeholder="Orden" />
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black">
                <input type="checkbox" name="isFeatured" defaultChecked={item.featured} className="h-4 w-4 accent-[#e5261f]" />
                Destacada
              </label>
              <label className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black">
                <input type="checkbox" name="isVisible" defaultChecked={item.visible} className="h-4 w-4 accent-[#e5261f]" />
                Visible
              </label>
              <label className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black">
                <input type="checkbox" name="showOnHome" defaultChecked={item.showOnHome} className="h-4 w-4 accent-[#e5261f]" />
                Inicio
              </label>
              <label className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black">
                <input type="checkbox" name="isArchived" defaultChecked={item.archived} className="h-4 w-4 accent-[#e5261f]" />
                Archivada
              </label>
            </div>
          </AdminActionForm>
        </div>
      ) : null}

      <div className="grid grid-cols-[1fr_1fr_2.4rem] gap-2">
        <button
          type="button"
          onClick={() => setIsEditing((current) => !current)}
          className={`${buttonClass} bg-[#102b56] hover:bg-[#2f6b35]`}
        >
          {isEditing ? "Cerrar" : "Editar"}
        </button>
        <form action={saveGalleryImageDirectAction}>
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="image" value={item.image} />
          <input type="hidden" name="titleCa" value={item.titleCa} />
          <input type="hidden" name="titleEs" value={item.titleEs} />
          <input type="hidden" name="titleEn" value={item.titleEn} />
          <input type="hidden" name="altCa" value={item.altCa} />
          <input type="hidden" name="altEs" value={item.altEs} />
          <input type="hidden" name="altEn" value={item.altEn} />
          <input type="hidden" name="category" value={item.category} />
          <input type="hidden" name="sortOrder" value={item.sortOrder} />
          <input type="hidden" name="isFeatured" value={item.featured ? "true" : "false"} />
          <input type="hidden" name="isVisible" value={item.visible ? "true" : "false"} />
          <input type="hidden" name="showOnHome" value={item.showOnHome ? "true" : "false"} />
          <input type="hidden" name="isArchived" value={item.archived ? "true" : "false"} />
          <button className={`${buttonClass} w-full bg-[#2f6b35] hover:bg-[#102b56]`}>
            Guardar
          </button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={item.id} />
          <button
            disabled={isDeletePending}
            aria-label="Eliminar imagen"
            className={`${buttonClass} w-full bg-[#e5261f] text-lg hover:bg-[#102b56] disabled:opacity-60`}
          >
            {isDeletePending ? "..." : "×"}
          </button>
        </form>
      </div>

      <form action={archiveAction} className="grid grid-cols-[1fr_auto] gap-2">
        <input type="hidden" name="id" value={item.id} />
        <input type="hidden" name="isArchived" value={bulkAction === "archive" ? "true" : "false"} />
        <select
          value={bulkAction}
          onChange={(event) => setBulkAction(event.target.value)}
          className="h-10 rounded-full border border-[#a96532]/20 bg-white px-3 text-xs font-black text-[#102b56]"
        >
          <option value="archive">Archivar</option>
          <option value="restore">Restaurar</option>
        </select>
        <button
          disabled={isArchivePending}
          className={`${buttonClass} bg-[#102b56] hover:bg-[#2f6b35] disabled:opacity-60`}
        >
          {isArchivePending ? "..." : "Aplicar"}
        </button>
      </form>
      {[archiveState, deleteState].map((state) =>
        state.status === "idle" ? null : (
          <p
            key={state.message}
            className={`rounded-2xl px-3 py-2 text-xs font-black ${
              state.status === "success"
                ? "bg-[#2f6b35]/10 text-[#2f6b35]"
                : "bg-[#e5261f]/10 text-[#e5261f]"
            }`}
          >
            {state.message}
          </p>
        ),
      )}
    </div>
  );
}
