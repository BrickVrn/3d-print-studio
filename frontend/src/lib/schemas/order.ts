import { z } from 'zod';

export const orderSchema = z.object({
  client_name: z.string().min(2, 'Имя минимум 2 символа'),
  client_email: z.string().email('Некорректный email'),
  client_phone: z.string().regex(/^\+?[0-9\s-()]{10,}$/, 'Некорректный телефон').optional(),
  description: z.string().min(10, 'Опишите проект подробнее'),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).default('pending'),
  file_urls: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type Order = z.infer<typeof orderSchema>;
