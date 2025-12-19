'use client';

import { useEffect, useState } from 'react';
import { fetchRelatedQueries, type RelatedQuery } from '@/services/serpapi';

interface RelatedQueriesProps {
  keywords: string[];
  geo?: string;
  title?: string;
  type?: 'top' | 'rising';
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
    <div className="relative">
      <div className="w-10 h-10 border-4 border-slate-200 rounded-full" />
      <div className="absolute top-0 left-0 w-10 h-10 border-4 border-t-orange-500 rounded-full animate-spin" />
    </div>
    <p className="text-slate-500 text-sm">Carregando dados...</p>
  </div>
);

const ErrorMessage = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
    <div className="text-amber-500 text-4xl">⚠️</div>
    <div className="text-center">
      <p className="text-slate-600 font-medium">Dados temporariamente indisponíveis</p>
      <p className="text-slate-400 text-sm mt-1">Tente novamente mais tarde.</p>
    </div>
  </div>
);

const RelatedQueries = ({ 
  keywords, 
  geo = 'BR-RN', 
  title = 'Pesquisas relacionadas',
  type = 'top',
}: RelatedQueriesProps) => {
  const [data, setData] = useState<{ rising: RelatedQuery[]; top: RelatedQuery[] }>({ rising: [], top: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchRelatedQueries(keywords, geo);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [keywords, geo]);

  const queries = type === 'rising' ? data.rising : data.top;

  return (
    <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <span className="text-xs text-slate-500">
            {type === 'rising' ? 'Em alta' : 'Principais'}
          </span>
        </div>
        <span className="text-base font-bold">
          <span style={{ color: '#f24405' }}>Inter</span>
          <span className="text-slate-700">insights</span>
        </span>
      </div>

      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage />}
      
      {!loading && !error && queries.length > 0 && (
        <div className="space-y-2">
          {queries.slice(0, 10).map((query, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400 w-6">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {query.query}
                </span>
              </div>
              {query.value && (
                <span className={`text-sm font-semibold ${
                  type === 'rising' ? 'text-green-600' : 'text-slate-600'
                }`}>
                  {query.value}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && !error && queries.length === 0 && (
        <div className="flex items-center justify-center min-h-[200px] text-slate-400">
          <p>Nenhuma pesquisa relacionada encontrada</p>
        </div>
      )}
    </div>
  );
};

export default RelatedQueries;

