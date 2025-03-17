
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import CoffeeShopCard, { CoffeeShop } from '@/components/CoffeeShopCard';
import Navigation from '@/components/Navigation';
import { coffeeShops, coffeeShopLocations, coffeeShopStyles } from '@/data/coffeeShops';

const Index = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('all');
  const [style, setStyle] = useState('all');
  const [visibleShops, setVisibleShops] = useState<CoffeeShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setVisibleShops(coffeeShops.slice(0, 3));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    navigate('/coffee', { state: { query, location, style } });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleStyleChange = (value: string) => {
    setStyle(value);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Discover Coffee Shops</h1>
          <p className="text-muted-foreground text-lg mb-8">Find the perfect spot for your next date</p>
        </div>

        <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <SearchBar 
            onSearch={handleSearch} 
            autoFocus={false}
          />

          <div className="grid grid-cols-2 gap-3">
            <FilterDropdown 
              options={coffeeShopLocations} 
              value={location} 
              onChange={handleLocationChange} 
              placeholder="All Locations"
            />
            <FilterDropdown 
              options={coffeeShopStyles} 
              value={style} 
              onChange={handleStyleChange}
              placeholder="All Styles"
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Popular Places</h2>
              <button 
                onClick={() => navigate('/coffee')}
                className="text-coffee-600 text-sm font-medium hover:text-coffee-800 transition-colors"
              >
                View All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {isLoading ? (
              Array(3).fill(null).map((_, index) => (
                <div 
                  key={index} 
                  className="w-full bg-white/60 rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-pulse h-[360px]"
                />
              ))
            ) : (
              visibleShops.map((shop, index) => (
                <CoffeeShopCard 
                  key={shop.id} 
                  shop={shop} 
                  delay={400 + index * 100}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
