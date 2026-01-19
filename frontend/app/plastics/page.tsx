import { Container } from '@/components/ui/Container';
import { PlasticsGrid } from '@/components/plastics/PlasticsGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Пластики - 3D Print Studio',
  description: 'Каталог материалов для 3D печати: PLA, PETG, ABS, ASA, TPU, Nylon',
};

export default function PlasticsPage() {
  return (
    <section className="py-16">
      <Container size="lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Материалы для 3D печати</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Выберите подходящий материал для вашего проекта. Каждый пластик имеет свои уникальные свойства и области применения.
        </p>
        <PlasticsGrid />
      </Container>
    </section>
  );
}