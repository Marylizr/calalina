"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import type { Locale } from "@/data/site";
import {
  isAllowedDeliveryPostalCode,
  normalizePostalCode,
} from "@/lib/fulfillment";
import { getPublicFulfillmentSettings } from "@/lib/fulfillment-settings";
import {
  buildOrderWhatsAppMessage,
  buildWhatsAppUrl,
  normalizeWhatsAppNumber,
} from "@/lib/whatsapp";

export type CreateOrderState = {
  status: "idle" | "success" | "error";
  message: string;
  orderId?: string;
  orderShortId?: string;
  total?: number;
  fulfillmentMethod?: "pickup" | "delivery";
  fulfillmentLabel?: string;
  whatsappConfigured?: boolean;
  whatsappUrl?: string;
};

const submittedItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.coerce.number().positive().max(99),
});

const createOrderSchema = z
  .object({
    locale: z.enum(["ca", "es", "en"]).default("ca"),
    company: z.string().trim().max(0).optional(),
    fulfillmentMethod: z.enum(["pickup", "delivery"]).default("pickup"),
    customerName: z.string().trim().min(2).max(120),
    customerPhone: z.string().trim().min(6).max(40),
    customerEmail: z.string().trim().email().optional().or(z.literal("")),
    pickupDate: z.string().trim().optional(),
    deliveryAddress: z.string().trim().max(240).optional(),
    deliveryAddressExtra: z.string().trim().max(160).optional(),
    deliveryPostalCode: z.string().trim().max(12).optional(),
    deliveryInstructions: z.string().trim().max(500).optional(),
    notes: z.string().trim().max(800).optional(),
    items: z.string().min(2),
  })
  .superRefine((data, ctx) => {
    if (data.fulfillmentMethod !== "delivery") return;

    if (!data.deliveryAddress || data.deliveryAddress.length < 5) {
      ctx.addIssue({
        code: "custom",
        path: ["deliveryAddress"],
        message: "delivery_address_required",
      });
    }

    if (!data.deliveryPostalCode) {
      ctx.addIssue({
        code: "custom",
        path: ["deliveryPostalCode"],
        message: "delivery_postal_code_required",
      });
    }
  });

const orderRateLimit = new Map<string, { count: number; resetAt: number }>();
const orderRateLimitWindowMs = 10 * 60 * 1000;
const orderRateLimitMax = 8;

const copy: Record<
  Locale,
  {
    databaseMissing: string;
    rateLimited: string;
    missingContact: string;
    invalidOrder: string;
    emptyCart: string;
    invalidCart: string;
    order: string;
    customer: string;
    pickup: string;
    delivery: string;
    deliveryAddress: string;
    estimatedTotal: string;
    note: string;
    deliveryUnavailable: string;
    received: string;
    unavailable: (name: string) => string;
    productNotFound: string;
    createError: string;
  }
> = {
  ca: {
    databaseMissing: "La base de dades no esta configurada.",
    rateLimited: "Massa intents seguits. Torna-ho a provar d'aqui uns minuts.",
    missingContact: "Indica el teu nom i telefon.",
    invalidOrder: "Comanda invalida.",
    emptyCart: "El carret esta buit.",
    invalidCart: "El carret no es valid.",
    order: "Comanda",
    customer: "Client",
    pickup: "Recollida a botiga",
    delivery: "Delivery al barri",
    deliveryAddress: "Adreca",
    estimatedTotal: "Total estimat",
    note: "El total es estimat. Confirmarem disponibilitat i import final abans de preparar la comanda.",
    deliveryUnavailable: "",
    received: "Hem rebut la teva comanda",
    unavailable: (name) => `${name} no esta disponible ara mateix.`,
    productNotFound: "Un producte del carret ja no esta disponible.",
    createError: "No hem pogut crear la comanda. Torna-ho a provar.",
  },
  es: {
    databaseMissing: "La base de datos no esta configurada.",
    rateLimited: "Demasiados intentos seguidos. Vuelve a intentarlo en unos minutos.",
    missingContact: "Indica tu nombre y telefono.",
    invalidOrder: "Pedido invalido.",
    emptyCart: "El carrito esta vacio.",
    invalidCart: "El carrito no es valido.",
    order: "Pedido",
    customer: "Cliente",
    pickup: "Recogida en tienda",
    delivery: "Delivery en el barrio",
    deliveryAddress: "Direccion",
    estimatedTotal: "Total estimado",
    note: "El total es estimado. Confirmaremos disponibilidad e importe final antes de preparar el pedido.",
    deliveryUnavailable: "",
    received: "Hemos recibido tu pedido",
    unavailable: (name) => `${name} no esta disponible ahora mismo.`,
    productNotFound: "Un producto del carrito ya no esta disponible.",
    createError: "No hemos podido crear el pedido. Vuelve a intentarlo.",
  },
  en: {
    databaseMissing: "The database is not configured.",
    rateLimited: "Too many attempts. Please try again in a few minutes.",
    missingContact: "Enter your name and phone number.",
    invalidOrder: "Invalid order.",
    emptyCart: "The cart is empty.",
    invalidCart: "The cart is not valid.",
    order: "Order",
    customer: "Customer",
    pickup: "In-store pickup",
    delivery: "Local delivery",
    deliveryAddress: "Address",
    estimatedTotal: "Estimated total",
    note: "The total is estimated. We will confirm availability and final amount before preparing your order.",
    deliveryUnavailable: "",
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

function getLocaleFromFormData(formData: FormData) {
  const requestedLocale = formData.get("locale");
  return requestedLocale === "es" || requestedLocale === "en" ? requestedLocale : "ca";
}

function readOrderFormData(formData: FormData) {
  return {
    locale: getLocaleFromFormData(formData),
    company: String(formData.get("company") || ""),
    fulfillmentMethod: String(formData.get("fulfillmentMethod") || "pickup"),
    customerName: String(formData.get("customerName") || ""),
    customerPhone: String(formData.get("customerPhone") || ""),
    customerEmail: String(formData.get("customerEmail") || ""),
    pickupDate: String(formData.get("pickupDate") || ""),
    deliveryAddress: String(formData.get("deliveryAddress") || ""),
    deliveryAddressExtra: String(formData.get("deliveryAddressExtra") || ""),
    deliveryPostalCode: String(formData.get("deliveryPostalCode") || ""),
    deliveryInstructions: String(formData.get("deliveryInstructions") || ""),
    notes: String(formData.get("notes") || ""),
    items: String(formData.get("items") || ""),
  };
}

function clientIpFromHeaders(headerStore: Headers) {
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = orderRateLimit.get(ip);

  if (!existing || existing.resetAt < now) {
    orderRateLimit.set(ip, { count: 1, resetAt: now + orderRateLimitWindowMs });
    return false;
  }

  existing.count += 1;
  return existing.count > orderRateLimitMax;
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
  const fulfillmentSettings = await getPublicFulfillmentSettings(locale);
  const headerStore = await headers();
  const clientIp = clientIpFromHeaders(headerStore);

  if (isRateLimited(clientIp)) {
    logOrderDebug("validation_failed", { reason: "rate_limited" });
    return { status: "error", message: text.rateLimited };
  }

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
          : issuePath === "deliveryAddress" || issuePath === "deliveryPostalCode"
            ? "invalid_order"
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
    const isDelivery = parsed.data.fulfillmentMethod === "delivery";
    const normalizedPostalCode = normalizePostalCode(parsed.data.deliveryPostalCode || "");

    if (!isDelivery && !fulfillmentSettings.pickupEnabled) {
      logOrderDebug("validation_failed", { reason: "pickup_disabled" });
      return { status: "error", message: text.invalidOrder };
    }

    if (isDelivery && !fulfillmentSettings.deliveryEnabled) {
      logOrderDebug("validation_failed", { reason: "delivery_disabled" });
      return { status: "error", message: fulfillmentSettings.deliveryMessage };
    }

    if (
      isDelivery &&
      !isAllowedDeliveryPostalCode(normalizedPostalCode, fulfillmentSettings.deliveryPostalCodes)
    ) {
      logOrderDebug("validation_failed", { reason: "delivery_postal_code_not_allowed" });
      return { status: "error", message: fulfillmentSettings.deliveryMessage };
    }

    if (
      isDelivery &&
      fulfillmentSettings.deliveryMinimumOrder !== null &&
      subtotal < fulfillmentSettings.deliveryMinimumOrder
    ) {
      logOrderDebug("validation_failed", { reason: "delivery_minimum_not_met" });
      return { status: "error", message: fulfillmentSettings.deliveryMessage };
    }

    const orderDeliveryFee = isDelivery ? fulfillmentSettings.deliveryFee : 0;
    const total = subtotal + orderDeliveryFee;
    const pickupDate = parsed.data.pickupDate ? new Date(parsed.data.pickupDate) : null;

    const order = await prisma.$transaction(async (tx) =>
      tx.order.create({
        data: {
          customerName: parsed.data.customerName,
          customerPhone: parsed.data.customerPhone,
          customerEmail: parsed.data.customerEmail || null,
          fulfillmentMethod: isDelivery ? "deliveryRequest" : "pickup",
          status: "new",
          pickupDate: isDelivery ? null : pickupDate,
          ...(isDelivery
            ? {
                deliveryAddress: parsed.data.deliveryAddress,
                deliveryAddressExtra: parsed.data.deliveryAddressExtra || null,
                deliveryPostalCode: normalizedPostalCode,
                deliveryInstructions: parsed.data.deliveryInstructions || null,
                deliveryFee: orderDeliveryFee,
              }
            : {}),
          notes: parsed.data.notes || null,
          subtotal,
          total,
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
    const targetWhatsapp =
      normalizeWhatsAppNumber(settings?.whatsapp) ||
      normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER);
    const whatsappMessage = buildOrderWhatsAppMessage(
      {
        id: order.id,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        fulfillmentMethod: isDelivery ? "delivery" : "pickup",
        pickupDate,
        deliveryAddress: isDelivery ? parsed.data.deliveryAddress : null,
        deliveryPostalCode: isDelivery ? normalizedPostalCode : null,
        items: items.map((item) => ({
          name: localizedName(locale, item.product),
          quantity: item.quantity,
          unit: item.product.unit,
          lineTotal: item.lineTotal,
        })),
        subtotal,
        deliveryFee: orderDeliveryFee,
        total,
        notes: parsed.data.notes || null,
      },
      locale,
    );
    const whatsappUrl = targetWhatsapp
      ? buildWhatsAppUrl(targetWhatsapp, whatsappMessage)
      : undefined;

    revalidatePath("/admin/orders");
    logOrderDebug("order_created", { orderId: order.id, itemCount: items.length });

    return {
      status: "success",
      message: text.received,
      orderId: order.id,
      orderShortId: order.id.slice(-6).toUpperCase(),
      total,
      fulfillmentMethod: isDelivery ? "delivery" : "pickup",
      fulfillmentLabel: isDelivery ? text.delivery : text.pickup,
      whatsappConfigured: Boolean(whatsappUrl),
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
