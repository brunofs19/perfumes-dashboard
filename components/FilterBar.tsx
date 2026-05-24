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
    className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] rounded-full border transition-all whitespace-nowrap ${
      active
        ? 'bg-oak-600 text-cream-50 border-oak-600 shadow-sm'
        : 'bg-white/70 text-oak-600 border-oak-300 hover:border-oak-500 hover:bg-white'
    }`}
  >
    {children}
  </button>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-[10px] uppercase tracking-[0.22em] text-oak-500 mr-1 min-w-[70px]">
      {label}
    </span>
    {children}
  </div>
);

export default function FilterBar({ perfumes, filters, onChange }: Props) {
  const counts = useMemo(() => {
    const c = { total: perfumes.length, Niche: 0, Designer: 0 };
    perfumes.forEach((p) => {
      if (p.categoria === 'Niche') c.Niche++;
      else if (p.categoria === 'Designer') c.Designer++;
    });
    return c;
  }, [perfumes]);

  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-3">
      <Row label="Categoria">
        <Pill active={filters.categoria === ''} onClick={() => set('categoria', '')}>
          Todos ({counts.total})
        </Pill>
        <Pill active={filters.categoria === 'Niche'} onClick={() => set('categoria', 'Niche')}>
          Niche ({counts.Niche})
        </Pill>
        <Pill active={filters.categoria === 'Designer'} onClick={() => set('categoria', 'Designer')}>
          Designer ({counts.Designer})
        </Pill>
      </Row>

      <Row label="Período">
        <Pill active={filters.periodo === ''} onClick={() => set('periodo', '')}>Todos</Pill>
        <Pill active={filters.periodo === '☀️ Dia'} onClick={() => set('periodo', '☀️ Dia')}>☀️ Dia</Pill>
        <Pill active={filters.periodo === '🌙 Noite'} onClick={() => set('periodo', '🌙 Noite')}>🌙 Noite</Pill>
        <Pill active={filters.periodo === '🌗 Versátil'} onClick={() => set('periodo', '🌗 Versátil')}>🌗 Versátil</Pill>
      </Row>

      <Row label="Ocasião">
        <Pill active={filters.ocasiao === ''} onClick={() => set('ocasiao', '')}>Todos</Pill>
        <Pill active={filters.ocasiao === '💼 Trabalho'} onClick={() => set('ocasiao', '💼 Trabalho')}>💼 Trabalho</Pill>
        <Pill active={filters.ocasiao === '🍷 Jantar'} onClick={() => set('ocasiao', '🍷 Jantar')}>🍷 Jantar</Pill>
        <Pill active={filters.ocasiao === '🏋️ Academia'} onClick={() => set('ocasiao', '🏋️ Academia')}>🏋️ Academia</Pill>
        <Pill active={filters.ocasiao === 'Casual'} onClick={() => set('ocasiao', 'Casual')}>Casual</Pill>
      </Row>

      <Row label="Gênero">
        <Pill active={filters.genero === ''} onClick={() => set('genero', '')}>Todos</Pill>
        <Pill active={filters.genero === '♂️ Homem'} onClick={() => set('genero', '♂️ Homem')}>♂️ Homem</Pill>
        <Pill active={filters.genero === '♀️ Mulher'} onClick={() => set('genero', '♀️ Mulher')}>♀️ Mulher</Pill>
        <Pill active={filters.genero === '♀️♂️ Unissex'} onClick={() => set('genero', '♀️♂️ Unissex')}>♀️♂️ Unissex</Pill>
      </Row>
    </div>
  );
}
