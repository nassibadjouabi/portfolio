import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverProps {
  elementRef: RefObject<Element>;
  threshold?: number | number[];
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = ({
  elementRef,
  threshold = 0.1,
  rootMargin = '0px',
  freezeOnceVisible = true,
}: UseIntersectionObserverProps): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        const isCurrentlyVisible = entry.isIntersecting;
        setIsVisible(isCurrentlyVisible);
        
        // If we only want to detect when element becomes visible, unobserve
        if (isCurrentlyVisible && freezeOnceVisible) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin, freezeOnceVisible]);

  return isVisible;
};

/**
 * Example usage:
 * 
 * const Component = () => {
 *   const ref = useRef(null);
 *   const isVisible = useIntersectionObserver({
 *     elementRef: ref,
 *     threshold: 0.2,
 *     freezeOnceVisible: true
 *   });
 * 
 *   return (
 *     <div 
 *       ref={ref}
 *       className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
 *     >
 *       I'll fade in when I'm 20% visible in the viewport!
 *     </div>
 *   );
 * };
 */