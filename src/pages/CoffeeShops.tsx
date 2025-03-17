
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import CoffeeShopCard from '@/components/CoffeeShopCard';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { coffeeShops, coffeeShopLocations, coffeeShopStyles } from '@/data/coffeeShops';

const ITEMS_PER_PAGE = 4; // Number of items to show per page

const CoffeeShops = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state || {};
  
  const [searchQuery, setSearchQuery] = useState(initialState.query || '');
  const [selectedLocation, setSelectedLocation] = useState(initialState.location || 'all');
  const [selectedStyle, setSelectedStyle] = useState(initialState.style || 'all');
  const [filteredShops, setFilteredShops] = useState(coffeeShops);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      filterShops();
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filterShops = () => {
    let shops = [...coffeeShops];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      shops = shops.filter(shop => 
        shop.name.toLowerCase().includes(query) || 
        shop.address.toLowerCase().includes(query) ||
        shop.city.toLowerCase().includes(query) ||
        shop.styles.some(style => style.toLowerCase().includes(query))
      );
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      // This is a simplified example - in a real app you would have proper location matching
      shops = shops.filter(shop => 
        shop.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        shop.address.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by style
    if (selectedStyle !== 'all') {
      shops = shops.filter(shop =>
        shop.styles.some(style => style.toLowerCase() === selectedStyle.toLowerCase())
      );
    }

    setFilteredShops(shops);
    // Reset visible items count when filters change
    setVisibleItems(ITEMS_PER_PAGE);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => {
      filterShops();
    }, 0);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setTimeout(() => {
      filterShops();
    }, 0);
  };

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value);
    setTimeout(() => {
      filterShops();
    }, 0);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  // Get the subset of shops to display based on the current page
  const shopsToDisplay = filteredShops.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredShops.length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-5 pb-16">
        <div className="flex items-center mb-5 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <button 
            onClick={handleGoBack}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold ml-1">Coffee Shops</h1>
        </div>

        <div className="space-y-4 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards', position: 'relative', zIndex: 10 }}>
          <SearchBar 
            onSearch={handleSearch}
            initialValue={searchQuery}
          />

          <div className="grid grid-cols-2 gap-3">
            <FilterDropdown 
              options={coffeeShopLocations} 
              value={selectedLocation} 
              onChange={handleLocationChange} 
              placeholder="All Locations"
            />
            <FilterDropdown 
              options={coffeeShopStyles} 
              value={selectedStyle} 
              onChange={handleStyleChange}
              placeholder="All Styles"
            />
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Array(4).fill(null).map((_, index) => (
                <div 
                  key={index} 
                  className="w-full bg-white/60 rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-pulse h-[360px]"
                />
              ))}
            </div>
          ) : filteredShops.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {shopsToDisplay.map((shop, index) => (
                  <CoffeeShopCard 
                    key={shop.id} 
                    shop={shop} 
                    delay={300 + index * 100}
                  />
                ))}
              </div>
              
              {hasMoreItems && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={handleLoadMore}
                    variant="outline"
                    className="px-8 border-coffee-300 text-coffee-800 hover:bg-coffee-50"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <p className="text-muted-foreground text-lg">No coffee shops found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('all');
                  setSelectedStyle('all');
                  setTimeout(() => {
                    filterShops();
                  }, 0);
                }}
                className="mt-3 text-coffee-600 font-medium hover:text-coffee-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default CoffeeShops;
