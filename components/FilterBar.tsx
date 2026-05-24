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
  total: number;
  visible: number;
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
    className={`px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-full border transition-all whitespace-nowrap ${
      active
        ? 'bg-oak-700 text-cream-50 border-oak-700 shadow-sm'
        : 'bg-white/70 text-oak-600 border-oak-300 hover:border-champagne-500 hover:bg-white hover:text-oak-700'
    }`}
  >
    {children}
  </button>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] uppercase tracking-[0.22em] text-oak-500 font-medium mr-1">
    {children}
  </span>
);

const StyledSelect = ({
  value,
  onChange,
  children
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white/70 border border-oak-300 text-oak-700 text-[11px] sm:text-xs font-medium rounded-full px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-champagne-500/40 hover:border-champagne-500 cursor-pointer transition max-w-[160px] sm:max-w-none truncate"
    >
      {children}
    </select>
    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-oak-500 text-[10px]">▾</span>
  </div>
);

export default function FilterBar({ perfumes, filters, onChange, total, visible }: Props) {
  const counts = useMemo(() => {
    const c = { total: perfumes.length, Niche: 0, Designer: 0 };
    perfumes.forEach((p) => {
      if (p.categoria === 'Niche') c.Niche++;
      else if (p.categoria === 'Designer') c.Designer++;
    });
    return c;
  }, [perfumes]);

  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  const periodos: { value: string; label: string }[] = [
    { value: '', label: 'Todos os períodos' },
    { value: '☀️ Dia', label: '☀️ Dia' },
    { value: '🌙 Noite', label: '🌙 Noite' },
    { value: '🌗 Versátil', label: '🌗 Versátil' },
  ];

  const ocasioes: { value: string; label: string }[] = [
    { value: '', label: 'Todas ocasiões' },
    { value: '💼 Trabalho', label: '💼 Trabalho' },
    { value: '🍷 Jantar', label: '🍷 Jantar' },
    { value: '🏋️ Academia', label: '🏋️ Academia' },
    { value: 'Casual', label: 'Casual' },
  ];

  const generos: { value: string; label: string }[] = [
    { value: '', label: 'Todos gêneros' },
    { value: '♂️ Homem', label: '♂️ Homem' },
    { value: '♀️ Mulher', label: '♀️ Mulher' },
    { value: '♀️♂️ Unissex', label: '♀️♂️ Unissex' },
  ];

  const hasActiveFilter =
    filters.categoria !== '' ||
    filters.periodo !== '' ||
    filters.ocasiao !== '' ||
    filters.genero !== '';

  return (
    <div className="space-y-3">
      {/* Categoria — pílulas (poucas opções, fica bom no mobile) */}
      <div className="flex flex-wrap items-center gap-2">
        <SectionLabel>Categoria</SectionLabel>
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

      {/* Período + Ocasião + Gênero — selects compactos lado a lado */}
      <div className="flex flex-wrap items-center gap-2">
        <SectionLabel>Filtros</SectionLabel>
        <StyledSelect value={filters.periodo} onChange={(v) => set('periodo', v)}>
          {periodos.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </StyledSelect>
        <StyledSelect value={filters.ocasiao} onChange={(v) => set('ocasiao', v)}>
          {ocasioes.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </StyledSelect>
        <StyledSelect value={filters.genero} onChange={(v) => set('genero', v)}>
          {generos.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </StyledSelect>

        {hasActiveFilter && (
          <button
            onClick={() =>
              onChange({ categoria: '', periodo: '', ocasiao: '', genero: '' })
            }
            className="text-[10px] uppercase tracking-[0.18em] text-oak-500 hover:text-oak-800 underline-offset-2 hover:underline ml-1"
            aria-label="Limpar todos os filtros"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Contador */}
      <div className="text-[11px] uppercase tracking-[0.2em] text-oak-500 font-medium">
        {visible === total ? `${total} fragrâncias` : `${visible} de ${total} fragrâncias`}
      </div>
    </div>
  );
}
