export type Categoria = 'Niche' | 'Designer';
export type Genero = '♂️ Homem' | '♀️ Mulher' | '♀️♂️ Unissex';
export type Periodo = '☀️ Dia' | '🌙 Noite' | '🌗 Versátil';
export type Nivel = '🟢 Cheio' | '🟢 3/4' | '🟡 1/2' | '🟠 1/4' | '🔴 Vazio';
export type Avaliacao = '⭐⭐⭐ Muito Bom' | '⭐⭐ Bom' | '⭐ Regular';
export type Concentracao = 'EDP' | 'EDT' | 'Parfum' | 'Extrait' | 'Cologne' | 'Essence de Parfum';

export type FamiliaOlfativa =
  | 'Oriental' | 'Amadeirado' | 'Cítrico' | 'Floral' | 'Aromático' | 'Aquático'
  | 'Gourmand' | 'Fresco' | 'Especiado' | 'Iris' | 'Sândalo' | 'Couro'
  | 'Verde' | 'Fumado' | 'Baunilha' | 'Âmbar' | 'Seco' | 'Tropical' | 'Terroso';

export type Ocasiao = '💼 Trabalho' | '🍷 Jantar' | '🏋️ Academia' | 'Casual';

export interface Perfume {
  id: string;
  nome: string;
  marca: string;
  avaliacao: Avaliacao | null;
  categoria: Categoria | null;
  concentracao: Concentracao | null;
  familiaOlfativa: FamiliaOlfativa[];
  genero: Genero | null;
  ocasiao: Ocasiao[];
  periodo: Periodo | null;
  nivel: Nivel | null;
  pais: string | null;
  notasPrincipais: string | null;
  observacoes: string | null;
  dataCompra: string | null;
  valorPago: string | null;
  url: string | null;
  foto: string | null;
  notionUrl: string;
}
