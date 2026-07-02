import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/data/site";
import { getOpeningHours } from "@/lib/googlePlaces";

type LocationSectionProps = {
  locale: Locale;
  content: {
    label: string;
    title: string;
    storeName: string;
    addressLabel: string;
    address: string;
    scheduleLabel: string;
    schedule: string;
    phoneLabel: string;
    phone: string;
    websiteLabel: string;
    website: string;
    plusCodeLabel: string;
    plusCode: string;
    emailLabel: string;
    email: string;
    services: string;
    mapLabel: string;
    mapUrl: string;
    mapEmbedUrl: string;
    googlePlaceId: string;
    useGoogleHours: boolean;
    googleHoursUpdatedText: string;
    openStatusText: string;
    closedStatusText: string;
    hours: { day: string; time: string }[];
    visitTitle: string;
    visitText: string;
    specialNotice: string;
    cta: string;
    social: string[];
  };
};

export async function LocationSection({ locale, content }: LocationSectionProps) {
  const openingHours = await getOpeningHours({
    locale,
    useGoogleHours: content.useGoogleHours,
    googlePlaceId: content.googlePlaceId,
    manualHours: content.hours,
  });

  return (
    <section id="ubicacio" className="wood-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>{content.label}</SectionLabel>
        <h2 className="font-serif text-4xl font-black leading-tight text-[var(--color-dark-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.3fr_0.9fr]">
          <address className="not-italic rounded-[1.5rem] bg-white p-6 shadow-[0_14px_34px_rgba(16,43,86,0.08)]">
            <h3 className="text-xl font-black text-[var(--color-dark-ink)]">{content.storeName}</h3>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-[var(--color-muted-text)]">
              <p>
                <span className="block font-black text-[var(--color-dark-ink)]">{content.addressLabel}</span>
                {content.address}
              </p>
              <p>
                <span className="block font-black text-[var(--color-dark-ink)]">{content.scheduleLabel}</span>
                {openingHours.source === "google" && openingHours.isOpenNow !== null ? (
                  <span
                    className={`mb-1 inline-flex rounded-full px-3 py-1 text-xs font-black ${
                      openingHours.isOpenNow
                        ? "bg-[var(--color-leaf-green)]/15 text-[var(--color-deep-green)]"
                        : "bg-[var(--color-calalina-red)]/10 text-[var(--color-calalina-red)]"
                    }`}
                  >
                    {openingHours.isOpenNow ? content.openStatusText : content.closedStatusText}
                  </span>
                ) : null}
                <span className="block">{content.schedule}</span>
              </p>
              <p>
                <span className="block font-black text-[var(--color-dark-ink)]">{content.websiteLabel}</span>
                <a href={`https://${content.website}`} target="_blank" rel="noreferrer" className="font-bold text-[var(--color-deep-green)] hover:text-[var(--color-calalina-red)]">
                  {content.website}
                </a>
              </p>
              <p>
                <span className="block font-black text-[var(--color-dark-ink)]">{content.phoneLabel}</span>
                {content.phone}
              </p>
              <p>
                <span className="block font-black text-[var(--color-dark-ink)]">{content.emailLabel}</span>
                {content.email}
              </p>
              <p>
                <span className="block font-black text-[var(--color-dark-ink)]">{content.plusCodeLabel}</span>
                {content.plusCode}
              </p>
              <p className="rounded-2xl bg-[var(--color-leaf-green)]/10 px-4 py-3 font-black text-[var(--color-deep-green)]">
                ✓ {content.services}
              </p>
            </div>
          </address>

          <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-[var(--color-deep-green)]/10 bg-white shadow-[0_14px_34px_rgba(16,43,86,0.08)]">
            <iframe
              title={content.mapLabel}
              src={content.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
            <a
              href={content.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-sm font-black text-[var(--color-dark-ink)] shadow transition hover:bg-white"
            >
              {content.mapLabel}
            </a>
          </div>

          <div className="rounded-[1.5rem] bg-[var(--color-dark-ink)] p-6 text-white shadow-[0_14px_34px_rgba(16,43,86,0.14)]">
            <h3 className="font-serif text-3xl font-black">{content.visitTitle}</h3>
            <p className="mt-4 leading-7 text-white/78">
              {content.visitText}
            </p>
            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.16em] text-[var(--color-mango-yellow)]">
                {content.scheduleLabel}
              </h4>
              {openingHours.source === "google" ? (
                <p className="mt-3 rounded-full bg-white/10 px-3 py-2 text-xs font-black text-white/86">
                  {content.googleHoursUpdatedText}
                </p>
              ) : null}
              {openingHours.source === "google" && openingHours.isOpenNow !== null ? (
                <p
                  className={`mt-3 rounded-full px-3 py-2 text-xs font-black ${
                    openingHours.isOpenNow
                      ? "bg-[var(--color-leaf-green)] text-white"
                      : "bg-[var(--color-calalina-red)] text-white"
                  }`}
                >
                  {openingHours.isOpenNow ? content.openStatusText : content.closedStatusText}
                </p>
              ) : null}
              {content.specialNotice ? (
                <p className="mt-3 rounded-2xl bg-[var(--color-mango-yellow)]/20 px-3 py-2 text-sm font-black text-white">
                  {content.specialNotice}
                </p>
              ) : null}
              <dl className="mt-4 grid gap-3 text-sm">
                {openingHours.weeklyHours.map((item) => (
                  <div key={item.day} className="grid grid-cols-[6.5rem_1fr] gap-3">
                    <dt className="font-black text-white">{item.day}</dt>
                    <dd className="leading-5 text-white/78">{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Button
              href={content.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full"
            >
              {content.cta} →
            </Button>
            <div className="mt-6 flex gap-3">
              {content.social.map((label) => (
                <a
                  key={label}
                  href="#ubicacio"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xs font-black text-white transition hover:bg-white/20"
                >
                  {label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
