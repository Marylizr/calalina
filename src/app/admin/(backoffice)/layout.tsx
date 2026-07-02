import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminSessionCookie, verifyAdminSession } from "@/lib/admin-auth";
import { logoutAction } from "../actions";

export default async function AdminBackofficeLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const session = await verifyAdminSession(cookieStore.get(adminSessionCookie)?.value);

  return (
    <AdminShell userEmail={session?.email} logoutAction={logoutAction}>
      {children}
    </AdminShell>
  );
}
