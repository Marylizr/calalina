"use client";

import { useActionState } from "react";
import { uploadAdminImageAction, type UploadImageState } from "@/app/admin/actions";

const initialState: UploadImageState = {
  status: "idle",
  message: "",
};

type ImageUploadFieldProps = {
  label: string;
  name?: string;
  helper?: string;
};

export function ImageUploadField({ label, name = "imageUrl", helper }: ImageUploadFieldProps) {
  const [state, formAction, isPending] = useActionState(uploadAdminImageAction, initialState);

  return (
    <div className="grid gap-3 rounded-3xl border border-[#a96532]/15 bg-[#fff5e1] p-4">
      <div>
        <p className="text-sm font-black text-[#102b56]">{label}</p>
        {helper ? <p className="mt-1 text-sm font-bold leading-6 text-[#4a4842]">{helper}</p> : null}
      </div>
      <form action={formAction} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56] file:mr-4 file:rounded-full file:border-0 file:bg-[#102b56] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-[#e5261f] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#102b56] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Subiendo..." : "Subir imagen"}
        </button>
      </form>
      {state.message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm font-black ${
            state.status === "success"
              ? "bg-[#2f6b35]/10 text-[#2f6b35]"
              : "bg-[#e5261f]/10 text-[#e5261f]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
      {state.url ? (
        <label className="grid gap-2 text-sm font-black text-[#102b56]">
          Ruta generada
          <input
            name={name}
            readOnly
            value={state.url}
            className="w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56]"
          />
        </label>
      ) : null}
    </div>
  );
}
