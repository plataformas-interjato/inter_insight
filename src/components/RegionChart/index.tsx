'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import { fetchInterestByRegion, type RegionDataPoint } from '@/services/serpapi';

interface RegionChartProps {
  keywords: string[];
  geo?: string;
  title?: string;
}

const COLORS = ['#f24405', '#3B82F6', '#22C55E', '#EAB308', '#A855F7'];

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
    <div className="relative">
      <div className="w-10 h-10 border-4 border-slate-200 rounded-full" />
      <div className="absolute top-0 left-0 w-10 h-10 border-4 border-t-orange-500 rounded-full animate-spin" />
    </div>
    <p className="text-slate-500 text-sm">Carregando dados...</p>
  </div>
);

const ErrorMessage = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
    <div className="text-amber-500 text-4xl">⚠️</div>
    <div className="text-center">
      <p className="text-slate-600 font-medium">Dados temporariamente indisponíveis</p>
      <p className="text-slate-400 text-sm mt-1">Tente novamente mais tarde.</p>
    </div>
  </div>
);

const RegionChart = ({ keywords, geo = 'BR-RN', title = 'Interesse por região' }: RegionChartProps) => {
  const [data, setData] = useState<RegionDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchInterestByRegion(keywords, geo);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [keywords, geo]);

  // Transforma os dados para mostrar por cidade com todos os tópicos
  const chartData = data.slice(0, 8).map((point) => {
    const item: Record<string, string | number> = {
      location: point.location,
    };
    
    point.values.forEach((v, index) => {
      item[v.query] = v.extracted_value;
      item[`color_${index}`] = COLORS[index % COLORS.length];
    });
    
    return item;
  });

  // Extrai as keywords reais da resposta da API (pode ter ordem diferente)
  const apiKeywords = data.length > 0 && data[0].values.length > 0
    ? data[0].values.map(v => v.query)
    : keywords;

  // Dados filtrados por keyword selecionada (usa o nome da keyword para garantir)
  const selectedQuery = apiKeywords[selectedKeyword] || keywords[selectedKeyword];
  const filteredChartData = data.slice(0, 10).map((point) => {
    // Busca pelo nome da query, não pelo índice
    const value = point.values.find(v => v.query === selectedQuery) || point.values[selectedKeyword];
    return {
      location: point.location,
      value: value?.extracted_value || 0,
      query: value?.query || selectedQuery,
    };
  });

  return (
    <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <span className="text-base font-bold">
          <span style={{ color: '#f24405' }}>Inter</span>
          <span className="text-slate-700">insights</span>
        </span>
      </div>

      {/* Tabs para selecionar keyword - usa keywords da API se disponíveis */}
      {!loading && !error && apiKeywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {apiKeywords.map((keyword, index) => (
            <button
              key={keyword}
              type="button"
              onClick={() => setSelectedKeyword(index)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-full transition-all
                flex items-center gap-2
                ${selectedKeyword === index 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {keyword}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage />}
      
      {!loading && !error && filteredChartData.length > 0 && (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart 
            data={filteredChartData} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              type="category" 
              dataKey="location"
              tick={{ fontSize: 12, fill: '#64748b' }}
              width={75}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value) => [`${value}%`, selectedQuery]}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
              fill={COLORS[selectedKeyword % COLORS.length]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {!loading && !error && filteredChartData.length === 0 && (
        <div className="flex items-center justify-center min-h-[280px] text-slate-400">
          <p>Nenhum dado disponível para esta região</p>
        </div>
      )}

      {/* Legenda com todas as keywords da API */}
      {!loading && !error && apiKeywords.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-4 justify-center">
            {apiKeywords.map((keyword, index) => (
              <div key={keyword} className="flex items-center gap-2 text-xs text-slate-600">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                {keyword}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionChart;
