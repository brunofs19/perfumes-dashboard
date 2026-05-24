'use client';

import type { Perfume } from '@/lib/types';
import { liquidColor, bottleShape, capColor } from '@/lib/bottleStyles';

interface Props {
  perfume: Perfume;
  size?: number;
}

// Mapa de fill level do líquido baseado em Nível
function fillRatio(nivel: Perfume['nivel']): number {
  switch (nivel) {
    case '🟢 Cheio': return 0.92;
    case '🟢 3/4':   return 0.72;
    case '🟡 1/2':   return 0.50;
    case '🟠 1/4':   return 0.28;
    case '🔴 Vazio': return 0.06;
    default:         return 0.85;
  }
}

export default function PerfumeBottle({ perfume, size = 120 }: Props) {
  // Modo híbrido: se houver foto carregada no Notion, renderiza a foto real.
  // Caso contrário, faz fallback para o frasco SVG colorido pela família olfativa.
  if (perfume.foto) {
    const height = (size * 140) / 100;
    return (
      <div
        style={{ width: size, height }}
        className="relative flex items-end justify-center"
      >
        {/* Sombra projetada na prateleira */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: -2,
            width: size * 0.7,
            height: 6,
            background: 'rgba(101, 67, 33, 0.4)',
            filter: 'blur(2px)'
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={perfume.foto}
          alt={`${perfume.marca} ${perfume.nome}`}
          loading="lazy"
          className="relative w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(101, 67, 33, 0.35))' }}
        />
      </div>
    );
  }

  const { liquid, highlight } = liquidColor(perfume.familiaOlfativa);
  const cap = capColor(perfume.categoria);
  const shape = bottleShape(perfume.marca);
  const fill = fillRatio(perfume.nivel);

  // Viewbox: 100x140 (proporção 5:7)
  // Coordenadas variam pela silhueta
  const shapes: Record<string, { bodyD: string; capD: string; labelY: number }> = {
    square: {
      bodyD: 'M 20 50 L 20 128 Q 20 132 24 132 L 76 132 Q 80 132 80 128 L 80 50 Z',
      capD:  'M 32 28 L 32 50 L 68 50 L 68 28 Q 68 24 64 24 L 36 24 Q 32 24 32 28 Z',
      labelY: 90
    },
    tall: {
      bodyD: 'M 28 56 L 28 128 Q 28 132 32 132 L 68 132 Q 72 132 72 128 L 72 56 Q 72 50 68 48 L 32 48 Q 28 50 28 56 Z',
      capD:  'M 38 22 L 38 48 L 62 48 L 62 22 Q 62 18 58 18 L 42 18 Q 38 18 38 22 Z',
      labelY: 92
    },
    wide: {
      bodyD: 'M 14 58 Q 14 50 22 48 L 78 48 Q 86 50 86 58 L 86 126 Q 86 132 80 132 L 20 132 Q 14 132 14 126 Z',
      capD:  'M 30 24 L 30 48 L 70 48 L 70 24 Q 70 20 66 20 L 34 20 Q 30 20 30 24 Z',
      labelY: 92
    },
    gem: {
      bodyD: 'M 22 56 L 32 48 L 68 48 L 78 56 L 78 122 Q 78 132 68 132 L 32 132 Q 22 132 22 122 Z',
      capD:  'M 36 28 L 36 48 L 64 48 L 64 28 Q 64 22 58 22 L 42 22 Q 36 22 36 28 Z',
      labelY: 92
    },
    flask: {
      bodyD: 'M 26 64 Q 26 56 32 54 L 32 48 L 68 48 L 68 54 Q 74 56 74 64 L 74 126 Q 74 132 68 132 L 32 132 Q 26 132 26 126 Z',
      capD:  'M 40 18 L 40 48 L 60 48 L 60 18 Q 60 14 56 14 L 44 14 Q 40 14 40 18 Z',
      labelY: 96
    },
    classic: {
      bodyD: 'M 24 56 Q 24 48 30 48 L 70 48 Q 76 48 76 56 L 76 128 Q 76 132 72 132 L 28 132 Q 24 132 24 128 Z',
      capD:  'M 36 26 L 36 48 L 64 48 L 64 26 Q 64 22 60 22 L 40 22 Q 36 22 36 26 Z',
      labelY: 92
    }
  };

  const s = shapes[shape];
  // Calcular Y do topo do líquido com base no fill ratio.
  // O líquido ocupa do bottom (y=131) até bodyTop (y=48). Range = 83.
  const bodyTop = 48;
  const bodyBottom = 131;
  const liquidTop = bodyBottom - (bodyBottom - bodyTop) * fill;

  const uid = `b-${perfume.id.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <svg
      viewBox="0 0 100 140"
      width={size}
      height={(size * 140) / 100}
      style={{ overflow: 'visible' }}
      aria-label={`${perfume.marca} ${perfume.nome}`}
    >
      <defs>
        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.9" />
          <stop offset="40%" stopColor={liquid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={liquid} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cap.shine} />
          <stop offset="50%" stopColor={cap.fill} />
          <stop offset="100%" stopColor={cap.fill} stopOpacity="0.7" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <path d={s.bodyD} />
        </clipPath>
      </defs>

      {/* Sombra projetada na prateleira */}
      <ellipse cx="50" cy="138" rx="34" ry="3" fill="#4a3520" opacity="0.32" />

      {/* Corpo do frasco (vidro vazio) */}
      <path d={s.bodyD} fill="#000" opacity="0.18" />

      {/* Líquido dentro do frasco com clip-path */}
      <g clipPath={`url(#clip-${uid})`}>
        <rect
          x="0"
          y={liquidTop}
          width="100"
          height={bodyBottom - liquidTop + 4}
          fill={`url(#liquid-${uid})`}
        />
        {/* Reflexo do líquido (curva no topo) */}
        <ellipse cx="50" cy={liquidTop} rx="32" ry="2.5" fill={highlight} opacity="0.6" />
      </g>

      {/* Brilho do vidro (overlay) */}
      <path d={s.bodyD} fill={`url(#glass-${uid})`} />
      <path d={s.bodyD} fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.6" />

      {/* Etiqueta translúcida */}
      <rect
        x="32"
        y={s.labelY}
        width="36"
        height="18"
        rx="1"
        fill="#fdf6e8"
        opacity="0.92"
      />
      <text
        x="50"
        y={s.labelY + 8}
        textAnchor="middle"
        fontSize="4"
        fontFamily="Georgia, serif"
        fill="#3d2419"
        fontStyle="italic"
      >
        {perfume.marca.slice(0, 14)}
      </text>
      <text
        x="50"
        y={s.labelY + 14}
        textAnchor="middle"
        fontSize="3.2"
        fontFamily="Georgia, serif"
        fill="#6b4226"
      >
        {perfume.nome.slice(0, 16)}
      </text>

      {/* Pescoço do frasco (entre tampa e corpo) */}
      <rect x="42" y="44" width="16" height="6" fill="#000" opacity="0.35" />

      {/* Tampa */}
      <path d={s.capD} fill={`url(#cap-${uid})`} />
      <path d={s.capD} fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="0.5" />

      {/* Brilho na tampa */}
      <rect x={shape === 'flask' ? 41 : 38} y={shape === 'flask' ? 20 : 26} width="2" height={shape === 'flask' ? 26 : 20} fill="#fff" opacity="0.35" rx="1" />
    </svg>
  );
}
