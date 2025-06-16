import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Star, Sparkles, ExternalLink } from 'lucide-react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import AnimatedWrapper, { fadeIn, scaleIn, textVariant, staggerContainer } from '../ui/animated-wrapper';
import Typewriter from '../ui/typewriter';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosition = useMousePosition();
  const { isMobile, isTablet } = useDeviceDetect();
  const [isImageHovered, setIsImageHovered] = useState(false);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Floating particles animation variants
  const floatingParticleVariants = {
    initial: (i: number) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      opacity: 0,
      scale: 0.5,
    }),
    animate: (i: number) => ({
      x: [
        Math.random() * 60 - 30,
        Math.random() * 60 - 30,
        Math.random() * 60 - 30,
      ],
      y: [
        Math.random() * 60 - 30,
        Math.random() * 60 - 30,
        Math.random() * 60 - 30,
      ],
      opacity: [0.2, 0.8, 0.2],
      scale: [0.6, 1, 0.6],
      transition: {
        x: {
          duration: 8 + i * 2,
          repeat: Infinity,
          repeatType: "reverse",
        },
        y: {
          duration: 10 + i * 2,
          repeat: Infinity,
          repeatType: "reverse",
        },
        opacity: {
          duration: 4 + i,
          repeat: Infinity,
          repeatType: "reverse",
        },
        scale: {
          duration: 7 - i,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    }),
  };
  
  const calculateGlow = (x: number, y: number) => {
    if (!sectionRef.current) return { x: '0px', y: '0px' };
    
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to center (normalized)
    const distX = (x - centerX) / (rect.width / 2);
    const distY = (y - centerY) / (rect.height / 2);
    
    // Convert to pixel offset for glow
    return {
      x: `${distX * 20}px`,
      y: `${distY * 20}px`
    };
  };
  
  const glowPosition = calculateGlow(mousePosition.x, mousePosition.y);
  
  // Randomized floating effect for text particles
  const particles = Array.from({ length: 6 }, (_, i) => i);
  
  // Button hover animations
  const buttonHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)",
      transition: { duration: 0.3, type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
      style={{ opacity, scale, y }}
    >
      {/* Background gradient that follows mouse with enhanced animation */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent 40%)`,
        }}
        transition={{ opacity: { duration: 1.5 } }}
      />
      
      {/* Dynamic floating particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary z-0"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%` 
          }}
          custom={i}
          variants={floatingParticleVariants}
          initial="initial"
          animate="animate"
        />
      ))}
      
      {/* Animated glow blob that follows mouse movement */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10"
        animate={{ 
          x: mousePosition.x / 20,
          y: mousePosition.y / 20,
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ 
          x: { type: "spring", stiffness: 20, damping: 20 },
          y: { type: "spring", stiffness: 20, damping: 20 },
          scale: { duration: 8, repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 6, repeat: Infinity, repeatType: "reverse" }
        }}
      />
      
      <div className="container-custom mx-auto">
        <div className="flex-responsive-reverse items-center justify-between gap-6 md:gap-8 lg:gap-10">
          {/* Left side - Text content with enhanced animations */}
          <AnimatedWrapper variant="staggerContainer" className="w-full lg:w-1/2 text-center lg:text-left">
            <AnimatedWrapper 
              variant="fadeIn" 
              direction="up" 
              duration={0.8}
              className="h1-responsive mb-4 md:mb-6 leading-tight px-4 lg:px-0"
            >
              <motion.span 
                className="inline-block mb-1 md:mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                I'm 
              </motion.span>{" "}
              <motion.span 
                className="text-gradient inline-block"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              >
                DJOUABI Nassiba
              </motion.span>
              <br />
              <motion.span 
                className="inline-block mt-1 md:mt-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <Typewriter 
                  words={['Creative Web Developer', ' passioned Designer', 'UI/UX enthusiast']} 
                  typingSpeed={100}
                  deletingSpeed={80}
                  delayBetweenWords={2000}
                  className="text-gradient-subtle"
                  cursorClassName="text-primary"
                />
              </motion.span>
            </AnimatedWrapper>
            
            <AnimatedWrapper 
              variant="fadeIn" 
              direction="up" 
              duration={0.7} 
              delay={0.6}
              className="text-responsive text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-6 md:mb-10 px-4 sm:px-6 lg:px-0"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
            Web developer with a solid foundation in computer science and hands-on experience in visual design , bringing a creative eye to every project I build
              </motion.span>
            </AnimatedWrapper>
            
            <AnimatedWrapper variant="fadeIn" direction="up" duration={0.6} delay={0.9}>
              <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 md:gap-4 px-4 sm:px-0">
                <motion.a 
                  href="#projects" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm sm:text-base font-medium rounded-full 
                          transition-all duration-300 flex items-center justify-center gap-2"
                  variants={buttonHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span>View My Work</motion.span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5,
                      repeatDelay: 0.5
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-primary/50 text-primary text-sm sm:text-base
                          rounded-full flex items-center justify-center gap-2"
                  variants={buttonHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
          
          {/* Right side - Developer Image with enhanced animations */}
          <AnimatedWrapper 
            variant="scaleIn" 
            delay={0.5} 
            className="w-full lg:w-1/2 flex items-center justify-center relative mt-8 lg:mt-0"
          >
            <motion.div 
              className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              onHoverStart={() => setIsImageHovered(true)}
              onHoverEnd={() => setIsImageHovered(false)}
            >
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg transition-all duration-300 group"
                animate={{ 
                  boxShadow: isImageHovered ? 
                    "0 0 30px rgba(79, 70, 229, 0.3)" : 
                    "0 10px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Image with enhanced animations */}
                <motion.div 
                  className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isImageHovered ? 10 : 0 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  <motion.img 
                    src="images/contexte-de-programmation-avec-une-personne-travaillant-avec-des-codes-sur-ordinateur.jpg" 
                    alt="Developer" 
                    className="w-[90%] h-[90%] object-cover rounded-full" 
                    animate={{ 
                      scale: isImageHovered ? 1.05 : 1,
                      y: isImageHovered ? -5 : 0
                    }}
                    transition={{ duration: 0.7 }}
                  />
                </motion.div>
                
                {/* Decorative elements with enhanced animations */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-primary/20 pointer-events-none"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div 
                  className="absolute inset-[-4px] rounded-full border-4 border-primary/10 pointer-events-none"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Orbital particles */}
                <AnimatePresence>
                  {isImageHovered && (
                    <>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
                          initial={{ 
                            scale: 0, 
                            opacity: 0,
                            top: "50%",
                            left: "50%",
                          }}
                          animate={{ 
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.6 + 0.4,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.8,
                            delay: i * 0.08
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
                
                {/* Shimmering effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-primary/20 to-transparent opacity-0 pointer-events-none"
                  animate={{ 
                    opacity: isImageHovered ? [0, 0.3, 0] : 0,
                    rotate: isImageHovered ? [0, 180] : 0,
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ 
                    opacity: { duration: 1.5, repeat: isImageHovered ? Infinity : 0 },
                    rotate: { duration: 2 },
                    backgroundPosition: { 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2
                    }
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatedWrapper>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: [0.4, 1, 0.4], 
            y: [0, 10, 0] 
          }}
          transition={{ 
            opacity: { duration: 2, repeat: Infinity },
            y: { duration: 1.5, repeat: Infinity }
          }}
        >
          <motion.a 
            href="#about" 
            aria-label="Scroll to About section"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
