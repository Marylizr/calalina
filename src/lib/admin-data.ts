import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import {
  adminBanners,
  adminCategories,
  adminGallery,
  adminOrders,
  adminPosts,
  adminProducts,
  adminSeasonalHighlights,
  adminSettings,
} from "@/data/admin";
import {
  buildOrderWhatsAppMessage,
  buildWhatsAppUrl,
  normalizeWhatsAppNumber,
} from "@/lib/whatsapp";

function money(value: { toString(): string } | number | string) {
  return Number(value.toString()).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function productStockStatus(status: string) {
  if (status === "lowStock") return "Bajo stock" as const;
  if (status === "outOfStock") return "Agotado" as const;
  return "Disponible" as const;
}

function orderStatus(status: string) {
  const labels = {
    new: "Nuevo",
    confirmed: "Confirmado",
    preparing: "Preparando",
    readyForPickup: "Listo",
    delivered: "Entregado",
    cancelled: "Cancelado",
  } as const;

  return labels[status as keyof typeof labels] ?? "Nuevo";
}

export async function getAdminProducts(stock?: string) {
  if (!hasDatabaseUrl()) return adminProducts;

  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      where:
        stock === "low"
          ? { stockStatus: "lowStock" }
          : stock === "out"
            ? { stockStatus: "outOfStock" }
            : undefined,
      orderBy: { updatedAt: "desc" },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.nameEs,
      category: product.category?.nameEs ?? "Sin categoría",
      price: money(product.price),
      unit: product.unit === "unit" ? "unidad" : product.unit,
      stock:
        product.stockMode === "exact" && product.stockQuantity
          ? money(product.stockQuantity)
          : productStockStatus(product.stockStatus),
      status: productStockStatus(product.stockStatus),
      featured: product.isFeatured,
      seasonal: product.isSeasonal,
      latin: product.isLatin,
    }));
  } catch {
    return adminProducts;
  }
}

export async function getAdminCategories() {
  if (!hasDatabaseUrl()) return adminCategories.map((name) => ({ id: name, name }));

  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameEs: "asc" }],
    });

    return categories.map((category) => ({ id: category.id, name: category.nameEs }));
  } catch {
    return adminCategories.map((name) => ({ id: name, name }));
  }
}

export async function getAdminOrders(filter?: { status?: string; date?: string }) {
  if (!hasDatabaseUrl()) {
    const orders = filter?.status === "pending"
      ? adminOrders.filter((order) => order.status !== "Entregado")
      : filter?.date === "today"
        ? adminOrders.filter((order) => order.createdAt.startsWith("Hoy"))
        : adminOrders;

    return orders.map((order) => ({
      ...order,
      email: "",
      notes: "",
      internalNote: "",
      pickupDate: "",
      deliveryAddress: "",
      deliveryPostalCode: "",
      deliveryInstructions: "",
      deliveryFee: "",
      shopWhatsappUrl: "",
      customerWhatsappUrl: "",
      items: [],
    }));
  }

  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const [orders, settings] = await Promise.all([
      prisma.order.findMany({
        include: { items: true },
        where:
          filter?.status === "pending"
            ? { status: { in: ["new", "confirmed", "preparing", "readyForPickup"] } }
            : filter?.date === "today"
              ? { createdAt: { gte: startOfDay } }
              : undefined,
        orderBy: { createdAt: "desc" },
      }),
      prisma.storeSettings.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);
    const shopWhatsapp =
      normalizeWhatsAppNumber(settings?.whatsapp) ||
      normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER);

    return orders.map((order) => {
      const fulfillmentMethod =
        order.fulfillmentMethod === "pickup" ? "pickup" : "delivery";
      const rawItems = order.items.map((item) => ({
        name: item.productNameSnapshot,
        quantity: Number(item.quantity),
        unit: item.unit,
        lineTotal: Number(item.lineTotal),
      }));
      const shopMessage = buildOrderWhatsAppMessage(
        {
          id: order.id,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          fulfillmentMethod,
          pickupDate: order.pickupDate,
          deliveryAddress: [order.deliveryAddress, order.deliveryAddressExtra]
            .filter(Boolean)
            .join(" · "),
          deliveryPostalCode: order.deliveryPostalCode,
          items: rawItems,
          subtotal: Number(order.subtotal),
          deliveryFee: order.deliveryFee ? Number(order.deliveryFee) : null,
          total: Number(order.total),
          notes: order.notes,
        },
        "es",
      );
      const customerMessage = `Hola, somos Calalina. Hemos recibido tu pedido ${order.id.slice(-6).toUpperCase()} y te escribimos para confirmarlo.`;

      return {
        id: order.id,
        customer: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail || "",
        status: orderStatus(order.status),
        fulfillment: fulfillmentMethod === "pickup" ? "Recogida" : "Entrega",
        pickupDate: order.pickupDate
          ? order.pickupDate.toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        deliveryAddress: [order.deliveryAddress, order.deliveryAddressExtra].filter(Boolean).join(" · "),
        deliveryPostalCode: order.deliveryPostalCode || "",
        deliveryInstructions: order.deliveryInstructions || "",
        deliveryFee: order.deliveryFee ? money(order.deliveryFee) : "",
        total: money(order.total),
        notes: order.notes || "",
        internalNote: order.internalNote || "",
        shopWhatsappUrl: shopWhatsapp ? buildWhatsAppUrl(shopWhatsapp, shopMessage) : "",
        customerWhatsappUrl: buildWhatsAppUrl(order.customerPhone, customerMessage),
        items: order.items.map((item) => ({
          id: item.id,
          name: item.productNameSnapshot,
          quantity: Number(item.quantity),
          unit: item.unit,
          unitPrice: money(item.unitPriceSnapshot),
          lineTotal: money(item.lineTotal),
        })),
        createdAt: order.createdAt.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
  } catch {
    return adminOrders.map((order) => ({
      ...order,
      email: "",
      notes: "",
      internalNote: "",
      pickupDate: "",
      deliveryAddress: "",
      deliveryPostalCode: "",
      deliveryInstructions: "",
      deliveryFee: "",
      shopWhatsappUrl: "",
      customerWhatsappUrl: "",
      items: [],
    }));
  }
}

export async function getAdminBlogPosts(status?: string) {
  if (!hasDatabaseUrl()) return adminPosts;

  try {
    const posts = await prisma.blogPost.findMany({
      where:
        status === "published"
          ? { status: "published" }
          : status === "draft"
            ? { status: "draft" }
            : undefined,
      orderBy: { updatedAt: "desc" },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.titleEs,
      category: post.category,
      status: post.status === "published" ? ("Publicado" as const) : ("Borrador" as const),
      localeStatus: "CA · ES · EN",
      updatedAt: post.updatedAt.toLocaleDateString("es-ES"),
    }));
  } catch {
    return adminPosts;
  }
}

export async function getAdminBlogPostForEdit(id: string) {
  if (!hasDatabaseUrl()) return null;

  try {
    return prisma.blogPost.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function getAdminGallery(filter?: { category?: string; visibility?: string; q?: string }) {
  if (!hasDatabaseUrl()) {
    return adminGallery.map((item, index) => ({
      id: item.id,
      image: item.image,
      title: item.title,
      titleCa: item.title,
      titleEs: item.title,
      titleEn: item.title,
      alt: item.title,
      altCa: item.title,
      altEs: item.title,
      altEn: item.title,
      category: item.category,
      featured: item.featured,
      visible: true,
      showOnHome: true,
      archived: false,
      sortOrder: index,
    }));
  }

  try {
    const images = await prisma.galleryImage.findMany({
      where: {
        ...(filter?.category ? { category: filter.category } : {}),
        ...(filter?.visibility === "visible"
          ? { isVisible: true, isArchived: false }
          : filter?.visibility === "hidden"
            ? { OR: [{ isVisible: false }, { isArchived: true }] }
            : {}),
        ...(filter?.q
          ? {
              OR: [
                { titleCa: { contains: filter.q, mode: "insensitive" } },
                { titleEs: { contains: filter.q, mode: "insensitive" } },
                { titleEn: { contains: filter.q, mode: "insensitive" } },
                { altCa: { contains: filter.q, mode: "insensitive" } },
                { altEs: { contains: filter.q, mode: "insensitive" } },
                { altEn: { contains: filter.q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return images.map((item) => ({
      id: item.id,
      image: item.image,
      title: item.titleEs || item.altEs,
      titleCa: item.titleCa || "",
      titleEs: item.titleEs || "",
      titleEn: item.titleEn || "",
      alt: item.altEs,
      altCa: item.altCa,
      altEs: item.altEs,
      altEn: item.altEn,
      category: item.category || "Galería",
      featured: item.isFeatured,
      visible: item.isVisible,
      showOnHome: item.showOnHome,
      archived: item.isArchived,
      sortOrder: item.sortOrder,
    }));
  } catch {
    return adminGallery.map((item, index) => ({
      id: item.id,
      image: item.image,
      title: item.title,
      titleCa: item.title,
      titleEs: item.title,
      titleEn: item.title,
      alt: item.title,
      altCa: item.title,
      altEs: item.title,
      altEn: item.title,
      category: item.category,
      featured: item.featured,
      visible: true,
      showOnHome: true,
      archived: false,
      sortOrder: index,
    }));
  }
}

export async function getAdminBanners(status?: string) {
  if (!hasDatabaseUrl()) return adminBanners.map((banner) => ({ ...banner, id: banner.title }));

  try {
    const banners = await prisma.banner.findMany({
      where: status === "active" ? { isActive: true } : undefined,
      orderBy: { updatedAt: "desc" },
    });

    return banners.map((banner) => ({
      id: banner.id,
      title: banner.titleEs,
      placement: banner.placement,
      status: banner.isActive ? "Activo" : "Inactivo",
      date: [banner.startsAt?.toLocaleDateString("es-ES"), banner.endsAt?.toLocaleDateString("es-ES")]
        .filter(Boolean)
        .join(" - ") || "Sin fechas",
    }));
  } catch {
    return adminBanners.map((banner) => ({ ...banner, id: banner.title }));
  }
}

export async function getAdminSeasonalHighlights() {
  if (!hasDatabaseUrl()) return adminSeasonalHighlights;

  try {
    const products = await prisma.product.findMany({
      where: { isSeasonal: true, isActive: true },
      orderBy: { nameEs: "asc" },
      select: { nameEs: true },
    });

    return products.map((product) => product.nameEs);
  } catch {
    return adminSeasonalHighlights;
  }
}

export async function getAdminSettings() {
  if (!hasDatabaseUrl()) return adminSettings;

  try {
    const settings = await prisma.storeSettings.findFirst({ orderBy: { updatedAt: "desc" } });
    if (!settings) return adminSettings;

    return {
      ...adminSettings,
      businessName: settings.businessName,
      address: settings.address,
      phone: settings.phone,
      whatsapp: settings.whatsapp || "",
      email: settings.email || "",
      googlePlaceId: settings.googlePlaceId || "",
      googleMapsUrl: settings.googleMapsUrl,
      googleMapsEmbedUrl: settings.googleMapsEmbedUrl,
      useGoogleHours: settings.useGoogleHours,
      manualOpeningHoursCa: settings.manualOpeningHoursCa,
      manualOpeningHoursEs: settings.manualOpeningHoursEs,
      manualOpeningHoursEn: settings.manualOpeningHoursEn,
      specialNoticeCa: settings.specialNoticeCa || "",
      specialNoticeEs: settings.specialNoticeEs || "",
      specialNoticeEn: settings.specialNoticeEn || "",
      onlineOrdersEnabled: settings.onlineOrdersEnabled,
      pickupEnabled: settings.pickupEnabled,
      deliveryEnabled: settings.deliveryEnabled,
      deliveryPostalCodes: settings.deliveryPostalCodes || "",
      deliveryFee: settings.deliveryFee ? money(settings.deliveryFee) : "",
      deliveryMinimumOrder: settings.deliveryMinimumOrder ? money(settings.deliveryMinimumOrder) : "",
      deliveryMessageCa: settings.deliveryMessageCa || "",
      deliveryMessageEs: settings.deliveryMessageEs || "",
      deliveryMessageEn: settings.deliveryMessageEn || "",
    };
  } catch {
    return adminSettings;
  }
}
