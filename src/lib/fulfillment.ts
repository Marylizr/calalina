import type { Locale } from "@/data/site";

export const fallbackDeliveryPostalCodes = ["08025", "08037", "08013"] as const;
export const fallbackDeliveryFee = 3.5;

export type PublicFulfillmentSettings = {
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  deliveryPostalCodes: string[];
  deliveryFee: number;
  deliveryMinimumOrder: number | null;
  deliveryMessage: string;
};

export function normalizePostalCode(value: string) {
  return value.replace(/\s+/g, "").trim();
}

export function parseDeliveryPostalCodes(value?: string | null) {
  return (value || "")
    .split(/[,\n;]/)
    .map(normalizePostalCode)
    .filter(Boolean);
}

export function isAllowedDeliveryPostalCode(value: string, allowedPostalCodes: string[]) {
  return allowedPostalCodes.includes(normalizePostalCode(value));
}

export const deliveryUnavailableMessage: Record<Locale, string> = {
  ca: "Ara mateix nomes fem delivery en zones properes a la botiga. Pots triar recollida a botiga o consultar-nos per WhatsApp.",
  es: "Ahora mismo solo hacemos delivery en zonas cercanas a la tienda. Puedes elegir recogida en tienda o consultarnos por WhatsApp.",
  en: "Local delivery is currently available only near the shop. You can choose store pickup or contact us on WhatsApp.",
};

export function fallbackFulfillmentSettings(locale: Locale): PublicFulfillmentSettings {
  return {
    pickupEnabled: true,
    deliveryEnabled: true,
    deliveryPostalCodes: [...fallbackDeliveryPostalCodes],
    deliveryFee: fallbackDeliveryFee,
    deliveryMinimumOrder: null,
    deliveryMessage: deliveryUnavailableMessage[locale],
  };
}
