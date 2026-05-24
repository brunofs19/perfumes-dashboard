'use client';

import type { Perfume } from '@/lib/types';
import PerfumeBottle from './PerfumeBottle';

interface Props {
  perfume: Perfume;
  onClick: () => void;
}

export default function PerfumeSlot({ perfume, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="perfume-slot group relative flex flex-col items-center justify-end px-2 pb-2 pt-4 transition-transform duration-300 hover:-translate-y-1"
      aria-label={`Ver detalhes de ${perfume.marca} ${perfume.nome}`}
    >
      <div className="bottle-glow relative">
        <PerfumeBottle perfume={perfume} size={110} />
      </div>
      <div className="mt-2 text-center px-1">
        <div className="text-[10px] uppercase tracking-[0.15em] text-champagne-500 font-body">
          {perfume.marca}
        </div>
        <div className="font-display text-xs italic text-cream-50 leading-tight mt-0.5">
          {perfume.nome}
        </div>
      </div>
    </button>
  );
}
