import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";
import StaffDirectory from "@/components/StaffDirectory";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kontakty">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: `${t.contacts.title} — ${t.org.short}` };
}

const MAP_URL = "https://2gis.kz/astana/search/Мангилик%20Ел%2011";

export default async function ContactsPage({
  params,
}: PageProps<"/[lang]/kontakty">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { contacts: t } = await getDictionary(lang);

  const lines = [
    { label: t.callCenter, numbers: [["8 (7172) 26-72-72", "tel:+77172267272"]] },
    { label: t.reception, numbers: [["8 (7172) 98-37-01", "tel:+77172983701"]] },
    {
      label: t.contracts,
      numbers: [
        ["8 (7172) 98-37-54", "tel:+77172983754"],
        ["8 (7172) 98-36-92", "tel:+77172983692"],
      ],
    },
    { label: t.compliance, numbers: [["8 (7172) 98-37-57", "tel:+77172983757"]] },
    { label: t.trust, numbers: [["8 708 425-21-62", "tel:+77084252162"]] },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-14">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h1>
        <a href="#directory" className="text-sm font-medium text-sky hover:underline">
          {t.directory}
        </a>
      </div>

      {/* Office */}
      <section
        aria-label={t.office}
        className="mt-8 grid overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-[1fr_1.3fr]"
      >
        <div className="space-y-6 border-b border-line p-6 md:p-8 lg:border-r lg:border-b-0">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
            <div>
              <p className="text-sm text-steel">{t.office}</p>
              <p className="mt-1 font-medium">{t.address}</p>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-medium text-sky hover:underline"
              >
                {t.map}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
            <div>
              <p className="text-sm text-steel">{t.hours}</p>
              <p className="tabular mt-1 font-medium">{t.hoursValue}</p>
              <p className="tabular text-sm text-steel">{t.lunch}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
            <div>
              <p className="text-sm text-steel">{t.email}</p>
              <a href="mailto:info@nca.kz" className="mt-1 inline-block font-medium hover:text-sky">
                info@nca.kz
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="flex items-center gap-3 text-sm text-steel">
            <Phone className="size-5 text-sky" aria-hidden />
            {t.lines}
          </h2>
          <ul className="mt-3 divide-y divide-line">
            {lines.map((l) => (
              <li
                key={l.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-sm leading-snug text-steel text-pretty">{l.label}</span>
                <span className="flex flex-col sm:items-end">
                  {l.numbers.map(([display, href]) => (
                    <a
                      key={href}
                      href={href}
                      className="tabular py-0.5 font-medium whitespace-nowrap hover:text-sky"
                    >
                      {display}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Staff directory */}
      <section id="directory" className="mt-16 scroll-mt-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.directory}</h2>
        <p className="mt-2 max-w-2xl text-steel">{t.directoryLead}</p>
        <div className="mt-6">
          <StaffDirectory t={t} />
        </div>
        <p className="mt-8 text-xs text-steel">{t.source}</p>
      </section>
    </div>
  );
}
