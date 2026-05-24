import { Client } from '@notionhq/client';
import type { Perfume } from './types';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

function plainText(prop: any): string | null {
  if (!prop) return null;
  if (prop.type === 'title') return prop.title.map((t: any) => t.plain_text).join('') || null;
  if (prop.type === 'rich_text') return prop.rich_text.map((t: any) => t.plain_text).join('') || null;
  return null;
}

function selectName(prop: any): string | null {
  if (!prop || prop.type !== 'select' || !prop.select) return null;
  return prop.select.name;
}

function multiSelectNames(prop: any): string[] {
  if (!prop || prop.type !== 'multi_select') return [];
  return prop.multi_select.map((o: any) => o.name);
}

function dateStart(prop: any): string | null {
  if (!prop || prop.type !== 'date' || !prop.date) return null;
  return prop.date.start;
}

function urlValue(prop: any): string | null {
  if (!prop || prop.type !== 'url') return null;
  return prop.url;
}

/**
 * Extrai URL de um campo Files do Notion.
 * Suporta TODOS os formatos:
 *   - file:        upload nativo Notion (S3 assinada, expira ~1h)
 *   - external:    link externo (ex: Google Drive, imgur)
 *   - file_upload: novo tipo via Upload API
 *   - Fallback recursivo: procura qualquer URL http(s) no objeto.
 */
function fileUrl(prop: any): string | null {
  if (!prop || prop.type !== 'files') return null;
  const first = prop.files?.[0];
  if (!first) return null;

  // 1. Tipos conhecidos da API REST do Notion
  if (first.file?.url) return first.file.url;
  if (first.external?.url) return first.external.url;
  if (first.file_upload?.url) return first.file_upload.url;

  // 2. Fallback recursivo: procura qualquer string URL dentro do objeto
  const findUrl = (obj: any, depth = 0): string | null => {
    if (!obj || depth > 5) return null;
    if (typeof obj === 'string') {
      if (obj.startsWith('http://') || obj.startsWith('https://')) return obj;
      return null;
    }
    if (typeof obj !== 'object') return null;
    for (const key of Object.keys(obj)) {
      const found = findUrl(obj[key], depth + 1);
      if (found) return found;
    }
    return null;
  };

  return findUrl(first);
}

export async function fetchPerfumes(): Promise<Perfume[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ property: 'Marca', direction: 'ascending' }],
    page_size: 100
  });

  // Debug: logar o primeiro perfume com Foto preenchida (só roda 1x no build/revalidate)
  if (process.env.NODE_ENV !== 'production' || process.env.DEBUG_FOTO === '1') {
    const withFoto = response.results.find((p: any) => {
      const f = p.properties['Foto'];
      return f?.files?.length > 0;
    });
    if (withFoto) {
      console.log('[debug-foto] sample raw:', JSON.stringify((withFoto as any).properties['Foto'], null, 2));
    }
  }

  return response.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      nome: plainText(p['Nome']) || 'Sem nome',
      marca: plainText(p['Marca']) || '',
      avaliacao: selectName(p['Avaliação']) as Perfume['avaliacao'],
      categoria: selectName(p['Categoria']) as Perfume['categoria'],
      concentracao: selectName(p['Concentração']) as Perfume['concentracao'],
      familiaOlfativa: multiSelectNames(p['Família Olfativa']) as Perfume['familiaOlfativa'],
      genero: selectName(p['Gênero']) as Perfume['genero'],
      ocasiao: multiSelectNames(p['Ocasião']) as Perfume['ocasiao'],
      periodo: selectName(p['Período']) as Perfume['periodo'],
      nivel: selectName(p['Nível']) as Perfume['nivel'],
      pais: plainText(p['País']),
      notasPrincipais: plainText(p['Notas principais']),
      observacoes: plainText(p['Observações']),
      dataCompra: dateStart(p['Data Compra']),
      valorPago: plainText(p['Valor Pago']),
      url: urlValue(p['URL']),
      foto: fileUrl(p['Foto']),
      notionUrl: page.url
    };
  });
}
