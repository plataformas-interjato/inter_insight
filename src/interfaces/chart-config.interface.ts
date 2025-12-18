export type WidgetType = 
  | 'TIMESERIES' 
  | 'GEO_MAP' 
  | 'GEO_MAP_0' 
  | 'GEO_MAP_1' 
  | 'GEO_MAP_2' 
  | 'GEO_MAP_3'
  | 'RELATED_QUERIES_0'
  | 'RELATED_QUERIES_1'
  | 'RELATED_QUERIES_2'
  | 'RELATED_QUERIES_3';

export interface ComparisonItem {
  keyword: string;
  geo: string;
  time: string;
}

export interface WidgetConfig {
  type: WidgetType;
  title: string;
  subtitle?: string;
  comparisonItem: ComparisonItem[];
  category: number;
  property: string;
  exploreQuery: string;
  guestPath: string;
}

export interface AreaChartConfig {
  areaId: string;
  areaName: string;
  description: string;
  widgets: WidgetConfig[];
}

