import type { AreaChartConfig, ComparisonItem } from '@/interfaces/chart-config.interface';

const economiaComparisonItems: ComparisonItem[] = [
  { keyword: 'inflação', geo: 'BR-RN', time: 'today 12-m' },
  { keyword: 'desemprego', geo: 'BR-RN', time: 'today 12-m' },
  { keyword: 'crescimento', geo: 'BR-RN', time: 'today 12-m' },
  { keyword: 'custo de vida', geo: 'BR-RN', time: 'today 12-m' },
];

const economiaExploreQuery = 'geo=BR-RN&q=infla%C3%A7%C3%A3o,desemprego,crescimento,custo%20de%20vida&hl=pt&date=today 12-m,today 12-m,today 12-m,today 12-m';
const guestPath = 'https://trends.google.com.br:443/trends/embed/';

export const chartsConfig: Record<string, AreaChartConfig> = {
  // Economia - ID: 1
  '1': {
    areaId: '1',
    areaName: 'Economia',
    description: 'Inflação, desemprego, crescimento e custo de vida',
    widgets: [
      {
        type: 'TIMESERIES',
        title: 'Interesse ao longo do tempo',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'GEO_MAP',
        title: 'Detalhamento comparado por cidade',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'GEO_MAP_0',
        title: 'Interesses por cidade',
        subtitle: 'Inflação',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'RELATED_QUERIES_0',
        title: 'Pesquisas relacionadas',
        subtitle: 'Inflação',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'GEO_MAP_1',
        title: 'Interesses por cidade',
        subtitle: 'Desemprego',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'RELATED_QUERIES_1',
        title: 'Pesquisas relacionadas',
        subtitle: 'Desemprego',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'GEO_MAP_2',
        title: 'Interesses por cidade',
        subtitle: 'Crescimento',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'RELATED_QUERIES_2',
        title: 'Pesquisas relacionadas',
        subtitle: 'Crescimento',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'GEO_MAP_3',
        title: 'Interesses por cidade',
        subtitle: 'Custo de vida',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
      {
        type: 'RELATED_QUERIES_3',
        title: 'Pesquisas relacionadas',
        subtitle: 'Custo de vida',
        comparisonItem: economiaComparisonItems,
        category: 0,
        property: '',
        exploreQuery: economiaExploreQuery,
        guestPath,
      },
    ],
  },
};

