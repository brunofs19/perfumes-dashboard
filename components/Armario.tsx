'use client';

import { useMemo, useState } from 'react';
import type { Perfume } from '@/lib/types';
import PerfumeSlot from './PerfumeSlot';
import PerfumeModal from './PerfumeModal';
import FilterBar, { type Filters } from './FilterBar';

interface Props {
  perfumes: Perfume[];
}

const PER_SHELF_DESKTOP = 4;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Armario({ perfumes }: Props) {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [filters, setFilters] = useState<Filters>({
    categoria: '',
    periodo: '',
    ocasiao: '',
    genero: ''
  });

  const filtered = useMemo(() => {
    return perfumes.filter((p) => {
      if (filters.categoria && p.categoria !== filters.categoria) return false;
      if (filters.periodo && p.periodo !== filters.periodo) return false;
      if (filters.ocasiao && !p.ocasiao.includes(filters.ocasiao as any)) return false;
      if (filters.genero && p.genero !== filters.genero) return false;
      return true;
    });
  }, [perfumes, filters]);

  const shelves = useMemo(() => chunk(filtered, PER_SHELF_DESKTOP), [filtered]);

  return (
    <>
      <div className="mb-6">
        <FilterBar perfumes={perfumes} filters={filters} onChange={setFilters} />
        <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-champagne-600">
          Exibindo {filtered.length} de {perfumes.length} perfumes
        </div>
      </div>

      <div className="armario-cabinet">
        <div className="armario-frame">
          {shelves.length === 0 && (
            <div className="text-center py-16 text-champagne-500 italic font-display">
              Nenhum perfume corresponde aos filtros.
            </div>
          )}

          {shelves.map((row, idx) => (
            <div key={idx} className="shelf-row">
              <div className="shelf-content">
                {row.map((p) => (
                  <PerfumeSlot key={p.id} perfume={p} onClick={() => setSelected(p)} />
                ))}
                {/* Preenche slots vazios para manter alinhamento na última prateleira */}
                {row.length < PER_SHELF_DESKTOP &&
                  Array.from({ length: PER_SHELF_DESKTOP - row.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-slot" />
                  ))}
              </div>
              <div className="shelf-plank" />
              <div className="shelf-shadow" />
            </div>
          ))}
        </div>
      </div>

      {selected && <PerfumeModal perfume={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
