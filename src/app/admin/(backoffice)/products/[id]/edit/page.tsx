import { ProductForm } from "@/components/admin/AdminForms";
import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <>
      <AdminPageIntro eyebrow="Editar producto" title={`Producto ${id}.`}>
        Actualiza precio, stock, imágenes, flags comerciales y contenido multidioma.
      </AdminPageIntro>
      <AdminCard>
        <ProductForm mode="edit" id={id} />
      </AdminCard>
    </>
  );
}
