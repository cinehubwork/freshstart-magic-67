
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Globe, Instagram, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import RatingBadge from '@/components/RatingBadge';
import StyleTag from '@/components/StyleTag';
import { coffeeShops } from '@/data/coffeeShops';
import { cn } from '@/lib/utils';

const CoffeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState(coffeeShops.find(s => s.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!shop) {
      navigate('/coffee', { replace: true });
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Check if this shop is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));

    return () => clearTimeout(timer);
  }, [id, navigate, shop]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((favId: string) => favId !== id);
      toast({
        title: "Removed from favorites",
        description: `${shop?.name} has been removed from your favorites`,
      });
    } else {
      newFavorites = [...favorites, id];
      toast({
        title: "Added to favorites",
        description: `${shop?.name} has been added to your favorites`,
      });
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (isLoading || !shop) {
    return (
      <div className="min-h-screen bg-background animate-pulse flex flex-col items-center justify-center pb-20">
        <div className="w-full h-64 bg-gray-200" />
        <div className="max-w-3xl mx-auto px-4 w-full -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
            <div className="h-8 bg-gray-200 rounded-md w-2/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded-md w-full mb-3" />
            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={handleGoBack}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-gray-700 hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={toggleFavorite}
            className={cn(
              "p-2 backdrop-blur-sm rounded-full shadow-sm transition-colors",
              isFavorite 
                ? "bg-red-100/90 text-red-500 hover:bg-red-100" 
                : "bg-white/80 text-gray-700 hover:bg-white"
            )}
          >
            <Heart 
              size={20} 
              className={cn(
                "transition-all duration-300",
                isFavorite ? "fill-red-500" : ""
              )} 
            />
          </button>
        </div>

        <div className="w-full h-64 sm:h-80 overflow-hidden relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 skeleton" />
          )}
          <img
            src={shop.image}
            alt={shop.name}
            className={cn(
              'w-full h-full object-cover transition-all duration-700 ease-out',
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 opacity-0 animate-scale-in" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
            <div className="flex items-start justify-between">
              <h1 className="text-2xl sm:text-3xl font-semibold mb-3">{shop.name}</h1>
              <RatingBadge rating={shop.rating} size="lg" className="ml-3 mt-1" />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {shop.styles.map((style) => (
                <StyleTag key={style} label={style} />
              ))}
            </div>

            {shop.description && (
              <p className="text-muted-foreground mb-6">{shop.description}</p>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <InfoItem icon={<MapPin size={18} />} label={`${shop.address}, ${shop.city}`} />
                <InfoItem icon={<Clock size={18} />} label={shop.hours} />
                
                {shop.phone && (
                  <InfoItem 
                    icon={<Phone size={18} />} 
                    label={shop.phone} 
                    isLink 
                    href={`tel:${shop.phone.replace(/\s+/g, '')}`} 
                  />
                )}
              </div>

              <div className="space-y-4">
                {shop.website && (
                  <InfoItem 
                    icon={<Globe size={18} />} 
                    label="Website" 
                    isLink 
                    href={shop.website}
                    isExternal
                  />
                )}
                
                {shop.instagram && (
                  <InfoItem 
                    icon={<Instagram size={18} />} 
                    label={`@${shop.instagram}`} 
                    isLink 
                    href={`https://instagram.com/${shop.instagram}`}
                    isExternal
                  />
                )}
              </div>
            </div>

            {shop.menu && (
              <div className="mt-8 opacity-0 animate-fade-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                
                <div className="space-y-6">
                  {shop.menu.map((category, index) => (
                    <div key={index} className="opacity-0 animate-fade-up" style={{ animationDelay: `${350 + index * 100}ms`, animationFillMode: 'forwards' }}>
                      <h3 className="text-lg font-medium mb-3">{category.category}</h3>
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-muted-foreground">{item.description}</div>
                              )}
                            </div>
                            <div className="font-medium ml-4">{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  isLink?: boolean;
  href?: string;
  isExternal?: boolean;
}

const InfoItem = ({ icon, label, isLink, href, isExternal }: InfoItemProps) => {
  const content = (
    <div className="flex items-center">
      <div className="text-coffee-600 mr-2">{icon}</div>
      <span className={isLink ? "text-coffee-600 hover:underline" : ""}>{label}</span>
    </div>
  );

  if (isLink && href) {
    return (
      <a 
        href={href} 
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default CoffeeDetails;
