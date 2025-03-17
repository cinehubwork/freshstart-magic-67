
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TinderSwipeProps {
  images: string[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const TinderSwipe: React.FC<TinderSwipeProps> = ({ 
  images, 
  title, 
  subtitle,
  className 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragAmount, setDragAmount] = useState(0);
  const swipeRef = useRef<HTMLDivElement>(null);
  
  // Touch handlers for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragAmount(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = touchStart - e.targetTouches[0].clientX;
    setDragAmount(diff);
    
    if (swipeRef.current) {
      // Limit the drag to make it feel more natural
      const normalizedDrag = Math.min(Math.abs(diff), 150) * (diff < 0 ? -1 : 1);
      swipeRef.current.style.transform = `translateX(${-activeIndex * 100}%) translateX(${-normalizedDrag}px)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (swipeRef.current) {
      // Reset the position with a transition
      swipeRef.current.style.transition = 'transform 0.3s ease-out';
    }
    
    const diff = touchStart - touchEnd;
    
    // If swipe distance is significant enough
    if (Math.abs(diff) > 80) {
      if (diff > 0 && activeIndex < images.length - 1) {
        // Swipe left (next image)
        setActiveIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe right (previous image)
        setActiveIndex(activeIndex - 1);
      } else {
        // Reset to current image if we can't move in that direction
        if (swipeRef.current) {
          swipeRef.current.style.transform = `translateX(${-activeIndex * 100}%)`;
        }
      }
    } else {
      // Not enough swipe, reset to current image
      if (swipeRef.current) {
        swipeRef.current.style.transform = `translateX(${-activeIndex * 100}%)`;
      }
    }
    
    // Reset after animation is complete
    setTimeout(() => {
      if (swipeRef.current) {
        swipeRef.current.style.transition = '';
        swipeRef.current.style.transform = `translateX(${-activeIndex * 100}%)`;
      }
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (swipeRef.current) {
      swipeRef.current.style.transition = 'transform 0.3s ease-out';
      swipeRef.current.style.transform = `translateX(${-index * 100}%)`;
    }
    
    setActiveIndex(index);
    
    // Reset after animation is complete
    setTimeout(() => {
      if (swipeRef.current) {
        swipeRef.current.style.transition = '';
      }
    }, 300);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className="w-full h-full rounded-2xl overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={swipeRef}
          className="flex w-full h-full transition-transform duration-0"
          style={{ transform: `translateX(${-activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" />
              
              {/* Title overlay */}
              {(title || subtitle) && (
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  {title && <h2 className="text-3xl font-semibold">{title}</h2>}
                  {subtitle && <div className="text-xs text-white/80">{subtitle}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Pagination indicators */}
        {images.length > 1 && (
          <>
            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    idx === activeIndex 
                      ? "bg-white scale-125" 
                      : "bg-white/50 scale-100"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              <button
                onClick={() => activeIndex > 0 && goToSlide(activeIndex - 1)}
                className={cn(
                  "w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm",
                  activeIndex === 0 ? "opacity-50" : "opacity-100"
                )}
                disabled={activeIndex === 0}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => activeIndex < images.length - 1 && goToSlide(activeIndex + 1)}
                className={cn(
                  "w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm",
                  activeIndex === images.length - 1 ? "opacity-50" : "opacity-100"
                )}
                disabled={activeIndex === images.length - 1}
              >
                <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TinderSwipe;
