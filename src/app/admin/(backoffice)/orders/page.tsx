import { AdminCard, AdminPageIntro, StatusPill } from "@/components/admin/AdminShell";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { updateOrderStatusAction } from "@/app/admin/actions";
import { getAdminOrders } from "@/lib/admin-data";

type AdminOrdersPageProps = {
  searchParams: Promise<{ status?: string; date?: string }>;
};

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const { status, date } = await searchParams;
  const filteredOrders = await getAdminOrders({ status, date });
  const activeFilter =
    status === "pending" ? "Mostrando pedidos pendientes" : date === "today" ? "Mostrando pedidos de hoy" : "";

  return (
    <>
      <AdminPageIntro eyebrow="Pedidos" title="Seguimiento de pedidos.">
        Cambia estados, filtra por cliente y prepara mensajes de WhatsApp para confirmar recogidas o entregas.
      </AdminPageIntro>
      <AdminCard>
        {activeFilter ? (
          <p className="mb-4 rounded-2xl bg-[#fff5e1] px-4 py-3 text-sm font-black text-[#102b56]">
            {activeFilter}
          </p>
        ) : null}
        <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_14rem_14rem]">
          <input className="rounded-2xl border border-[#a96532]/20 px-4 py-3 text-sm font-bold" placeholder="Cliente o teléfono" />
          <select className="rounded-2xl border border-[#a96532]/20 px-4 py-3 text-sm font-bold" defaultValue={status || "all"}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="new">Nuevo</option>
            <option value="confirmed">Confirmado</option>
            <option value="preparing">Preparando</option>
            <option value="ready">Listo</option>
          </select>
          <button className="rounded-2xl bg-[#102b56] px-4 py-3 text-sm font-black text-white">Exportar</button>
        </div>
        <div className="grid gap-3">
          {filteredOrders.map((order) => (
            <article key={order.id} className="grid gap-4 rounded-3xl bg-[#fff5e1] p-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div>
                <h2 className="font-serif text-2xl font-black">{order.id} · {order.customer}</h2>
                <p className="text-sm font-bold text-[#4a4842]">{order.phone} · {order.fulfillment} · {order.createdAt}</p>
                <div className="mt-3 grid gap-1 text-sm font-bold text-[#4a4842]">
                  {order.pickupDate ? <p>Recogida: {order.pickupDate}</p> : null}
                  {order.deliveryAddress ? (
                    <p>
                      Delivery: {order.deliveryAddress}
                      {order.deliveryPostalCode ? ` · ${order.deliveryPostalCode}` : ""}
                    </p>
                  ) : null}
                  {order.deliveryInstructions ? <p>Instrucciones: {order.deliveryInstructions}</p> : null}
                  {order.items?.map((item) => (
                    <p key={item.id}>
                      {item.name} · {item.quantity} {item.unit} · {item.lineTotal}
                    </p>
                  ))}
                  {order.deliveryFee ? <p>Delivery: {order.deliveryFee}</p> : null}
                  <p className="font-black text-[#102b56]">Total estimado: {order.total}</p>
                  {order.notes ? <p>Nota cliente: {order.notes}</p> : null}
                  {order.internalNote ? <p>Nota interna: {order.internalNote}</p> : null}
                </div>
              </div>
              <StatusPill>{order.status}</StatusPill>
              <div className="grid gap-2">
                <AdminActionForm action={updateOrderStatusAction} submitLabel="Actualizar estado">
                  <input type="hidden" name="id" value={order.id} />
                  <select name="status" className="rounded-2xl border border-[#a96532]/20 bg-white px-4 py-2 text-sm font-bold">
                    <option value="new">Nuevo</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="preparing">Preparando</option>
                    <option value="readyForPickup">Listo</option>
                    <option value="delivered">Entregado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  <input name="internalNote" className="rounded-2xl border border-[#a96532]/20 bg-white px-4 py-2 text-sm font-bold" placeholder="Nota interna" />
                </AdminActionForm>
                {order.shopWhatsappUrl ? (
                  <a
                    className="rounded-full bg-[#2f6b35] px-4 py-2 text-center text-sm font-black text-white"
                    href={order.shopWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enviar WhatsApp a la botiga
                  </a>
                ) : null}
                {order.customerWhatsappUrl ? (
                  <a
                    className="rounded-full bg-[#102b56] px-4 py-2 text-center text-sm font-black text-white"
                    href={order.customerWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contactar client
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        {filteredOrders.length === 0 ? (
          <p className="mt-5 rounded-2xl bg-[#fff5e1] px-4 py-3 text-sm font-black text-[#4a4842]">
            No hay pedidos para este filtro.
          </p>
        ) : null}
      </AdminCard>
    </>
  );
}
