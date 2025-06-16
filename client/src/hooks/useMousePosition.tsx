import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Throttle mouse move event for better performance
    let throttleTimeout: number | null = null;
    
    const throttledUpdateMousePosition = (e: MouseEvent) => {
      if (throttleTimeout === null) {
        throttleTimeout = window.setTimeout(() => {
          updateMousePosition(e);
          throttleTimeout = null;
        }, 16); // ~60fps
      }
    };
    
    window.addEventListener('mousemove', throttledUpdateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', throttledUpdateMousePosition);
      
      if (throttleTimeout) {
        window.clearTimeout(throttleTimeout);
      }
    };
  }, []);
  
  return mousePosition;
};
