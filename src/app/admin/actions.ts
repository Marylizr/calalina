"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { adminSessionCookie, createAdminSession, verifyAdminSession } from "@/lib/admin-auth";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";

export type UploadImageState = {
  status: "idle" | "success" | "error";
  message: string;
  url?: string;
};

export type ProductFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type AdminActionState = ProductFormState;

const ok = (message: string): AdminActionState => ({ status: "success", message });
const fail = (message: string): AdminActionState => ({ status: "error", message });

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = await verifyAdminSession(cookieStore.get(adminSessionCookie)?.value);

  if (!session) return null;
  return session;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function requireDatabase() {
  if (!hasDatabaseUrl()) {
    return fail("La base de datos no está configurada. Revisa DATABASE_URL antes de aplicar cambios.");
  }

  return null;
}

function formBoolean(formData: FormData, name: string) {
  const value = formData.get(name);
  return value === "on" || value === "true" || value === "1";
}

function databaseFail(error: unknown) {
  const message = error instanceof Error ? error.message : "";

  if (message.includes("Can't reach database server")) {
    return fail("No se puede conectar con la base de datos. Revisa DATABASE_URL y que el servidor esté activo.");
  }

  return fail("No se pudo guardar el cambio en la base de datos.");
}

const productSchema = z.object({
  id: z.string().optional(),
  mode: z.enum(["create", "edit"]).default("create"),
  nameEs: z.string().trim().min(1, "El nombre en español es obligatorio."),
  nameCa: z.string().trim().optional(),
  nameEn: z.string().trim().optional(),
  categoryId: z.string().optional(),
  category: z.string().optional(),
  price: z.coerce.number().positive("Añade un precio válido."),
  unit: z.enum(["kg", "unit", "tray", "pack", "box", "bottle"]).default("kg"),
  shortDescriptionEs: z.string().trim().optional(),
  imageUrl: z.string().trim().optional(),
});

const categorySchema = z.object({
  id: z.string().optional(),
  nameEs: z.string().trim().min(1, "El nombre es obligatorio."),
  nameCa: z.string().trim().optional(),
  nameEn: z.string().trim().optional(),
});

const orderStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "confirmed", "preparing", "readyForPickup", "delivered", "cancelled"]),
  internalNote: z.string().optional(),
});

const blogSchema = z.object({
  id: z.string().optional(),
  mode: z.enum(["create", "edit"]).default("create"),
  slug: z.string().trim().optional(),
  titleEs: z.string().trim().min(1, "El título en español es obligatorio."),
  titleCa: z.string().trim().optional(),
  titleEn: z.string().trim().optional(),
  excerptEs: z.string().trim().min(1, "El extracto es obligatorio."),
  excerptCa: z.string().trim().optional(),
  excerptEn: z.string().trim().optional(),
  contentEs: z.string().trim().min(1, "El contenido es obligatorio."),
  contentCa: z.string().trim().optional(),
  contentEn: z.string().trim().optional(),
  category: z.string().trim().min(1, "La categoría es obligatoria."),
  coverImage: z.string().trim().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.string().trim().optional(),
  seoTitleEs: z.string().trim().optional(),
  seoTitleCa: z.string().trim().optional(),
  seoTitleEn: z.string().trim().optional(),
  seoDescriptionEs: z.string().trim().optional(),
  seoDescriptionCa: z.string().trim().optional(),
  seoDescriptionEn: z.string().trim().optional(),
});

const gallerySchema = z.object({
  id: z.string().optional(),
  image: z.string().trim().min(1, "La imagen es obligatoria."),
  titleEs: z.string().trim().optional(),
  titleCa: z.string().trim().optional(),
  titleEn: z.string().trim().optional(),
  altEs: z.string().trim().optional(),
  altCa: z.string().trim().optional(),
  altEn: z.string().trim().optional(),
  category: z.string().trim().optional(),
  isFeatured: z.coerce.boolean().default(false),
  isVisible: z.coerce.boolean().default(false),
  showOnHome: z.coerce.boolean().default(false),
  isArchived: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

const bannerSchema = z.object({
  id: z.string().optional(),
  titleEs: z.string().trim().min(1, "El título es obligatorio."),
  titleCa: z.string().trim().optional(),
  titleEn: z.string().trim().optional(),
  descriptionEs: z.string().trim().optional(),
  descriptionCa: z.string().trim().optional(),
  descriptionEn: z.string().trim().optional(),
  image: z.string().trim().optional(),
  ctaLabelEs: z.string().trim().optional(),
  ctaHref: z.string().trim().optional(),
  placement: z.enum(["homeHero", "topBar", "seasonal", "latinCorner"]).default("homeHero"),
  isActive: z.coerce.boolean().default(false),
});

const settingsSchema = z.object({
  businessName: z.string().trim().min(1, "El nombre comercial es obligatorio."),
  address: z.string().trim().min(1, "La dirección es obligatoria."),
  phone: z.string().trim().min(1, "El teléfono es obligatorio."),
  whatsapp: z.string().trim().optional(),
  email: z.string().trim().email("Email inválido").optional().or(z.literal("")),
  googlePlaceId: z.string().trim().optional(),
  googleMapsUrl: z.string().trim().min(1, "La URL de Google Maps es obligatoria."),
  googleMapsEmbedUrl: z.string().trim().min(1, "La URL embed de Google Maps es obligatoria."),
  useGoogleHours: z.coerce.boolean().default(false),
  manualOpeningHoursCa: z.string().trim().min(1),
  manualOpeningHoursEs: z.string().trim().min(1),
  manualOpeningHoursEn: z.string().trim().min(1),
  specialNoticeCa: z.string().trim().optional(),
  specialNoticeEs: z.string().trim().optional(),
  specialNoticeEn: z.string().trim().optional(),
});

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const nextPath = String(formData.get("next") || "/admin");
  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminEmail || !adminPassword) {
    redirect("/admin/login?error=missing-env");
  }

  if (email !== adminEmail || password !== adminPassword) {
    redirect("/admin/login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookie, await createAdminSession(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);
  redirect("/admin/login");
}

export async function uploadAdminImageAction(
  _state: UploadImageState,
  formData: FormData,
): Promise<UploadImageState> {
  const session = await requireAdmin();

  if (!session) {
    return {
      status: "error",
      message: "No tienes permiso para subir imágenes.",
    };
  }

  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return {
      status: "error",
      message: "Selecciona una imagen desde tu ordenador.",
    };
  }

  const allowedTypes = new Map([
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
    ["image/gif", "gif"],
  ]);
  const extension = allowedTypes.get(file.type);

  if (!extension) {
    return {
      status: "error",
      message: "Formato no permitido. Usa JPG, PNG, WebP o GIF.",
    };
  }

  const maxSize = 8 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      status: "error",
      message: "La imagen pesa demasiado. Máximo 8 MB.",
    };
  }

  const originalName = file.name
    .replace(/\.[^/.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  const filename = `${originalName || "imagen"}-${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "admin");
  const uploadPath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(uploadPath, Buffer.from(await file.arrayBuffer()));

  return {
    status: "success",
    message: "Imagen subida correctamente.",
    url: `/uploads/admin/${filename}`,
  };
}

export async function saveProductAction(
  _state: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  if (!(await requireAdmin())) return fail("No tienes permiso para guardar productos.");
  const dbError = requireDatabase();
  if (dbError) return dbError;

  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Producto inválido.");

  const data = parsed.data;
  const category =
    data.categoryId || data.category
      ? await prisma.category.findFirst({
          where: data.categoryId ? { id: data.categoryId } : { nameEs: data.category },
        })
      : null;
  const productData = {
    nameEs: data.nameEs,
    nameCa: data.nameCa || data.nameEs,
    nameEn: data.nameEn || data.nameEs,
    slug: slugify(data.nameEs),
    categoryId: category?.id,
    price: data.price,
    unit: data.unit,
    shortDescriptionEs: data.shortDescriptionEs,
    shortDescriptionCa: data.shortDescriptionEs,
    shortDescriptionEn: data.shortDescriptionEs,
    isActive: formData.get("Activo") === "on",
    availableOnline: formBoolean(formData, "Disponible online"),
    isFeatured: formData.get("Destacado") === "on",
    isSeasonal: formData.get("Temporada") === "on",
    isLatin: formData.get("Rincón latino") === "on",
    isNew: formData.get("Nuevo") === "on",
    images: data.imageUrl ? [data.imageUrl] : [],
  };

  if (data.mode === "edit" && data.id) {
    await prisma.product.update({ where: { id: data.id }, data: productData });
  } else {
    await prisma.product.create({ data: productData });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  return ok(data.mode === "edit" ? `Producto "${data.nameEs}" guardado correctamente.` : `Producto "${data.nameEs}" creado correctamente.`);
}

export async function deleteProductAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  if (id) await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function updateProductStockAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  const status = String(formData.get("stockStatus") || "available") as "available" | "lowStock" | "outOfStock";
  if (id) await prisma.product.update({ where: { id }, data: { stockStatus: status } });
  revalidatePath("/admin/products");
}

export async function saveCategoryAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Categoría inválida.");
  const data = parsed.data;
  const payload = {
    nameEs: data.nameEs,
    nameCa: data.nameCa || data.nameEs,
    nameEn: data.nameEn || data.nameEs,
    slug: slugify(data.nameEs),
  };
  if (data.id) await prisma.category.update({ where: { id: data.id }, data: payload });
  else await prisma.category.create({ data: payload });
  revalidatePath("/admin/categories");
  return ok("Categoría guardada correctamente.");
}

export async function deleteCategoryAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  if (id) await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function updateOrderStatusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const parsed = orderStatusSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Pedido inválido.");
  await prisma.order.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status, internalNote: parsed.data.internalNote },
  });
  revalidatePath("/admin/orders");
  return ok("Pedido actualizado correctamente.");
}

export async function saveBlogPostAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const parsed = blogSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Artículo inválido.");
  const data = parsed.data;
  const existingPost =
    data.mode === "edit" && data.id
      ? await prisma.blogPost.findUnique({ where: { id: data.id }, select: { publishedAt: true } })
      : null;
  const publishedAt = data.publishedAt ? new Date(data.publishedAt) : existingPost?.publishedAt;
  const payload = {
    titleEs: data.titleEs,
    titleCa: data.titleCa || data.titleEs,
    titleEn: data.titleEn || data.titleEs,
    slug: slugify(data.slug || data.titleCa || data.titleEs),
    excerptEs: data.excerptEs,
    excerptCa: data.excerptCa || data.excerptEs,
    excerptEn: data.excerptEn || data.excerptEs,
    contentEs: data.contentEs,
    contentCa: data.contentCa || data.contentEs,
    contentEn: data.contentEn || data.contentEs,
    coverImage: data.coverImage,
    category: data.category,
    status: data.status,
    publishedAt: data.status === "published" ? publishedAt || new Date() : null,
    seoTitleEs: data.seoTitleEs || null,
    seoTitleCa: data.seoTitleCa || data.seoTitleEs || null,
    seoTitleEn: data.seoTitleEn || data.seoTitleEs || null,
    seoDescriptionEs: data.seoDescriptionEs || null,
    seoDescriptionCa: data.seoDescriptionCa || data.seoDescriptionEs || null,
    seoDescriptionEn: data.seoDescriptionEn || data.seoDescriptionEs || null,
  };
  if (data.mode === "edit" && data.id) await prisma.blogPost.update({ where: { id: data.id }, data: payload });
  else await prisma.blogPost.create({ data: payload });
  revalidatePath("/admin/blog");
  revalidatePath("/ca");
  revalidatePath("/es");
  revalidatePath("/en");
  revalidatePath("/ca/consells");
  revalidatePath("/es/consells");
  revalidatePath("/en/consells");
  return ok("Artículo guardado correctamente.");
}

export async function deleteBlogPostAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  if (id) await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/ca");
  revalidatePath("/es");
  revalidatePath("/en");
  revalidatePath("/ca/consells");
  revalidatePath("/es/consells");
  revalidatePath("/en/consells");
}

export async function saveGalleryImageAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const parsed = gallerySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Imagen inválida.");
  const data = parsed.data;
  const altText = data.altCa || data.altEs || data.altEn || data.titleCa || data.titleEs || data.titleEn;
  if (!altText) return fail("El texto alternativo es obligatorio.");
  const payload = {
    image: data.image,
    titleEs: data.titleEs,
    titleCa: data.titleCa || data.titleEs,
    titleEn: data.titleEn || data.titleEs,
    altEs: data.altEs || altText,
    altCa: data.altCa || altText,
    altEn: data.altEn || altText,
    category: data.category,
    isFeatured: formBoolean(formData, "isFeatured"),
    isVisible: formBoolean(formData, "isVisible"),
    showOnHome: formBoolean(formData, "showOnHome"),
    isArchived: formBoolean(formData, "isArchived"),
    sortOrder: data.sortOrder,
  };
  if (data.id) await prisma.galleryImage.update({ where: { id: data.id }, data: payload });
  else await prisma.galleryImage.create({ data: payload });
  revalidatePath("/admin/gallery");
  revalidatePath("/ca");
  revalidatePath("/es");
  revalidatePath("/en");
  revalidatePath("/ca/galeria");
  revalidatePath("/es/galeria");
  revalidatePath("/en/galeria");
  return ok("Imagen guardada correctamente.");
}

export async function saveGalleryImageDirectAction(formData: FormData) {
  await saveGalleryImageAction({ status: "idle", message: "" }, formData);
}

export async function deleteGalleryImageAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  try {
    if (id) await prisma.galleryImage.delete({ where: { id } });
    revalidatePath("/admin/gallery");
  } catch (error) {
    databaseFail(error);
  }
}

export async function deleteGalleryImageStateAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const id = String(formData.get("id") || "");
  try {
    if (id) await prisma.galleryImage.delete({ where: { id } });
    revalidatePath("/admin/gallery");
    revalidatePath("/ca");
    revalidatePath("/es");
    revalidatePath("/en");
    revalidatePath("/ca/galeria");
    revalidatePath("/es/galeria");
    revalidatePath("/en/galeria");
    return ok("Imagen eliminada.");
  } catch (error) {
    return databaseFail(error);
  }
}

export async function archiveGalleryImageAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  const isArchived = String(formData.get("isArchived") || "") === "true";
  try {
    if (id) await prisma.galleryImage.update({ where: { id }, data: { isArchived, isVisible: !isArchived } });
    revalidatePath("/admin/gallery");
    revalidatePath("/ca");
    revalidatePath("/es");
    revalidatePath("/en");
    revalidatePath("/ca/galeria");
    revalidatePath("/es/galeria");
    revalidatePath("/en/galeria");
  } catch (error) {
    databaseFail(error);
  }
}

export async function archiveGalleryImageStateAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const id = String(formData.get("id") || "");
  const isArchived = String(formData.get("isArchived") || "") === "true";
  try {
    if (id) await prisma.galleryImage.update({ where: { id }, data: { isArchived, isVisible: !isArchived } });
    revalidatePath("/admin/gallery");
    revalidatePath("/ca");
    revalidatePath("/es");
    revalidatePath("/en");
    revalidatePath("/ca/galeria");
    revalidatePath("/es/galeria");
    revalidatePath("/en/galeria");
    return ok(isArchived ? "Imagen archivada." : "Imagen restaurada.");
  } catch (error) {
    return databaseFail(error);
  }
}

export async function saveBannerAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const parsed = bannerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Promoción inválida.");
  const data = parsed.data;
  const payload = {
    titleEs: data.titleEs,
    titleCa: data.titleCa || data.titleEs,
    titleEn: data.titleEn || data.titleEs,
    descriptionEs: data.descriptionEs,
    descriptionCa: data.descriptionCa || data.descriptionEs,
    descriptionEn: data.descriptionEn || data.descriptionEs,
    image: data.image,
    ctaLabelEs: data.ctaLabelEs,
    ctaLabelCa: data.ctaLabelEs,
    ctaLabelEn: data.ctaLabelEs,
    ctaHref: data.ctaHref,
    placement: data.placement,
    isActive: formData.get("isActive") === "on",
  };
  if (data.id) await prisma.banner.update({ where: { id: data.id }, data: payload });
  else await prisma.banner.create({ data: payload });
  revalidatePath("/admin/banners");
  return ok("Promoción guardada correctamente.");
}

export async function deleteBannerAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  if (id) await prisma.banner.delete({ where: { id } });
  revalidatePath("/admin/banners");
}

export async function saveSettingsAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  if (!(await requireAdmin())) return fail("No tienes permiso.");
  const dbError = requireDatabase();
  if (dbError) return dbError;
  const parsed = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Ajustes inválidos.");
  const existing = await prisma.storeSettings.findFirst();
  if (existing) await prisma.storeSettings.update({ where: { id: existing.id }, data: parsed.data });
  else await prisma.storeSettings.create({ data: parsed.data });
  revalidatePath("/admin/settings");
  return ok("Ajustes guardados correctamente.");
}

export async function updateSeasonalProductAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  if (requireDatabase()) return;
  const id = String(formData.get("id") || "");
  const isSeasonal = String(formData.get("isSeasonal") || "") === "true";
  if (id) await prisma.product.update({ where: { id }, data: { isSeasonal } });
  revalidatePath("/admin/seasonal");
  revalidatePath("/admin/products");
}
