import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";
import {
  DURATION_DAYS,
  PRICE_OFFLINE,
  PRICE_ONLINE,
  formatRange,
  formatTenge,
  getProgram,
  programs,
} from "@/data/training";
import { getUpcoming } from "@/lib/training-server";
import { departments, phoneInfo } from "@/data/staff";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/obuchenie">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: `${t.training.title} — ${t.org.short}` };
}

export default async function TrainingPage({
  params,
}: PageProps<"/[lang]/obuchenie">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.training;
  const upcoming = await getUpcoming();
  const contacts =
    departments.find((d) => d.id === "training")?.people ?? [];

  const applyHref = (q: string) => `/${lang}/obuchenie/zayavka?${q}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-steel">{t.lead}</p>

      {/* Key facts */}
      <dl className="mt-8 grid overflow-hidden rounded-lg border border-line bg-white sm:grid-cols-3">
        <div className="border-b border-line p-5 sm:border-r sm:border-b-0">
          <dt className="text-sm text-steel">{t.facts.durationNote}</dt>
          <dd className="mt-1 text-xl font-semibold">
            {t.facts.duration.replace("3", String(DURATION_DAYS))}
          </dd>
        </div>
        <div className="border-b border-line p-5 sm:border-r sm:border-b-0">
          <dt className="text-sm text-steel">
            {t.facts.online}, {t.facts.perPerson}
          </dt>
          <dd className="tabular mt-1 text-xl font-semibold">{formatTenge(PRICE_ONLINE)}</dd>
        </div>
        <div className="p-5">
          <dt className="text-sm text-steel">
            {t.facts.offline} ({t.facts.cities}), {t.facts.perPerson}
          </dt>
          <dd className="tabular mt-1 text-xl font-semibold">{formatTenge(PRICE_OFFLINE)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-steel">{t.priceNote}</p>

      {/* Upcoming sessions */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">{t.upcoming}</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line bg-white p-6 text-steel">
            {t.noUpcoming}
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
            {upcoming.map((s) => {
              const p = getProgram(s.programId)!;
              return (
                <li
                  key={s.id}
                  className="grid gap-x-6 gap-y-3 p-5 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                >
                  <p className="tabular font-semibold">{formatRange(s.start, s.end, lang)}</p>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-sky">{p.standard}</p>
                    <p className="mt-0.5 leading-snug text-pretty">{p.title}</p>
                  </div>
                  <Link
                    href={applyHref(`session=${s.id}`)}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-ink/90"
                  >
                    {t.apply}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* How to enroll — a real sequence */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">{t.how}</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-4">
              <span className="tabular text-sm font-semibold text-sky">{i + 1}</span>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-steel">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* All programs */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">{t.programs}</h2>
        <ul className="mt-5 grid border-t border-line md:grid-cols-2 md:gap-x-10">
          {programs.map((p) => {
            const next = upcoming.filter((s) => s.programId === p.id);
            return (
              <li key={p.id} className="flex flex-col gap-3 border-b border-line py-5">
                <div>
                  <p className="text-sm font-medium text-sky">{p.standard}</p>
                  <p className="mt-0.5 leading-snug font-medium text-pretty">{p.title}</p>
                  <p className="mt-1 text-sm text-steel">{p.audience}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  {next.length > 0 ? (
                    next.map((s) => (
                      <Link
                        key={s.id}
                        href={applyHref(`session=${s.id}`)}
                        className="tabular rounded-full border border-line bg-white px-3 py-1.5 hover:border-sky"
                      >
                        {formatRange(s.start, s.end, lang)}
                      </Link>
                    ))
                  ) : (
                    <span className="text-steel">
                      {t.onRequest}. {t.onRequestNote}
                    </span>
                  )}
                  <Link
                    href={applyHref(`program=${p.id}`)}
                    className="font-medium text-sky hover:underline"
                  >
                    {t.apply}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Contacts */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">{t.contacts}</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {contacts.map((c) => {
            const ph = c.phone ? phoneInfo(c.phone) : null;
            return (
              <li key={c.name} className="rounded-lg border border-line bg-white p-5">
                <p className="leading-snug font-medium text-pretty">{c.name}</p>
                <p className="mt-0.5 text-sm text-steel">{c.position}</p>
                <div className="mt-3 space-y-1.5 text-sm">
                  {ph && (
                    <a href={ph.href} className="tabular flex items-center gap-2 hover:text-sky">
                      <Phone className="size-4 text-sky" aria-hidden />
                      {ph.display}
                    </a>
                  )}
                  {c.email && (
                    <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-sky">
                      <Mail className="size-4 text-sky" aria-hidden />
                      <span className="[overflow-wrap:anywhere]">{c.email}</span>
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
