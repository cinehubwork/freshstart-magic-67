
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Wifi, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { coffeeShops } from '@/data/coffeeShops';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import TinderSwipe from '@/components/TinderSwipe';

const CoffeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState(coffeeShops.find(s => s.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // For demo purposes, use multiple copies of the same image for the carousel
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
      <div className="min-h-screen bg-background animate-pulse flex flex-col items-center justify-center pb-16">
        <div className="w-full h-96 bg-gray-200" />
        <div className="w-full px-4 py-4">
          <div className="h-8 bg-gray-200 rounded-md w-2/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded-md w-full mb-3" />
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 overflow-hidden">
      {/* Header with back button */}
      <div className="pt-3 px-4 flex items-center">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-gray-700"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span className="text-sm">Back to list</span>
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative mt-2 mx-4">
        <TinderSwipe 
          images={shopImages}
          title={shop.name}
          subtitle="café"
          className="h-[320px]"
        />
      </div>

      {/* Coffee shop details */}
      <div className="px-4 py-3">
        <h1 className="text-2xl font-medium text-gray-900 mb-1">{shop.name}</h1>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(shop.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
          </div>
          <span className="font-medium">{shop.rating.toFixed(1)}</span>
        </div>
        
        <div className="flex items-start mb-3">
          <MapPin size={16} className="text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
          <p className="text-gray-600 text-sm">{shop.address}, {shop.city}</p>
        </div>
        
        {shop.wifi && (
          <div className="flex items-center mb-4">
            <Wifi size={14} className="text-gray-600 mr-1" />
            <span className="text-sm text-gray-600">Free Wi-Fi</span>
          </div>
        )}

        {/* About section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">About</h2>
          
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-gray-500">City:</div>
            <div>{shop.city}</div>
            
            <div className="text-gray-500">Opening Hours:</div>
            <div>{shop.hours}</div>
          </div>
        </div>
      </div>

      {/* Save to Favorites Button (Optional, not in the design but useful) */}
      <div className="px-4 mb-6">
        <button
          onClick={toggleFavorite}
          className={cn(
            "w-full py-2 rounded-lg flex items-center justify-center",
            isFavorite 
              ? "bg-red-50 text-red-500 border border-red-200" 
              : "bg-pink-50 text-pink-500 border border-pink-100"
          )}
        >
          <Heart 
            size={18} 
            className={cn(
              "mr-2",
              isFavorite ? "fill-red-500" : ""
            )} 
          />
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>

      <Navigation />
    </div>
  );
};

export default CoffeeDetails;
