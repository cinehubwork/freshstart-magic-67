
import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RatingBadge = ({ 
  rating, 
  className,
  size = 'md'
}: RatingBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <div 
      className={cn(
        'font-semibold rounded-md bg-black/80 text-white',
        'backdrop-blur-sm inline-flex items-center justify-center',
        sizeClasses[size],
        className
      )}
    >
      {rating.toFixed(1)}
    </div>
  );
};

export default RatingBadge;
