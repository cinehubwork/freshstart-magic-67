
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import CoffeeShopCard from '@/components/CoffeeShopCard';
import Navigation from '@/components/Navigation';
import { coffeeShops } from '@/data/coffeeShops';
import { cn } from '@/lib/utils';

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteShops, setFavoriteShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      loadFavorites();
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const shops = coffeeShops.filter(shop => favorites.includes(shop.id));
    setFavoriteShops(shops);
  };

  const handleExplore = () => {
    navigate('/coffee');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl font-semibold mb-2">Favorites</h1>
          <p className="text-muted-foreground mb-6">Your saved coffee shops</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array(2).fill(null).map((_, index) => (
              <div 
                key={index} 
                className="w-full bg-white/60 rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-pulse h-[360px]"
              />
            ))}
          </div>
        ) : favoriteShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {favoriteShops.map((shop, index) => (
              <CoffeeShopCard 
                key={shop.id} 
                shop={shop} 
                delay={200 + index * 100}
              />
            ))}
          </div>
        ) : (
          <div className={cn(
            "flex flex-col items-center justify-center text-center py-16",
            "opacity-0 animate-fade-in"
          )} style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="w-16 h-16 rounded-full bg-coffee-100 flex items-center justify-center mb-4">
              <Heart size={32} className="text-coffee-500" />
            </div>
            <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start adding your favorite coffee shops to see them here
            </p>
            <button
              onClick={handleExplore}
              className="px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
            >
              Explore Coffee Shops
            </button>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Favorites;
