
import { Coffee, UtensilsCrossed, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => {
    if (route === '/' && path === '/') return true;
    if (route !== '/' && path.startsWith(route)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-sm px-4 pb-4 pt-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavItem 
          to="/coffee" 
          icon={<Coffee size={22} />} 
          label="Coffee" 
          isActive={isActive('/coffee')} 
        />
        <NavItem 
          to="/restaurants" 
          icon={<UtensilsCrossed size={22} />} 
          label="Restaurants" 
          isActive={isActive('/restaurants')} 
        />
        <NavItem 
          to="/favorites" 
          icon={<Heart size={22} />} 
          label="Favorites" 
          isActive={isActive('/favorites')} 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center justify-center px-4 py-2 rounded-lg',
        'transition-all duration-200',
        isActive 
          ? 'text-coffee-700' 
          : 'text-gray-500 hover:text-coffee-600'
      )}
    >
      <div 
        className={cn(
          'transition-all duration-200',
          isActive && 'scale-110'
        )}
      >
        {icon}
      </div>
      <span 
        className={cn(
          'text-xs mt-1 font-medium',
          isActive && 'font-semibold'
        )}
      >
        {label}
      </span>
    </Link>
  );
};

export default Navigation;
