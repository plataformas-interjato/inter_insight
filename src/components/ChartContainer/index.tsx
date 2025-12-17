'use client';

import type { SearchTerm } from '@/interfaces/search-term.interface';
import GoogleTrendsChart from '@/components/GoogleTrendsChart';

interface ChartContainerProps {
  selectedTerms: SearchTerm[];
}

const ChartContainer = ({ selectedTerms }: ChartContainerProps) => {
  if (selectedTerms.length === 0) {
    return (
      <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <p className="text-slate-500">Selecione um ou mais termos para visualizar os gráficos</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {selectedTerms.map((term) => {
        // Verifica se é o termo "Corrupção e política" (id: 4)
        if (term.id === '4') {
          return (
            <GoogleTrendsChart
              key={term.id}
              termId={term.id}
              title="Interesse ao longo do tempo"
            />
          );
        }

        // Placeholder para outros termos
        return (
          <div
            key={term.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Interesse ao longo do tempo - {term.label}
              </h3>
            </div>
            <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-slate-50 text-slate-400">
              <p>Gráfico: {term.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChartContainer;

