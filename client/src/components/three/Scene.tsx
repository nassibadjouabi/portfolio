import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { gsap } from 'gsap';
import Particles from './Particles';
import FloatingModel from './FloatingModel';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';


const Scene = () => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Detect device for responsive adjustments
  const { isMobile, isTablet, isDesktop, screenWidth } = useDeviceDetect();
  
  // Detect if device is likely to be a very low-performance device
  // by checking if it's mobile with a small screen
  const isLowPerformanceDevice = useMemo(() => {
    return isMobile && screenWidth < 400;
  }, [isMobile, screenWidth]);
  
  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Create gradient colors for background
  const gradientColors = useMemo(() => {
    return [
      new THREE.Color('#050816').convertSRGBToLinear(),
      new THREE.Color('#0a0d26').convertSRGBToLinear(),
      new THREE.Color('#121638').convertSRGBToLinear()
    ];
  }, []);
  
  // Frame counter for skipping frames on low-performance devices
  const frameCounter = useRef(0);
  
  // Animation loop with device-aware smoothing and frame skipping
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Increment frame counter
      frameCounter.current += 1;
      
      // Skip frames on low-performance devices to save resources
      const skipRate = isLowPerformanceDevice ? 3 : isMobile ? 2 : 1;
      if (skipRate > 1 && frameCounter.current % skipRate !== 0) {
        return; // Skip this frame
      }
      
      const time = clock.getElapsedTime();
      
      // Gentle floating animation based on time
      const floatY = Math.sin(time * 0.1) * 0.05;
      
      // Apply different damping based on device type for better performance
      const dampingFactor = isLowPerformanceDevice ? 0.03 : isMobile ? 0.05 : isTablet ? 0.08 : 0.1;
      const rotationFactor = isLowPerformanceDevice ? 0.02 : isMobile ? 0.03 : 0.05; // Less rotation effect on mobile
      
      // Update rotation directly without GSAP for smoother performance
      // Apply damping for mouse movement (interpolate current position toward target)
      groupRef.current.rotation.x += (mouseRef.current.y * rotationFactor - groupRef.current.rotation.x) * dampingFactor;
      groupRef.current.rotation.y = floatY + (mouseRef.current.x * rotationFactor - (groupRef.current.rotation.y - floatY)) * dampingFactor;
    }
  });
  
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light with blueish tint */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.5} 
        color="#8080ff" 
      />
      
      {/* Secondary accent light with pink tint */}
      <pointLight 
        position={[-5, 3, 0]} 
        intensity={0.3} 
        color="#ff80bf" 
      />
      
      {/* Performance optimizations */}
      <AdaptiveDpr pixelated />  
      <AdaptiveEvents />
      
      {/* Group that responds to mouse movement */}
      <group ref={groupRef}>
        {/* Floating 3D objects */}
        <FloatingModel position={[0, 0, 0]} />
        
        {/* Particle system with device-specific count for better performance */}
        <Particles count={isLowPerformanceDevice ? 50 : isMobile ? 100 : isTablet ? 250 : 450} />
      </group>
      
      {/* Stars background with device-specific count & performance optimizations */}
      <Stars 
        radius={100} 
        depth={50} 
        count={isLowPerformanceDevice ? 500 : isMobile ? 800 : isTablet ? 2000 : 4000} 
        factor={isLowPerformanceDevice ? 2 : isMobile ? 3 : 4} 
        saturation={0} 
        fade 
        speed={isLowPerformanceDevice ? 0.3 : isMobile ? 0.5 : 1} 
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  );
};

export default Scene;
