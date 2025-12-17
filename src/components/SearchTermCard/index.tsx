'use client';

import type { SearchTerm, ColorVariant } from '@/interfaces/search-term.interface';

interface SearchTermCardProps {
  term: SearchTerm;
  isSelected: boolean;
  onToggle: (termId: string) => void;
}

const getColorStyles = (color: ColorVariant) => {
  const colorMap: Record<ColorVariant, { bg: string; border: string; ring: string }> = {
    blue: { bg: 'bg-blue-500', border: 'border-blue-500', ring: 'ring-blue-200' },
    red: { bg: 'bg-red-500', border: 'border-red-500', ring: 'ring-red-200' },
    yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500', ring: 'ring-yellow-200' },
    green: { bg: 'bg-green-500', border: 'border-green-500', ring: 'ring-green-200' },
    purple: { bg: 'bg-purple-500', border: 'border-purple-500', ring: 'ring-purple-200' },
  };
  return colorMap[color];
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

  const colorStyles = getColorStyles(term.color);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${isSelected ? 'Desselecionar' : 'Selecionar'} termo ${term.label}`}
      aria-pressed={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        group cursor-pointer rounded-lg border bg-white px-4 py-3
        transition-all duration-200 ease-in-out hover:shadow-md
        ${isSelected ? `${colorStyles.border} ring-2 ${colorStyles.ring}` : 'border-slate-200 hover:border-slate-300'}
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${colorStyles.bg} transition-transform duration-200 group-hover:scale-110`}
        />
        <span className="text-sm font-medium text-slate-800">{term.label}</span>
      </div>
    </div>
  );
};

export default SearchTermCard;

