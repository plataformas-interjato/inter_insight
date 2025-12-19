import { create } from 'zustand';
import type { SearchTerm, ChartDataPoint, ColorVariant } from '@/interfaces/search-term.interface';

interface SearchTermsState {
  terms: SearchTerm[];
  selectedTermIds: string[];
  chartData: Record<string, ChartDataPoint[]>;
  toggleTerm: (termId: string) => void;
  selectTerm: (termId: string) => void;
  deselectTerm: (termId: string) => void;
  clearSelection: () => void;
}

const generateMockChartData = (termId: string): ChartDataPoint[] => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const baseValue = Math.random() * 30 + 20;
  
  return months.map((month, index) => ({
    month,
    value: Math.min(100, Math.max(0, baseValue + (index * 3) + (Math.random() * 20 - 10))),
  }));
};

const initialTerms: SearchTerm[] = [
  { id: '1', label: 'Economia', color: 'blue' },
  { id: '2', label: 'Segurança e crime', color: 'red' },
  { id: '3', label: 'Saúde', color: 'yellow' },
  { id: '4', label: 'Corrupção e política', color: 'green' },
  { id: '5', label: 'Serviços públicos sociais', color: 'purple' },
  { id: '6', label: 'Meio ambiente/clima', color: 'blue' },
  { id: '7', label: 'Migração e sociedade', color: 'red' },
];

const initialChartData: Record<string, ChartDataPoint[]> = {};
initialTerms.forEach((term) => {
  initialChartData[term.id] = generateMockChartData(term.id);
});

export const useSearchTermsStore = create<SearchTermsState>((set) => ({
  terms: initialTerms,
  selectedTermIds: [],
  chartData: initialChartData,

  toggleTerm: (termId: string) =>
    set((state) => {
      const isSelected = state.selectedTermIds.includes(termId);
      if (isSelected) {
        // Se já está selecionado, desseleciona
        return { selectedTermIds: [] };
      }
      // Se não está selecionado, seleciona apenas este (remove os anteriores)
      return { selectedTermIds: [termId] };
    }),

  selectTerm: (termId: string) =>
    set((state) => {
      if (state.selectedTermIds.includes(termId)) return state;
      // Seleciona apenas este termo (remove os anteriores)
      return { selectedTermIds: [termId] };
    }),

  deselectTerm: (termId: string) =>
    set((state) => ({
      selectedTermIds: state.selectedTermIds.filter((id) => id !== termId),
    })),

  clearSelection: () => set({ selectedTermIds: [] }),
}));

export const getColorClass = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };
  return colorMap[color];
};

export const getChartColor = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    blue: '#3B82F6',
    red: '#EF4444',
    yellow: '#EAB308',
    green: '#22C55E',
    purple: '#A855F7',
  };
  return colorMap[color];
};

