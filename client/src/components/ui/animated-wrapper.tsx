import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

// Animation variants presets
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up', duration: number = 0.5): Variants => {
  let x = 0;
  let y = 0;
  
  if (direction === 'up') y = 20;
  if (direction === 'down') y = -20;
  if (direction === 'left') x = 20;
  if (direction === 'right') x = -20;
  
  return {
    hidden: {
      opacity: 0,
      x,
      y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      },
    },
  };
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

export const textVariant = (delay: number = 0.2): Variants => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.7,
        delay,
      },
    },
  };
};

export const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      delay: 0.1,
    },
  },
};

interface AnimatedWrapperProps {
  children: ReactNode;
  variant?: Variants | 'fadeIn' | 'scaleIn' | 'staggerContainer' | 'textVariant' | 'navVariants';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  whileHoverScale?: number;
  whileHoverRotate?: number;
  whileTapScale?: number;
  transition?: any;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  variant = 'fadeIn',
  direction = 'up',
  duration = 0.5,
  delay = 0,
  className = '',
  once = true,
  margin = "-100px 0px",
  whileHoverScale,
  whileHoverRotate,
  whileTapScale,
  transition,
}) => {
  let selectedVariant: Variants;
  
  // Select the animation variant
  switch (variant) {
    case 'fadeIn':
      selectedVariant = fadeIn(direction, duration);
      break;
    case 'scaleIn':
      selectedVariant = scaleIn;
      break;
    case 'staggerContainer':
      selectedVariant = staggerContainer;
      break;
    case 'textVariant':
      selectedVariant = textVariant(delay);
      break;
    case 'navVariants':
      selectedVariant = navVariants;
      break;
    default:
      // If a custom variant object is passed, use that
      if (typeof variant === 'object') {
        selectedVariant = variant;
      } else {
        selectedVariant = fadeIn(direction, duration);
      }
  }
  
  // Apply delay if provided
  if (delay > 0 && selectedVariant.visible && selectedVariant.visible.transition) {
    selectedVariant = {
      ...selectedVariant,
      visible: {
        ...selectedVariant.visible,
        transition: {
          ...selectedVariant.visible.transition,
          delay,
        },
      },
    };
  }
  
  // Hover and tap animations
  const hoverAnimation = whileHoverScale || whileHoverRotate ? {
    scale: whileHoverScale || 1,
    rotate: whileHoverRotate || 0,
    transition: transition || {
      type: "spring",
      stiffness: 400, 
      damping: 10
    }
  } : undefined;
  
  const tapAnimation = whileTapScale ? {
    scale: whileTapScale
  } : undefined;
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={selectedVariant}
      className={className}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;