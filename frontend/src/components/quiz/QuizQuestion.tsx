'use client';

import { QuizQuestion as QuizQuestionType } from '@/lib/quiz';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/hooks/useLanguage';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

export function QuizQuestion({ question, selectedOption, onSelect }: QuizQuestionProps) {
  const { lang } = useLanguage();

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-6">
        {lang === 'ru' ? question.question : question.questionEn}
      </h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedOption === option.id
                ? 'border-accent bg-accent/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-accent/50'
            }`}
          >
            {lang === 'ru' ? option.text : option.textEn}
          </button>
        ))}
      </div>
    </Card>
  );
}