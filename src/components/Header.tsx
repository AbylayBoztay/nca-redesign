"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { LOCALES, LOCALE_LABELS, SECTIONS } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { lang: string; dict: Dictionary };

export default function Header({ lang, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <header className="border-b border-line bg-white">
      <div className="bg-ink text-xs text-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2">
          <p>{dict.concept}</p>
          <nav aria-label="Language" className="flex shrink-0 gap-1">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={`/${l}${rest}`}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`rounded px-2 py-0.5 ${
                  l === lang ? "bg-white text-ink" : "hover:text-white"
                }`}
              >
                {LOCALE_LABELS[l]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-10 place-items-center rounded-md bg-ink text-sm font-bold tracking-tight text-white"
          >
            {dict.org.short}
          </span>
          <span className="leading-tight">
            <span className="block font-semibold">{dict.org.full}</span>
            <span className="hidden max-w-xs text-xs text-steel sm:block">
              {dict.org.parent}
            </span>
          </span>
        </Link>

        <a
          href="tel:87172267272"
          className="hidden items-center gap-2 text-sm lg:flex"
        >
          <Phone className="size-4 text-sky" aria-hidden />
          <span>
            <span className="tabular block font-semibold">8 (7172) 26-72-72</span>
            <span className="text-xs text-steel">{dict.header.callCenter}</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="main-nav"
          className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          {open ? dict.header.close : dict.header.menu}
        </button>
      </div>

      <nav
        id="main-nav"
        aria-label="Main"
        className={`${open ? "block" : "hidden"} border-t border-line md:block`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 md:flex-row md:gap-1">
          {SECTIONS.map(({ slug, key }) => {
            const href = `/${lang}/${slug}`;
            const active = pathname.startsWith(href);
            return (
              <li key={slug}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block border-b-2 py-3 text-sm font-medium md:px-3 ${
                    active
                      ? "border-sky text-ink"
                      : "border-transparent text-steel hover:text-ink"
                  }`}
                >
                  {dict.nav[key]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
