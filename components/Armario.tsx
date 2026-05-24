'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Perfume } from '@/lib/types';
import PerfumeSlot from './PerfumeSlot';
import PerfumeModal from './PerfumeModal';
import FilterBar, { type Filters } from './FilterBar';

interface Props {
  perfumes: Perfume[];
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Quantos perfumes por prateleira em função da largura.
 * Mobile (<640): 2 / sm (640-1024): 3 / lg (1024-1280): 4 / xl (>=1280): 5
 */
function usePerShelf() {
  const [perShelf, setPerShelf] = useState(5);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) setPerShelf(5);
      else if (w >= 1024) setPerShelf(4);
      else if (w >= 640) setPerShelf(3);
      else setPerShelf(2);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return perShelf;
}

export default function Armario({ perfumes }: Props) {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [filters, setFilters] = useState<Filters>({
    periodo: '',
    ocasiao: ''
  });
  const perShelf = usePerShelf();

  const filtered = useMemo(() => {
    return perfumes.filter((p) => {
      if (filters.periodo && p.periodo !== filters.periodo) return false;
      if (filters.ocasiao && !p.ocasiao.includes(filters.ocasiao as any)) return false;
      return true;
    });
  }, [perfumes, filters]);

  // Ordem natural — sem reverse, sem escada 3D
  const shelves = useMemo(() => chunk(filtered, perShelf), [filtered, perShelf]);

  return (
    <>
      <div className="mb-7">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          total={perfumes.length}
          visible={filtered.length}
        />
      </div>

      <div className="armario-cabinet mb-8">
        <div className="armario-frame">
          {shelves.length === 0 && (
            <div className="text-center py-16 text-oak-500 italic font-display text-xl">
              Nenhum perfume corresponde aos filtros.
            </div>
          )}

          {shelves.map((row, idx) => {
            const isLast = idx === shelves.length - 1;
            return (
              <div key={idx} className="shelf-row">
                <div className="shelf-content">
                  {row.map((p) => (
                    <PerfumeSlot key={p.id} perfume={p} onClick={() => setSelected(p)} />
                  ))}
                  {row.length < perShelf &&
                    Array.from({ length: perShelf - row.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="empty-slot" />
                    ))}
                </div>
                {!isLast && <div className="shelf-plank" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>

      {selected && <PerfumeModal perfume={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
