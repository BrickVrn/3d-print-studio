'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { quizQuestions, calculateResult } from '@/lib/quiz';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizResult } from '@/components/quiz/QuizResult';
import { useLanguage } from '@/hooks/useLanguage';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { lang, t } = useLanguage();

  const question = quizQuestions[currentQuestion];

  const handleSelect = (optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }));

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOptions({});
    setShowResult(false);
  };

  const calculateFinalResult = () => {
    const totalScores: Record<string, number> = {
      pla: 0, petg: 0, abs: 0, asa: 0, tpu: 0, nylon: 0,
    };

    Object.entries(selectedOptions).forEach(([, optionId]) => {
      const questionIndex = parseInt(Object.keys(selectedOptions).find(
        (key) => selectedOptions[parseInt(key)] === optionId
      ) || '0');
      
      const q = quizQuestions[questionIndex];
      const option = q?.options.find((o) => o.id === optionId);
      if (option) {
        Object.entries(option.scores).forEach(([plastic, score]) => {
          totalScores[plastic] += score;
        });
      }
    });

    return calculateResult(totalScores);
  };

  return (
    <section className="py-16">
      <Container size="md">
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('quiz.title') || 'Подбор материала'}
        </h1>

        {!showResult ? (
          <>
            <div className="mb-8">
              <QuizProgress current={currentQuestion} total={quizQuestions.length} />
            </div>

            <QuizQuestion
              question={question}
              selectedOption={selectedOptions[currentQuestion]}
              onSelect={handleSelect}
            />

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-gray-500 disabled:opacity-50 hover:text-accent transition-colors"
              >
                ← Назад
              </button>
            </div>
          </>
        ) : (
          <QuizResult result={calculateFinalResult()} onRestart={handleRestart} />
        )}
      </Container>
    </section>
  );
}