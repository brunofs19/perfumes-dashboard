import { fetchPerfumes } from '@/lib/notion';
import Armario from '@/components/Armario';

export const revalidate = 60;

export default async function HomePage() {
  const perfumes = await fetchPerfumes();

  return (
    <main className="min-h-screen armario-bg relative">
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <a
          href="https://www.notion.so/6a814306dfcc4efe8ae98128e9cdc242"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 z-20 inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/70 hover:bg-white border border-champagne-500/40 hover:border-champagne-500 text-oak-700 hover:text-oak-800 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md group"
          aria-label="Abrir Lista Desejo de Perfumes no Notion"
        >
          <span className="text-champagne-600 group-hover:scale-110 transition-transform">♡</span>
          <span className="hidden sm:inline">Lista Desejo</span>
          <span className="sm:hidden">Wishlist</span>
          <span className="text-oak-400 group-hover:text-champagne-600 group-hover:translate-x-0.5 transition-all">↗</span>
        </a>

        <header className="text-center mb-12 sm:mb-16">
          <div className="text-[11px] uppercase tracking-[0.4em] text-oak-500 mb-3">
            Coleção Pessoal
          </div>
          <h1 className="font-display italic text-5xl sm:text-6xl lg:text-7xl font-medium tracking-wide text-oak-800 mb-3">
            Perfumes
          </h1>
          <div className="flex items-center justify-center gap-3 text-champagne-600">
            <span className="h-px w-12 bg-champagne-500/50" />
            <span className="font-display italic text-lg sm:text-xl text-oak-600">Bruno Faustino</span>
            <span className="h-px w-12 bg-champagne-500/50" />
          </div>
          <p className="mt-6 text-sm sm:text-base text-oak-500 font-light">
            {perfumes.length} fragrâncias · atualizado em tempo real
          </p>
        </header>

        <Armario perfumes={perfumes} />

        <footer className="mt-16 text-center text-xs text-oak-400">
          <p>Dashboard sincronizado com Notion · revalida a cada 60s</p>
        </footer>
      </div>
    </main>
  );
}
