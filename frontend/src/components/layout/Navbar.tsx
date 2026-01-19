'use client';

import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <Container size="lg">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            3D Print Studio
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-accent transition-colors">
              {t('home')}
            </Link>
            <Link href="/plastics" className="hover:text-accent transition-colors">
              {t('plastics')}
            </Link>
            <Link href="/quiz" className="hover:text-accent transition-colors">
              {t('quiz')}
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              {t('contact')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm">
              {t('orderNow')}
            </Button>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-sm font-medium rounded border border-gray-300 dark:border-gray-700"
            >
              {lang.toUpperCase()}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}