import { BlogForm } from "@/components/admin/AdminForms";
import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function NewBlogPostPage() {
  return (
    <>
      <AdminPageIntro eyebrow="Nuevo artículo" title="Crear post del blog.">
        Guarda como borrador o publica cuando estén listas las versiones CA, ES y EN.
      </AdminPageIntro>
      <AdminCard className="mb-6">
        <ImageUploadField
          label="Subir portada del artículo"
          name="coverImage"
          helper="Sube la imagen desde tu ordenador y usa la ruta generada en el campo Ruta de portada."
        />
      </AdminCard>
      <AdminCard>
        <BlogForm mode="create" />
      </AdminCard>
    </>
  );
}
