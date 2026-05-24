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
      className="perfume-slot group relative"
      aria-label={`Ver detalhes de ${perfume.marca} ${perfume.nome}`}
    >
      <div className="bottle-wrap">
        <div className="bottle-glow">
          <PerfumeBottle perfume={perfume} />
        </div>
      </div>

      <div className="mt-2 sm:mt-3 text-center px-1 max-w-full w-full">
        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-oak-500 font-body truncate">
          {perfume.marca}
        </div>
        <div className="font-display text-xs sm:text-sm italic text-oak-800 leading-tight mt-0.5 truncate">
          {perfume.nome}
        </div>
        {perfume.avaliacao && (
          <div className="text-[9px] sm:text-[10px] text-champagne-600 mt-0.5 sm:mt-1 truncate">
            {perfume.avaliacao}
          </div>
        )}
        {perfume.nivel && (() => {
          const filled = perfume.nivel.includes('Cheio') ? 3
            : perfume.nivel.includes('3/4') ? 3
            : perfume.nivel.includes('1/2') ? 2
            : perfume.nivel.includes('1/4') ? 1
            : 0;
          return (
            <div
              className="flex gap-1 justify-center mt-1 sm:mt-1.5"
              aria-label={`Nível: ${perfume.nivel}`}
              title={perfume.nivel}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${
                    i < filled ? 'bg-oak-700' : 'border border-oak-400'
                  }`}
                />
              ))}
            </div>
          );
        })()}
      </div>
    </button>
  );
}
