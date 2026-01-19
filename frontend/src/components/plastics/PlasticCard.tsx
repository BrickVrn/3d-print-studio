'use client';

import Link from 'next/link';
import { Plastic } from '@/lib/plastics';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/hooks/useLanguage';

interface PlasticCardProps {
  plastic: Plastic;
}

export function PlasticCard({ plastic }: PlasticCardProps) {
  const { lang } = useLanguage();

  return (
    <Link href={`/plastics/${plastic.id}`}>
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: plastic.color }}
          >
            {plastic.name}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-1">{plastic.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {lang === 'ru' ? plastic.description : plastic.descriptionEn}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Стол:</span>
            <span className="ml-1 font-medium">{plastic.bedTemp}</span>
          </div>
          <div>
            <span className="text-gray-500">Сопло:</span>
            <span className="ml-1 font-medium">{plastic.nozzleTemp}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {plastic.properties.slice(0, 2).map((prop) => (
            <span
              key={prop}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {prop}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}