import { useRef, useEffect, useState, ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { SplitText } from '../../lib/splitText';
import { gsap } from 'gsap';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  type?: 'chars' | 'words' | 'lines' | 'fade';
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  ease?: string;
  from?: 'top' | 'bottom' | 'left' | 'right';
  distance?: number;
  once?: boolean;
  inline?: boolean;
}

const TextReveal = ({
  children,
  className = '',
  type = 'chars',
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  threshold = 0.2,
  ease = 'power3.out',
  from = 'bottom',
  distance = 30,
  once = true,
  inline = false
}: TextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isVisible = useIntersectionObserver({
    elementRef: textRef,
    threshold,
    freezeOnceVisible: once
  });
  
  const { isMobile } = useDeviceDetect();
  
  // Adjust animation values for mobile for better performance
  const mobileDistance = isMobile ? Math.min(20, distance) : distance;
  const mobileDuration = isMobile ? Math.min(0.6, duration) : duration;
  const mobileStagger = isMobile ? Math.min(0.01, stagger) : stagger;
  
  useEffect(() => {
    // Skip complex animations if already visible
    if (!textRef.current || isInitialized) return;
    
    // If we're using fade animation, we'll skip SplitText and just use simple opacity animation
    if (type === 'fade') {
      gsap.set(textRef.current, { opacity: 0, y: from === 'bottom' ? mobileDistance : from === 'top' ? -mobileDistance : 0, x: from === 'right' ? mobileDistance : from === 'left' ? -mobileDistance : 0 });
      setIsInitialized(true);
      return;
    }
    
    // Use SplitText for more advanced animations
    try {
      // Split text into chars, words, or lines
      const splitText = new SplitText(textRef.current);
      const elements = type === 'chars' ? splitText.getChars() : 
                      type === 'words' ? splitText.getWords() :
                      splitText.getWords(); // Fallback to words if "lines" is requested
      
      // Set initial state for animation
      gsap.set(elements, { 
        opacity: 0,
        y: from === 'bottom' ? mobileDistance : from === 'top' ? -mobileDistance : 0,
        x: from === 'right' ? mobileDistance : from === 'left' ? -mobileDistance : 0
      });
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing SplitText:', error);
      
      // Fallback to simple fade animation if SplitText fails
      gsap.set(textRef.current, { opacity: 0 });
      setIsInitialized(true);
    }
  }, [textRef, isInitialized, type, from, mobileDistance]);
  
  useEffect(() => {
    if (!textRef.current || !isInitialized) return;
    
    // Animate in when visible
    if (isVisible) {
      if (type === 'fade') {
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: mobileDuration,
          delay,
          ease
        });
        return;
      }
      
      try {
        // Get split text elements
        const splitText = new SplitText(textRef.current);
        const elements = type === 'chars' ? splitText.getChars() : 
                        type === 'words' ? splitText.getWords() :
                        splitText.getWords(); // Fallback to words
        
        // Animate each element with stagger
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: mobileDuration,
          stagger: mobileStagger,
          delay,
          ease
        });
      } catch (error) {
        // Fallback to simple fade in if SplitText fails
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: mobileDuration,
          delay,
          ease
        });
      }
    } else if (!once) {
      // Reset animation if not visible and once is false
      if (type === 'fade') {
        gsap.to(textRef.current, {
          opacity: 0,
          y: from === 'bottom' ? mobileDistance : from === 'top' ? -mobileDistance : 0,
          x: from === 'right' ? mobileDistance : from === 'left' ? -mobileDistance : 0,
          duration: mobileDuration / 2,
          ease
        });
        return;
      }
      
      try {
        const splitText = new SplitText(textRef.current);
        const elements = type === 'chars' ? splitText.getChars() : 
                        type === 'words' ? splitText.getWords() :
                        splitText.getWords();
        
        gsap.to(elements, {
          opacity: 0,
          y: from === 'bottom' ? mobileDistance : from === 'top' ? -mobileDistance : 0,
          x: from === 'right' ? mobileDistance : from === 'left' ? -mobileDistance : 0,
          duration: mobileDuration / 2,
          stagger: mobileStagger / 2,
          ease
        });
      } catch (error) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: from === 'bottom' ? mobileDistance : from === 'top' ? -mobileDistance : 0,
          x: from === 'right' ? mobileDistance : from === 'left' ? -mobileDistance : 0,
          duration: mobileDuration / 2,
          ease
        });
      }
    }
  }, [isVisible, isInitialized, type, delay, mobileDuration, mobileStagger, ease, from, mobileDistance, once]);
  
  return (
    <div 
      ref={textRef} 
      className={`${className} ${inline ? 'inline-block' : 'block'} opacity-0`}
    >
      {children}
    </div>
  );
};

export default TextReveal;