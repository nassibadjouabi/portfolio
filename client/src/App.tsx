import { useEffect, useState, lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HelmetProvider } from 'react-helmet-async';
import { useDeviceDetect } from './hooks/useDeviceDetect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from './lib/splitText';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Set default ease for all GSAP animations
gsap.defaults({
  ease: "power3.out",
  duration: 0.8
});

// Layout components
import Navbar from './components/layout/Navbar';

// Section components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

// UI components
import BackToTop from './components/ui/back-to-top';
import LoadingScreen from './components/ui/loading-screen';

// Three.js components for performance optimization
const Scene = lazy(() => import('./components/three/Scene'));

function App() {
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  
  // No loader logic needed
  const canvasSettings = {
    dpr: isMobile ? Math.min(1.5, window.devicePixelRatio) : 
         isTablet ? Math.min(1.75, window.devicePixelRatio) : 
         Math.min(2, window.devicePixelRatio), // Cap DPR for performance
    antialias: !isMobile, // Disable antialiasing on mobile for performance
    powerPreference: isMobile ? 'low-power' as WebGLPowerPreference : 'high-performance' as WebGLPowerPreference,
    alpha: true,
  };
  
  // Calculate optimal FOV for different devices
  const cameraSettings = {
    position: [0, 0, isMobile ? 6 : 5] as [number, number, number], // Move camera back on mobile
    fov: isMobile ? 60 : isTablet ? 55 : 50, // Wider FOV on mobile
  };
  
  useEffect(() => {
    const setupAnimations = () => {
      ScrollTrigger.refresh();
  
      // Store cleanup function from smooth scrolling
      const cleanupSmoothScroll = setupSmoothScrolling();
  
      // Return cleanup function
      return cleanupSmoothScroll;
    };
  
    const loadTime = isMobile ? 1500 : 2500;
  
    let cleanupScroll: (() => void) | undefined;
  
    const timer = setTimeout(() => {
      setLoading(false);
  
      // Delay animations to ensure DOM is rendered
      setTimeout(() => {
        cleanupScroll = setupAnimations();
      }, 100);
    }, loadTime);
  
    return () => {
      clearTimeout(timer);
  
      // Call smooth scrolling cleanup if it was set
      if (cleanupScroll) {
        cleanupScroll();
      }
    };
  }, [isMobile]);
  
  
  // Setup smooth scrolling with GSAP for better performance
  const setupSmoothScrolling = () => {
    // Select all anchor links that point to IDs
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Function to handle smooth scrolling
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      
      // Safely cast to HTMLAnchorElement
      const anchor = e.currentTarget as HTMLAnchorElement;
      const targetId = anchor.getAttribute('href')?.substring(1);
      
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;
      
      // Get the element's position
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      // Get header height for offset (if you have a fixed header)
      // Adjust based on device type for better mobile experience
      const headerOffset = isMobile ? 60 : 80;
      
      // Adjust duration based on distance to make scrolling feel more natural
      const distance = Math.abs(window.scrollY - (targetPosition - headerOffset));
      const duration = Math.min(1.5, 0.5 + distance / 3000);
      
      // Scroll with GSAP for smoother animation, especially on mobile
      gsap.to(window, {
        duration: duration,
        scrollTo: {
          y: targetPosition - headerOffset,
          autoKill: false
        },
        ease: "power3.out"
      });
    };
    
    // Add event listeners
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll, { passive: false });
    });
    
    // Return cleanup function
    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  };
  
  return (
    <HelmetProvider>
      {/* Adding position-relative to the app container for proper scroll calculations */}
      <div className="app bg-background text-foreground relative">
        {/* Enhanced loading screen */}
        <LoadingScreen 
          isLoading={loading}
          duration={isMobile ? 1500 : 2500}
          logo={
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
              Portfolio
            </div>
          }
        />
        
        {!loading && (
          <>
            {/* 3D Background Canvas (fixed position) */}
            <div className="fixed inset-0 -z-10">
              <Suspense fallback={null}>
                <Canvas
                  shadows={!isMobile} // Disable shadows on mobile for performance
                  camera={cameraSettings}
                  gl={canvasSettings}
                  performance={{ min: isMobile ? 0.3 : 0.5 }} // More aggressive performance scaling on mobile
                >
                  <Scene />
                </Canvas>
              </Suspense>
            </div>
            
            {/* Main Content - Adding proper ID for scrolling sections */}
            <main id="main-content" className="relative z-10">
              <Navbar />
              <Hero />
              <About />
              <Projects />
              <Timeline />
              <Contact />
              <Footer />
              <BackToTop />
            </main>
          </>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
