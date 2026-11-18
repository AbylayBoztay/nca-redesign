import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary, hasLocale, type Dictionary } from "../../dictionaries";
import ApplicationForm from "@/components/ApplicationForm";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/obuchenie/zayavka">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: `${t.apply.title} — ${t.org.short}` };
}

export default async function ApplyPage({
  params,
  searchParams,
}: PageProps<"/[lang]/obuchenie/zayavka">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <Link
        href={`/${lang}/obuchenie`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-sky hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t.training.title}
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{t.apply.title}</h1>
      <p className="mt-2 text-steel">{t.apply.lead}</p>
      <p className="mt-1 text-sm text-warn">{t.apply.demo}</p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-96 rounded-lg border border-line bg-white" />}>
          <FormWithQuery lang={lang} t={t.apply} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

/** Reads ?session= / ?program= at request time; the rest of the page is static. */
async function FormWithQuery({
  lang,
  t,
  searchParams,
}: {
  lang: string;
  t: Dictionary["apply"];
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  return (
    <ApplicationForm
      lang={lang}
      t={t}
      initialProgram={one(sp.program)}
      initialSession={one(sp.session)}
    />
  );
}
