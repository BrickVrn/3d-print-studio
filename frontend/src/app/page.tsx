import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { HeroSection } from '@/components/hero/HeroSection';

export default function Home() {
  return (
    <>
      <HeroSection />

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