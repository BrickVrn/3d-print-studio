# 🚀 Quick Start Guide — 3D Print Studio

Пошаговый гайд для быстрого запуска проекта.

---

## 📝 Шаг 1: Подготовка проекта

### 1.1 Создай репозиторий

```bash
# Создай папку проекта
mkdir 3d-print-studio
cd 3d-print-studio

# Инициализируй Git
git init

# Создай Koda конфигурацию
mkdir -p .kodacli
```

### 1.2 Скопируй документы в корень

```bash
# Поместить:
# - KODA.md
# - EQUIPMENT_SPECS_AND_3D_GUIDE.md
# - и другие файлы документации
```

---

## 🔧 Шаг 2: Инициализация Frontend

```bash
# Создай Next.js приложение
npx create-next-app@latest frontend --typescript --tailwind --eslint

cd frontend

# Установи зависимости
npm install   three   @react-three/fiber   @react-three/drei   zustand   react-i18next   i18next   axios   react-hook-form   zod   @hookform/resolvers   framer-motion

npm install --save-dev @types/three

# Запусти dev server
npm run dev
# http://localhost:3000
```

### Минимальная структура

```
frontend/
├── app/
│   ├── page.tsx          # Главная страница
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   └── Navbar.tsx
├── lib/
│   └── constants/
└── public/
    └── models/
```

---

## 🛠️ Шаг 3: Инициализация Backend

```bash
# Вернись в корень
cd ..

# Создай Express приложение
mkdir backend
cd backend

npm init -y

# Установи зависимости
npm install   express   typescript   ts-node   pg   knex   bcryptjs   jsonwebtoken   dotenv   cors   helmet

npm install --save-dev   @types/express   @types/node   ts-node-dev

# Создай структуру
mkdir -p src/{config,routes,controllers,models}
touch src/index.ts
```

### Минимальный index.ts

```typescript
// backend/src/index.ts
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
```

### Запусти backend

```bash
npx ts-node src/index.ts
```

---

## 💾 Шаг 4: Настройка Database

### Локально (PostgreSQL через Docker)

```bash
# Запусти PostgreSQL контейнер
docker run --name 3d-studio-db   -e POSTGRES_PASSWORD=dev_password   -e POSTGRES_DB=3d_studio   -p 5432:5432   -d postgres:15

# .env для backend
echo "DATABASE_URL=postgresql://postgres:dev_password@localhost:5432/3d_studio" > .env
echo "JWT_SECRET=your_random_secret_here" >> .env
```

### Создай миграцию (Knex)

```bash
cd backend
npx knex init

# Отредактируй knexfile.ts
```

```typescript
// knexfile.ts
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations'
    }
  }
};

export default config;
```

```bash
# Создай миграцию
npx knex migrate:make create_users_table

# Запусти миграции
npx knex migrate:latest
```

---

## 🤖 Шаг 5: Первый запрос к Koda

### Исследование требований

```bash
koda research "Проанализируй требование: главная страница лендинга 3D печати 
с героя-секцией (3D сцена Bambu Lab H2S). Какие компоненты нужны?"
```

### Проектирование архитектуры

```bash
koda architecture "Спроектируй структуру главной страницы. 
Компоненты для hero section, navbar, features."
```

### Реализация компонента

```bash
koda implementation "Реализуй компонент HeroSection.tsx 
с интерактивной 3D сценой (Three.js + react-three-fiber).
TypeScript типизация, dark/light тема, responsive дизайн."
```

---

## 📂 Результирующая структура

```
3d-print-studio/
├── KODA.md
├── EQUIPMENT_SPECS_AND_3D_GUIDE.md
├── README_START_HERE.md
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── plastics/[id]/page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   └── controllers/
│   ├── migrations/
│   └── .env
└── .gitignore
```

---

## 🔄 Рекомендуемый workflow (6 дней)

### День 1-2: MVP Foundation
```bash
koda research "Полный лендинг 3D печати..."
koda architecture "Спроектируй полный стек..."
koda implementation "Реализуй HeroSection и Navbar..."
```

### День 3-4: Основные страницы
```bash
koda implementation "Создай страницу пластика PLA..."
koda implementation "Реализуй квиз подбора..."
```

### День 5: Backend & Database
```bash
koda implementation "Создай Express routes для заявок..."
koda implementation "Реализуй JWT auth..."
```

### День 6: Admin panel & Deployment
```bash
koda implementation "Создай админ-панель..."
koda implementation "Подготовь к деплою на Vercel..."
```

---

## ✅ Чек-лист при старте

- [ ] Git репозиторий инициализирован
- [ ] KODA.md скопирован в корень
- [ ] Frontend: `npm install` работает
- [ ] Backend: `npm install` работает
- [ ] PostgreSQL БД создана
- [ ] `.env` файлы заполнены
- [ ] Первый Koda запрос выполнен
- [ ] GitHub интеграция готова

---

## 🆘 Troubleshooting

### Backend не подключается к БД

```bash
# Проверь CONNECTION STRING
echo $DATABASE_URL

# Проверь что PostgreSQL запущена
docker ps | grep 3d-studio-db

# Тестируй подключение
psql $DATABASE_URL -c "SELECT 1"
```

### Frontend не загружает 3D модель

```bash
# Проверь файл существует
ls -la frontend/public/models/

# Проверь формат (.glb)
file frontend/public/models/bambu-h2s.glb

# Проверь размер (max 5MB)
du -h frontend/public/models/bambu-h2s.glb
```

---

## 📚 Следующие шаги

1. Доработать детали
2. Добавить real 3D модели
3. Оптимизация (images, bundle size)
4. Testing (Jest, Playwright)
5. Deployment (Vercel + Railway)

**Good luck! 🚀**
