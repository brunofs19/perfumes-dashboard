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

export async function fetchPerfumes(): Promise<Perfume[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ property: 'Marca', direction: 'ascending' }],
    page_size: 100
  });

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
      notionUrl: page.url
    };
  });
}
