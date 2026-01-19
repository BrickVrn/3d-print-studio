# 📦 Example Components — Готовые примеры для Koda

6 полных примеров компонентов с готовыми Koda запросами.

---

## 🎨 Пример 1: ColorPalette Component

### Запрос к Koda Implementation:

```
Реализуй компонент ColorPalette.tsx для демонстрации дизайн системы.

Требования из KODA.md Design System:

Light Theme:
- Background: #f5f5f4
- Text: #1a1a1a
- Accent: #0f766e

Dark Theme:
- Background: #1f2122
- Text: #f5f5f5
- Accent: #2eb8c6

Компонент должен:
- Отображать цветовые палитры
- Поддерживать темную/светлую тему
- TypeScript типизация
- Экспорт для использования в других компонентах
```

### Готовый код:

```typescript
// components/ColorPalette.tsx
import React from 'react';

interface ColorItem {
  name: string;
  light: string;
  dark: string;
  description: string;
}

const colors: ColorItem[] = [
  {
    name: 'Background Primary',
    light: '#f5f5f4',
    dark: '#1f2122',
    description: 'Основной фон приложения'
  },
  {
    name: 'Text Primary',
    light: '#1a1a1a',
    dark: '#f5f5f5',
    description: 'Основной текст'
  },
  {
    name: 'Accent',
    light: '#0f766e',
    dark: '#2eb8c6',
    description: 'Акцентный цвет (кнопки, ссылки)'
  },
  {
    name: 'Success',
    light: '#16a34a',
    dark: '#32b8c6',
    description: 'Успешные действия'
  },
  {
    name: 'Error',
    light: '#dc2626',
    dark: '#ff5459',
    description: 'Ошибки и предупреждения'
  }
];

export const ColorPalette: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Design System - Colors</h2>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          Toggle: {theme}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colors.map((color) => (
          <div key={color.name} className="border rounded-lg p-4">
            <div
              className="w-full h-24 rounded mb-3"
              style={{ backgroundColor: theme === 'light' ? color.light : color.dark }}
            />
            <h3 className="font-semibold text-lg">{color.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {color.description}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {theme === 'light' ? color.light : color.dark}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🔐 Пример 2: useAuth Hook

### Запрос к Koda Implementation:

```
Реализуй custom hook useAuth.ts для JWT аутентификации.

Требования из KODA.md Authentication:
- JWT access_token (15 мин) + refresh_token (7 дней)
- Хранение токенов в localStorage
- Функции: login, logout, refresh
- TypeScript типизация
- Axios для API запросов
```

### Готовый код:

```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем есть ли токены при монтировании
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUser(accessToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      // Token невалиден, пробуем refresh
      await refreshToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthTokens>('/api/auth/login', {
        email,
        password
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      await fetchUser(accessToken);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token');

      const response = await axios.post<AuthTokens>('/api/auth/refresh', {
        refreshToken
      });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      await fetchUser(accessToken);
    } catch (error) {
      logout();
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
};
```

---

## 🌐 Пример 3: useTranslation Hook (i18n)

### Запрос к Koda Implementation:

```
Реализуй custom hook useTranslation.ts для многоязычности.

Требования из KODA.md:
- Поддержка RU/EN языков
- Переключение в header
- Сохранение в localStorage
- TypeScript типизация
```

### Готовый код:

```typescript
// hooks/useTranslation.ts
import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

const translations: Translations = {
  'hero.title': {
    ru: '3D Печать на Bambu Lab H2S',
    en: '3D Printing on Bambu Lab H2S'
  },
  'hero.subtitle': {
    ru: 'Профессиональная печать из инженерных пластиков',
    en: 'Professional printing from engineering plastics'
  },
  'nav.home': {
    ru: 'Главная',
    en: 'Home'
  },
  'nav.plastics': {
    ru: 'Пластики',
    en: 'Plastics'
  },
  'nav.quiz': {
    ru: 'Квиз',
    en: 'Quiz'
  },
  'nav.contact': {
    ru: 'Контакты',
    en: 'Contact'
  },
  'button.request': {
    ru: 'Запросить отпечаток',
    en: 'Request Print'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return {
    language,
    changeLanguage,
    t
  };
};
```

---

## ✅ Пример 4: Form Validation Schema (Zod)

### Запрос к Koda Implementation:

```
Реализуй Zod схему валидации для формы заявки.

Требования из KODA.md Form:
- Имя (обязательное)
- Email (обязательное, валидация)
- Телефон (опциональное, формат)
- Описание (минимум 10 символов)
- Файлы (макс 5 по 10MB)
```

### Готовый код:

```typescript
// lib/validators/schemas.ts
import { z } from 'zod';

export const orderFormSchema = z.object({
  clientName: z.string()
    .min(2, 'Имя должно быть минимум 2 символа')
    .max(100, 'Имя слишком длинное'),

  clientEmail: z.string()
    .email('Неверный формат email')
    .min(5, 'Email слишком короткий')
    .max(255, 'Email слишком длинный'),

  clientPhone: z.string()
    .regex(/^\+?[0-9]{10,15}$/, 'Неверный формат телефона')
    .optional()
    .or(z.literal('')),

  description: z.string()
    .min(10, 'Описание должно быть минимум 10 символов')
    .max(1000, 'Описание слишком длинное'),

  files: z.array(z.instanceof(File))
    .max(5, 'Максимум 5 файлов')
    .refine(
      (files) => files.every(file => file.size <= 10 * 1024 * 1024),
      'Размер каждого файла не должен превышать 10MB'
    )
    .refine(
      (files) => files.every(file => 
        ['.stl', '.step', '.stp', '.iges'].some(ext => 
          file.name.toLowerCase().endsWith(ext)
        )
      ),
      'Допустимые форматы: .stl, .step, .stp, .iges'
    )
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
```

---

## 🌐 Пример 5: API Client (Axios)

### Запрос к Koda Implementation:

```
Реализуй API client с Axios interceptors.

Требования:
- Base URL из env
- JWT токены в headers
- Автоматический refresh при 401
- TypeScript типизация
```

### Готовый код:

```typescript
// lib/api/client.ts
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: добавляем JWT токен
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: обработка 401 и refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Не удалось обновить токен - выходим
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Типизированные методы
export const api = {
  // Orders
  createOrder: (data: any) => apiClient.post('/orders', data),
  getOrders: () => apiClient.get('/orders'),
  getOrder: (id: string) => apiClient.get(`/orders/${id}`),
  updateOrder: (id: string, data: any) => apiClient.patch(`/orders/${id}`, data),

  // Plastics
  getPlastics: () => apiClient.get('/plastics'),
  getPlastic: (id: string) => apiClient.get(`/plastics/${id}`),

  // Auth
  login: (email: string, password: string) => 
    apiClient.post('/auth/login', { email, password }),
  logout: () => apiClient.post('/auth/logout')
};
```

---

## 🎁 Бонус: Дополнительные примеры

### DataTable Component

```bash
koda implementation "Реализуй компонент DataTable.tsx 
для отображения заявок в админ-панели. 
TypeScript, pagination, sorting, filtering."
```

### 3D Scene Component

```bash
koda implementation "Реализуй 3D сцену Three3DScene.tsx 
с моделью Bambu Lab H2S. 
react-three-fiber, OrbitControls, auto-rotate."
```

### Email Template

```bash
koda implementation "Создай email template для уведомления админа 
о новой заявке. HTML + inline CSS."
```

---

**Используй эти примеры как шаблоны для своих компонентов! 🚀**
