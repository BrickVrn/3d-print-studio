export interface QuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  textEn: string;
  scores: Record<string, number>;
}

export interface QuizResult {
  plasticId: string;
  plasticName: string;
  description: string;
  descriptionEn: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'purpose',
    question: 'Каково назначение детали?',
    questionEn: 'What is the purpose of the part?',
    options: [
      {
        id: 'prototype',
        text: 'Прототип или демонстрационный образец',
        textEn: 'Prototype or demonstration sample',
        scores: { pla: 5, petg: 3, abs: 1, asa: 1, tpu: 0, nylon: 1 },
      },
      {
        id: 'functional',
        text: 'Функциональная деталь (механизм, крепёж)',
        textEn: 'Functional part (mechanism, fastener)',
        scores: { pla: 1, petg: 4, abs: 3, asa: 3, tpu: 2, nylon: 5 },
      },
      {
        id: 'outdoor',
        text: 'Будет использоваться на улице',
        textEn: 'Will be used outdoors',
        scores: { pla: 0, petg: 4, abs: 1, asa: 5, tpu: 2, nylon: 2 },
      },
      {
        id: 'flexible',
        text: 'Нужна гибкая деталь (чехол, прокладка)',
        textEn: 'Need flexible part (case, gasket)',
        scores: { pla: 0, petg: 0, abs: 0, asa: 0, tpu: 5, nylon: 1 },
      },
    ],
  },
  {
    id: 'temperature',
    question: 'Будет ли деталь подвергаться нагреву?',
    questionEn: 'Will the part be exposed to heat?',
    options: [
      {
        id: 'no',
        text: 'Нет, комнатная температура',
        textEn: 'No, room temperature',
        scores: { pla: 5, petg: 3, abs: 0, asa: 0, tpu: 2, nylon: 2 },
      },
      {
        id: 'low',
        text: 'Да, до 50-60°C (например, в автомобиле)',
        textEn: 'Yes, up to 50-60°C (e.g., in a car)',
        scores: { pla: 2, petg: 5, abs: 1, asa: 1, tpu: 0, nylon: 3 },
      },
      {
        id: 'high',
        text: 'Да, выше 80°C (двигатель, нагреватели)',
        textEn: 'Yes, above 80°C (engine, heaters)',
        scores: { pla: 0, petg: 0, abs: 4, asa: 4, tpu: 0, nylon: 3 },
      },
    ],
  },
  {
    id: 'strength',
    question: 'Какая прочность нужна детали?',
    questionEn: 'What strength is needed for the part?',
    options: [
      {
        id: 'low',
        text: 'Декоративная, не несёт нагрузки',
        textEn: 'Decorative, no load bearing',
        scores: { pla: 5, petg: 2, abs: 1, asa: 1, tpu: 1, nylon: 1 },
      },
      {
        id: 'medium',
        text: 'Умеренная ( периодическое использование)',
        textEn: 'Moderate (occasional use)',
        scores: { pla: 2, petg: 4, abs: 2, asa: 2, tpu: 2, nylon: 3 },
      },
      {
        id: 'high',
        text: 'Высокая (постоянные нагрузки)',
        textEn: 'High (constant loads)',
        scores: { pla: 0, petg: 2, abs: 4, asa: 4, tpu: 0, nylon: 5 },
      },
    ],
  },
  {
    id: 'environment',
    question: 'Где будет эксплуатироваться деталь?',
    questionEn: 'Where will the part be used?',
    options: [
      {
        id: 'indoor',
        text: 'В помещении, без агрессивной среды',
        textEn: 'Indoors, no aggressive environment',
        scores: { pla: 5, petg: 3, abs: 2, asa: 2, tpu: 2, nylon: 2 },
      },
      {
        id: 'humid',
        text: 'Во влажной среде (ванная, улица после дождя)',
        textEn: 'In humid environment (bathroom, outdoor after rain)',
        scores: { pla: 1, petg: 5, abs: 2, asa: 3, tpu: 3, nylon: 1 },
      },
      {
        id: 'chemical',
        text: 'Воздействие химикатов или масел',
        textEn: 'Exposure to chemicals or oils',
        scores: { pla: 0, petg: 3, abs: 2, asa: 2, tpu: 2, nylon: 5 },
      },
    ],
  },
  {
        id: 'experience',
        question: 'Какой у вас опыт 3D печати?',
        questionEn: 'What is your 3D printing experience?',
        options: [
      {
        id: 'beginner',
        text: 'Начинающий (первые печати)',
        textEn: 'Beginner (first prints)',
        scores: { pla: 5, petg: 3, abs: 0, asa: 0, tpu: 2, nylon: 0 },
      },
      {
        id: 'intermediate',
        text: 'Средний (печатаю регулярно)',
        textEn: 'Intermediate (print regularly)',
        scores: { pla: 3, petg: 4, abs: 2, asa: 2, tpu: 3, nylon: 2 },
      },
      {
        id: 'advanced',
        text: 'Опытный (сложные материалы не проблема)',
        textEn: 'Advanced (complex materials are not a problem)',
        scores: { pla: 2, petg: 3, abs: 4, asa: 4, tpu: 4, nylon: 4 },
      },
    ],
  },
];

export function calculateResult(scores: Record<string, number>): QuizResult {
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const [plasticId] = sorted[0];

  const results: Record<string, QuizResult> = {
    pla: {
      plasticId: 'pla',
      plasticName: 'PLA',
      description: 'Идеальный выбор для начинающих и прототипов. Легко печатается, не требует подогреваемой камеры.',
      descriptionEn: 'Perfect choice for beginners and prototypes. Easy to print, no heated chamber required.',
    },
    petg: {
      plasticId: 'petg',
      plasticName: 'PETG',
      description: 'Отличный баланс простоты и прочности. Устойчив к влаге и УФ, подходит для функциональных деталей.',
      descriptionEn: 'Great balance of ease and strength. Moisture and UV resistant, suitable for functional parts.',
    },
    abs: {
      plasticId: 'abs',
      plasticName: 'ABS',
      description: 'Прочный термостойкий пластик для требовательных применений. Требует закрытой камеры и вентиляции.',
      descriptionEn: 'Strong heat-resistant plastic for demanding applications. Requires enclosed chamber and ventilation.',
    },
    asa: {
      plasticId: 'asa',
      plasticName: 'ASA',
      description: 'ABS с отличной УФ стойкостью. Идеален для outdoor применений, не желтеет на солнце.',
      descriptionEn: 'ABS with excellent UV resistance. Ideal for outdoor applications, does not yellow in the sun.',
    },
    tpu: {
      plasticId: 'tpu',
      plasticName: 'TPU',
      description: 'Гибкий эластичный материал для чехлов, прокладок и амортизирующих деталей.',
      descriptionEn: 'Flexible elastic material for cases, gaskets, and cushioning parts.',
    },
    nylon: {
      plasticId: 'nylon',
      plasticName: 'Nylon',
      description: 'Самый прочный из распространённых материалов. Износостойкий, но требует контроля влажности.',
      descriptionEn: 'The strongest of common materials. Wear-resistant, but requires moisture control.',
    },
  };

  return results[plasticId] || results.pla;
}