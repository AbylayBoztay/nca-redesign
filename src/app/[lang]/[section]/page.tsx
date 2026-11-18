import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "../dictionaries";
import { SECTIONS } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    SECTIONS.filter((s) => !["reestr", "kontakty", "obuchenie"].includes(s.slug)).map(({ slug }) => ({
      lang,
      section: slug,
    })),
  );
}

export default async function SectionStub({
  params,
}: PageProps<"/[lang]/[section]">) {
  const { lang, section } = await params;
  if (!hasLocale(lang)) notFound();
  const found = SECTIONS.find((s) => s.slug === section);
  if (!found) notFound();
  const t = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {t.nav[found.key]}
      </h1>
      <div className="mt-8 max-w-xl rounded-lg border border-dashed border-line bg-white p-6">
        <p className="font-medium">{t.stub.title}</p>
        <p className="mt-1 text-steel">{t.stub.text}</p>
        <Link
          href={`/${lang}`}
          className="mt-4 inline-block text-sm font-medium text-sky hover:underline"
        >
          {t.stub.back}
        </Link>
      </div>
    </section>
  );
}
