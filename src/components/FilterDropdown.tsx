
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const FilterDropdown = ({
  options,
  value,
  onChange,
  className,
  placeholder = "Select option",
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value) || { value: '', label: placeholder };

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Calculate the animation delay for dropdown items
  const getAnimationDelay = (index: number) => {
    return `${50 + index * 30}ms`;
  };

  return (
    <div 
      ref={dropdownRef} 
      className={cn(
        'relative w-full',
        className
      )}
      style={{ zIndex: isOpen ? 100 : 'auto' }} // Increase z-index from 50 to 100 when dropdown is open
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-4 py-3',
          'bg-white/80 backdrop-blur-sm border border-gray-200',
          'text-foreground hover:bg-white/90',
          'rounded-full transition-all duration-200',
          'focus:outline-none focus:ring-1 focus:ring-coffee-400/30'
        )}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown 
          size={18} 
          className={cn(
            'text-gray-500 transition-transform duration-200',
            isOpen ? 'transform rotate-180' : ''
          )} 
        />
      </button>

      {isOpen && (
        <div 
          className={cn(
            'absolute z-[200] w-full mt-1 rounded-lg overflow-hidden', // Increase z-index from 50 to 200
            'bg-white/95 backdrop-blur-md shadow-lg',
            'border border-gray-200 animate-scale-in',
            'origin-top max-h-60 overflow-y-auto'
          )}
          style={{ 
            transformOrigin: 'center top', 
            animationDuration: '150ms' 
          }}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'px-4 py-3 cursor-pointer transition-colors',
                'hover:bg-coffee-100 first:rounded-t-lg last:rounded-b-lg',
                'opacity-0 animate-fade-in',
                value === option.value ? 'bg-coffee-100' : ''
              )}
              style={{ 
                animationDelay: getAnimationDelay(index),
                animationFillMode: 'forwards' 
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
