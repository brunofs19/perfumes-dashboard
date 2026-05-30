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

      <div className="-mt-3 sm:-mt-4 text-center px-1 max-w-full w-full">
        <div className="text-[13px] sm:text-[14px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-oak-500 font-body truncate">
          {perfume.marca}
        </div>
        <div className="font-display text-[17px] sm:text-[19px] italic text-oak-800 leading-tight mt-1 truncate">
          {perfume.nome}
        </div>
        {perfume.ocasiao && perfume.ocasiao.length > 0 && (
          <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-oak-500/80 mt-1.5 truncate">
            {perfume.ocasiao.join(' · ')}
          </div>
        )}
        {perfume.avaliacao && (
          <div className="text-[13px] sm:text-[14px] text-champagne-600 mt-1.5 truncate">
            {perfume.avaliacao}
          </div>
        )}
        {perfume.nivel && (() => {
          const fill = perfume.nivel.includes('Cheio') ? 0.92
            : perfume.nivel.includes('3/4') ? 0.72
            : perfume.nivel.includes('1/2') ? 0.50
            : perfume.nivel.includes('1/4') ? 0.28
            : 0.06;
          const label = perfume.nivel.includes('Cheio') ? 'Cheio'
            : perfume.nivel.includes('3/4') ? '¾'
            : perfume.nivel.includes('1/2') ? '½'
            : perfume.nivel.includes('1/4') ? '¼'
            : 'Vazio';
          return (
            <div
              className="mt-2 sm:mt-2.5 flex flex-col items-center gap-1"
              aria-label={`Nível: ${perfume.nivel}`}
              title={perfume.nivel}
            >
              <div className="relative w-16 sm:w-20 h-2 sm:h-2.5 bg-cream-200/70 border border-oak-300/40 rounded-full overflow-hidden shadow-inner">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-champagne-400 via-champagne-600 to-oak-700 rounded-full transition-all"
                  style={{ width: `${fill * 100}%` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-full" />
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] text-oak-500 tracking-[0.15em] uppercase font-body">
                {label}
              </span>
            </div>
          );
        })()}
      </div>
    </button>
  );
}
