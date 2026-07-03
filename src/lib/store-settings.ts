import type { Locale } from "@/data/site";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";

const whatsappMessages: Record<Locale, string> = {
  ca: "Hola Calalina, voldria consultar productes del raco llati.",
  es: "Hola Calalina, quisiera consultar productos del rincon latino.",
  en: "Hi Calalina, I would like to ask about Latin corner products.",
};

export async function getShopWhatsAppUrl(locale: Locale, message = whatsappMessages[locale]) {
  let number = normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER);

  if (hasDatabaseUrl()) {
    try {
      const settings = await prisma.storeSettings.findFirst({
        orderBy: { updatedAt: "desc" },
        select: { whatsapp: true },
      });
      number = normalizeWhatsAppNumber(settings?.whatsapp) || number;
    } catch {
      // Keep the environment fallback if the settings query fails.
    }
  }

  return number ? buildWhatsAppUrl(number, message) : "";
}
