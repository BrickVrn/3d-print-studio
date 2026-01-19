'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/forms/ContactForm';
import { useLanguage } from '@/hooks/useLanguage';

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <section className="py-16">
      <Container size="lg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('contact.title') || (lang === 'ru' ? 'Оставить заявку' : 'Submit request')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-12">
            {lang === 'ru'
              ? 'Расскажите о вашем проекте, и мы свяжемся с вами для расчёта стоимости'
              : 'Tell us about your project and we will contact you to calculate the cost'}
          </p>

          {showSuccess ? (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2">
                {lang === 'ru' ? 'Заявка отправлена!' : 'Request submitted!'}
              </h2>
              <p className="text-gray-500 mb-6">
                {lang === 'ru'
                  ? 'Мы свяжемся с вами в ближайшее время'
                  : 'We will contact you shortly'}
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-accent hover:underline"
              >
                {lang === 'ru' ? 'Отправить ещё одну' : 'Submit another'}
              </button>
            </Card>
          ) : (
            <Card>
              <ContactForm onSuccess={() => setShowSuccess(true)} />
            </Card>
          )}

          {/* Contact Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold mb-1">
                {lang === 'ru' ? 'Адрес' : 'Address'}
              </h3>
              <p className="text-sm text-gray-500">
                {lang === 'ru'
                  ? 'г. Москва, ул. Примерная, 1'
                  : '123 Main St, Moscow'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold mb-1">
                {lang === 'ru' ? 'Телефон' : 'Phone'}
              </h3>
              <p className="text-sm text-gray-500">8 800 123-45-67</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✉️</div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-gray-500">info@3dprint.studio</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}