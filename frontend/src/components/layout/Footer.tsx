import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
      <Container size="lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 3D Print Studio. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-accent">Политика конфиденциальности</a>
            <a href="#" className="hover:text-accent">Условия использования</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}