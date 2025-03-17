
import { cn } from '@/lib/utils';

interface StyleTagProps {
  label: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const StyleTag = ({ 
  label, 
  className,
  size = 'md'
}: StyleTagProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div 
      className={cn(
        'rounded-full bg-secondary text-secondary-foreground',
        'inline-flex items-center justify-center',
        'transition-all duration-200 hover:bg-secondary/90',
        sizeClasses[size],
        className
      )}
    >
      {label}
    </div>
  );
};

export default StyleTag;
