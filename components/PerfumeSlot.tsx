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
        <div className="bottle-3d">
          <div className="bottle-glow">
            <PerfumeBottle perfume={perfume} />
          </div>
          <div className="bottle-reflection" aria-hidden="true">
            <PerfumeBottle perfume={perfume} />
          </div>
        </div>
      </div>

      <div className="mt-2 sm:mt-3 text-center px-1 max-w-full w-full">
        <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-cream-300 font-body truncate">
          {perfume.marca}
        </div>
        <div className="font-display text-sm sm:text-base italic text-cream-50 leading-tight mt-1 truncate">
          {perfume.nome}
        </div>
        {perfume.avaliacao && (
          <div className="text-[11px] sm:text-xs text-champagne-400 mt-1 truncate">
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
                  className={`block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${
                    i < filled ? 'bg-cream-100' : 'border border-cream-300/40'
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
