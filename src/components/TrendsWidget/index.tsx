'use client';

import { useEffect, useRef, useId, useState } from 'react';
import type { WidgetConfig } from '@/interfaces/chart-config.interface';

interface TrendsWidgetProps {
  config: WidgetConfig;
}

const SCRIPT_ID = 'google-trends-script';

const TrendsWidget = ({ config }: TrendsWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const [iframeHeight, setIframeHeight] = useState(0);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Observa mudanças de tamanho para encontrar o iframe
    const resizeObserver = new ResizeObserver(() => {
      if (widgetRef.current) {
        const iframe = widgetRef.current.querySelector('iframe');
        if (iframe) {
          setIframeHeight(iframe.offsetHeight);
        }
      }
    });

    // Observa mudanças no DOM para detectar quando o iframe é adicionado
    const mutationObserver = new MutationObserver(() => {
      const iframe = widgetRef.current?.querySelector('iframe');
      if (iframe) {
        setIframeHeight(iframe.offsetHeight);
        resizeObserver.observe(iframe);
      }
    });

    mutationObserver.observe(widgetRef.current, {
      childList: true,
      subtree: true,
    });

    const renderWidget = () => {
      if ((window as any).trends && widgetRef.current) {
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

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [config, uniqueId]);

  return (
    <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{config.title}</h3>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div ref={widgetRef} className="min-h-[400px] w-full h-full" />
        
        {/* Overlay superior direito */}
        <div className="absolute top-0 right-0 bg-white px-4 py-2 z-10 flex items-center gap-1 min-w-[140px] justify-end">
          <span className="text-base font-bold">
            <span style={{ color: '#f24405' }}>Inter</span>
            <span className="text-slate-700">insights</span>
          </span>
        </div>

        {/* Overlay inferior dinâmico - posicionado com base na altura do iframe */}
        {iframeHeight > 0 && (
          <div 
            className="absolute left-0 right-0 bg-white h-10 z-10 flex items-center justify-between px-4"
            style={{ top: iframeHeight - 40 }}
          >
            <span className="text-xs text-slate-400">Dados: InterInsights</span>
            <span className="text-xs text-slate-400">Fonte: InterInsights</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendsWidget;
