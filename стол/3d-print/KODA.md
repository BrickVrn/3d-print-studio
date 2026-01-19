# KODA.md - 3D Print Studio - Полная Спецификация

## Project Overview

**Проект:** 3D Print Studio Landing Page
**Тип:** Full-stack веб-приложение (Next.js + Express + PostgreSQL)
**Основная цель:** Лендинг для студии 3D печати с возможностью подачи заявок

### Основные фичи:
1. **Hero Section** с интерактивной 3D моделью Bambu Lab H2S
2. **Справочник пластиков** (6 материалов с полными техническими данными)
3. **Квиз подбора пластика** для клиентов
4. **Форма заявки** с загрузкой файлов проектов
5. **Портфолио** с примерами работ
6. **Админ-панель** для управления заявками и контентом
7. **Поддержка RU/EN языков**
8. **Dark/Light тема**

---

## Feature Requirements

### 1. Hero Section (Главная страница)
- Интерактивная 3D сцена с моделью Bambu Lab H2S
- Mouse controls: drag для вращения, scroll для зума
- Auto-rotate когда пользователь не взаимодействует
- Fallback изображение если 3D не загружается
- Call-to-action кнопки (Запросить отпечаток, Подробнее)

### 2. Справочник пластиков
- 6 основных пластиков: PLA, PETG, ABS, ASA, TPU, Nylon
- Для каждого пластика отдельная страница с полными данными
- Интерактивные карточки-плейсхолдеры на главной странице

### 3. Квиз подбора пластика
- Интерактивный квиз с вопросами о требованиях к детали
- Рекомендация подходящих пластиков на основе ответов

### 4. Форма заявки
- Поля: Имя, Email, Телефон, Описание, Файлы
- Клиент может отправить БЕЗ аутентификации
- Загрузка файлов (макс 5 файлов по 10MB)

### 5. Система аутентификации
- JWT токены для админов
- Защита админ-панели

### 6. Админ-панель
- Управление заявками
- Управление контентом
- Аналитика

---

## Design System

### Color Palette (Graphite Minimalism 2026)

**Light Theme:**
- Background Primary: #f5f5f4
- Text Primary: #1a1a1a
- Accent: #0f766e (graphite-green)
- Success: #16a34a
- Error: #dc2626

**Dark Theme:**
- Background Primary: #1f2122
- Text Primary: #f5f5f5
- Accent: #2eb8c6
- Success: #32b8c6
- Error: #ff5459

### Typography
- Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Sizes: 32px (H1), 28px (H2), 24px (H3), 20px (H4)
- Weights: 400, 500, 600, 700

---

## Frontend Architecture

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Three.js + react-three-fiber
- React Hook Form + Zod
- Axios
- React Context API

### Structure
```
frontend/
├── app/
│   ├── page.tsx
│   ├── plastics/[id]/page.tsx
│   ├── quiz/page.tsx
│   ├── contact/page.tsx
│   ├── admin/
│   └── layout.tsx
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ContactForm.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useTranslation.ts
│   └── useTheme.ts
└── lib/
    ├── api/client.ts
    └── validators/schemas.ts
```

---

## Backend Architecture

### Tech Stack
- Express.js + TypeScript
- PostgreSQL + Knex
- JWT authentication
- Multer (file upload)

### API Routes
```
/api/auth/
├── POST /register
├── POST /login
├── POST /refresh
└── POST /logout

/api/orders/
├── POST /        (создать заявку)
├── GET /         (список - admin)
├── GET /:id      (детали - admin)
└── PATCH /:id    (обновить - admin)

/api/plastics/
├── GET /         (список всех)
├── GET /:id      (детали)
└── POST /        (создать - admin)
```

---

## Database Schema

### Users
```
id, email, password_hash, name, role, created_at
```

### Orders
```
id, client_name, client_email, client_phone, 
description, file_urls[], status, created_at
```

### Plastics
```
id, name, description, bed_temp, nozzle_temp_min,
nozzle_temp_max, properties (JSONB), applications[]
```

### Reviews
```
id, order_id, rating, comment, is_approved
```

### Projects
```
id, title, description, image_url, model_url, plastic_used
```

---

## Authentication & Security

- JWT: access_token (15 min) + refresh_token (7 days)
- CORS enabled
- Helmet.js для headers
- Rate limiting
- Input validation (Zod)
- HTTPS в production

---

## Performance & Optimization

### Frontend
- Code splitting
- Image optimization
- 3D model optimization
- API caching

### Backend
- Database indices
- Pagination (limit 20)
- Connection pooling
- Gzip compression

---

## Deployment

### Frontend
- Vercel
- Environment: .env.local, .env.production

### Backend
- Railway или Render
- PostgreSQL managed service
- Docker контейнеризация

---

## Testing

- Unit tests: Jest
- E2E: Playwright
- Coverage: >= 80%
