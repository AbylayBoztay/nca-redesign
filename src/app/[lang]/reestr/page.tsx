import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import RegistryTable from "@/components/RegistryTable";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/reestr">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: `${t.registry.title} — ${t.org.short}` };
}

export default async function RegistryPage({
  params,
}: PageProps<"/[lang]/reestr">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {t.registry.title}
      </h1>
      <p className="mt-3 max-w-2xl text-steel">{t.registry.lead}</p>
      <div className="mt-8">
        <RegistryTable lang={lang} t={t.registry} statusLabels={t.hero.status} />
      </div>
    </section>
  );
}
