// Staff directory as published on nca.kz/contacts (November 2026).
// Phones are internal numbers: 98-xx-xx — Astana (8 7172), 224-xx-xx — Almaty office.

export type Person = {
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
};

export type Department = { id: string; title: string; people: Person[] };

export const departments: Department[] = [
  {
    "id": "leadership",
    "title": "Руководство",
    "people": [
      {
        "name": "Абилдабеков Айдар Ахметбекович",
        "position": "Генеральный директор",
        "phone": "98-37-01",
        "email": "info@nca.kz"
      },
      {
        "name": "Қарасаев Ержан Жарылғапұлы",
        "position": "Первый заместитель Генерального директора",
        "phone": "98-37-01",
        "email": "info@nca.kz"
      },
      {
        "name": "Мамбетаев Арман Орынбасарович",
        "position": "Заместитель Генерального директора",
        "phone": "98-37-01",
        "email": "info@nca.kz"
      },
      {
        "name": "Арыстанбаев Ален Муханбетович",
        "position": "Руководитель аппарата",
        "phone": "98-37-01",
        "email": "info@nca.kz"
      }
    ]
  },
  {
    "id": "quality",
    "title": "Представитель руководства по качеству",
    "people": [
      {
        "name": "Кенжеева Жанат Жанбырбаевна",
        "position": "Представитель руководства по качеству",
        "phone": "98-37-33",
        "email": "j.kenjeeva@nca.kz"
      }
    ]
  },
  {
    "id": "calibration-labs",
    "title": "Управление аккредитации поверочных и калибровочных лабораторий",
    "people": [
      {
        "name": "Бекенова Айна Нурмагамбетовна",
        "position": "Руководитель",
        "phone": "98-37-56",
        "email": "a.bekenova@nca.kz"
      },
      {
        "name": "Омарова Асель Аманбаевна",
        "position": "Оценщик",
        "phone": null,
        "email": "a.omarova@nca.kz"
      },
      {
        "name": "Калыков Ердос Канатович",
        "position": "Оценщик",
        "phone": null,
        "email": "e.kalykov@nca.kz"
      },
      {
        "name": "Байбетова Гулжан Жарлыкасымовна",
        "position": "Оценщик",
        "phone": "224-77-40",
        "email": "g.baybetova@nca.kz"
      },
      {
        "name": "Орымбаева Гульмира Булатовна",
        "position": "Ведущий специалист",
        "phone": "98-37-79",
        "email": "g.orymbaeva@nca.kz"
      }
    ]
  },
  {
    "id": "testing-labs",
    "title": "Управление аккредитации испытательных лабораторий",
    "people": [
      {
        "name": "Алькеева Гульнар Сагинбаевна",
        "position": "Руководитель",
        "phone": "98-37-06",
        "email": "g.alkeeva@nca.kz"
      },
      {
        "name": "Дюсекенова Наргиз Бауржановна",
        "position": "Главный специалист",
        "phone": "98-36-94",
        "email": "nargiza.dyussekenova@nca.kz"
      },
      {
        "name": "Давлетова Гульнур Байдешовна",
        "position": "Оценщик",
        "phone": "98-36-83",
        "email": "g.davletova@nca.kz"
      },
      {
        "name": "Садыкова Жазира Есенгараевна",
        "position": "Оценщик",
        "phone": "98-36-90",
        "email": "zh.kobzhassarova@nca.kz"
      },
      {
        "name": "Раимбекова Эльвира",
        "position": "Оценщик",
        "phone": "98-37-71",
        "email": "e.raimbekova@nca.kz"
      },
      {
        "name": "Мухамедьярова Салтанат Жауынбаевна",
        "position": "Оценщик",
        "phone": "98-37-65",
        "email": "s.muhamed@nca.kz"
      },
      {
        "name": "Баймурзина Меруерт Ахметовна",
        "position": "Оценщик",
        "phone": "224-77-40",
        "email": "m.baimurzina@nca.kz"
      },
      {
        "name": "Сулейманов Амил Фазил-огли",
        "position": "Оценщик",
        "phone": "224-77-36",
        "email": "a.suleimanov@nca.kz"
      },
      {
        "name": "Батырханова Шынар Хабиденовна",
        "position": "Главный специалист",
        "phone": null,
        "email": "sh.batyrhanova@nca.kz"
      },
      {
        "name": "Жалгасова Жанна Куандыковна",
        "position": "Оценщик",
        "phone": null,
        "email": "zh.orazalieva@nca.kz"
      },
      {
        "name": "Оразалина Раушан Жанабыловна",
        "position": "Оценщик",
        "phone": "224-77-40",
        "email": "r.orazalina@nca.kz"
      },
      {
        "name": "Нығыметуллақызы Әйгерім",
        "position": "Главный специалист",
        "phone": null,
        "email": "a.nygymetullakyzy@nca.kz"
      },
      {
        "name": "Ермухаметова Жазира Жумабековна",
        "position": "Главный специалист",
        "phone": null,
        "email": "z.ermuhametova@nca.kz"
      },
      {
        "name": "Тойшибекова Галия Коныспаевна",
        "position": "Главный специалист",
        "phone": "98-36-86",
        "email": "g.toishibekova@nca.kz"
      }
    ]
  },
  {
    "id": "certification-bodies",
    "title": "Управление аккредитации органов сертификации",
    "people": [
      {
        "name": "Жанатханұлы Аслан",
        "position": "Руководитель",
        "phone": "98-37-13",
        "email": "a.zhanatkhanuly@nca.kz"
      },
      {
        "name": "Куттыбаев Баглан Сарсенбаевич",
        "position": "Оценщик",
        "phone": "98-37-60",
        "email": "b.kuttybaev@nca.kz"
      },
      {
        "name": "Абильдина Дана Егимбаевна",
        "position": "Оценщик",
        "phone": "98-37-16",
        "email": "d.abildina@nca.kz"
      },
      {
        "name": "Смагулова Ляззат Курмашовна",
        "position": "Оценщик",
        "phone": "224-77-41",
        "email": "l.smagulova@nca.kz"
      },
      {
        "name": "Мухаметжанов Нуржан Серикович",
        "position": "Главный специалист",
        "phone": "98-37-76",
        "email": "n.mukhametzhanov@nca.kz"
      },
      {
        "name": "Мұратбекқызы Ақбота",
        "position": "Главный специалист",
        "phone": "98-37-37",
        "email": "a.muratbekqyzy@nca.kz"
      }
    ]
  },
  {
    "id": "economics",
    "title": "Управление экономики и планирования",
    "people": [
      {
        "name": "Абатов Бакытбек Тулепбергенович",
        "position": "Руководитель",
        "phone": "98-37-17",
        "email": "b.abatov@nca.kz"
      },
      {
        "name": "Шарипова Айжан Кенжебайкызы",
        "position": "Главный специалист",
        "phone": "98-37-20",
        "email": "a.sharipova@nca.kz"
      },
      {
        "name": "Мельник Александр Александрович",
        "position": "Главный специалист",
        "phone": "98-37-42",
        "email": "a.melnik@nca.kz"
      },
      {
        "name": "Турегазина Дана Бейсенбековна",
        "position": "Главный специалист",
        "phone": "98-37-23",
        "email": "d.turegazina@nca.kz"
      },
      {
        "name": "Кусмагамбетова Булбул Рымбековна",
        "position": "Главный специалист",
        "phone": "98-36-96",
        "email": "b.kusmagambetova@nca.kz"
      }
    ]
  },
  {
    "id": "accounting",
    "title": "Отдел бухгалтерского учета",
    "people": [
      {
        "name": "Уралова Куляш Алдамжаровна",
        "position": "Главный бухгалтер-руководитель",
        "phone": "98-37-14",
        "email": "k.uralova@nca.kz"
      },
      {
        "name": "Наканова Дана Талгатовна",
        "position": "Ведущий бухгалтер",
        "phone": "98-37-02",
        "email": "d.nakanova@nca.kz"
      }
    ]
  },
  {
    "id": "commission",
    "title": "Комиссия по аккредитации",
    "people": [
      {
        "name": "Саттыбаева Карлыгаш Зинораевна",
        "position": "Секретарь Комиссии",
        "phone": "98-37-25",
        "email": "k.sattybaeva@nca.kz"
      },
      {
        "name": "Еслямова Аруна Жанатовна",
        "position": "Специалист",
        "phone": "98-37-35",
        "email": "a.eslyamova@nca.kz"
      }
    ]
  },
  {
    "id": "strategy",
    "title": "Управление стратегии и международного сотрудничества",
    "people": [
      {
        "name": "Мукашева Актоты Жансултановна",
        "position": "Руководитель",
        "phone": "98-37-55",
        "email": "a.mukasheva@nca.kz"
      },
      {
        "name": "Тлеуова Анара Жумажановна",
        "position": "Главный специалист",
        "phone": "98-36-84",
        "email": "a.tleuova@nca.kz"
      },
      {
        "name": "Кабенова Зюляль Бекмагамбетовна",
        "position": "Главный специалист",
        "phone": "98-37-04",
        "email": "z.kabenova@nca.kz"
      },
      {
        "name": "Байжанова Гульмира Курмангазыевна",
        "position": "Главный специалист",
        "phone": "98-37-38",
        "email": "g.baizhanova@nca.kz"
      },
      {
        "name": "Өкен Тілек Мұсұлманқұлұлы",
        "position": "Специалист",
        "phone": "98-37-38",
        "email": "t.oken@nca.kz"
      }
    ]
  },
  {
    "id": "methodology",
    "title": "Управление методологии и развития персонала",
    "people": [
      {
        "name": "Башимова Деля Рахимбековна",
        "position": "Руководитель",
        "phone": "98-37-30",
        "email": "d.bashimova@nca.kz"
      },
      {
        "name": "Магзумова Ботакоз Капызовна",
        "position": "Главный специалист",
        "phone": "98-37-07",
        "email": "b.magzumova@nca.kz"
      },
      {
        "name": "Садыкбекова Гульнара Сериковна",
        "position": "Главный специалист",
        "phone": "98-37-19",
        "email": "g.sadykbekova@nca.kz"
      },
      {
        "name": "Балдикова Саида Каержановна",
        "position": "Главный специалист",
        "phone": "98-37-10",
        "email": "s.baldikova@nca.kz"
      },
      {
        "name": "Ан Владислав Радикович",
        "position": "Ведущий специалист",
        "phone": "98-37-29",
        "email": "v.an@nca.kz"
      }
    ]
  },
  {
    "id": "monitoring",
    "title": "Управление мониторинга и анализа",
    "people": [
      {
        "name": "Нуркаева Динара Айткалиевна",
        "position": "Руководитель",
        "phone": "98-36-99",
        "email": "d.nurkaeva@nca.kz"
      },
      {
        "name": "Нурышев Айдос Талгатович",
        "position": "Главный специалист",
        "phone": "98-37-39",
        "email": "a.nuryshev@nca.kz"
      },
      {
        "name": "Токтабулатова Шара Чапаевна",
        "position": "Главный специалист",
        "phone": "98-37-24",
        "email": "s.toktabulatova@nca.kz"
      },
      {
        "name": "Уалиева Анар Абсаттаровна",
        "position": "Главный специалист",
        "phone": "98-37-67",
        "email": "a.ualieva@nca.kz"
      },
      {
        "name": "Есенеева Арай Кабылгазиновна",
        "position": "Ведущий специалист",
        "phone": "98-37-31",
        "email": "a.eseneeva@nca.kz"
      },
      {
        "name": "Кокумбаев Даулет Жанатович",
        "position": "Ведущий специалист",
        "phone": "98-37-34",
        "email": "d.kokumbayev@nca.kz"
      }
    ]
  },
  {
    "id": "digital",
    "title": "Отдел цифровизации",
    "people": [
      {
        "name": "Абаканов Диас Кайратович",
        "position": "Руководитель",
        "phone": "98-36-98",
        "email": "d.abakanov@nca.kz"
      },
      {
        "name": "Аманов Рауан Махмутұлы",
        "position": "Главный специалист",
        "phone": null,
        "email": null
      },
      {
        "name": "Турсунов Нурлан",
        "position": "Специалист",
        "phone": "98-37-21",
        "email": "n.tursunov@nca.kz"
      }
    ]
  },
  {
    "id": "training",
    "title": "Отдел обучения",
    "people": [
      {
        "name": "Лесбекова Гулмира Абдуовна",
        "position": "Руководитель",
        "phone": "98-36-95",
        "email": "g.lesbekova@nca.kz"
      },
      {
        "name": "Исмаилова Валентина Викторовна",
        "position": "Главный специалист",
        "phone": "98-37-41",
        "email": "v.ismailova@nca.kz"
      },
      {
        "name": "Инербаева Диана Сайлауовна",
        "position": "Специалист",
        "phone": "98-37-52",
        "email": "d.inerbayeva@nca.kz"
      }
    ]
  },
  {
    "id": "legal-hr",
    "title": "Управление правовой и кадровой работы",
    "people": [
      {
        "name": "Манкешов Шынтас Жалгасович",
        "position": "Руководитель",
        "phone": "98-37-08",
        "email": "sh.mankeshov@nca.kz"
      },
      {
        "name": "Муканова Айнаш Турсуновна",
        "position": "Главный специалист",
        "phone": "98-37-03",
        "email": "a.mukanova@nca.kz"
      },
      {
        "name": "Абылова Мәншүк Қойлыбайқызы",
        "position": "Ведущий специалист",
        "phone": "98-36-92",
        "email": "m.abylova@nca.kz"
      },
      {
        "name": "Нурмухамбетов Олжас Амантаевич",
        "position": "Главный специалист",
        "phone": "98-37-78",
        "email": "o.nurmuhabetov@nca.kz"
      },
      {
        "name": "Дюсембаева Меруэрт Галымовна",
        "position": "Главный специалист",
        "phone": "98-36-89",
        "email": "m.dyusembaeva@nca.kz"
      },
      {
        "name": "Спабекова Айдана Муханкызы",
        "position": "Ведущий специалист",
        "phone": "98-37-00",
        "email": "a.spabekova@nca.kz"
      },
      {
        "name": "Молдабаева Сымбат Армановна",
        "position": "Ведущий специалист",
        "phone": "98-37-54",
        "email": "s.moldabaeva@nca.kz"
      },
      {
        "name": "Советов Ильяс Абылгазиевич",
        "position": "Главный специалист",
        "phone": "98-37-09",
        "email": "i.sovetov@nca.kz"
      }
    ]
  }
];

/** Full dialable number and display string for an internal number. */
export function phoneInfo(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const code = digits.startsWith("98") ? "7172" : "727";
  return {
    display: `8 (${code}) ${phone}`,
    href: `tel:+7${code}${digits}`,
  };
}
