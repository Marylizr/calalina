import { BlogForm } from "@/components/admin/AdminForms";
import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { getAdminBlogPostForEdit } from "@/lib/admin-data";

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;
  const post = await getAdminBlogPostForEdit(id);
  const formPost = post
    ? {
        ...post,
        publishedAt: post.publishedAt?.toISOString() || null,
      }
    : null;

  return (
    <>
      <AdminPageIntro eyebrow="Editar artículo" title={post?.titleEs || id.replaceAll("-", " ")}>
        Ajusta contenido, portada, SEO, productos relacionados y estado de publicación.
      </AdminPageIntro>
      <AdminCard className="mb-6">
        <ImageUploadField
          label="Subir portada del artículo"
          name="coverImage"
          helper="Sube la imagen desde tu ordenador y usa la ruta generada en el campo Ruta de portada."
        />
      </AdminCard>
      <AdminCard>
        <BlogForm mode="edit" post={formPost} />
      </AdminCard>
    </>
  );
}
