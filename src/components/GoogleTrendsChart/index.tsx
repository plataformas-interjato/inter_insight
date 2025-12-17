'use client';

import { useEffect, useRef } from 'react';

interface GoogleTrendsChartProps {
  termId: string;
  title: string;
}

const SCRIPT_ID = 'google-trends-script';

const GoogleTrendsChart = ({ termId, title }: GoogleTrendsChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const renderWidget = () => {
      if ((window as any).trends && widgetRef.current) {
        // Limpa apenas os filhos do widget
        while (widgetRef.current.firstChild) {
          widgetRef.current.removeChild(widgetRef.current.firstChild);
        }
        
        (window as any).trends.embed.renderExploreWidgetTo(
          widgetRef.current,
          'TIMESERIES',
          {
            comparisonItem: [
              { keyword: 'Corrupção', geo: 'BR-RN', time: 'today 12-m' },
              { keyword: 'Corrução', geo: 'BR-RN', time: 'today 12-m' },
              { keyword: 'Confiança em líderes', geo: 'BR-RN', time: 'today 12-m' },
              { keyword: 'Confiança no presidente', geo: 'BR-RN', time: 'today 12-m' },
              { keyword: 'Confiança no prefeito', geo: 'BR-RN', time: 'today 12-m' },
            ],
            category: 0,
            property: '',
          },
          {
            exploreQuery:
              'geo=BR-RN&q=Corrup%C3%A7%C3%A3o,Corru%C3%A7%C3%A3o,Confian%C3%A7a%20em%20l%C3%ADderes,Confian%C3%A7a%20no%20presidente,Confian%C3%A7a%20no%20prefeito&hl=pt&date=today 12-m,today 12-m,today 12-m,today 12-m,today 12-m',
            guestPath: 'https://trends.google.com.br:443/trends/embed/',
          }
        );
      }
    };

    // Verifica se o script já foi carregado
    const existingScript = document.getElementById(SCRIPT_ID);
    
    if (existingScript && (window as any).trends) {
      // Script já existe e está carregado
      renderWidget();
    } else if (!existingScript) {
      // Carrega o script apenas uma vez
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://ssl.gstatic.com/trends_nrtr/4284_RC01/embed_loader.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      // Script existe mas ainda está carregando
      existingScript.addEventListener('load', renderWidget);
    }
  }, [termId]);

  return (
    <div ref={containerRef} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div ref={widgetRef} className="min-h-[400px] w-full" />
    </div>
  );
};

export default GoogleTrendsChart;

