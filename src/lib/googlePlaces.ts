import type { Locale } from "@/data/site";

const GOOGLE_PLACES_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const GOOGLE_HOURS_REVALIDATE_SECONDS = 60 * 60 * 6;

export type OpeningHoursSource = "google" | "manual";

export type OpeningHoursResult = {
  source: OpeningHoursSource;
  isOpenNow: boolean | null;
  weeklyHours: { day: string; time: string }[];
  error?: string;
};

type GooglePlaceDetailsResponse = {
  status: string;
  error_message?: string;
  result?: {
    opening_hours?: {
      open_now?: boolean;
      weekday_text?: string[];
    };
  };
};

const dayTranslations: Record<Locale, Record<string, string>> = {
  ca: {
    Monday: "Dilluns",
    Tuesday: "Dimarts",
    Wednesday: "Dimecres",
    Thursday: "Dijous",
    Friday: "Divendres",
    Saturday: "Dissabte",
    Sunday: "Diumenge",
  },
  es: {
    Monday: "lunes",
    Tuesday: "martes",
    Wednesday: "miércoles",
    Thursday: "jueves",
    Friday: "viernes",
    Saturday: "sábado",
    Sunday: "domingo",
  },
  en: {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  },
};

function normalizeGoogleWeekdayText(weekdayText: string[], locale: Locale) {
  return weekdayText.map((line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return { day: line, time: "" };
    }

    const googleDay = line.slice(0, separatorIndex).trim();
    const time = line.slice(separatorIndex + 1).trim();

    return {
      day: dayTranslations[locale][googleDay] || googleDay,
      time,
    };
  });
}

async function fetchGooglePlaceHours(placeId: string, locale: Locale) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      source: "manual",
      isOpenNow: null,
      weeklyHours: [],
      error: "Missing GOOGLE_MAPS_API_KEY",
    } satisfies OpeningHoursResult;
  }

  const url = new URL(GOOGLE_PLACES_DETAILS_URL);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "opening_hours");
  url.searchParams.set("language", locale);
  url.searchParams.set("key", apiKey);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: GOOGLE_HOURS_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return {
        source: "manual",
        isOpenNow: null,
        weeklyHours: [],
        error: `Google Places HTTP ${response.status}`,
      } satisfies OpeningHoursResult;
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;
    const openingHours = data.result?.opening_hours;

    if (data.status !== "OK" || !openingHours?.weekday_text?.length) {
      return {
        source: "manual",
        isOpenNow: null,
        weeklyHours: [],
        error: data.error_message || `Google Places status ${data.status}`,
      } satisfies OpeningHoursResult;
    }

    return {
      source: "google",
      isOpenNow: typeof openingHours.open_now === "boolean" ? openingHours.open_now : null,
      weeklyHours: normalizeGoogleWeekdayText(openingHours.weekday_text, locale),
    } satisfies OpeningHoursResult;
  } catch (error) {
    return {
      source: "manual",
      isOpenNow: null,
      weeklyHours: [],
      error: error instanceof Error ? error.message : "Google Places request failed",
    } satisfies OpeningHoursResult;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getOpeningHours({
  locale,
  useGoogleHours,
  googlePlaceId,
  manualHours,
}: {
  locale: Locale;
  useGoogleHours: boolean;
  googlePlaceId?: string;
  manualHours: { day: string; time: string }[];
}): Promise<OpeningHoursResult> {
  if (useGoogleHours && googlePlaceId) {
    const googleHours = await fetchGooglePlaceHours(googlePlaceId, locale);

    if (googleHours.source === "google") {
      return googleHours;
    }

    return {
      ...googleHours,
      weeklyHours: manualHours,
    };
  }

  return {
    source: "manual",
    isOpenNow: null,
    weeklyHours: manualHours,
  };
}
