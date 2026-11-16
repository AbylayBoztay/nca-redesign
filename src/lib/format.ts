export const formatDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "kk" ? "kk-KZ" : lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
