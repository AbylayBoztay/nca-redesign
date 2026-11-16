"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, Search } from "lucide-react";
import { departments, phoneInfo } from "@/data/staff";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { t: Dictionary["contacts"] };

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-3 text-base focus:border-sky focus:outline-none";

export default function StaffDirectory({ t }: Props) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const digits = needle.replace(/\D/g, "");
    return departments
      .filter((d) => !dept || d.id === dept)
      .map((d) => ({
        ...d,
        people: d.people.filter((p) => {
          if (!needle) return true;
          const text = [p.name, p.position, p.email ?? "", d.title]
            .join(" ")
            .toLowerCase();
          const phone = (p.phone ?? "").replace(/\D/g, "");
          return text.includes(needle) || (digits.length >= 3 && phone.includes(digits));
        }),
      }))
      .filter((d) => d.people.length > 0);
  }, [q, dept]);

  return (
    <div>
      <div className="grid gap-2 md:grid-cols-[1fr_22rem]">
        <div className="relative">
          <label htmlFor="staff-q" className="sr-only">
            {t.search}
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-steel"
          />
          <input
            id="staff-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
            autoComplete="off"
            className={`${inputClass} pl-9`}
          />
        </div>
        <div>
          <label htmlFor="staff-dept" className="sr-only">
            {t.allDepartments}
          </label>
          <select
            id="staff-dept"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className={inputClass}
          >
            <option value="">{t.allDepartments}</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div aria-live="polite">
        {visible.length === 0 && (
          <p className="mt-6 rounded-lg border border-dashed border-line bg-white p-6 text-steel">
            {t.empty}
          </p>
        )}
      </div>

      <div className="mt-8 space-y-10">
        {visible.map((d) => (
          <section key={d.id} aria-labelledby={`dept-${d.id}`}>
            <h3
              id={`dept-${d.id}`}
              className="sticky top-0 z-10 flex items-baseline justify-between gap-4 border-b-2 border-ink bg-paper py-3 text-lg leading-snug font-semibold text-pretty"
            >
              <span>{d.title}</span>
              <span className="tabular shrink-0 text-sm font-normal text-steel">
                {d.people.length} {t.people}
              </span>
            </h3>

            <ul className="divide-y divide-line">
              {d.people.map((p) => {
                const phone = p.phone ? phoneInfo(p.phone) : null;
                return (
                  <li
                    key={`${p.name}-${p.position}`}
                    className="grid gap-x-6 gap-y-3 py-4 md:grid-cols-[minmax(0,1fr)_12rem_minmax(0,16rem)] md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="leading-snug font-medium text-pretty">{p.name}</p>
                      <p className="mt-0.5 text-sm leading-snug text-steel text-pretty">
                        {p.position}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:contents">
                      {phone ? (
                        <a
                          href={phone.href}
                          className="tabular inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm whitespace-nowrap hover:border-sky md:min-h-0 md:border-0 md:bg-transparent md:px-0 md:hover:text-sky"
                        >
                          <Phone className="size-4 shrink-0 text-sky" aria-hidden />
                          {phone.display}
                        </a>
                      ) : (
                        <span className="hidden text-sm text-steel/70 md:block">
                          {t.noPhone}
                        </span>
                      )}

                      {p.email && (
                        <a
                          href={`mailto:${p.email}`}
                          className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm hover:border-sky md:min-h-0 md:border-0 md:bg-transparent md:px-0 md:hover:text-sky"
                        >
                          <Mail className="size-4 shrink-0 text-sky" aria-hidden />
                          <span className="[overflow-wrap:anywhere]">{p.email}</span>
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
