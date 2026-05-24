'use client';

import type { Perfume } from '@/lib/types';
import { useMemo } from 'react';

export interface Filters {
  categoria: string;
  periodo: string;
  ocasiao: string;
  genero: string;
}

interface Props {
  perfumes: Perfume[];
  filters: Filters;
  onChange: (f: Filters) => void;
}

const Pill = ({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-[11px] uppercase tracking-[0.15em] rounded-full border transition-all whitespace-nowrap ${
      active
        ? 'bg-champagne-500 text-mahogany-900 border-champagne-500'
        : 'bg-mahogany-800/50 text-champagne-400 border-mahogany-600 hover:border-champagne-500/60'
    }`}
  >
    {children}
  </button>
);

export default function FilterBar({ perfumes, filters, onChange }: Props) {
  const counts = useMemo(() => {
    const c = {
      total: perfumes.length,
      Niche: 0,
      Designer: 0
    };
    perfumes.forEach((p) => {
      if (p.categoria === 'Niche') c.Niche++;
      else if (p.categoria === 'Designer') c.Designer++;
    });
    return c;
  }, [perfumes]);

  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-600 mr-1">Categoria</span>
        <Pill active={filters.categoria === ''} onClick={() => set('categoria', '')}>
          Todos ({counts.total})
        </Pill>
        <Pill active={filters.categoria === 'Niche'} onClick={() => set('categoria', 'Niche')}>
          Niche ({counts.Niche})
        </Pill>
        <Pill active={filters.categoria === 'Designer'} onClick={() => set('categoria', 'Designer')}>
          Designer ({counts.Designer})
        </Pill>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-600 mr-1">Período</span>
        <Pill active={filters.periodo === ''} onClick={() => set('periodo', '')}>Todos</Pill>
        <Pill active={filters.periodo === '☀️ Dia'} onClick={() => set('periodo', '☀️ Dia')}>☀️ Dia</Pill>
        <Pill active={filters.periodo === '🌙 Noite'} onClick={() => set('periodo', '🌙 Noite')}>🌙 Noite</Pill>
        <Pill active={filters.periodo === '🌗 Versátil'} onClick={() => set('periodo', '🌗 Versátil')}>🌗 Versátil</Pill>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-600 mr-1">Ocasião</span>
        <Pill active={filters.ocasiao === ''} onClick={() => set('ocasiao', '')}>Todos</Pill>
        <Pill active={filters.ocasiao === '💼 Trabalho'} onClick={() => set('ocasiao', '💼 Trabalho')}>💼 Trabalho</Pill>
        <Pill active={filters.ocasiao === '🍷 Jantar'} onClick={() => set('ocasiao', '🍷 Jantar')}>🍷 Jantar</Pill>
        <Pill active={filters.ocasiao === '🏋️ Academia'} onClick={() => set('ocasiao', '🏋️ Academia')}>🏋️ Academia</Pill>
        <Pill active={filters.ocasiao === 'Casual'} onClick={() => set('ocasiao', 'Casual')}>Casual</Pill>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-600 mr-1">Gênero</span>
        <Pill active={filters.genero === ''} onClick={() => set('genero', '')}>Todos</Pill>
        <Pill active={filters.genero === '♂️ Homem'} onClick={() => set('genero', '♂️ Homem')}>♂️ Homem</Pill>
        <Pill active={filters.genero === '♀️ Mulher'} onClick={() => set('genero', '♀️ Mulher')}>♀️ Mulher</Pill>
        <Pill active={filters.genero === '♀️♂️ Unissex'} onClick={() => set('genero', '♀️♂️ Unissex')}>♀️♂️ Unissex</Pill>
      </div>
    </div>
  );
}
