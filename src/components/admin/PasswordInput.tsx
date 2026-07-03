"use client";

import { useState } from "react";

export function PasswordInput() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label className="grid gap-2 text-sm font-black">
      Contraseña
      <span className="relative block">
        <input
          name="password"
          type={isVisible ? "text" : "password"}
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 pr-12 font-bold outline-none focus:border-[#e5261f] focus:ring-4 focus:ring-[#e5261f]/10"
        />
        <button
          type="button"
          aria-label={isVisible ? "Ocultar contraseña" : "Ver contraseña"}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((value) => !value)}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-[#102b56] transition hover:bg-[#fff5e1] focus:outline-none focus:ring-4 focus:ring-[#e5261f]/10"
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </span>
    </label>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M2.1 12s3.5-6 9.9-6 9.9 6 9.9 6-3.5 6-9.9 6-9.9-6-9.9-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" />
      <path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c6.4 0 9.9 7 9.9 7a17 17 0 0 1-2.3 3.1" />
      <path d="M6.6 6.7C3.7 8.6 2.1 12 2.1 12s3.5 7 9.9 7a10.7 10.7 0 0 0 4.2-.8" />
    </svg>
  );
}
