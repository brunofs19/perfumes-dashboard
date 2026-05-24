'use client';

import { useEffect } from 'react';
import type { Perfume } from '@/lib/types';
import PerfumeBottle from './PerfumeBottle';

interface Props {
  perfume: Perfume;
  onClose: () => void;
}

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2 sm:gap-3 py-2.5 border-b border-oak-200">
    <div className="text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] text-oak-500 font-body pt-0.5">
      {label}
    </div>
    <div className="text-oak-800 font-body text-sm sm:text-base">{value || '—'}</div>
  </div>
);

export default function PerfumeModal({ perfume, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop px-3 sm:px-4 py-4 sm:py-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[92vh] overflow-y-auto bg-gradient-to-b from-cream-50 to-cream-100 border border-oak-300 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-oak-200 text-oak-700 hover:bg-oak-300 transition-colors flex items-center justify-center text-lg"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Frasco — menor no mobile */}
          <div className="flex flex-col items-center justify-center bg-cream-200/60 rounded-lg p-4 sm:p-6 border border-oak-200">
            <div className="w-32 sm:w-44 md:w-52">
              <div style={{ aspectRatio: '5 / 7' }} className="flex items-end justify-center">
                <PerfumeBottle perfume={perfume} />
              </div>
            </div>
            {perfume.url && (
              <a
                href={perfume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-6 text-xs sm:text-sm text-oak-600 hover:text-champagne-600 underline-offset-4 hover:underline tracking-wider uppercase font-body"
              >
                Site oficial ↗
              </a>
            )}
          </div>

          <div>
            <div className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-oak-500 font-body">
              {perfume.marca}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-oak-800 italic leading-tight mt-1">
              {perfume.nome}
            </h2>
            {perfume.avaliacao && (
              <div className="mt-2 text-sm sm:text-base text-champagne-600 font-medium">
                {perfume.avaliacao}
              </div>
            )}

            <div className="mt-4 sm:mt-5">
              <Row label="Categoria" value={perfume.categoria} />
              <Row label="Concentração" value={perfume.concentracao} />
              <Row label="Gênero" value={perfume.genero} />
              <Row label="Período" value={perfume.periodo} />
              <Row
                label="Ocasião"
                value={perfume.ocasiao.length ? perfume.ocasiao.join(' • ') : null}
              />
              <Row
                label="Família"
                value={
                  perfume.familiaOlfativa.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {perfume.familiaOlfativa.map((f) => (
                        <span
                          key={f}
                          className="px-2.5 py-1 rounded-full text-xs sm:text-sm bg-oak-100 border border-oak-300 text-oak-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  ) : null
                }
              />
              <Row label="Nível" value={perfume.nivel} />
              <Row label="Notas" value={perfume.notasPrincipais} />
              <Row label="País" value={perfume.pais} />
              <Row
                label="Comprado em"
                value={
                  perfume.dataCompra
                    ? new Date(perfume.dataCompra).toLocaleDateString('pt-BR')
                    : null
                }
              />
              <Row label="Valor Pago" value={perfume.valorPago} />
              {perfume.observacoes && <Row label="Observações" value={perfume.observacoes} />}
            </div>

            <a
              href={perfume.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-5 inline-block text-xs sm:text-sm uppercase tracking-widest text-oak-400 hover:text-champagne-600 font-body"
            >
              Editar no Notion ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
