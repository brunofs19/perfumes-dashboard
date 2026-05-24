'use client';

export interface Filters {
  periodo: string;
  ocasiao: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
  visible: number;
}

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
      className="appearance-none bg-white/70 border border-oak-300 text-oak-700 text-[11px] sm:text-xs font-medium rounded-full px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-champagne-500/40 hover:border-champagne-500 cursor-pointer transition max-w-[180px] sm:max-w-none truncate"
    >
      {children}
    </select>
    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-oak-500 text-[10px]">▾</span>
  </div>
);

export default function FilterBar({ filters, onChange, total, visible }: Props) {
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

  const hasActiveFilter = filters.periodo !== '' || filters.ocasiao !== '';

  return (
    <div className="space-y-3">
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

        {hasActiveFilter && (
          <button
            onClick={() => onChange({ periodo: '', ocasiao: '' })}
            className="text-[10px] uppercase tracking-[0.18em] text-oak-500 hover:text-oak-800 underline-offset-2 hover:underline ml-1"
            aria-label="Limpar todos os filtros"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="text-[11px] uppercase tracking-[0.2em] text-oak-500 font-medium">
        {visible === total ? `${total} fragrâncias` : `${visible} de ${total} fragrâncias`}
      </div>
    </div>
  );
}
