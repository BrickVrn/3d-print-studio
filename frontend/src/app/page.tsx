import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <>
      {/* Hero Section Placeholder */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Container size="lg">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              3D Print Studio
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Профессиональная 3D печать любой сложности. Быстро, качественно, надёжно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Заказать печать</Button>
              <Button size="lg" variant="outline">Подробнее</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Plastics Preview */}
      <section className="py-20">
        <Container size="lg">
          <h2 className="text-3xl font-bold text-center mb-12">Наши материалы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'Nylon'].map((material) => (
              <Card key={material} hover>
                <h3 className="text-xl font-semibold mb-2">{material}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Технические характеристики и области применения
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}