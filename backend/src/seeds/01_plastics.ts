import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('plastics').del();

  await knex('plastics').insert([
    {
      id: 'pla',
      name: 'PLA',
      description: 'Самый популярный и простой в использовании материал для 3D печати. Идеален для начинающих и создания прототипов.',
      description_en: 'The most popular and easiest to use 3D printing material. Ideal for beginners and prototyping.',
      bed_temp: '50-60°C',
      nozzle_temp: '190-220°C',
      properties: JSON.stringify(['Легко печатается', 'Низкая усадка', 'Не требует подогреваемого стола', 'Биоразлагаемый']),
      applications: JSON.stringify(['Прототипы', 'Игрушки', 'Декор', 'Образовательные модели']),
      color: '#3b82f6',
    },
    {
      id: 'petg',
      name: 'PETG',
      description: 'Прочный и долговечный материал, сочетающий простоту печати PLA с прочностью ABS. Устойчив к влаге и УФ.',
      description_en: 'Strong and durable material combining PLA ease of printing with ABS strength. Moisture and UV resistant.',
      bed_temp: '70-80°C',
      nozzle_temp: '230-250°C',
      properties: JSON.stringify(['Прочный', 'Ударопрочный', 'Влагостойкий', 'Устойчив к УФ']),
      applications: JSON.stringify(['Функциональные детали', 'Outdoor применения', 'Емкости', 'Механизмы']),
      color: '#22c55e',
    },
    {
      id: 'abs',
      name: 'ABS',
      description: 'Прочный инженерный пластик с высокой термостойкостью. Требует закрытой камеры и вентиляции.',
      description_en: 'Strong engineering plastic with high heat resistance. Requires enclosed chamber and ventilation.',
      bed_temp: '90-110°C',
      nozzle_temp: '240-270°C',
      properties: JSON.stringify(['Термостойкий', 'Прочный', 'Ударопрочный', 'Гладкая поверхность']),
      applications: JSON.stringify(['Автозапчасти', 'Электроника', 'Функциональные детали', 'Литьевые формы']),
      color: '#f97316',
    },
    {
      id: 'asa',
      name: 'ASA',
      description: 'Аналог ABS с отличной устойчивостью к УФ-излучению. Идеален для outdoor применений.',
      description_en: 'ABS analog with excellent UV resistance. Ideal for outdoor applications.',
      bed_temp: '90-100°C',
      nozzle_temp: '240-260°C',
      properties: JSON.stringify(['Устойчив к УФ', 'Термостойкий', 'Прочный', 'Не желтеет']),
      applications: JSON.stringify(['Наружные детали', 'Автомобильные детали', 'Строительные элементы']),
      color: '#eab308',
    },
    {
      id: 'tpu',
      name: 'TPU',
      description: 'Гибкий эластичный материал, похожий на резину. Идеален для создания мягких и гибких деталей.',
      description_en: 'Flexible elastic material similar to rubber. Ideal for soft and flexible parts.',
      bed_temp: '40-60°C',
      nozzle_temp: '200-230°C',
      properties: JSON.stringify(['Эластичный', 'Износостойкий', 'Хорошая адгезия', 'Ударопрочный']),
      applications: JSON.stringify(['Чехлы', 'Уплотнители', 'Протезы', 'Гибкие механизмы']),
      color: '#ec4899',
    },
    {
      id: 'nylon',
      name: 'Nylon',
      description: 'Прочный и гибкий инженерный пластик с высокой износостойкостью. Требует контроля влажности.',
      description_en: 'Strong and flexible engineering plastic with high wear resistance. Requires moisture control.',
      bed_temp: '70-90°C',
      nozzle_temp: '240-270°C',
      properties: JSON.stringify(['Высокая прочность', 'Износостойкий', 'Гибкий', 'Химически стойкий']),
      applications: JSON.stringify(['Шестерни', 'Подшипники', 'Инструменты', 'Механические детали']),
      color: '#8b5cf6',
    },
  ]);
}