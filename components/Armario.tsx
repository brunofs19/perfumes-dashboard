'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Perfume } from '@/lib/types';
import PerfumeSlot from './PerfumeSlot';
import PerfumeModal from './PerfumeModal';
import FilterBar, { type Filters } from './FilterBar';

interface Props {
  perfumes: Perfume[];
}

const STEP_OFFSET_PX = 90;   // deslocamento horizontal por nível (desktop)
const STEP_DEPTH_PX = 130;   // recuo Z (profundidade) por nível
const STEP_SCALE_DECAY = 0.035; // redução de escala por nível

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Quantos perfumes por prateleira, em função da largura.
 * Mobile (<640): 2 / sm (640-1024): 3 / lg (1024-1280): 4 / xl (>=1280): 5
 * Mesma escala usada no grid de relógios.
 */
function usePerShelf() {
  const [perShelf, setPerShelf] = useState(5); // SSR default = desktop largo
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
    categoria: '',
    periodo: '',
    ocasiao: '',
    genero: ''
  });
  const perShelf = usePerShelf();

  const filtered = useMemo(() => {
    return perfumes.filter((p) => {
      if (filters.categoria && p.categoria !== filters.categoria) return false;
      if (filters.periodo && p.periodo !== filters.periodo) return false;
      if (filters.ocasiao && !p.ocasiao.includes(filters.ocasiao as any)) return false;
      if (filters.genero && p.genero !== filters.genero) return false;
      return true;
    });
  }, [perfumes, filters]);

  // Quebra em prateleiras dinâmicas; depois inverte para que o TOPO
  // (mais elevado / mais ao fundo) seja o primeiro item — coerente com a escada.
  const shelves = useMemo(() => {
    const all = chunk(filtered, perShelf);
    return all.reverse();
  }, [filtered, perShelf]);

  const totalLevels = shelves.length;
  const isMobile = perShelf <= 2;

  return (
    <>
      <div className="mb-7">
        <FilterBar perfumes={perfumes} filters={filters} onChange={setFilters} />
        <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-oak-500 font-body">
          Exibindo {filtered.length} de {perfumes.length} perfumes
          {totalLevels > 1 && !isMobile && (
            <span className="ml-3 text-oak-400">· {totalLevels} níveis</span>
          )}
        </div>
      </div>

      <div className="armario-cabinet mb-8">
        <div className="armario-frame">
          {shelves.length === 0 && (
            <div className="text-center py-16 text-oak-500 italic font-display text-xl">
              Nenhum perfume corresponde aos filtros.
            </div>
          )}

          {shelves.map((row, idx) => {
            const levelFromTop = idx;
            const levelFromBottom = totalLevels - 1 - idx;

            // Em mobile, não aplica offset/scale/translateZ — escada some.
            const offsetPx = isMobile ? 0 : levelFromTop * STEP_OFFSET_PX;
            const translateZ = isMobile ? 0 : -STEP_DEPTH_PX * levelFromTop;
            const scale = isMobile ? 1 : 1 - STEP_SCALE_DECAY * levelFromTop;

            const isElevated = levelFromBottom > 0 && !isMobile;

            return (
              <div
                key={idx}
                className={`shelf-row ${isElevated ? 'is-elevated' : ''}`}
                style={{
                  marginLeft: `${offsetPx}px`,
                  transform: `translateZ(${translateZ}px) scale(${scale})`,
                  transformOrigin: '50% 100%',
                  zIndex: levelFromBottom,
                }}
                aria-label={`Prateleira nível ${levelFromBottom + 1} de ${totalLevels}`}
              >
                {!isMobile && <div className="step-glow" aria-hidden="true" />}
                <div className="shelf-content">
                  {row.map((p) => (
                    <PerfumeSlot key={p.id} perfume={p} onClick={() => setSelected(p)} />
                  ))}
                  {row.length < perShelf &&
                    Array.from({ length: perShelf - row.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="empty-slot" />
                    ))}
                </div>
                <div className="shelf-plank" aria-hidden="true" />
                {isElevated && <div className="step-face" aria-hidden="true" />}
                {!isMobile && <div className="shelf-shadow" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>

      {selected && <PerfumeModal perfume={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
