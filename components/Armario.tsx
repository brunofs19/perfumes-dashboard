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
const STEP_OFFSET_PX = 90;   // deslocamento horizontal por nível
const STEP_DEPTH_PX = 130;   // recuo Z (profundidade) por nível
const STEP_SCALE_DECAY = 0.035; // redução de escala por nível (afastamento)

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

  // Quebra em prateleiras de 5; depois inverte para que o TOPO (mais elevado / mais ao fundo)
  // seja o primeiro item renderizado e a BASE seja o último — coerente com a escada visual.
  const shelves = useMemo(() => {
    const all = chunk(filtered, PER_SHELF);
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
            // idx 0 = topo (mais ao fundo). idx maior = mais à frente.
            const levelFromTop = idx;
            const levelFromBottom = totalLevels - 1 - idx;

            // Topo é o mais deslocado lateralmente; base fica alinhada (chão).
            const offsetPx = levelFromTop * STEP_OFFSET_PX;
            // Topo afasta no Z (negativo); base fica em z=0 (à frente).
            const translateZ = -STEP_DEPTH_PX * levelFromTop;
            // Topo encolhe sutilmente; base mantém escala 1.
            const scale = 1 - STEP_SCALE_DECAY * levelFromTop;

            const isElevated = levelFromBottom > 0;

            return (
              <div
                key={idx}
                className={`shelf-row ${isElevated ? 'is-elevated' : ''}`}
                style={{
                  marginLeft: `${offsetPx}px`,
                  transform: `translateZ(${translateZ}px) scale(${scale})`,
                  transformOrigin: '50% 100%',
                  // base (levelFromBottom alto) deve ficar por cima na pilha
                  zIndex: levelFromBottom,
                }}
                aria-label={`Prateleira nível ${levelFromBottom + 1} de ${totalLevels}`}
              >
                <div className="step-glow" aria-hidden="true" />
                <div className="shelf-content">
                  {row.map((p) => (
                    <PerfumeSlot key={p.id} perfume={p} onClick={() => setSelected(p)} />
                  ))}
                  {row.length < PER_SHELF &&
                    Array.from({ length: PER_SHELF - row.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="empty-slot" />
                    ))}
                </div>
                <div className="shelf-plank" aria-hidden="true" />
                {isElevated && <div className="step-face" aria-hidden="true" />}
                <div className="shelf-shadow" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      {selected && <PerfumeModal perfume={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
