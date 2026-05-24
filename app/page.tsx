import { fetchPerfumes } from '@/lib/notion';
import Armario from '@/components/Armario';

export const revalidate = 60; // ISR a cada 60s

export default async function HomePage() {
  const perfumes = await fetchPerfumes();

  return (
    <main className="min-h-screen px-4 py-10 md:py-14 max-w-screen-2xl mx-auto">
      <header className="mb-10 text-center">
        <div className="text-[11px] uppercase tracking-[0.4em] text-champagne-600">
          Coleção Pessoal · Bruno Faustino
        </div>
        <h1 className="font-display italic text-4xl md:text-6xl text-cream-50 mt-2">
          Armário de Perfumes
        </h1>
        <div className="mt-3 h-px w-24 bg-champagne-500/40 mx-auto" />
      </header>

      <Armario perfumes={perfumes} />

      <footer className="mt-10 text-center text-[10px] uppercase tracking-[0.3em] text-mahogany-400">
        Sincronizado com Notion · Atualiza a cada 60s
      </footer>
    </main>
  );
}
