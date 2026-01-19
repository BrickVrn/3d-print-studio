'use client';

import { useState, useEffect, useCallback } from 'react';
import { Three3DScene } from './Three3DScene';
import { HeroContent } from './HeroContent';

interface HeroSectionProps {
  onOrder?: () => void;
}

export function HeroSection({ onOrder }: HeroSectionProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Включаем autoRotate когда пользователь не взаимодействует
  const autoRotate = !isInteracting;

  const handleInteractionStart = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    setIsInteracting(false);
  }, []);

  // Плавное появление при загрузке
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      {/* 3D Scene */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        <Three3DScene autoRotate={autoRotate} />
      </div>

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />

      {/* Content */}
      <HeroContent onOrder={onOrder} />
    </section>
  );
}