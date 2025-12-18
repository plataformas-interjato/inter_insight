'use client';

import Header from '@/components/Header';
import SearchTermCard from '@/components/SearchTermCard';
import AreaCharts from '@/components/AreaCharts';
import { useSearchTermsStore } from '@/stores/search_terms';

const HomePage = () => {
  const { terms, selectedTermIds, toggleTerm } = useSearchTermsStore();

  const selectedTerms = terms.filter((term) => selectedTermIds.includes(term.id));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Título da seção */}
        <h2 className="mb-8 text-2xl font-bold text-slate-800">Área de preocupação</h2>
        
        {/* Cards de termos de pesquisa */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {terms.map((term) => (
            <SearchTermCard
              key={term.id}
              term={term}
              isSelected={selectedTermIds.includes(term.id)}
              onToggle={toggleTerm}
            />
          ))}
        </div>

        {/* Container dos gráficos */}
        <AreaCharts selectedTerms={selectedTerms} />
      </main>
    </div>
  );
};

export default HomePage;
