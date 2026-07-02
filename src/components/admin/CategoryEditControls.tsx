"use client";

import { useActionState, useId } from "react";
import { deleteCategoryAction, saveCategoryAction, type AdminActionState } from "@/app/admin/actions";

const initialState: AdminActionState = {
  status: "idle",
  message: "",
};

const inputClass =
  "w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 text-sm font-bold text-[#102b56]";

const buttonClass =
  "grid h-11 w-full place-items-center rounded-full px-4 text-sm font-black text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-65";

type CategoryEditControlsProps = {
  id: string;
  name: string;
};

export function CategoryEditControls({ id, name }: CategoryEditControlsProps) {
  const formId = useId();
  const [state, formAction, isPending] = useActionState(saveCategoryAction, initialState);

  return (
    <div className="mt-4 grid gap-3">
      <form id={formId} action={formAction} className="grid gap-3">
        <input type="hidden" name="id" value={id} />
        <input name="nameEs" className={inputClass} defaultValue={name} />
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
      </form>

      <div className="grid grid-cols-2 gap-3">
        <button
          form={formId}
          disabled={isPending}
          className={`${buttonClass} bg-[#102b56] hover:bg-[#2f6b35]`}
        >
          {isPending ? "Guardando..." : "Guardar"}
        </button>
        <form action={deleteCategoryAction}>
          <input type="hidden" name="id" value={id} />
          <button className={`${buttonClass} bg-[#e5261f] hover:bg-[#102b56]`}>
            Eliminar
          </button>
        </form>
      </div>
    </div>
  );
}
