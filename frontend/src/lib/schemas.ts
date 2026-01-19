import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно быть минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().regex(/^\+?[0-9\s-()]{10,}$/, 'Введите корректный номер телефона'),
  description: z.string().min(10, 'Опишите ваш проект подробнее'),
  files: z.array(z.instanceof(File)).max(5, 'Максимум 5 файлов').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;