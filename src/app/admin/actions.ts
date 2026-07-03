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

function constantTimeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  const length = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;

  for (let index = 0; index < length; index += 1) {
    mismatch |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }

  return mismatch === 0;
}

function isSafeAdminRedirect(value: string) {
  return value.startsWith("/admin") && !value.startsWith("//") && !value.includes("://");
}

function isSafeImageUrl(value?: string | null) {
  if (!value) return true;
  if (value.startsWith("/uploads/admin/") || value.startsWith("/images/")) return true;

  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      url.pathname.startsWith("/doroh5hbv/image/upload/")
    );
  } catch {
    return false;
  }
}

function isSafeLink(value?: string | null) {
  if (!value) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("#")) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function isGoogleMapsUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["www.google.com", "google.com", "maps.google.com"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

function isGoogleMapsEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["www.google.com", "maps.google.com"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

function formEntries(formData: FormData) {
  return Object.fromEntries(formData);
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
  nameEs: z.string().trim().min(1, "El nombre en español es obligatorio.").max(120),
  nameCa: z.string().trim().max(120).optional(),
  nameEn: z.string().trim().max(120).optional(),
  categoryId: z.string().trim().max(120).optional(),
  category: z.string().trim().max(120).optional(),
  price: z.coerce.number().positive("Añade un precio válido."),
  unit: z.enum(["kg", "unit", "tray", "pack", "box", "bottle"]).default("kg"),
  shortDescriptionEs: z.string().trim().max(500).optional(),
  imageUrl: z.string().trim().max(500).optional().refine(isSafeImageUrl, "La imagen debe ser local o de Cloudinary."),
});

const categorySchema = z.object({
  id: z.string().optional(),
  nameEs: z.string().trim().min(1, "El nombre es obligatorio.").max(120),
  nameCa: z.string().trim().max(120).optional(),
  nameEn: z.string().trim().max(120).optional(),
});

const orderStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "confirmed", "preparing", "readyForPickup", "delivered", "cancelled"]),
  internalNote: z.string().trim().max(800).optional(),
});

const blogSchema = z.object({
  id: z.string().optional(),
  mode: z.enum(["create", "edit"]).default("create"),
  slug: z.string().trim().max(120).optional(),
  titleEs: z.string().trim().min(1, "El título en español es obligatorio.").max(180),
  titleCa: z.string().trim().max(180).optional(),
  titleEn: z.string().trim().max(180).optional(),
  excerptEs: z.string().trim().min(1, "El extracto es obligatorio.").max(500),
  excerptCa: z.string().trim().max(500).optional(),
  excerptEn: z.string().trim().max(500).optional(),
  contentEs: z.string().trim().min(1, "El contenido es obligatorio.").max(50000),
  contentCa: z.string().trim().max(50000).optional(),
  contentEn: z.string().trim().max(50000).optional(),
  category: z.string().trim().min(1, "La categoría es obligatoria.").max(120),
  coverImage: z.string().trim().max(500).optional().refine(isSafeImageUrl, "La imagen debe ser local o de Cloudinary."),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.string().trim().optional(),
  seoTitleEs: z.string().trim().max(180).optional(),
  seoTitleCa: z.string().trim().max(180).optional(),
  seoTitleEn: z.string().trim().max(180).optional(),
  seoDescriptionEs: z.string().trim().max(300).optional(),
  seoDescriptionCa: z.string().trim().max(300).optional(),
  seoDescriptionEn: z.string().trim().max(300).optional(),
});

const gallerySchema = z.object({
  id: z.string().optional(),
  image: z.string().trim().min(1, "La imagen es obligatoria.").max(500).refine(isSafeImageUrl, "La imagen debe ser local o de Cloudinary."),
  titleEs: z.string().trim().max(160).optional(),
  titleCa: z.string().trim().max(160).optional(),
  titleEn: z.string().trim().max(160).optional(),
  altEs: z.string().trim().max(220).optional(),
  altCa: z.string().trim().max(220).optional(),
  altEn: z.string().trim().max(220).optional(),
  category: z.string().trim().max(120).optional(),
  isFeatured: z.coerce.boolean().default(false),
  isVisible: z.coerce.boolean().default(false),
  showOnHome: z.coerce.boolean().default(false),
  isArchived: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

const bannerSchema = z.object({
  id: z.string().optional(),
  titleEs: z.string().trim().min(1, "El título es obligatorio.").max(180),
  titleCa: z.string().trim().max(180).optional(),
  titleEn: z.string().trim().max(180).optional(),
  descriptionEs: z.string().trim().max(500).optional(),
  descriptionCa: z.string().trim().max(500).optional(),
  descriptionEn: z.string().trim().max(500).optional(),
  image: z.string().trim().max(500).optional().refine(isSafeImageUrl, "La imagen debe ser local o de Cloudinary."),
  ctaLabelEs: z.string().trim().max(80).optional(),
  ctaHref: z.string().trim().max(500).optional().refine(isSafeLink, "El enlace debe ser relativo o HTTPS."),
  placement: z.enum(["homeHero", "topBar", "seasonal", "latinCorner"]).default("homeHero"),
  isActive: z.coerce.boolean().default(false),
});

const optionalMoneySchema = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? null : value),
  z.coerce.number().min(0).max(500).nullable(),
);

const settingsSchema = z.object({
  businessName: z.string().trim().min(1, "El nombre comercial es obligatorio.").max(160),
  address: z.string().trim().min(1, "La dirección es obligatoria.").max(300),
  phone: z.string().trim().min(1, "El teléfono es obligatorio.").max(40),
  whatsapp: z.string().trim().max(40).optional(),
  email: z.string().trim().email("Email inválido").optional().or(z.literal("")),
  googlePlaceId: z.string().trim().max(160).optional(),
  googleMapsUrl: z.string().trim().min(1, "La URL de Google Maps es obligatoria.").max(1000).refine(isGoogleMapsUrl, "Usa una URL válida de Google Maps."),
  googleMapsEmbedUrl: z.string().trim().min(1, "La URL embed de Google Maps es obligatoria.").max(1000).refine(isGoogleMapsEmbedUrl, "Usa una URL embed válida de Google Maps."),
  useGoogleHours: z.coerce.boolean().default(false),
  manualOpeningHoursCa: z.string().trim().min(1).max(2000),
  manualOpeningHoursEs: z.string().trim().min(1).max(2000),
  manualOpeningHoursEn: z.string().trim().min(1).max(2000),
  specialNoticeCa: z.string().trim().max(300).optional(),
  specialNoticeEs: z.string().trim().max(300).optional(),
  specialNoticeEn: z.string().trim().max(300).optional(),
  onlineOrdersEnabled: z.coerce.boolean().default(false),
  pickupEnabled: z.coerce.boolean().default(false),
  deliveryEnabled: z.coerce.boolean().default(false),
  deliveryPostalCodes: z.string().trim().max(500).optional(),
  deliveryFee: optionalMoneySchema,
  deliveryMinimumOrder: optionalMoneySchema,
  deliveryMessageCa: z.string().trim().max(500).optional(),
  deliveryMessageEs: z.string().trim().max(500).optional(),
  deliveryMessageEn: z.string().trim().max(500).optional(),
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

  if (!constantTimeEqual(email, adminEmail) || !constantTimeEqual(password, adminPassword)) {
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

  redirect(isSafeAdminRedirect(nextPath) ? nextPath : "/admin");
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

  const bytes = Buffer.from(await file.arrayBuffer());
  const hasValidSignature =
    (extension === "jpg" && bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) ||
    (extension === "png" && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) ||
    (extension === "webp" && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP") ||
    (extension === "gif" && ["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii")));

  if (!hasValidSignature) {
    return {
      status: "error",
      message: "El archivo no parece ser una imagen válida.",
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
  const uploadDir = path.resolve(process.cwd(), "public", "uploads", "admin");
  const uploadPath = path.resolve(uploadDir, filename);

  if (!uploadPath.startsWith(`${uploadDir}${path.sep}`)) {
    return {
      status: "error",
      message: "Nombre de archivo no válido.",
    };
  }

  await mkdir(uploadDir, { recursive: true });
  await writeFile(uploadPath, bytes);

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

  const parsed = productSchema.safeParse(formEntries(formData));
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
  const parsed = categorySchema.safeParse(formEntries(formData));
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
  const parsed = orderStatusSchema.safeParse(formEntries(formData));
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
  const parsed = blogSchema.safeParse(formEntries(formData));
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
  const parsed = gallerySchema.safeParse(formEntries(formData));
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
  const parsed = bannerSchema.safeParse(formEntries(formData));
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
  const parsed = settingsSchema.safeParse(formEntries(formData));
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Ajustes inválidos.");
  const payload = {
    ...parsed.data,
    deliveryRequestEnabled: parsed.data.deliveryEnabled,
  };
  const existing = await prisma.storeSettings.findFirst();
  if (existing) await prisma.storeSettings.update({ where: { id: existing.id }, data: payload });
  else await prisma.storeSettings.create({ data: payload });
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
