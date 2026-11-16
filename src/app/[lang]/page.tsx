import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import RegistrySearch from "@/components/RegistrySearch";
import { news } from "@/data/news";

const TASK_LINKS = [
  "dokumenty",
  "akkreditaciya",
  "obuchenie",
  "o-centre",
  "reestr",
  "o-centre",
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <>
      {/* Hero: the registry check is the main job of the site */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 md:pt-20">
          <h1 className="max-w-3xl text-3xl leading-[1.15] font-semibold tracking-tight text-balance md:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-steel">{t.hero.lead}</p>
          <div className="mt-8 max-w-4xl">
            <RegistrySearch lang={lang} t={t.hero} />
          </div>
        </div>
      </section>

      {/* Accreditation process: a real sequence, so it is numbered */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.steps.title}
            </h2>
            <p className="mt-3 text-steel">{t.steps.lead}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href={`/${lang}/akkreditaciya`}
              className="rounded-lg border border-line bg-white px-5 py-3 text-sm font-medium hover:border-ink"
            >
              {t.steps.cost}
            </Link>
            <a
              href="https://techreg.gov.kz/index/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/90"
            >
              {t.steps.start}
            </a>
          </div>
        </div>

        <ol className="mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
          {t.steps.items.map((s, i) => (
            <li key={s.title} className="relative border-t-2 border-ink pt-5">
              <span className="tabular text-sm font-semibold text-sky">
                {i + 1}
              </span>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Common tasks + news */}
      <section className="mx-auto grid max-w-6xl gap-14 px-5 pt-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t.tasks.title}</h2>
          <ul className="mt-6 grid border-t border-line sm:grid-cols-2">
            {t.tasks.items.map((task, i) => (
              <li key={task.title} className="border-b border-line">
                <Link
                  href={`/${lang}/${TASK_LINKS[i]}`}
                  className="group block py-5 pr-6"
                >
                  <span className="font-medium group-hover:text-sky">
                    {task.title}
                  </span>
                  <span className="mt-1 block text-sm text-steel">{task.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">{t.news.title}</h2>
            <Link
              href={`/${lang}/novosti`}
              className="text-sm font-medium text-sky hover:underline"
            >
              {t.news.all}
            </Link>
          </div>
          <ul className="mt-6 space-y-6">
            {news.map((n) => (
              <li key={n.title}>
                <time dateTime={n.date} className="tabular text-sm text-steel">
                  {new Date(n.date).toLocaleDateString(
                    lang === "kk" ? "kk-KZ" : lang,
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </time>
                <p className="mt-1 leading-snug font-medium">{n.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
