"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import type { Locale } from "@/data/site";
import { unitLabel } from "@/lib/cart";

export type CreateOrderState = {
  status: "idle" | "success" | "error";
  message: string;
  orderId?: string;
  total?: number;
  whatsappUrl?: string;
};

const submittedItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.coerce.number().positive().max(99),
});

const createOrderSchema = z.object({
  locale: z.enum(["ca", "es", "en"]).default("ca"),
  customerName: z.string().trim().min(2).max(120),
  customerPhone: z.string().trim().min(6).max(40),
  customerEmail: z.string().trim().email().optional().or(z.literal("")),
  pickupDate: z.string().trim().optional(),
  notes: z.string().trim().max(800).optional(),
  items: z.string().min(2),
});

const copy: Record<
  Locale,
  {
    databaseMissing: string;
    missingContact: string;
    invalidOrder: string;
    emptyCart: string;
    invalidCart: string;
    order: string;
    customer: string;
    pickup: string;
    estimatedTotal: string;
    note: string;
    received: string;
    unavailable: (name: string) => string;
    productNotFound: string;
    createError: string;
  }
> = {
  ca: {
    databaseMissing: "La base de dades no esta configurada.",
    missingContact: "Indica el teu nom i telefon.",
    invalidOrder: "Comanda invalida.",
    emptyCart: "El carret esta buit.",
    invalidCart: "El carret no es valid.",
    order: "Comanda",
    customer: "Client",
    pickup: "Recollida a botiga",
    estimatedTotal: "Total estimat",
    note: "El total es estimat. Confirmarem disponibilitat i import final abans de preparar la comanda.",
    received: "Hem rebut la teva comanda",
    unavailable: (name) => `${name} no esta disponible ara mateix.`,
    productNotFound: "Un producte del carret ja no esta disponible.",
    createError: "No hem pogut crear la comanda. Torna-ho a provar.",
  },
  es: {
    databaseMissing: "La base de datos no esta configurada.",
    missingContact: "Indica tu nombre y telefono.",
    invalidOrder: "Pedido invalido.",
    emptyCart: "El carrito esta vacio.",
    invalidCart: "El carrito no es valido.",
    order: "Pedido",
    customer: "Cliente",
    pickup: "Recogida en tienda",
    estimatedTotal: "Total estimado",
    note: "El total es estimado. Confirmaremos disponibilidad e importe final antes de preparar el pedido.",
    received: "Hemos recibido tu pedido",
    unavailable: (name) => `${name} no esta disponible ahora mismo.`,
    productNotFound: "Un producto del carrito ya no esta disponible.",
    createError: "No hemos podido crear el pedido. Vuelve a intentarlo.",
  },
  en: {
    databaseMissing: "The database is not configured.",
    missingContact: "Enter your name and phone number.",
    invalidOrder: "Invalid order.",
    emptyCart: "The cart is empty.",
    invalidCart: "The cart is not valid.",
    order: "Order",
    customer: "Customer",
    pickup: "In-store pickup",
    estimatedTotal: "Estimated total",
    note: "The total is estimated. We will confirm availability and final amount before preparing your order.",
    received: "We have received your order",
    unavailable: (name) => `${name} is not available right now.`,
    productNotFound: "A product in your cart is no longer available.",
    createError: "We could not create the order. Please try again.",
  },
};

function localizedName(locale: Locale, product: { nameCa: string; nameEs: string; nameEn: string }) {
  if (locale === "es") return product.nameEs || product.nameCa;
  if (locale === "en") return product.nameEn || product.nameCa;
  return product.nameCa;
}

function money(value: number, locale: Locale) {
  const numberLocale: Record<Locale, string> = {
    ca: "ca-ES",
    es: "es-ES",
    en: "en-US",
  };

  return new Intl.NumberFormat(numberLocale[locale], { style: "currency", currency: "EUR" }).format(value);
}

function whatsappNumber(value?: string | null) {
  const digits = (value || "").replace(/\D/g, "");
  return digits.length >= 8 ? digits : "";
}

function getLocaleFromFormData(formData: FormData) {
  const requestedLocale = formData.get("locale");
  return requestedLocale === "es" || requestedLocale === "en" ? requestedLocale : "ca";
}

function readOrderFormData(formData: FormData) {
  return {
    locale: getLocaleFromFormData(formData),
    customerName: String(formData.get("customerName") || ""),
    customerPhone: String(formData.get("customerPhone") || ""),
    customerEmail: String(formData.get("customerEmail") || ""),
    pickupDate: String(formData.get("pickupDate") || ""),
    notes: String(formData.get("notes") || ""),
    items: String(formData.get("items") || ""),
  };
}

function logOrderDebug(event: string, details: Record<string, unknown>) {
  console.info(`[checkout] ${event}`, details);
}

export async function createOrderAction(
  _state: CreateOrderState,
  formData: FormData,
): Promise<CreateOrderState> {
  if (!formData || typeof formData.get !== "function") {
    logOrderDebug("validation_failed", { reason: "missing_form_data" });
    return { status: "error", message: copy.ca.invalidOrder };
  }

  const locale: Locale = getLocaleFromFormData(formData);
  const text = copy[locale];

  if (!hasDatabaseUrl()) {
    logOrderDebug("validation_failed", { reason: "database_missing" });
    return { status: "error", message: text.databaseMissing };
  }

  const parsed = createOrderSchema.safeParse(readOrderFormData(formData));
  if (!parsed.success) {
    const issuePath = parsed.error.issues[0]?.path[0];
    const reason =
      issuePath === "customerName" || issuePath === "customerPhone"
        ? "missing_contact"
        : issuePath === "items"
          ? "empty_cart"
          : "invalid_order";
    logOrderDebug("validation_failed", { reason });
    const message =
      reason === "missing_contact"
        ? text.missingContact
        : reason === "empty_cart"
          ? text.emptyCart
          : text.invalidOrder;
    return { status: "error", message };
  }

  let submittedItems: z.infer<typeof submittedItemSchema>[];
  try {
    submittedItems = z
      .array(submittedItemSchema)
      .min(1, text.emptyCart)
      .parse(JSON.parse(parsed.data.items));
  } catch {
    logOrderDebug("validation_failed", { reason: "invalid_items_json" });
    return { status: "error", message: text.invalidCart };
  }

  const mergedItems = Array.from(
    submittedItems.reduce((map, item) => {
      map.set(item.productId, {
        productId: item.productId,
        quantity: (map.get(item.productId)?.quantity || 0) + item.quantity,
      });
      return map;
    }, new Map<string, { productId: string; quantity: number }>()),
  ).map(([, item]) => item);

  logOrderDebug("submitted_items", { count: mergedItems.length });

  try {
    const products = await prisma.product.findMany({
      where: { id: { in: mergedItems.map((item) => item.productId) } },
    });
    const productsById = new Map(products.map((product) => [product.id, product]));

    const items = mergedItems.map((item) => {
      const product = productsById.get(item.productId);
      if (!product) throw new Error("PRODUCT_NOT_FOUND");
      if (!product.isActive || !product.availableOnline || product.stockStatus === "outOfStock") {
        throw new Error(`PRODUCT_UNAVAILABLE:${localizedName(locale, product)}`);
      }

      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * item.quantity;

      return {
        product,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      };
    });

    const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
    const pickupDate = parsed.data.pickupDate ? new Date(parsed.data.pickupDate) : null;

    const order = await prisma.$transaction(async (tx) =>
      tx.order.create({
        data: {
          customerName: parsed.data.customerName,
          customerPhone: parsed.data.customerPhone,
          customerEmail: parsed.data.customerEmail || null,
          fulfillmentMethod: "pickup",
          status: "new",
          pickupDate,
          notes: parsed.data.notes || null,
          subtotal,
          total: subtotal,
          items: {
            create: items.map((item) => ({
              productId: item.product.id,
              productNameSnapshot: localizedName(locale, item.product),
              unitPriceSnapshot: item.unitPrice,
              quantity: item.quantity,
              unit: item.product.unit,
              lineTotal: item.lineTotal,
            })),
          },
        },
        include: { items: true },
      }),
    );

    const settings = await prisma.storeSettings.findFirst({ orderBy: { updatedAt: "desc" } });
    const targetWhatsapp = whatsappNumber(settings?.whatsapp);
    const lines = [
      `${text.order} ${order.id}`,
      `${text.customer}: ${order.customerName}`,
      text.pickup,
      ...items.map(
        (item) =>
          `- ${localizedName(locale, item.product)} x ${item.quantity} ${unitLabel(item.product.unit, locale)} = ${money(item.lineTotal, locale)}`,
      ),
      `${text.estimatedTotal}: ${money(subtotal, locale)}`,
      text.note,
    ];
    const whatsappUrl = targetWhatsapp
      ? `https://wa.me/${targetWhatsapp}?text=${encodeURIComponent(lines.join("\n"))}`
      : undefined;

    revalidatePath("/admin/orders");
    logOrderDebug("order_created", { orderId: order.id, itemCount: items.length });

    return {
      status: "success",
      message: text.received,
      orderId: order.id,
      total: subtotal,
      whatsappUrl,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.startsWith("PRODUCT_UNAVAILABLE:")) {
      logOrderDebug("validation_failed", { reason: "product_unavailable" });
      return { status: "error", message: text.unavailable(message.split(":")[1]) };
    }
    if (message === "PRODUCT_NOT_FOUND") {
      logOrderDebug("validation_failed", { reason: "product_not_found" });
      return { status: "error", message: text.productNotFound };
    }
    logOrderDebug("database_error", { reason: "order_create_failed" });
    return { status: "error", message: text.createError };
  }
}
