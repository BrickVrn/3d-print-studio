'use client';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';

export default function AdminDashboard() {
  const stats = [
    { label: 'Всего заявок', value: '12', change: '+3 за неделю', icon: '📋' },
    { label: 'Новых', value: '5', change: 'За сегодня', icon: '🆕' },
    { label: 'В работе', value: '4', change: 'В процессе', icon: '⏳' },
    { label: 'Завершённых', value: '3', change: '+1 за неделю', icon: '✅' },
  ];

  return (
    <Container size="lg" className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Админ-панель
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Добро пожаловать в панель управления
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} hover>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Последние заявки</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Заявка #{i}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    client@example.com
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  pending
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
          <div className="space-y-3">
            <a
              href="/admin/orders"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-medium">Все заявки</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Просмотреть и управлять
                </p>
              </div>
            </a>
            <a
              href="/admin/plastics"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">🎨</span>
              <div>
                <p className="font-medium">Материалы</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Редактировать каталог
                </p>
              </div>
            </a>
            <a
              href="/admin/users"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">👥</span>
              <div>
                <p className="font-medium">Пользователи</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Управление доступом
                </p>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </Container>
  );
}
