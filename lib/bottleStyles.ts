import type { FamiliaOlfativa } from './types';

// Cor do líquido baseada na família olfativa primária (primeiro item da lista).
// Tons profundos, saturados — para combinar com a iluminação dourada do armário.
export const FAMILY_COLORS: Record<FamiliaOlfativa, { liquid: string; highlight: string }> = {
  Oriental:   { liquid: '#a85a1e', highlight: '#d98a3e' },
  Amadeirado: { liquid: '#5c3317', highlight: '#8b5a3c' },
  Cítrico:    { liquid: '#e8b52e', highlight: '#f5d76e' },
  Floral:     { liquid: '#d4889e', highlight: '#e8b5c5' },
  Aromático:  { liquid: '#5a7548', highlight: '#8aa872' },
  Aquático:   { liquid: '#3a7a9c', highlight: '#6ba9c8' },
  Gourmand:   { liquid: '#a85a28', highlight: '#d98758' },
  Fresco:     { liquid: '#7eb5c8', highlight: '#b5d5e2' },
  Especiado:  { liquid: '#a04020', highlight: '#c86848' },
  Iris:       { liquid: '#9080b8', highlight: '#b8a8d1' },
  Sândalo:    { liquid: '#b08568', highlight: '#d4ab8a' },
  Couro:      { liquid: '#4a2818', highlight: '#7a4a30' },
  Verde:      { liquid: '#5a7548', highlight: '#7e9670' },
  Fumado:     { liquid: '#36454f', highlight: '#5a6b75' },
  Baunilha:   { liquid: '#d4b878', highlight: '#ead5a0' },
  Âmbar:      { liquid: '#c08838', highlight: '#dfb060' },
  Seco:       { liquid: '#a89868', highlight: '#c4b48a' },
  Tropical:   { liquid: '#d96850', highlight: '#f08870' },
  Terroso:    { liquid: '#6b4423', highlight: '#8e6240' }
};

export const DEFAULT_LIQUID = { liquid: '#7a4a30', highlight: '#a86848' };

export function liquidColor(familia: FamiliaOlfativa[]): { liquid: string; highlight: string } {
  if (familia.length === 0) return DEFAULT_LIQUID;
  return FAMILY_COLORS[familia[0]] || DEFAULT_LIQUID;
}

// Silhueta do frasco — varia por marca para ficar reconhecível na prateleira.
// 'square'  → cúbico clássico (Chanel, Hermès)
// 'tall'    → alongado (Dior Sauvage, Tom Ford)
// 'wide'    → atarracado (Creed, Amouage)
// 'gem'     → joalheria/cônico (Bulgari Le Gemme)
// 'flask'   → frasco com pescoço (Initio, Parfums de Marly)
// 'classic' → fallback
export type BottleShape = 'square' | 'tall' | 'wide' | 'gem' | 'flask' | 'classic';

export function bottleShape(marca: string): BottleShape {
  const m = marca.toLowerCase();
  if (m.includes('chanel') || m.includes('hermès') || m.includes('hermes')) return 'square';
  if (m.includes('dior') || m.includes('tom ford') || m.includes('jo malone')) return 'tall';
  if (m.includes('creed') || m.includes('amouage')) return 'wide';
  if (m.includes('bulgari') || m.includes('bvlgari')) return 'gem';
  if (m.includes('initio') || m.includes('parfums de marly') || m.includes('louis vuitton')) return 'flask';
  return 'classic';
}

// Tampa: dourada para Niche, prateada para Designer.
export function capColor(categoria: string | null): { fill: string; shine: string } {
  if (categoria === 'Niche') return { fill: '#c9a875', shine: '#f0d9a0' };
  return { fill: '#8a8d92', shine: '#c5c8cc' };
}
