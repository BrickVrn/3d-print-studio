'use client';

import Link from 'next/link';
import { QuizResult as QuizResultType } from '@/lib/quiz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  const { lang, t } = useLanguage();

  return (
    <Card className="text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 text-accent text-3xl font-bold mb-4">
          {result.plasticName}
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {lang === 'ru' ? 'Рекомендуемый материал:' : 'Recommended material:'}
        </h2>
        <h3 className="text-3xl font-bold text-accent">{result.plasticName}</h3>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {lang === 'ru' ? result.description : result.descriptionEn}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/plastics/${result.plasticId}`}>
          <Button size="lg">Подробнее о материале</Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="outline">Заказать печать</Button>
        </Link>
      </div>

      <button
        onClick={onRestart}
        className="mt-6 text-sm text-gray-500 hover:text-accent transition-colors"
      >
        {t('quiz.restart') || 'Пройти квиз заново'}
      </button>
    </Card>
  );
}