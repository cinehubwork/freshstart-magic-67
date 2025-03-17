
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Phone, Facebook, Instagram, MapIcon, Wifi, Heart
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import RatingBadge from '@/components/RatingBadge';
import StyleTag from '@/components/StyleTag';
import { coffeeShops } from '@/data/coffeeShops';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';

const CoffeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState(coffeeShops.find(s => s.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // For demo purposes, we'll use multiple copies of the same image for the carousel
  const shopImages = shop ? [shop.image, shop.image, shop.image] : [];

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diffX = touchStartX.current - touchEndX.current;
    
    // If swipe distance is significant enough (more than 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left (next image)
        nextImage();
      } else {
        // Swipe right (previous image)
        prevImage();
      }
    }
    
    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextImage = () => {
    if (currentImageIndex < shopImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (isLoading || !shop) {
    return (
      <div className="min-h-screen bg-background animate-pulse flex flex-col items-center justify-center pb-20">
        <div className="w-full h-64 bg-gray-200" />
        <div className="max-w-xl mx-auto px-4 w-full -mt-6 relative z-10">
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
    <div className="min-h-screen bg-background pb-20 overflow-hidden">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm px-4 py-2 flex items-center shadow-sm">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-gray-700 font-medium"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to list
        </button>
      </div>

      {/* Image Carousel */}
      <div 
        className="w-full relative overflow-hidden h-72"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out h-full" 
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {shopImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              {!imageLoaded && index === 0 && (
                <div className="absolute inset-0 bg-gray-100 skeleton" />
              )}
              <img
                src={image}
                alt={`${shop.name} - image ${index + 1}`}
                className="h-full w-full object-cover"
                onLoad={index === 0 ? handleImageLoad : undefined}
              />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={prevImage}
          disabled={currentImageIndex === 0}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white",
            "rounded-full w-8 h-8 flex items-center justify-center",
            "transition-opacity duration-200",
            currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-80"
          )}
        >
          <ArrowLeft size={16} />
        </button>
        
        <button 
          onClick={nextImage}
          disabled={currentImageIndex === shopImages.length - 1}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white",
            "rounded-full w-8 h-8 flex items-center justify-center",
            "transition-opacity duration-200",
            currentImageIndex === shopImages.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-80"
          )}
        >
          <ArrowLeft size={16} className="rotate-180" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {shopImages.map((_, index) => (
            <div 
              key={index} 
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-200",
                index === currentImageIndex ? "bg-white" : "bg-white/40"
              )}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="px-4 py-5 pb-28">
        <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className={i < Math.floor(shop.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
          </div>
          <span className="font-medium">{shop.rating.toFixed(1)}</span>
        </div>
        
        <div className="flex items-start mb-4">
          <MapPin size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700 text-sm">{shop.address}, {shop.city}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {shop.styles.map((style) => (
            <StyleTag key={style} label={style} size="sm" />
          ))}
          {shop.wifi && (
            <div className="flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs">
              <Wifi size={12} className="mr-1" />
              Free Wi-Fi
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-2 text-sm mb-5">
          <span className="text-gray-700">Coffee</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-700">Handmade</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-700">No Smoking</span>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-gray-500">City:</div>
            <div>{shop.city}</div>
            
            <div className="text-gray-500">Opening Hours:</div>
            <div>{shop.hours}</div>
            
            <div className="text-gray-500">Rating:</div>
            <div>{shop.rating}</div>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Contact & Social</h2>
          
          <div className="space-y-2">
            {shop.phone && (
              <a 
                href={`tel:${shop.phone.replace(/\s+/g, '')}`}
                className="flex items-center text-gray-700 text-sm hover:text-coffee-600"
              >
                <Phone size={16} className="mr-3" />
                <span>{shop.phone}</span>
              </a>
            )}
            
            {shop.facebook && (
              <a 
                href={`https://facebook.com/${shop.facebook}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 text-sm hover:text-blue-700"
              >
                <Facebook size={16} className="mr-3" />
                <span>Facebook</span>
              </a>
            )}
            
            {shop.instagram && (
              <a 
                href={`https://instagram.com/${shop.instagram}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-pink-600 text-sm hover:text-pink-700"
              >
                <Instagram size={16} className="mr-3" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </div>

        {/* Google Maps Button */}
        <Button 
          className="w-full mb-3 bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 h-auto"
          onClick={() => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${shop.name} ${shop.address} ${shop.city}`
            )}`;
            window.open(mapsUrl, '_blank');
          }}
        >
          <MapIcon size={16} className="mr-2" /> Google Maps
        </Button>

        {/* Save to Favorites Button */}
        <Button 
          variant={isFavorite ? "destructive" : "outline"}
          className={cn(
            "w-full mb-6 text-sm py-2 h-auto",
            isFavorite 
              ? "bg-red-50 text-red-500 hover:bg-red-100 border-red-200" 
              : "border-pink-200 text-pink-500 bg-pink-50 hover:bg-pink-100"
          )}
          onClick={toggleFavorite}
        >
          <Heart 
            size={16} 
            className={cn(
              "mr-2",
              isFavorite ? "fill-red-500" : ""
            )} 
          />
          {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
        </Button>

        {/* Maps Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Maps</h2>
          <div className="h-40 bg-blue-50 rounded-lg overflow-hidden">
            <iframe 
              title="Map"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${shop.name} ${shop.address} ${shop.city}`
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>

        {/* Menu Section (if available) */}
        {shop.menu && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Menu</h2>
            
            <div className="space-y-6">
              {shop.menu.map((category, index) => (
                <div key={index}>
                  <h3 className="text-base font-medium mb-3">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start">
                        <div className="pr-4">
                          <div className="font-medium text-sm">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                        <div className="font-medium text-sm">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      <Navigation />
    </div>
  );
};

export default CoffeeDetails;
