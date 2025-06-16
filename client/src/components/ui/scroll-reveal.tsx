import { ReactNode, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  duration?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  once?: boolean;
  reset?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
}

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  threshold = 0.1,
  duration = 0.8,
  staggerChildren = false,
  staggerDelay = 0.1,
  once = true,
  reset = false,
  onEnter,
  onExit
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({
    elementRef: ref,
    threshold,
    freezeOnceVisible: once
  });
  
  const { isMobile } = useDeviceDetect();
  
  // Reduce animation complexity on mobile
  const mobileDistance = isMobile ? Math.min(30, distance) : distance;
  const mobileDuration = isMobile ? Math.min(0.6, duration) : duration;
  
  // Calculate initial position based on direction
  const getInitialPosition = () => {
    if (direction === 'none') return {};
    
    const position: {x?: number, y?: number} = {};
    
    switch (direction) {
      case 'up':
        position.y = mobileDistance;
        break;
      case 'down':
        position.y = -mobileDistance;
        break;
      case 'left':
        position.x = mobileDistance;
        break;
      case 'right':
        position.x = -mobileDistance;
        break;
    }
    
    return position;
  };
  
  useEffect(() => {
    if (isVisible && onEnter) onEnter();
    if (!isVisible && !once && onExit) onExit();
  }, [isVisible, onEnter, onExit, once]);
  
  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: mobileDuration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom ease curve for smoother effect
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: staggerChildren ? delay : 0
      }
    }
  };
  
  // Child variants for staggered animation
  const childVariants = staggerChildren ? {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: mobileDuration * 0.8 }
    }
  } : undefined;
  
  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        className="w-full h-full"
        // If reset is true, animate back to hidden when not visible
        {...(reset && !once ? { exit: "hidden" } : {})}
      >
        {staggerChildren ? (
          <motion.div variants={childVariants}>
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;