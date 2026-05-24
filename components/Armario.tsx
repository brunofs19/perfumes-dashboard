'use client';

import { useMemo, useState } from 'react';
import type { Perfume } from '@/lib/types';
import PerfumeSlot from './PerfumeSlot';
import PerfumeModal from './PerfumeModal';
import FilterBar, { type Filters } from './FilterBar';

interface Props {
  perfumes: Perfume[];
}

const PER_SHELF = 5;
const STEP_OFFSET_PX = 83; // deslocamento horizontal por nível (efeito escada)

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

  // Quebra em prateleiras de 5; o ÚLTIMO chunk é a prateleira da BASE
  // e os anteriores são níveis acima — assim a escada visualmente "sobe"
  const shelves = useMemo(() => {
    const all = chunk(filtered, PER_SHELF);
    // Inverter para renderizar do topo (mais elevada) para a base
    return all.reverse();
  }, [filtered]);

  const totalLevels = shelves.length;

  return (
    <>
      <div className="mb-7">
        <FilterBar perfumes={perfumes} filters={filters} onChange={setFilters} />
        <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-oak-500 font-body">
          Exibindo {filtered.length} de {perfumes.length} perfumes
          {totalLevels > 1 && <span className="ml-3 text-oak-400">· {totalLevels} níveis</span>}
        </div>
      </div>

      <div className="armario-cabinet">
        <div className="armario-frame">
          {shelves.length === 0 && (
            <div className="text-center py-16 text-oak-500 italic font-display text-xl">
              Nenhum perfume corresponde aos filtros.
            </div>
          )}

          {shelves.map((row, idx) => {
            // O nível mais elevado é o primeiro (idx=0); o mais baixo é o último
            const levelFromTop = idx;
            const levelFromBottom = totalLevels - 1 - idx;
            // Offset cresce do topo pro fundo: topo desloca mais à direita,
            // base fica alinhada à esquerda (referência do "chão")
            const offsetPx = levelFromTop * STEP_OFFSET_PX;
            const isElevated = levelFromBottom > 0;

            return (
              <div
                key={idx}
                className={`shelf-row ${isElevated ? 'is-elevated' : ''}`}
                style={{ marginLeft: `${offsetPx}px` }}
                aria-label={`Prateleira nível ${levelFromBottom + 1} de ${totalLevels}`}
              >
                <div className="shelf-content">
                  {row.map((p) => (
                    <PerfumeSlot key={p.id} perfume={p} onClick={() => setSelected(p)} />
                  ))}
                  {row.length < PER_SHELF &&
                    Array.from({ length: PER_SHELF - row.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="empty-slot" />
                    ))}
                </div>
                <div className="shelf-plank" />
                <div className="shelf-shadow" />
              </div>
            );
          })}
        </div>
      </div>

      {selected && <PerfumeModal perfume={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
