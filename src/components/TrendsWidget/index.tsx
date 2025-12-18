'use client';

import { useEffect, useRef, useId } from 'react';
import type { WidgetConfig } from '@/interfaces/chart-config.interface';

interface TrendsWidgetProps {
  config: WidgetConfig;
}

const SCRIPT_ID = 'google-trends-script';

const TrendsWidget = ({ config }: TrendsWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  useEffect(() => {
    if (!widgetRef.current) return;

    const renderWidget = () => {
      if ((window as any).trends && widgetRef.current) {
        // Limpa o container
        while (widgetRef.current.firstChild) {
          widgetRef.current.removeChild(widgetRef.current.firstChild);
        }

        (window as any).trends.embed.renderExploreWidgetTo(
          widgetRef.current,
          config.type,
          {
            comparisonItem: config.comparisonItem,
            category: config.category,
            property: config.property,
          },
          {
            exploreQuery: config.exploreQuery,
            guestPath: config.guestPath,
          }
        );
      }
    };

    const existingScript = document.getElementById(SCRIPT_ID);

    if (existingScript && (window as any).trends) {
      renderWidget();
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://ssl.gstatic.com/trends_nrtr/4284_RC01/embed_loader.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener('load', renderWidget);
    }
  }, [config, uniqueId]);

  return (
    <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{config.title}</h3>
      </div>
      {/* Container com posição relativa para o overlay */}
      <div className="relative flex-1">
        <div ref={widgetRef} className="min-h-[400px] w-full h-full" />
        
        {/* Overlay para cobrir a marca Google Trends */}
        <div className="absolute top-[1px] right-[1px] bg-white px-3 py-1 z-10 flex items-center gap-1">
          <span className="text-base font-bold">
            <span style={{ color: '#f24405' }}>Inter</span>
            <span className="text-slate-700">insights</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendsWidget;

