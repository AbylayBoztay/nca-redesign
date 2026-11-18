// Training programs from the NCA "Calendar plan 2026" (approved 23.04.2026)
// and upcoming sessions published on nca.kz/landings/learning (November 2026).

export const PRICE_ONLINE = 89_711; // tenge per participant, VAT included
export const PRICE_OFFLINE = 103_847;
export const DURATION_DAYS = 3;

export type Program = {
  id: string;
  standard: string;
  title: string;
  audience: string;
};

export const programs: Program[] = [
  {
    id: "17025",
    standard: "ГОСТ ISO/IEC 17025-2019",
    title: "Общие требования к компетентности испытательных и калибровочных лабораторий",
    audience: "Испытательные и калибровочные лаборатории",
  },
  {
    id: "15189",
    standard: "СТ РК ISO 15189-2023",
    title: "Лаборатории медицинские. Требования к качеству и компетентности",
    audience: "Медицинские лаборатории",
  },
  {
    id: "17065",
    standard: "ГОСТ ISO/IEC 17065-2013",
    title: "Требования к органам по сертификации продукции, процессов и услуг",
    audience: "Органы по сертификации продукции",
  },
  {
    id: "17021",
    standard: "СТ РК ISO/IEC 17021-1-2015",
    title: "Требования к органам, проводящим аудит и сертификацию систем менеджмента",
    audience: "Органы по сертификации систем менеджмента",
  },
  {
    id: "17020",
    standard: "ГОСТ ISO/IEC 17020-2013",
    title: "Требования к работе различных типов органов, проводящих инспекции",
    audience: "Органы инспекции",
  },
  {
    id: "17043",
    standard: "ГОСТ ISO/IEC 17043",
    title: "Общие требования к компетентности провайдеров проверки квалификации",
    audience: "Провайдеры проверки квалификации",
  },
  {
    id: "17024",
    standard: "ГОСТ ISO/IEC 17024-2014",
    title: "Органы по подтверждению соответствия персонала",
    audience: "Органы по сертификации персонала",
  },
  {
    id: "17029",
    standard: "СТ РК ISO/IEC 17029-2020, СТ РК ISO 14065-2022",
    title: "Требования к органам по валидации и верификации, в том числе экологической информации",
    audience: "Органы по валидации и верификации",
  },
  {
    id: "17034",
    standard: "СТ РК ISO 17034-2020",
    title: "Общие требования к компетенции производителей стандартных образцов",
    audience: "Производители стандартных образцов",
  },
  {
    id: "halal",
    standard: "СТ РК OIC/SMIIC 2-2022",
    title: "Требования к органам, осуществляющим Халал сертификацию",
    audience: "Органы по Халал сертификации",
  },
  {
    id: "metrology",
    standard: "СТ РК 7.6-2009",
    title: "Аккредитация на право метрологической аттестации методик выполнения измерений",
    audience: "Метрологические службы",
  },
  {
    id: "biobank",
    standard: "СТ РК ISO 20387-2019",
    title: "Биотехнология. Биобанкинг. Общие требования к биобанкингу",
    audience: "Биобанки",
  },
  {
    id: "glp",
    standard: "СТ РК 1613-2017",
    title: "Принципы надлежащей лабораторной практики (GLP)",
    audience: "Лаборатории доклинических исследований",
  },
];

export type Session = {
  id: string;
  programId: Program["id"];
  start: string; // ISO date
  end: string;
};

export const sessions: Session[] = [
  { id: "17065-2611", programId: "17065", start: "2026-11-23", end: "2026-11-25" },
  { id: "17025-2611", programId: "17025", start: "2026-11-24", end: "2026-11-26" },
  { id: "17043-2612", programId: "17043", start: "2026-12-01", end: "2026-12-03" },
  { id: "17025-2612a", programId: "17025", start: "2026-12-08", end: "2026-12-10" },
  { id: "15189-2612", programId: "15189", start: "2026-12-22", end: "2026-12-24" },
  { id: "17025-2612b", programId: "17025", start: "2026-12-22", end: "2026-12-24" },
];

export const getProgram = (id: string) => programs.find((p) => p.id === id);
export const getSession = (id: string) => sessions.find((s) => s.id === id);

export const upcomingSessions = (today = new Date()) => {
  const t = today.toISOString().slice(0, 10);
  return sessions
    .filter((s) => s.start >= t)
    .sort((a, b) => a.start.localeCompare(b.start));
};

export const sessionsFor = (programId: string, today = new Date()) =>
  upcomingSessions(today).filter((s) => s.programId === programId);

export const formatTenge = (n: number) =>
  `${new Intl.NumberFormat("ru-RU").format(n)} ₸`;

export function formatRange(start: string, end: string, lang: string) {
  const loc = lang === "kk" ? "kk-KZ" : lang;
  const s = new Date(start);
  const e = new Date(end);
  const sameMonth = s.getMonth() === e.getMonth();
  const day = (d: Date) => d.toLocaleDateString(loc, { day: "numeric" });
  const full = (d: Date) =>
    d.toLocaleDateString(loc, { day: "numeric", month: "long" });
  return sameMonth ? `${day(s)}–${full(e)}` : `${full(s)} – ${full(e)}`;
}
