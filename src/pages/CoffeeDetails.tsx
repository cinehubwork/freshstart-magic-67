
import { useState, useEffect } from 'react';
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

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation as SwiperNavigation } from 'swiper/modules';

const CoffeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState(coffeeShops.find(s => s.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

      {/* Swiper Image Gallery */}
      <div className="w-full relative h-72 bg-gray-100">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Pagination, SwiperNavigation]}
          className="h-full w-full rounded-b-2xl"
        >
          {shopImages.map((image, index) => (
            <SwiperSlide key={index}>
              {!imageLoaded && index === 0 && (
                <div className="absolute inset-0 bg-gray-100" />
              )}
              <img
                src={image}
                alt={`${shop.name} - image ${index + 1}`}
                className="h-full w-full object-cover"
                onLoad={index === 0 ? handleImageLoad : undefined}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !text-white !w-8 !h-8 !left-2 after:!text-xs"></div>
          <div className="swiper-button-next !text-white !w-8 !h-8 !right-2 after:!text-xs"></div>
        </Swiper>
      </div>

      {/* Main Content */}
      <ScrollArea className="px-4 py-5 pb-28">
        <div className="space-y-4">
          {/* Shop Name and Rating */}
          <div>
            <h1 className="text-2xl font-bold">{shop.name}</h1>
            
            <div className="flex items-center mt-1">
              <span className="text-xl font-medium mr-2">{shop.rating.toFixed(1)}</span>
              <div className="flex text-yellow-400">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className={i < Math.floor(shop.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Address */}
          <div className="flex items-start">
            <MapPin size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-gray-700 text-sm">{shop.address}, {shop.city}</p>
          </div>

          {/* Tags/Styles */}
          <div className="flex flex-wrap gap-2">
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

          {/* Categories */}
          <div className="flex flex-wrap gap-x-2 text-sm">
            <span className="text-gray-700">Coffee</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-700">Handmade</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-700">No Smoking</span>
          </div>

          {/* About Section */}
          <div className="pt-2">
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
          <div className="pt-2">
            <h2 className="text-lg font-semibold mb-3">Contact & Social</h2>
            
            <div className="space-y-3">
              {shop.phone && (
                <a 
                  href={`tel:${shop.phone.replace(/\s+/g, '')}`}
                  className="flex items-center text-gray-700 text-sm hover:text-coffee-600"
                >
                  <Phone size={16} className="mr-3 text-gray-500" />
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
            className="w-full mt-2 bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 h-auto"
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
              "w-full mt-2 text-sm py-2 h-auto",
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
          <div className="pt-4">
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
            <div className="pt-2">
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
        </div>
      </ScrollArea>

      <Navigation />
    </div>
  );
};

export default CoffeeDetails;
