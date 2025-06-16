import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface LoadingScreenProps {
  isLoading: boolean;
  duration?: number;
  loadingText?: string;
  textAnimation?: boolean;
  logo?: string | React.ReactNode;
}

const LoadingScreen = ({
  isLoading,
  duration = 2000,
  loadingText = 'Loading Experience',
  textAnimation = true,
  logo
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { isMobile } = useDeviceDetect();
  
  // Progress animation during loading
  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [isLoading, duration]);
  
  // Handle exit animation when loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before starting exit animation
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 500); // Half second delay
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  // Backdrop variants
  const backdropVariants: Variants = {
    hidden: { 
      opacity: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren"
      }
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren"
      }
    }
  };
  
  // Content variants
  const contentVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 40,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Logo variants
  const logoVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      transition: { 
        duration: 0.4
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1] // Custom spring-like easing
      }
    }
  };
  
  // Generate dots for loading text animation
  const LoadingDots = () => (
    <span className="inline-flex ml-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className="w-1.5 h-1.5 mx-0.5 rounded-full bg-primary inline-block"
        />
      ))}
    </span>
  );
  
  return (
    <AnimatePresence mode="wait">
      {(isLoading || (isExiting && progress === 100)) && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-background z-[100]"
          initial="visible"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onAnimationComplete={(definition) => {
            if (definition === "hidden") {
              setIsExiting(false);
            }
          }}
          key="loading-screen"
        >
          <motion.div
            className="text-center px-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
          >
            {logo && (
              <motion.div
                className="mb-8"
                variants={logoVariants}
              >
                {typeof logo === 'string' ? (
                  <img src={logo} alt="Logo" className="mx-auto h-16 md:h-20" />
                ) : (
                  logo
                )}
              </motion.div>
            )}
            
            <div className="mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 border-t-2 border-l-2 border-primary rounded-full animate-spin mx-auto"></div>
            </div>
            
            <div className="relative w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <p className="text-primary text-lg md:text-xl font-medium">
              {loadingText}
              {textAnimation && <LoadingDots />}
            </p>
            
            {!isMobile && (
              <p className="text-muted-foreground text-sm mt-2">
                Preparing an exceptional experience for you...
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;