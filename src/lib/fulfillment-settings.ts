import type { Locale } from "@/data/site";
import { prisma, hasDatabaseUrl } from "@/lib/prisma";
import {
  deliveryUnavailableMessage,
  fallbackFulfillmentSettings,
  parseDeliveryPostalCodes,
  type PublicFulfillmentSettings,
} from "@/lib/fulfillment";

export async function getPublicFulfillmentSettings(
  locale: Locale,
): Promise<PublicFulfillmentSettings> {
  if (!hasDatabaseUrl()) return fallbackFulfillmentSettings(locale);

  try {
    const settings = await prisma.storeSettings.findFirst({ orderBy: { updatedAt: "desc" } });
    if (!settings) return fallbackFulfillmentSettings(locale);

    const postalCodes = parseDeliveryPostalCodes(settings.deliveryPostalCodes);
    const deliveryMessage =
      locale === "es"
        ? settings.deliveryMessageEs
        : locale === "en"
          ? settings.deliveryMessageEn
          : settings.deliveryMessageCa;

    return {
      pickupEnabled: settings.pickupEnabled ?? true,
      deliveryEnabled: settings.deliveryEnabled ?? true,
      deliveryPostalCodes: postalCodes.length
        ? postalCodes
        : fallbackFulfillmentSettings(locale).deliveryPostalCodes,
      deliveryFee:
        settings.deliveryFee === null
          ? fallbackFulfillmentSettings(locale).deliveryFee
          : Number(settings.deliveryFee),
      deliveryMinimumOrder:
        settings.deliveryMinimumOrder === null ? null : Number(settings.deliveryMinimumOrder),
      deliveryMessage: deliveryMessage || deliveryUnavailableMessage[locale],
    };
  } catch {
    return fallbackFulfillmentSettings(locale);
  }
}
