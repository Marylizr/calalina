import { ProductForm } from "@/components/admin/AdminForms";
import { AdminCard, AdminPageIntro } from "@/components/admin/AdminShell";

export default function NewProductPage() {
  return (
    <>
      <AdminPageIntro eyebrow="Nuevo producto" title="Crear producto.">
        Los campos ya contemplan multidioma, venta futura en carrito, stock flexible y SEO.
      </AdminPageIntro>
      <AdminCard>
        <ProductForm mode="create" />
      </AdminCard>
    </>
  );
}
