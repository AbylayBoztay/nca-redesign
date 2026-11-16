export const LOCALES = ["ru", "kk", "en"] as const;
export const DEFAULT_LOCALE = "ru";

export const LOCALE_LABELS: Record<(typeof LOCALES)[number], string> = {
  kk: "Қаз",
  ru: "Рус",
  en: "Eng",
};

export const SECTIONS = [
  { slug: "akkreditaciya", key: "accreditation" },
  { slug: "reestr", key: "registry" },
  { slug: "dokumenty", key: "documents" },
  { slug: "obuchenie", key: "training" },
  { slug: "o-centre", key: "about" },
  { slug: "novosti", key: "news" },
  { slug: "kontakty", key: "contacts" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];
