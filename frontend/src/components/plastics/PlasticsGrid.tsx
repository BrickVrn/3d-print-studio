'use client';

import { plastics } from '@/lib/plastics';
import { PlasticCard } from './PlasticCard';

export function PlasticsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plastics.map((plastic) => (
        <PlasticCard key={plastic.id} plastic={plastic} />
      ))}
    </div>
  );
}