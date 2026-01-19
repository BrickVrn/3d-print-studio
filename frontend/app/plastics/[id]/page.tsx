import { notFound } from 'next/navigation';
import { getPlastic, plastics } from '@/lib/plastics';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return plastics.map((plastic) => ({
    id: plastic.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const plastic = getPlastic(id);

  if (!plastic) {
    return { title: 'Не найдено' };
  }

  return {
    title: `${plastic.name} - 3D Print Studio`,
    description: plastic.description,
  };
}

export default async function PlasticPage({ params }: Props) {
  const { id } = await params;
  const plastic = getPlastic(id);

  if (!plastic) {
    notFound();
  }

  return (
    <section className="py-16">
      <Container size="lg">
        {/* Back Link */}
        <Link
          href="/plastics"
          className="inline-flex items-center text-accent hover:underline mb-8"
        >
          ← К каталогу
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Column */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: plastic.color }}
              >
                {plastic.name}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{plastic.name}</h1>
                <p className="text-gray-500">{plastic.nameEn}</p>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {plastic.description}
            </p>

            {/* Temperature Table */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Температурные режимы</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Температура стола</span>
                  <span className="font-medium">{plastic.bedTemp}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Температура сопла</span>
                  <span className="font-medium">{plastic.nozzleTemp}</span>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Свойства</h2>
              <ul className="space-y-2">
                {plastic.properties.map((prop) => (
                  <li key={prop} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {prop}
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Области применения</h2>
              <div className="flex flex-wrap gap-2">
                {plastic.applications.map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Заказать печать {plastic.name}</h3>
              <p className="text-gray-500 mb-6">
                Оставьте заявку, и мы свяжемся с вами для расчёта стоимости и сроков.
              </p>
              <div className="space-y-4">
                <Button size="lg" className="w-full">
                  Оставить заявку
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  Калькулятор стоимости
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium mb-2">Нужна консультация?</h4>
                <p className="text-sm text-gray-500">
                  Позвоните нам: <a href="tel:+78001234567" className="text-accent">8 800 123-45-67</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}