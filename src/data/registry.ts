// Demo data only. Organization names are invented.
export type RegistryStatus = "active" | "suspended" | "expired";

export type RegistryEntry = {
  certificate: string;
  name: string;
  bin: string;
  kind: string;
  standard: string;
  city: string;
  validUntil: string; // ISO date
  status: RegistryStatus;
};

export const registry: RegistryEntry[] = [
  {
    certificate: "KZ.T.02.0347",
    name: "Испытательная лаборатория ТОО «Сарыарка Тест»",
    bin: "150940012345",
    kind: "Испытательная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Караганда",
    validUntil: "2029-04-18",
    status: "active",
  },
  {
    certificate: "KZ.O.02.1182",
    name: "Орган по сертификации продукции ТОО «ЕвразСерт»",
    bin: "180240098761",
    kind: "Орган по подтверждению соответствия",
    standard: "ISO/IEC 17065",
    city: "Астана",
    validUntil: "2028-11-02",
    status: "active",
  },
  {
    certificate: "KZ.T.17.0912",
    name: "Медицинская лаборатория «Алатау Диагностика»",
    bin: "200540033210",
    kind: "Медицинская лаборатория",
    standard: "ISO 15189",
    city: "Алматы",
    validUntil: "2027-06-30",
    status: "suspended",
  },
  {
    certificate: "KZ.П.01.0214",
    name: "Поверочная лаборатория АО «Каспий Метрология»",
    bin: "090140056789",
    kind: "Поверочная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Атырау",
    validUntil: "2026-03-14",
    status: "expired",
  },
  {
    certificate: "KZ.T.04.0558",
    name: "Испытательный центр строительных материалов «Ертіс Құрылыс Сынақ»",
    bin: "170640021987",
    kind: "Испытательная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Павлодар",
    validUntil: "2030-01-22",
    status: "active",
  },
  {
    certificate: "KZ.И.03.0076",
    name: "Орган инспекции ТОО «Шымкент Инспекция»",
    bin: "210840044556",
    kind: "Орган инспекции",
    standard: "ISO/IEC 17020",
    city: "Шымкент",
    validUntil: "2028-09-09",
    status: "active",
  },
];

export function searchRegistry(query: string): RegistryEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return registry.filter((e) =>
    [e.certificate, e.name, e.bin, e.city, e.kind, e.standard]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
