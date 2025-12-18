'use client';

import { useEffect, useState } from 'react';
import type { SearchTerm } from '@/interfaces/search-term.interface';
import { chartsConfig } from '@/config/charts.config';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import RegionChart from '@/components/RegionChart';
import RelatedQueries from '@/components/RelatedQueries';

interface AreaChartsProps {
  selectedTerms: SearchTerm[];
  allTerms: SearchTerm[];
}

const AreaCharts = ({ selectedTerms, allTerms }: AreaChartsProps) => {
  // Guarda quais áreas já foram acessadas (para não carregar todas de uma vez)
  const [accessedAreas, setAccessedAreas] = useState<Set<string>>(new Set());

  // Quando um termo é selecionado, marca como acessado
  useEffect(() => {
    selectedTerms.forEach((term) => {
      setAccessedAreas((prev) => new Set([...prev, term.id]));
    });
  }, [selectedTerms]);

  const selectedIds = selectedTerms.map((t) => t.id);

  if (selectedTerms.length === 0) {
    return (
      <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <p className="text-slate-500">Selecione uma área de preocupação para visualizar os gráficos</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {allTerms.map((term) => {
        const areaConfig = chartsConfig[term.id];
        const isSelected = selectedIds.includes(term.id);
        const wasAccessed = accessedAreas.has(term.id);

        // Se nunca foi acessado, não renderiza nada
        if (!wasAccessed) {
          return null;
        }

        // Se não tem configuração de gráficos
        if (!areaConfig) {
          return (
            <div
              key={term.id}
              className={isSelected ? 'block' : 'hidden'}
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
            </div>
          );
        }

        return (
          <div 
            key={term.id} 
            className={isSelected ? 'block space-y-6' : 'hidden'}
          >
            {/* Cabeçalho da área */}
            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#f24405' }}>
              <h2 className="text-2xl font-bold text-slate-800">{areaConfig.areaName}</h2>
              <p className="text-sm text-slate-500">{areaConfig.description}</p>
            </div>

            {/* Gráfico de linha - Interesse ao longo do tempo */}
            <TimeSeriesChart 
              keywords={areaConfig.keywords}
              geo={areaConfig.geo}
              title="Interesse ao longo do tempo"
            />

            {/* Grid com gráficos secundários */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Interesse por região */}
              <RegionChart 
                keywords={areaConfig.keywords}
                geo={areaConfig.geo}
                title="Interesse por região"
              />

              {/* Pesquisas relacionadas - Top */}
              <RelatedQueries 
                keywords={areaConfig.keywords}
                geo={areaConfig.geo}
                title="Pesquisas relacionadas"
                type="top"
              />

              {/* Pesquisas relacionadas - Em alta */}
              <RelatedQueries 
                keywords={areaConfig.keywords}
                geo={areaConfig.geo}
                title="Pesquisas em alta"
                type="rising"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AreaCharts;
