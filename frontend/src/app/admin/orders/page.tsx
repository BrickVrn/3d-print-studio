'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Order } from '@/lib/schemas/order';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    try {
      const response = await fetch(
        filter === 'all'
          ? '/api/orders'
          : `/api/orders?status=${filter}`
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const statusLabels = {
    pending: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
    cancelled: 'Отменена',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Заявки
        </h1>
        <div className="flex gap-2">
          {(['all', 'pending', 'in_progress', 'completed'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'all' && 'Все'}
              {f === 'pending' && 'Новые'}
              {f === 'in_progress' && 'В работе'}
              {f === 'completed' && 'Завершённые'}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  #
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  Клиент
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  Описание
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  Статус
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  Дата
                </th>
                <th className="text-right py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                    {order.client_name}
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                    {order.client_email}
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {order.description}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        statusColors[order.status as keyof typeof statusColors]
                      }`}
                    >
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString('ru-RU')
                      : '-'}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {order.status === 'pending' && (
                      <select
                        value="in_progress"
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="in_progress">В работу</option>
                        <option value="completed">Завершить</option>
                      </select>
                    )}
                    {order.status === 'in_progress' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateStatus(order.id, 'completed')}
                      >
                        Завершить
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-600 dark:text-gray-400">
                    Нет заявок
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
