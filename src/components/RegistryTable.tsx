"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  registry,
  unique,
  type RegistryStatus,
} from "@/data/registry";
import { formatDate } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  lang: string;
  t: Dictionary["registry"];
  statusLabels: Dictionary["hero"]["status"];
};

const KINDS = unique("kind");
const STANDARDS = unique("standard");
const CITIES = unique("city");
const STATUSES: RegistryStatus[] = ["active", "suspended", "expired"];

const selectClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-sky focus:outline-none";

export default function RegistryTable({ lang, t, statusLabels }: Props) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("");
  const [standard, setStandard] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return registry.filter(
      (e) =>
        (!needle ||
          [e.certificate, e.name, e.bin].join(" ").toLowerCase().includes(needle)) &&
        (!kind || e.kind === kind) &&
        (!standard || e.standard === standard) &&
        (!city || e.city === city) &&
        (!status || e.status === status),
    );
  }, [q, kind, standard, city, status]);

  const filtered = q || kind || standard || city || status;
  const reset = () => {
    setQ("");
    setKind("");
    setStandard("");
    setCity("");
    setStatus("");
  };

  const filters = [
    { id: "f-kind", label: t.kind, value: kind, set: setKind, options: KINDS.map((v) => [v, v]) },
    { id: "f-standard", label: t.standard, value: standard, set: setStandard, options: STANDARDS.map((v) => [v, v]) },
    { id: "f-city", label: t.city, value: city, set: setCity, options: CITIES.map((v) => [v, v]) },
    { id: "f-status", label: t.status, value: status, set: setStatus, options: STATUSES.map((s) => [s, statusLabels[s]]) },
  ];

  return (
    <div>
      <div className="grid gap-3 rounded-lg border border-line bg-white p-4 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
        <div className="relative">
          <label htmlFor="f-q" className="sr-only">
            {t.search}
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-steel"
          />
          <input
            id="f-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
            autoComplete="off"
            className={`${selectClass} pl-9`}
          />
        </div>
        {filters.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="sr-only">
              {f.label}
            </label>
            <select
              id={f.id}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className={selectClass}
            >
              <option value="">{f.label}</option>
              {f.options.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-steel">
        <p aria-live="polite" className="tabular">
          {t.shown} {rows.length} {t.of} {registry.length}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="font-medium text-sky hover:underline"
          >
            {t.reset}
          </button>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-line bg-white p-6 text-steel">
          {t.empty}
        </p>
      ) : (
        <>
          {/* Desktop: table */}
          <div className="mt-4 hidden overflow-hidden rounded-lg border border-line bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs text-steel">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">{t.cols.certificate}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{t.cols.name}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{t.cols.city}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{t.cols.validUntil}</th>
                  <th scope="col" className="px-4 py-3 font-medium">{t.cols.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-paper">
                    <td className="tabular px-4 py-4 font-semibold whitespace-nowrap">
                      {r.certificate}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/${lang}/reestr/${r.id}`}
                        className="font-medium hover:text-sky hover:underline"
                      >
                        {r.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-steel">
                        {r.kind}, {r.standard}
                      </p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{r.city}</td>
                    <td className="tabular px-4 py-4 whitespace-nowrap">
                      {formatDate(r.validUntil, lang)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={r.status} label={statusLabels[r.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: list */}
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white md:hidden">
            {rows.map((r) => (
              <li key={r.id}>
                <Link href={`/${lang}/reestr/${r.id}`} className="block p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="tabular font-semibold">{r.certificate}</p>
                    <StatusBadge status={r.status} label={statusLabels[r.status]} />
                  </div>
                  <p className="mt-1 font-medium">{r.name}</p>
                  <p className="tabular mt-1 text-xs text-steel">
                    {r.city}, {t.cols.validUntil.toLowerCase()} {formatDate(r.validUntil, lang)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
