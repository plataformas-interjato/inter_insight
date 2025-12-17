export type ColorVariant = 'blue' | 'red' | 'yellow' | 'green' | 'purple';

export interface SearchTerm {
  id: string;
  label: string;
  color: ColorVariant;
}

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface TermChartData {
  termId: string;
  data: ChartDataPoint[];
}

