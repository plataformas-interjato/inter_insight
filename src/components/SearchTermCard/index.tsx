'use client';

import type { SearchTerm, ColorVariant } from '@/interfaces/search-term.interface';
import { getColorClass } from '@/stores/search_terms';

interface SearchTermCardProps {
  term: SearchTerm;
  isSelected: boolean;
  onToggle: (termId: string) => void;
}

const getSelectedBorderClass = (color: ColorVariant): string => {
  const borderMap: Record<ColorVariant, string> = {
    blue: 'border-blue-500 ring-2 ring-blue-500/30',
    red: 'border-red-500 ring-2 ring-red-500/30',
    yellow: 'border-yellow-500 ring-2 ring-yellow-500/30',
    green: 'border-green-500 ring-2 ring-green-500/30',
    purple: 'border-purple-500 ring-2 ring-purple-500/30',
  };
  return borderMap[color];
};

const SearchTermCard = ({ term, isSelected, onToggle }: SearchTermCardProps) => {
  const handleClick = () => {
    onToggle(term.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle(term.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${isSelected ? 'Desselecionar' : 'Selecionar'} termo ${term.label}`}
      aria-pressed={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        group cursor-pointer rounded-xl border-2 bg-slate-800 px-8 py-6 min-w-[280px]
        transition-all duration-200 ease-in-out hover:shadow-lg hover:bg-slate-700
        ${isSelected ? getSelectedBorderClass(term.color) : 'border-slate-700 hover:border-slate-500'}
      `}
    >
      <div className="flex items-center gap-4">
        <span
          className={`h-4 w-4 rounded-full ${getColorClass(term.color)} transition-transform duration-200 group-hover:scale-110`}
        />
        <span className="text-lg font-semibold text-white">{term.label}</span>
      </div>
    </div>
  );
};

export default SearchTermCard;

