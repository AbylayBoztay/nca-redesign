// Demo data only. Organization names are invented.
export type RegistryStatus = "active" | "suspended" | "expired";

export type RegistryEntry = {
  id: string;
  certificate: string;
  name: string;
  bin: string;
  kind: string;
  standard: string;
  city: string;
  validUntil: string; // ISO date
  status: RegistryStatus;
  issued: string; // ISO date
  scope: string;
  address: string;
};

export const registry: RegistryEntry[] = [
  {
    id: "t-02-0347",
    certificate: "KZ.T.02.0347",
    name: "Испытательная лаборатория ТОО «Сарыарка Тест»",
    bin: "150940012345",
    kind: "Испытательная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Караганда",
    validUntil: "2029-04-18",
    status: "active",
    issued: "2024-04-18",
    scope: "Испытания строительных материалов, бетонов и растворов; физико-механические показатели",
    address: "г. Караганда, ул. Ерубаева, 12",
  },
  {
    id: "o-02-1182",
    certificate: "KZ.O.02.1182",
    name: "Орган по сертификации продукции ТОО «ЕвразСерт»",
    bin: "180240098761",
    kind: "Орган по подтверждению соответствия",
    standard: "ISO/IEC 17065",
    city: "Астана",
    validUntil: "2028-11-02",
    status: "active",
    issued: "2023-11-02",
    scope: "Сертификация пищевой продукции и упаковки на соответствие ТР ТС 021/2011, 005/2011",
    address: "г. Астана, пр. Кабанбай батыра, 40",
  },
  {
    id: "t-17-0912",
    certificate: "KZ.T.17.0912",
    name: "Медицинская лаборатория «Алатау Диагностика»",
    bin: "200540033210",
    kind: "Медицинская лаборатория",
    standard: "ISO 15189",
    city: "Алматы",
    validUntil: "2027-06-30",
    status: "suspended",
    issued: "2022-06-30",
    scope: "Клинико-диагностические исследования: гематология, биохимия, иммунология",
    address: "г. Алматы, ул. Тимирязева, 71",
  },
  {
    id: "p-01-0214",
    certificate: "KZ.П.01.0214",
    name: "Поверочная лаборатория АО «Каспий Метрология»",
    bin: "090140056789",
    kind: "Поверочная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Атырау",
    validUntil: "2026-03-14",
    status: "expired",
    issued: "2021-03-14",
    scope: "Поверка средств измерений давления, температуры и массы",
    address: "г. Атырау, ул. Сатпаева, 5",
  },
  {
    id: "t-04-0558",
    certificate: "KZ.T.04.0558",
    name: "Испытательный центр строительных материалов «Ертіс Құрылыс Сынақ»",
    bin: "170640021987",
    kind: "Испытательная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Павлодар",
    validUntil: "2030-01-22",
    status: "active",
    issued: "2025-01-22",
    scope: "Испытания цемента, щебня, кирпича и железобетонных изделий",
    address: "г. Павлодар, ул. Торайгырова, 64",
  },
  {
    id: "i-03-0076",
    certificate: "KZ.И.03.0076",
    name: "Орган инспекции ТОО «Шымкент Инспекция»",
    bin: "210840044556",
    kind: "Орган инспекции",
    standard: "ISO/IEC 17020",
    city: "Шымкент",
    validUntil: "2028-09-09",
    status: "active",
    issued: "2023-09-09",
    scope: "Инспекция подъёмных сооружений и сосудов под давлением",
    address: "г. Шымкент, пр. Республики, 18",
  },
  {
    id: "t-02-0611",
    certificate: "KZ.T.02.0611",
    name: "Лаборатория качества нефтепродуктов ТОО «Жайык Ойл Лаб»",
    bin: "160340077120",
    kind: "Испытательная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Уральск",
    validUntil: "2029-08-15",
    status: "active",
    issued: "2024-08-15",
    scope: "Испытания бензина, дизельного топлива и мазута",
    address: "г. Уральск, ул. Достык, 201",
  },
  {
    id: "o-03-0430",
    certificate: "KZ.O.03.0430",
    name: "Орган по сертификации систем менеджмента «QazCert Systems»",
    bin: "190140065432",
    kind: "Орган по подтверждению соответствия",
    standard: "ISO/IEC 17021-1",
    city: "Астана",
    validUntil: "2027-12-01",
    status: "active",
    issued: "2022-12-01",
    scope: "Сертификация систем менеджмента качества ISO 9001 и ISO 14001",
    address: "г. Астана, ул. Сыганак, 25",
  },
  {
    id: "t-17-1045",
    certificate: "KZ.T.17.1045",
    name: "Медицинская лаборатория ТОО «Тараз Мед Лаб»",
    bin: "220240019876",
    kind: "Медицинская лаборатория",
    standard: "ISO 15189",
    city: "Тараз",
    validUntil: "2030-05-20",
    status: "active",
    issued: "2025-05-20",
    scope: "Общеклинические, биохимические и ПЦР-исследования",
    address: "г. Тараз, ул. Толе би, 93",
  },
  {
    id: "t-05-0288",
    certificate: "KZ.T.05.0288",
    name: "Испытательная лаборатория пищевой продукции «Шығыс Сапа»",
    bin: "140840043218",
    kind: "Испытательная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Усть-Каменогорск",
    validUntil: "2027-02-11",
    status: "suspended",
    issued: "2022-02-11",
    scope: "Микробиологические и физико-химические испытания пищевой продукции",
    address: "г. Усть-Каменогорск, ул. Казахстан, 55",
  },
  {
    id: "p-02-0133",
    certificate: "KZ.П.02.0133",
    name: "Калибровочная лаборатория АО «Ақтөбе Эталон»",
    bin: "100540087654",
    kind: "Поверочная лаборатория",
    standard: "ISO/IEC 17025",
    city: "Актобе",
    validUntil: "2028-07-07",
    status: "active",
    issued: "2023-07-07",
    scope: "Калибровка электроизмерительных приборов и средств измерения длины",
    address: "г. Актобе, пр. Абилкайыр хана, 44",
  },
  {
    id: "i-01-0019",
    certificate: "KZ.И.01.0019",
    name: "Орган инспекции транспортных средств «Алматы Техинспект»",
    bin: "130440012399",
    kind: "Орган инспекции",
    standard: "ISO/IEC 17020",
    city: "Алматы",
    validUntil: "2025-10-30",
    status: "expired",
    issued: "2020-10-30",
    scope: "Инспекция колёсных транспортных средств на соответствие ТР ТС 018/2011",
    address: "г. Алматы, ул. Рыскулова, 140",
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

export const getEntry = (id: string) => registry.find((e) => e.id === id);

export const unique = (key: "kind" | "standard" | "city") =>
  [...new Set(registry.map((e) => e[key]))].sort((a, b) => a.localeCompare(b, "ru"));
