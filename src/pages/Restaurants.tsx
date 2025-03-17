
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Restaurants = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center pb-20 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-semibold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          Coming Soon
        </h1>
        <p className="text-muted-foreground mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Our restaurant discovery feature is currently under development. Please check back soon!
        </p>
        <button
          onClick={() => navigate('/coffee')}
          className="px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors opacity-0 animate-fade-up"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          Explore Coffee Shops
        </button>
      </div>
      <Navigation />
    </div>
  );
};

export default Restaurants;
