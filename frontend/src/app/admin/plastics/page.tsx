'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Plastic {
  id: string;
  name: string;
  name_en: string;
  description: string;
  bed_temp: string;
  nozzle_temp: string;
}

export default function AdminPlastics() {
  const [plastics, setPlastics] = useState<Plastic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlastics();
  }, []);

  async function fetchPlastics() {
    try {
      const response = await fetch('/api/plastics');
      if (response.ok) {
        const data = await response.json();
        setPlastics(data);
      }
    } catch (error) {
      console.error('Failed to fetch plastics:', error);
    } finally {
      setLoading(false);
    }
  }

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
          Материалы
        </h1>
        <Button>Добавить пластик</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plastics.map((plastic) => (
          <Card key={plastic.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: getPlasticColor(plastic.name_en) }}
                >
                  {plastic.name}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {plastic.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {plastic.name_en}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {plastic.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Стол:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {plastic.bed_temp}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Сопло:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {plastic.nozzle_temp}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Редактировать
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                Удалить
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getPlasticColor(name: string): string {
  const colors: Record<string, string> = {
    PLA: '#3b82f6',
    PETG: '#10b981',
    ABS: '#f59e0b',
    ASA: '#ef4444',
    TPU: '#8b5cf6',
    Nylon: '#ec4899',
  };
  return colors[name] || '#6b7280';
}
