import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Print Studio',
  description: 'Профессиональная 3D печать и моделирование',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}