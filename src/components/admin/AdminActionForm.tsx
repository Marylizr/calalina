"use client";

import { useActionState, type ReactNode } from "react";
import type { AdminActionState } from "@/app/admin/actions";

const initialState: AdminActionState = {
  status: "idle",
  message: "",
};

type AdminActionFormProps = {
  action: (state: AdminActionState, formData: FormData) => Promise<AdminActionState>;
  children: ReactNode;
  submitLabel: string;
  pendingLabel?: string;
  className?: string;
};

export function AdminActionForm({
  action,
  children,
  submitLabel,
  pendingLabel = "Guardando...",
  className = "grid gap-4",
}: AdminActionFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={className}>
      {children}
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
      <button
        disabled={isPending}
        className="rounded-full bg-[#e5261f] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#102b56] disabled:cursor-not-allowed disabled:opacity-65"
      >
        {isPending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
