'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { ordersApi } from '@/lib/api';

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useLanguage();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      const fileArray = Array.from(selected);
      if (fileArray.length > 5) {
        setSubmitError(lang === 'ru' ? 'Максимум 5 файлов' : 'Maximum 5 files');
        return;
      }
      setFiles(fileArray);
      setSubmitError(null);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Отправляем данные на API
      await ordersApi.create({
        client_name: data.name,
        client_email: data.email,
        client_phone: data.phone,
        description: data.description,
      });

      reset();
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onSuccess?.();
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      setSubmitError(
        axiosError.response?.data?.error ||
        (lang === 'ru' ? 'Ошибка отправки. Попробуйте ещё раз.' : 'Submission error. Try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label={lang === 'ru' ? 'Ваше имя' : 'Your name'}
          placeholder={lang === 'ru' ? 'Иван Иванов' : 'John Doe'}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label={lang === 'ru' ? 'Телефон' : 'Phone'}
          placeholder="+7 (999) 123-45-67"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <div>
          <label className="block text-sm font-medium mb-1.5">
            {lang === 'ru' ? 'Файлы проекта' : 'Project files'}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".stl,.obj,.3mf,.gcode,.zip"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
          />
          <p className="mt-1 text-xs text-gray-500">
            {lang === 'ru'
              ? 'STL, OBJ, 3MF, GCODE. Макс. 5 файлов по 10MB'
              : 'STL, OBJ, 3MF, GCODE. Max 5 files, 10MB each'}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          {lang === 'ru' ? 'Описание проекта' : 'Project description'}
        </label>
        <textarea
          className="w-full px-4 py-2.5 rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-gray-400 resize-none border-gray-300 dark:border-gray-700"
          rows={5}
          placeholder={
            lang === 'ru'
              ? 'Опишите ваш проект: размеры, материал, количество...'
              : 'Describe your project: dimensions, material, quantity...'
          }
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error">{errors.description.message}</p>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {lang === 'ru' ? 'Выбранные файлы:' : 'Selected files:'}
          </p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <span className="text-sm truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-error hover:underline text-sm"
                >
                  {lang === 'ru' ? 'Удалить' : 'Remove'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-error/10 text-error rounded-lg">{submitError}</div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? lang === 'ru'
            ? 'Отправка...'
            : 'Sending...'
          : lang === 'ru'
          ? 'Отправить заявку'
          : 'Submit request'}
      </Button>
    </form>
  );
}