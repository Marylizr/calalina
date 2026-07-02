import Link from "next/link";
import { AdminCard, AdminPageIntro, AdminPrimaryLink, StatusPill } from "@/components/admin/AdminShell";
import { deleteBlogPostAction } from "@/app/admin/actions";
import { getAdminBlogPosts } from "@/lib/admin-data";

type AdminBlogPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminBlogPage({ searchParams }: AdminBlogPageProps) {
  const { status } = await searchParams;
  const adminPosts = await getAdminBlogPosts(status);

  return (
    <>
      <AdminPageIntro
        eyebrow="Contenido"
        title="Blog multidioma."
        action={<AdminPrimaryLink href="/admin/blog/new">Nuevo artículo</AdminPrimaryLink>}
      >
        Crea borradores, publica, vincula productos relacionados y revisa el estado de traducción.
      </AdminPageIntro>
      <AdminCard>
        <div className="grid gap-3">
          {adminPosts.map((post) => (
            <article key={post.id} className="grid gap-4 rounded-3xl bg-[#fff5e1] p-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div>
                <h2 className="font-serif text-2xl font-black">{post.title}</h2>
                <p className="text-sm font-bold text-[#4a4842]">{post.category} · {post.localeStatus} · {post.updatedAt}</p>
              </div>
              <StatusPill>{post.status}</StatusPill>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/blog/${post.id}/edit`} className="font-black text-[#e5261f]">Editar</Link>
                <form action={deleteBlogPostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button className="font-black text-[#e5261f]">Eliminar</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </AdminCard>
    </>
  );
}
