# Armário de Perfumes — Dashboard

Dashboard visual da coleção de perfumes do Bruno, lendo direto da database **Perfumes — Coleção** do Notion (`9bd72f3292cc4fc186609f38b98f8075`).

Renderiza um **armário com prateleiras de mogno** onde cada perfume aparece como um **frasco SVG gerado dinamicamente** — silhueta varia pela marca, cor do líquido varia pela família olfativa, nível do líquido reflete o campo `Nível` do Notion. Clique abre modal com todos os detalhes.

**Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS v3 + Notion API. ISR a cada 60s. Mesma arquitetura do `relogios-dashboard`.

---

## Setup local

```bash
npm install
cp .env.example .env.local
# preencher .env.local com NOTION_TOKEN e demais variáveis
npm run dev
```

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NOTION_TOKEN` | Token da integration **"Dashboard Perfumes"** no Notion |
| `NOTION_DATABASE_ID` | `9bd72f3292cc4fc186609f38b98f8075` (database Perfumes — Coleção) |
| `REVALIDATE_SECRET` | Qualquer string aleatória (opcional, para webhook de revalidação) |

## Pré-requisitos no Notion

1. Criar integration **"Dashboard Perfumes"** em https://www.notion.so/profile/integrations
2. Copiar o token (`secret_...`)
3. Na database "Perfumes — Coleção", clicar em `••• → Connections → Dashboard Perfumes`

## Deploy no Vercel

1. Push do repo para GitHub (`brunofs19/perfumes-dashboard`)
2. Importar no Vercel
3. Configurar as 3 env vars acima
4. Deploy. Próximas atualizações no Notion aparecem em até 60s sem redeploy.

## Estrutura

```
app/
├── globals.css       — estética do armário (madeira, iluminação dourada)
├── layout.tsx        — root layout + fontes Cormorant Garamond + Inter
└── page.tsx          — fetch dos perfumes + render principal (ISR 60s)
components/
├── Armario.tsx       — container com prateleiras + filtros + modal state
├── FilterBar.tsx     — filtros Categoria / Período / Ocasião / Gênero
├── PerfumeSlot.tsx   — slot individual no armário
├── PerfumeBottle.tsx — frasco SVG renderizado a partir dos dados
└── PerfumeModal.tsx  — modal de detalhes
lib/
├── notion.ts         — client + fetchPerfumes()
├── types.ts          — interface Perfume + enums
└── bottleStyles.ts   — mapa cor/silhueta por família/marca
```

## Mapeamento visual

**Cor do líquido** ← Família Olfativa primária  
**Silhueta do frasco** ← Marca (Chanel/Hermès = cúbico, Dior/Tom Ford = alongado, Creed/Amouage = atarracado, Bulgari = joalheria, Initio/Marly/LV = pescoço alto, demais = clássico)  
**Cor da tampa** ← Categoria (Niche = dourada, Designer = prateada)  
**Nível do líquido visível no frasco** ← campo `Nível` do Notion (Cheio = 92% / 3/4 = 72% / 1/2 = 50% / 1/4 = 28% / Vazio = 6%)

## Edição visual

Componentes modulares — sempre editar via find/replace cirúrgico, não sobrescrever arquivo inteiro. Cores principais em `tailwind.config.js` e `app/globals.css`.
