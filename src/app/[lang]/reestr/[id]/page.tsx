import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary, hasLocale, locales } from "../../dictionaries";
import { getEntry, registry } from "@/data/registry";
import { formatDate } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";

export function generateStaticParams() {
  return locales.flatMap((lang) => registry.map((e) => ({ lang, id: e.id })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/reestr/[id]">): Promise<Metadata> {
  const { id } = await params;
  const entry = getEntry(id);
  return entry ? { title: `${entry.certificate} — ${entry.name}` } : {};
}

export default async function EntryPage({
  params,
}: PageProps<"/[lang]/reestr/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const entry = getEntry(id);
  if (!entry) notFound();
  const t = await getDictionary(lang);
  const d = t.registry.detail;

  const facts: [string, string][] = [
    [d.kind, entry.kind],
    [d.standard, entry.standard],
    [d.bin, entry.bin],
    [d.issued, formatDate(entry.issued, lang)],
    [d.validUntil, formatDate(entry.validUntil, lang)],
    [d.address, entry.address],
  ];

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <Link
        href={`/${lang}/reestr`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-sky hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {d.back}
      </Link>

      <article className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
        <header className="border-b border-line p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="tabular text-2xl font-semibold tracking-tight md:text-3xl">
              {entry.certificate}
            </p>
            <StatusBadge status={entry.status} label={t.hero.status[entry.status]} />
          </div>
          <h1 className="mt-3 text-xl leading-snug font-medium md:text-2xl">
            {entry.name}
          </h1>
        </header>

        <dl className="grid sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="border-b border-line px-6 py-4 md:px-8 sm:odd:border-r">
              <dt className="text-xs text-steel">{label}</dt>
              <dd className="tabular mt-1">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="p-6 md:p-8">
          <h2 className="text-xs text-steel">{d.scope}</h2>
          <p className="mt-1 max-w-prose leading-relaxed">{entry.scope}</p>
        </div>
      </article>

      <p className="mt-4 text-xs text-steel">{d.demo}</p>
    </section>
  );
}
