import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface ParticlesProps {
  count: number;
}

const Particles = ({ count }: ParticlesProps) => {
  const mesh = useRef<THREE.Points>(null);
  const { isMobile, isTablet } = useDeviceDetect();
  
  // Create a set of positions and random values with optimized distribution
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);
    const initialVelocities = new Float32Array(count * 3); // For animation
    
    const colorOptions = [
      new THREE.Color('#00ffff'), // cyan
      new THREE.Color('#ff00ff'), // magenta
      new THREE.Color('#8866ff'), // purple
      new THREE.Color('#5050ff'), // blue
    ];
    
    // Use a spherical distribution for more interesting visuals
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical coordinates for better distribution
      const radius = 5 + Math.random() * 10; // Between 5 and 15 units
      const theta = Math.random() * Math.PI * 2; // Around a circle
      const phi = Math.acos((Math.random() * 2) - 1); // Height distribution
      
      // Convert to Cartesian coordinates
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Randomness for animation
      randomness[i3] = Math.random() * 2 - 1;
      randomness[i3 + 1] = Math.random() * 2 - 1;
      randomness[i3 + 2] = Math.random() * 2 - 1;
      
      // Initial velocities for movement
      initialVelocities[i3] = (Math.random() - 0.5) * 0.01;
      initialVelocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      initialVelocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Varied sizes - smaller on average for better performance
      scales[i] = Math.random() * 0.3 + 0.05;
      
      // Color with slight variation in brightness
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const brightnessVariation = 0.7 + Math.random() * 0.3; // 70% to 100% brightness
      colors[i3] = randomColor.r * brightnessVariation;
      colors[i3 + 1] = randomColor.g * brightnessVariation;
      colors[i3 + 2] = randomColor.b * brightnessVariation;
    }
    
    return {
      positions,
      colors,
      scales,
      randomness,
      initialVelocities
    };
  }, [count]);
  
  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(particleData.colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(particleData.scales, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(particleData.randomness, 3));
    return geometry;
  }, [particleData]);
  
  // Custom shader material for particles with improved visuals
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.08, // Smaller size for better performance
      sizeAttenuation: true,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
  }, []);
  
  // Store original positions to avoid drift
  const originalPositions = useMemo(() => {
    // Create a regular array copy of the Float32Array
    return Array.from(particleData.positions);
  }, [particleData.positions]);
  
  // Enhanced animation with device-specific optimizations
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    if (mesh.current && mesh.current.geometry) {
      // Slower rotation on mobile for better performance
      const rotationSpeed = isMobile ? 0.02 : isTablet ? 0.025 : 0.03;
      mesh.current.rotation.x = elapsedTime * rotationSpeed;
      mesh.current.rotation.y = elapsedTime * (rotationSpeed * 1.5);
      
      // Get position attribute for individual particle animation
      const positions = mesh.current.geometry.attributes.position;
      
      // Optimization: For mobile, only animate a subset of particles or with less frequency
      // to improve performance while maintaining the visual effect
      const animationFrequency = isMobile ? 3 : isTablet ? 2 : 1; // Only animate every nth particle on mobile
      const animationScale = isMobile ? 0.03 : isTablet ? 0.04 : 0.05; // Smaller movement on mobile
      
      // Animate particles
      for (let i = 0; i < count; i++) {
        // Skip some particles on mobile/tablet for performance
        if (isMobile && i % animationFrequency !== 0) continue;
        
        const i3 = i * 3;
        
        // Get the randomness values for this particle
        const randX = particleData.randomness[i3];
        const randY = particleData.randomness[i3 + 1];
        const randZ = particleData.randomness[i3 + 2];
        
        // Create subtle movement - simpler calculation on mobile
        const offsetX = Math.sin(elapsedTime * (0.1 + randX * 0.1)) * animationScale * (1 + randX);
        const offsetY = Math.sin(elapsedTime * (0.2 + randY * 0.05)) * animationScale * (1 + randY);
        const offsetZ = Math.cos(elapsedTime * (0.1 + randZ * 0.1)) * animationScale * (1 + randZ);
        
        // Apply the offset to the original stored position (prevents cumulative drift)
        positions.array[i3] = originalPositions[i3] + offsetX;
        positions.array[i3 + 1] = originalPositions[i3 + 1] + offsetY;
        positions.array[i3 + 2] = originalPositions[i3 + 2] + offsetZ;
      }
      
      // Mark attributes for update
      positions.needsUpdate = true;
    }
  });
  
  return (
    <points ref={mesh} geometry={geometry} material={material} />
  );
};

export default Particles;
