'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { fetchInterestOverTime, type TimelineDataPoint } from '@/services/serpapi';

interface TimeSeriesChartProps {
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

const TimeSeriesChart = ({ keywords, geo = 'BR-RN', title = 'Interesse ao longo do tempo' }: TimeSeriesChartProps) => {
  const [data, setData] = useState<TimelineDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchInterestOverTime(keywords, geo);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [keywords, geo]);

  // Transforma os dados para o formato do Recharts
  const chartData = data.map((point) => {
    const item: Record<string, string | number> = {
      date: point.date,
    };
    
    point.values.forEach((v) => {
      item[v.query] = v.extracted_value;
    });
    
    return item;
  });

  return (
    <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <span className="text-base font-bold">
          <span style={{ color: '#f24405' }}>Inter</span>
          <span className="text-slate-700">insights</span>
        </span>
      </div>

      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage />}
      
      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend />
            {keywords.map((keyword, index) => (
              <Line
                key={keyword}
                type="monotone"
                dataKey={keyword}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      {!loading && !error && chartData.length === 0 && (
        <div className="flex items-center justify-center min-h-[300px] text-slate-400">
          <p>Nenhum dado disponível</p>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesChart;

