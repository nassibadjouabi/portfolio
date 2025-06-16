import { ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  containerAnimation?: boolean;
  ease?: string;
  start?: string;
  end?: string;
  markers?: boolean;
  scrub?: boolean | number;
  disableOnMobile?: boolean;
}

const ParallaxWrapper = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
  containerAnimation = false,
  ease = 'none',
  start = 'top bottom',
  end = 'bottom top',
  markers = false,
  scrub = true,
  disableOnMobile = true,
}: ParallaxWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useDeviceDetect();
  
  // Skip parallax on mobile devices for better performance, if specified
  const enableAnimation = !(disableOnMobile && isMobile);
  
  // Adjust speed based on device for better performance
  const adjustedSpeed = isMobile ? Math.min(0.2, speed) :
                      isTablet ? Math.min(0.3, speed) : 
                      speed;
    
  useEffect(() => {
    if (!ref.current || !enableAnimation) return;
    
    const el = ref.current;
    const parent = containerAnimation ? el : el.children[0];
    
    if (!parent) return;
    
    // Calculate movement distance
    const distance = direction === 'vertical' ? 
                    el.offsetHeight * adjustedSpeed :
                    el.offsetWidth * adjustedSpeed;
    
    // Create animation
    const parallaxAnimation = gsap.fromTo(
      parent,
      { 
        [direction === 'vertical' ? 'y' : 'x']: direction === 'vertical' ? -distance : -distance 
      },
      {
        [direction === 'vertical' ? 'y' : 'x']: direction === 'vertical' ? distance : distance,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: typeof scrub === 'number' ? scrub : scrub === true ? 0.5 : false,
          markers,
          toggleActions: 'play none none none',
        }
      }
    );
    
    return () => {
      parallaxAnimation.kill();
    };
  }, [adjustedSpeed, direction, containerAnimation, ease, start, end, markers, scrub, enableAnimation]);
  
  return (
    <div 
      ref={ref} 
      className={`${className} overflow-hidden`}
      style={{ willChange: enableAnimation ? 'transform' : 'auto' }}
    >
      {children}
    </div>
  );
};

export default ParallaxWrapper;