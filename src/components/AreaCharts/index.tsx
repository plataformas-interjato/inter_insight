'use client';

import type { SearchTerm } from '@/interfaces/search-term.interface';
import { chartsConfig } from '@/config/charts.config';
import TrendsWidget from '@/components/TrendsWidget';

interface AreaChartsProps {
  selectedTerms: SearchTerm[];
}

const AreaCharts = ({ selectedTerms }: AreaChartsProps) => {
  if (selectedTerms.length === 0) {
    return (
      <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <p className="text-slate-500">Selecione uma área de preocupação para visualizar os gráficos</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {selectedTerms.map((term) => {
        const areaConfig = chartsConfig[term.id];

        if (!areaConfig) {
          // Placeholder para áreas ainda não configuradas
          return (
            <div
              key={term.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  {term.label}
                </h3>
                <p className="text-sm text-slate-500">Gráficos em configuração...</p>
              </div>
              <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                <p>Em breve: gráficos para {term.label}</p>
              </div>
            </div>
          );
        }

        return (
          <div key={term.id} className="space-y-6">
            {/* Cabeçalho da área */}
            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#f24405' }}>
              <h2 className="text-2xl font-bold text-slate-800">{areaConfig.areaName}</h2>
              <p className="text-sm text-slate-500">{areaConfig.description}</p>
            </div>

            {/* Widgets da área */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:auto-rows-fr">
              {areaConfig.widgets.map((widget, index) => (
                <div
                  key={`${term.id}-${widget.type}-${index}`}
                  className={`h-full ${widget.type === 'TIMESERIES' ? 'lg:col-span-2' : ''}`}
                >
                  <TrendsWidget config={widget} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AreaCharts;

