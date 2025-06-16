import { useState, useEffect } from 'react';

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how much the user has scrolled through the page
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setProgress(scrolled);
    };
    
    // Throttle scroll event for better performance
    let throttleTimeout: number | null = null;
    
    const throttledUpdateScrollProgress = () => {
      if (throttleTimeout === null) {
        throttleTimeout = window.setTimeout(() => {
          updateScrollProgress();
          throttleTimeout = null;
        }, 16); // ~60fps
      }
    };
    
    window.addEventListener('scroll', throttledUpdateScrollProgress);
    
    // Initial calculation
    updateScrollProgress();
    
    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollProgress);
      
      if (throttleTimeout) {
        window.clearTimeout(throttleTimeout);
      }
    };
  }, []);
  
  return progress;
};
