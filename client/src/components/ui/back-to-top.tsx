import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollProgress = useScrollProgress();

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      // If user scrolls down more than 300px, show the button
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    // Initial check
    toggleVisibility();

    // Clean up the listener when component unmounts
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly with GSAP for better performance
  const scrollToTop = () => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollToPlugin').then(() => {
        gsap.to(window, {
          duration: 1.25,
          scrollTo: {
            y: 0,
            autoKill: false
          },
          ease: "power3.out"
        });
      });
    });
  };

  // Circle progress animation variants
  const circleVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0
    },
    visible: { 
      pathLength: scrollProgress / 100,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-md text-primary shadow-lg z-50 border border-primary/20 hover:shadow-primary/30 hover:border-primary/30 transition-all duration-300 group"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          {/* Circular progress indicator */}
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 50 50"
          >
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary/30"
              initial="hidden"
              animate="visible"
              variants={circleVariants}
            />
          </svg>
          
          {/* Arrow icon with animation */}
          <motion.div
            className="relative z-10 p-0.5"
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 2,
              repeatDelay: 1
            }}
            whileHover={{ y: -2 }}
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
          
          {/* Subtle glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.4 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;