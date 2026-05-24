'use client';

import { useEffect } from 'react';
import type { Perfume } from '@/lib/types';
import PerfumeBottle from './PerfumeBottle';

interface Props {
  perfume: Perfume;
  onClose: () => void;
}

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-[110px_1fr] gap-3 py-2 border-b border-mahogany-700/40">
    <div className="text-[11px] uppercase tracking-[0.18em] text-champagne-500 font-body pt-0.5">
      {label}
    </div>
    <div className="text-cream-50 font-body text-sm">{value || '—'}</div>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-mahogany-900/85 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-mahogany-800 to-mahogany-900 border border-champagne-500/30 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-mahogany-700/80 text-cream-50 hover:bg-mahogany-600 transition-colors flex items-center justify-center"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 p-6">
          {/* Frasco grande */}
          <div className="flex flex-col items-center justify-center bg-mahogany-900/60 rounded-md p-6 border border-mahogany-700/50">
            <PerfumeBottle perfume={perfume} size={200} />
            {perfume.url && (
              <a
                href={perfume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-xs text-champagne-400 hover:text-champagne-500 underline-offset-4 hover:underline tracking-wider uppercase font-body"
              >
                Site oficial ↗
              </a>
            )}
          </div>

          {/* Detalhes */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-champagne-500 font-body">
              {perfume.marca}
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 italic leading-tight mt-1">
              {perfume.nome}
            </h2>
            {perfume.avaliacao && (
              <div className="mt-2 text-sm text-champagne-400">{perfume.avaliacao}</div>
            )}

            <div className="mt-5">
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
                          className="px-2 py-0.5 rounded-full text-[11px] bg-mahogany-700/60 border border-champagne-500/20 text-cream-50"
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
              className="mt-5 inline-block text-[11px] uppercase tracking-widest text-mahogany-400 hover:text-champagne-500 font-body"
            >
              Editar no Notion ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
