import { loginAction } from "../../actions";
import { PasswordInput } from "@/components/admin/PasswordInput";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const errorMessage =
    params.error === "invalid"
      ? "Email o contraseña incorrectos."
      : params.error === "missing-env"
        ? "Configura ADMIN_EMAIL, ADMIN_PASSWORD y ADMIN_SESSION_SECRET."
        : "";

  return (
    <main className="grid min-h-screen place-items-center bg-[#d8ad78] bg-[image:var(--wood-grain)] px-4 py-10 text-[#102b56]">
      <section className="w-full max-w-md rounded-[2rem] border border-white/80 bg-[#fff5e1]/90 p-6 shadow-[0_30px_90px_rgba(82,45,18,0.22)] backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2f6b35]">
            Calalina Administración
          </p>
          <h1 className="mt-3 font-serif text-4xl font-black">Entrar al admin</h1>
          <p className="mt-3 text-sm font-bold leading-6 text-[#4a4842]">
            Gestiona productos, pedidos, inventario, artículos y contenido de la web.
          </p>
        </div>

        {errorMessage ? (
          <p className="mb-5 rounded-2xl bg-[#e5261f]/10 px-4 py-3 text-sm font-black text-[#e5261f]">
            {errorMessage}
          </p>
        ) : null}

        <form action={loginAction} className="grid gap-4">
          <input type="hidden" name="next" value={params.next || "/admin"} />
          <label className="grid gap-2 text-sm font-black">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-2xl border border-[#a96532]/20 bg-white px-4 py-3 font-bold outline-none focus:border-[#e5261f] focus:ring-4 focus:ring-[#e5261f]/10"
            />
          </label>
          <PasswordInput />
          <button className="mt-2 rounded-full bg-[#e5261f] px-6 py-4 text-sm font-black text-white shadow-[0_16px_34px_rgba(229,38,31,0.22)] transition hover:bg-[#102b56]">
            Acceder
          </button>
        </form>
      </section>
    </main>
  );
}
