import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';

interface HeroContentProps {
  onOrder?: () => void;
}

export function HeroContent({ onOrder }: HeroContentProps) {
  const { t } = useLanguage();

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center pointer-events-auto z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          3D Print Studio
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle') || 'Профессиональная 3D печать любой сложности. Быстро, качественно, надёжно.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onOrder}>
            {t('hero.order') || 'Заказать печать'}
          </Button>
          <Button size="lg" variant="outline">
            {t('hero.more') || 'Подробнее'}
          </Button>
        </div>
      </div>
    </div>
  );
}