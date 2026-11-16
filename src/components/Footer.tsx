import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-24 bg-ink text-sm text-white/75">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-semibold text-white">{dict.org.full}</p>
          <p className="mt-2">{dict.org.parent}</p>
        </div>
        <address className="not-italic">
          <p>{dict.footer.address}</p>
          <p className="mt-2">
            <a href={`mailto:${dict.footer.email}`} className="text-white hover:underline">
              {dict.footer.email}
            </a>
          </p>
        </address>
        <div className="tabular space-y-2">
          <p>
            {dict.header.callCenter}:{" "}
            <a href="tel:87172267272" className="text-white hover:underline">
              8 (7172) 26-72-72
            </a>
          </p>
          <p>
            {dict.footer.trust}:{" "}
            <a href="tel:87084252162" className="text-white hover:underline">
              8 708 425-21-62
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-white/50">
          {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
