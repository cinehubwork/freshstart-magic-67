
import { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import RatingBadge from './RatingBadge';
import StyleTag from './StyleTag';

export interface CoffeeShop {
  id: string;
  name: string;
  image: string;
  rating: number;
  address: string;
  city: string;
  hours: string;
  styles: string[];
}

interface CoffeeShopCardProps {
  shop: CoffeeShop;
  className?: string;
  delay?: number;
}

const CoffeeShopCard = ({ 
  shop, 
  className,
  delay = 0
}: CoffeeShopCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!isLoaded) {
    return (
      <div 
        className={cn(
          'w-full bg-white/60 rounded-xl overflow-hidden',
          'border border-gray-200 shadow-sm animate-pulse',
          'h-[360px]',
          className
        )}
      />
    );
  }

  return (
    <Link
      to={`/coffee/${shop.id}`}
      className={cn(
        'block w-full overflow-hidden rounded-xl border border-gray-200',
        'bg-white shadow-sm transition-all duration-300',
        'hover:shadow-md hover:border-coffee-300/50',
        'opacity-0 animate-fade-up',
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 skeleton" />
        )}
        <img
          src={shop.image}
          alt={shop.name}
          className={cn(
            'w-full h-full object-cover transition-all duration-700 ease-out',
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.05]'
          )}
          onLoad={handleImageLoad}
        />
        <div className="absolute top-3 right-3">
          <RatingBadge rating={shop.rating} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 tracking-tight">{shop.name}</h3>
        
        <div className="mb-3 flex items-start">
          <MapPin size={18} className="text-coffee-500 min-w-[18px] mt-0.5" />
          <div className="ml-2 text-gray-600 text-sm">
            <div>{shop.address}</div>
            <div>{shop.city}</div>
          </div>
        </div>
        
        <div className="mb-4 flex items-center">
          <Clock size={18} className="text-coffee-500 min-w-[18px]" />
          <div className="ml-2 text-gray-600 text-sm">{shop.hours}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {shop.styles.map((style) => (
            <StyleTag key={style} label={style} size="sm" />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CoffeeShopCard;
