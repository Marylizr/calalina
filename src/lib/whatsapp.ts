import type { ProductUnit } from "@prisma/client";
import type { Locale } from "@/data/site";
import { formatMoney, unitLabel } from "@/lib/cart";

export type WhatsAppOrderItem = {
  name: string;
  quantity: number;
  unit: ProductUnit;
  lineTotal: number;
};

export type WhatsAppOrderSummary = {
  id: string;
  customerName: string;
  customerPhone: string;
  fulfillmentMethod: "pickup" | "delivery";
  pickupDate?: Date | string | null;
  deliveryAddress?: string | null;
  deliveryPostalCode?: string | null;
  items: WhatsAppOrderItem[];
  subtotal: number;
  deliveryFee?: number | null;
  total: number;
  notes?: string | null;
};

const labels: Record<
  Locale,
  {
    order: string;
    customer: string;
    phone: string;
    pickup: string;
    delivery: string;
    pickupDate: string;
    address: string;
    postalCode: string;
    subtotal: string;
    deliveryFee: string;
    total: string;
    notes: string;
    note: string;
  }
> = {
  ca: {
    order: "Comanda",
    customer: "Client",
    phone: "Telefon",
    pickup: "Recollida a botiga",
    delivery: "Delivery al barri",
    pickupDate: "Dia/hora recollida",
    address: "Adreca",
    postalCode: "Codi postal",
    subtotal: "Subtotal",
    deliveryFee: "Delivery",
    total: "Total estimat",
    notes: "Notes client",
    note: "El total es estimat. Confirmarem disponibilitat i import final abans de preparar la comanda.",
  },
  es: {
    order: "Pedido",
    customer: "Cliente",
    phone: "Telefono",
    pickup: "Recogida en tienda",
    delivery: "Delivery en el barrio",
    pickupDate: "Dia/hora recogida",
    address: "Direccion",
    postalCode: "Codigo postal",
    subtotal: "Subtotal",
    deliveryFee: "Delivery",
    total: "Total estimado",
    notes: "Notas cliente",
    note: "El total es estimado. Confirmaremos disponibilidad e importe final antes de preparar el pedido.",
  },
  en: {
    order: "Order",
    customer: "Customer",
    phone: "Phone",
    pickup: "Store pickup",
    delivery: "Local delivery",
    pickupDate: "Pickup date/time",
    address: "Address",
    postalCode: "Postal code",
    subtotal: "Subtotal",
    deliveryFee: "Delivery",
    total: "Estimated total",
    notes: "Customer notes",
    note: "The total is estimated. We will confirm availability and final amount before preparing your order.",
  },
};

export function normalizeWhatsAppNumber(number?: string | null) {
  return (number || "").replace(/\D/g, "");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const normalized = normalizeWhatsAppNumber(phoneNumber);
  if (!normalized) return "";
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppMessage(order: WhatsAppOrderSummary, locale: Locale = "ca") {
  const text = labels[locale];
  const lines = [
    `${text.order} ${order.id}`,
    `${text.customer}: ${order.customerName}`,
    `${text.phone}: ${order.customerPhone}`,
    order.fulfillmentMethod === "delivery" ? text.delivery : text.pickup,
  ];

  if (order.fulfillmentMethod === "pickup" && order.pickupDate) {
    lines.push(`${text.pickupDate}: ${formatDate(order.pickupDate, locale)}`);
  }

  if (order.fulfillmentMethod === "delivery") {
    if (order.deliveryAddress) lines.push(`${text.address}: ${order.deliveryAddress}`);
    if (order.deliveryPostalCode) lines.push(`${text.postalCode}: ${order.deliveryPostalCode}`);
  }

  lines.push(
    "",
    ...order.items.map(
      (item) =>
        `- ${item.name} x ${item.quantity} ${unitLabel(item.unit, locale)} = ${formatMoney(item.lineTotal, locale)}`,
    ),
    "",
    `${text.subtotal}: ${formatMoney(order.subtotal, locale)}`,
  );

  if (order.deliveryFee && order.deliveryFee > 0) {
    lines.push(`${text.deliveryFee}: ${formatMoney(order.deliveryFee, locale)}`);
  }

  lines.push(`${text.total}: ${formatMoney(order.total, locale)}`);

  if (order.notes) {
    lines.push("", `${text.notes}: ${order.notes}`);
  }

  lines.push("", text.note);

  return lines.join("\n");
}

function formatDate(value: Date | string, locale: Locale) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const dateLocale: Record<Locale, string> = {
    ca: "ca-ES",
    es: "es-ES",
    en: "en-US",
  };

  return date.toLocaleString(dateLocale[locale], {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
