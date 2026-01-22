# 3D Print Studio

Лендинг для студии 3D печати с приёмом заявок.

## 🚀 Технологии

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D**: Three.js + react-three-fiber + @react-three/drei
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Testing**: Vitest

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL + Knex.js ORM
- **Auth**: JWT (access + refresh tokens)
- **Validation**: Zod schemas
- **Testing**: Jest + Supertest

## 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/BrickVrn/3d-print-studio.git
cd 3d-print-studio

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev

# Database (Docker)
docker-compose up -d postgres
```

## 🌟 Особенности

### Публичные страницы
- 🏠 **Hero Section**: 3D модель принтера Bambu Lab H2S
- 🎨 **Справочник пластиков**: 6 материалов с характеристиками
- ❓ **Квиз подбора**: Интерактивный подбор пластика под задачу
- 📝 **Форма заявки**: Загрузка файлов до 10MB

### Админ-панель (`/admin`)
- 📊 **Dashboard**: Статистика заявок
- 📋 **Заказы**: Управление статусами, фильтрация
- 🎨 **Пластики**: CRUD операции с материалами
- 👥 **Пользователи**: Управление доступом (только admin)

## 🔐 Аутентификация

- JWT токены: Access (15 мин) + Refresh (7 дней)
- Роли: client, admin
- Защищённые routes: middleware authMiddleware
- Admin-only routes: middleware adminOnly

## 📂 Структура проекта

```
3d-print-studio/
├── frontend/                 # Next.js приложение
│   ├── app/               # App Router pages
│   ├── components/          # React компоненты
│   │   ├── ui/           # Базовые UI компоненты
│   │   ├── admin/         # Админ компоненты
│   │   ├── hero/          # Hero секция
│   │   ├── plastics/       # Пластики
│   │   ├── quiz/          # Квиз
│   │   ├── forms/         # Формы
│   │   └── layout/        # Navbar, Footer
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Утилиты, API, schemas
│   └── contexts/           # React contexts
├── backend/                  # Express API
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── controllers/      # Бизнес логика
│   │   ├── middleware/      # Auth, error handling
│   │   └── lib/            # Database config
│   ├── migrations/         # Knex миграции
│   └── seeds/             # Тестовые данные
├── docker-compose.yml         # Docker конфигурация
└── README.md               # Этот файл
```

## 🧪 Запуск в режиме разработки

```bash
# Терминал 1 - Backend
cd backend
npm run dev
# -> Server running on port 5000

# Терминал 2 - Frontend
cd frontend
npm run dev
# -> Ready on http://localhost:3000

# Терминал 3 - PostgreSQL (если не в Docker)
docker start 3d-print-postgres
```

## 🧪 Тестирование

```bash
# Frontend tests
cd frontend
npm test
npm run test:ui

# Backend tests
cd backend
npm test
npm run test:watch
npm run test:coverage
```

## 📝 Документация

- [AGENTS.md](./AGENTS.md) — Рекомендации для AI агентов и разработчиков
- [ROADMAP.md](./ROADMAP.md) — Дорожная карта разработки
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) — Архитектура проекта
- [EQUIPMENT_SPECS_AND_3D_GUIDE.md](./EQUIPMENT_SPECS_AND_3D_GUIDE.md) — Материалы и оборудование

## 🔗 Полезные ссылки

- [Frontend: localhost:3000](http://localhost:3000)
- [Backend API: localhost:5000](http://localhost:5000/api/health)
- [Admin Panel: localhost:3000/admin](http://localhost:3000/admin)

## 📋 Переменные окружения

Скопируйте `.env.example` в `.env` и отредактируйте:

```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Backend
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=3d_print_studio
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key
```

## 🚀 Деплой

### Vercel (Frontend)
```bash
npm install -g vercel
cd frontend
vercel
```

### Railway/Render (Backend)
```bash
railway up
```

## 📄 Лицензия

MIT License — свободно для использования в коммерческих и личных проектах.

---

**Проект в активной разработке** 🎨

Свежие версии:
- Frontend: Next.js 14 + React 18
- Backend: Express 4 + TypeScript 5.7
- Database: PostgreSQL 15
