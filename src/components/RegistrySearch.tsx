"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { searchRegistry } from "@/data/registry";
import { formatDate } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const EXAMPLES = ["KZ.T.02.0347", "ISO 15189", "Алматы"];
const MAX_RESULTS = 5;

type Props = { lang: string; t: Dictionary["hero"] };

export default function RegistrySearch({ lang, t }: Props) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const results = searchRegistry(submitted);

  const run = (q: string) => {
    setQuery(q);
    setSubmitted(q);
  };

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(query);
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="registry-q" className="sr-only">
          {t.placeholder}
        </label>
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-steel"
          />
          <input
            id="registry-q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            autoComplete="off"
            className="w-full rounded-lg border border-line bg-white py-4 pr-4 pl-12 text-base shadow-[0_1px_0_var(--color-line)] placeholder:text-steel/70 focus:border-sky focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-ink px-7 py-4 font-semibold text-white hover:bg-ink/90"
        >
          {t.search}
        </button>
      </form>

      <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-steel">
        {t.examples}
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => run(ex)}
            className="tabular rounded-full border border-line bg-white px-3 py-1 text-ink hover:border-sky"
          >
            {ex}
          </button>
        ))}
      </p>

      <div aria-live="polite" className="mt-6">
        {submitted && results.length === 0 && (
          <p className="rounded-lg border border-dashed border-line bg-white p-5 text-steel">
            {t.nothing}
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="mb-3 text-sm text-steel">
              {t.found}: {results.length}
            </p>
            <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
              {results.slice(0, MAX_RESULTS).map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/${lang}/reestr/${r.id}`}
                    className="grid gap-x-6 gap-y-2 p-5 hover:bg-paper sm:grid-cols-[11rem_1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-xs text-steel">{t.certificate}</p>
                      <p className="tabular text-lg font-semibold tracking-tight">
                        {r.certificate}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="mt-1 text-sm text-steel">
                        {r.kind}, {r.standard}, {r.city}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <StatusBadge status={r.status} label={t.status[r.status]} />
                      <p className="tabular mt-1 text-xs text-steel">
                        {r.status === "expired"
                          ? formatDate(r.validUntil, lang)
                          : `${t.validUntil} ${formatDate(r.validUntil, lang)}`}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/${lang}/reestr`}
              className="mt-4 inline-block text-sm font-medium text-sky hover:underline"
            >
              {t.allResults}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
