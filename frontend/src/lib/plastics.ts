export interface Plastic {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  bedTemp: string;
  nozzleTemp: string;
  properties: string[];
  applications: string[];
  color: string;
}

export const plastics: Plastic[] = [
  {
    id: 'pla',
    name: 'PLA',
    nameEn: 'PLA',
    description: 'Самый популярный и простой в использовании материал для 3D печати. Идеален для начинающих и создания прототипов.',
    descriptionEn: 'The most popular and easiest to use 3D printing material. Ideal for beginners and prototyping.',
    bedTemp: '50-60°C',
    nozzleTemp: '190-220°C',
    properties: ['Легко печатается', 'Низкая усадка', 'Не требует подогреваемого стола', 'Биоразлагаемый'],
    applications: ['Прототипы', 'Игрушки', 'Декор', 'Образовательные модели'],
    color: '#3b82f6',
  },
  {
    id: 'petg',
    name: 'PETG',
    nameEn: 'PETG',
    description: 'Прочный и долговечный материал, сочетающий простоту печати PLA с прочностью ABS. Устойчив к влаге и УФ.',
    descriptionEn: 'Strong and durable material combining PLA ease of printing with ABS strength. Moisture and UV resistant.',
    bedTemp: '70-80°C',
    nozzleTemp: '230-250°C',
    properties: ['Прочный', 'Ударопрочный', 'Влагостойкий', 'Устойчив к УФ'],
    applications: ['Функциональные детали', ' outdoor применения', 'Емкости', 'Механизмы'],
    color: '#22c55e',
  },
  {
    id: 'abs',
    name: 'ABS',
    nameEn: 'ABS',
    description: 'Прочный инженерный пластик с высокой термостойкостью. Требует закрытой камеры и вентиляции.',
    descriptionEn: 'Strong engineering plastic with high heat resistance. Requires enclosed chamber and ventilation.',
    bedTemp: '90-110°C',
    nozzleTemp: '240-270°C',
    properties: ['Термостойкий', 'Прочный', 'Ударопрочный', 'Гладкая поверхность'],
    applications: ['Автозапчасти', 'Электроника', 'Функциональные детали', 'Литьевые формы'],
    color: '#f97316',
  },
  {
    id: 'asa',
    name: 'ASA',
    nameEn: 'ASA',
    description: 'Аналог ABS с отличной устойчивостью к УФ-излучению. Идеален для outdoor применений.',
    descriptionEn: 'ABS analog with excellent UV resistance. Ideal for outdoor applications.',
    bedTemp: '90-100°C',
    nozzleTemp: '240-260°C',
    properties: ['Устойчив к УФ', 'Термостойкий', 'Прочный', 'Не желтеет'],
    applications: ['Наружные детали', 'Автомобильные детали', 'Строительные элементы'],
    color: '#eab308',
  },
  {
    id: 'tpu',
    name: 'TPU',
    nameEn: 'TPU',
    description: 'Гибкий эластичный материал, похожий на резину. Идеален для создания мягких и гибких деталей.',
    descriptionEn: 'Flexible elastic material similar to rubber. Ideal for soft and flexible parts.',
    bedTemp: '40-60°C',
    nozzleTemp: '200-230°C',
    properties: ['Эластичный', 'Износостойкий', 'Хорошая адгезия', 'Ударопрочный'],
    applications: ['Чехлы', 'Уплотнители', 'Протезы', 'Гибкие механизмы'],
    color: '#ec4899',
  },
  {
    id: 'nylon',
    name: 'Nylon',
    nameEn: 'Nylon',
    description: 'Прочный и гибкий инженерный пластик с высокой износостойкостью. Требует контроля влажности.',
    descriptionEn: 'Strong and flexible engineering plastic with high wear resistance. Requires moisture control.',
    bedTemp: '70-90°C',
    nozzleTemp: '240-270°C',
    properties: ['Высокая прочность', 'Износостойкий', 'Гибкий', 'Химически стойкий'],
    applications: ['Шестерни', 'Подшипники', 'Инструменты', 'Механические детали'],
    color: '#8b5cf6',
  },
];

export function getPlastic(id: string): Plastic | undefined {
  return plastics.find((p) => p.id === id);
}