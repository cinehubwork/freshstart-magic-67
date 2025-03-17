
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  initialValue?: string;
  autoFocus?: boolean;
}

const SearchBar = ({ 
  placeholder = "Find your perfect coffee spot", 
  onSearch,
  className,
  initialValue = "",
  autoFocus = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div 
      className={cn(
        'relative flex items-center w-full transition-all duration-200 ease-in-out',
        'bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm',
        'rounded-full overflow-hidden group',
        isFocused && 'ring-1 ring-coffee-400/30 border-coffee-400/40',
        className
      )}
    >
      <div className="flex items-center justify-center pl-3">
        <Search 
          size={20} 
          className={cn(
            'text-gray-400 transition-colors duration-200',
            isFocused && 'text-coffee-600'
          )} 
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          'w-full py-3 px-3 bg-transparent border-none outline-none',
          'text-foreground placeholder-gray-400',
          'focus:outline-none focus:ring-0',
          'transition-all duration-200'
        )}
      />
    </div>
  );
};

export default SearchBar;
