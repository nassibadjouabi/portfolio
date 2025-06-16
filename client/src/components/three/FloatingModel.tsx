import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface FloatingModelProps {
  position: [number, number, number];
}

const FloatingModel = ({ position }: FloatingModelProps) => {
  const heartRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const { isMobile, isTablet } = useDeviceDetect();
  
  // Animation loop with smooth interpolated movements - optimized for different devices
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Adjust animation speeds based on device performance capabilities
    const animSpeed = isMobile ? 0.7 : isTablet ? 0.85 : 1.0;
    
    if (heartRef.current) {
      // Smooth circular rotation for the heart model - slower on mobile
      heartRef.current.rotation.y = t * 0.1 * animSpeed;
      // Floating effect with sine wave - less movement on mobile
      heartRef.current.position.y = Math.sin(t * 0.5 * animSpeed) * 0.2 * animSpeed;
    }
    
    if (sphereRef.current) {
      // Skip complex animations on mobile for better performance
      if (!isMobile || t % 2 < 1) { // Only update every other second on mobile
        // Complex rotation pattern - slower on mobile
        sphereRef.current.rotation.y = t * 0.3 * animSpeed;
        sphereRef.current.rotation.z = t * 0.2 * animSpeed;
        
        // Breathing effect - reduced intensity on mobile
        const breathIntensity = isMobile ? 0.03 : isTablet ? 0.04 : 0.05;
        const scaleFactor = 1 + Math.sin(t * 1.5 * animSpeed) * breathIntensity;
        sphereRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        // Gentle floating motion - reduced on mobile
        sphereRef.current.position.y = Math.sin(t * 0.8 * animSpeed) * 0.3 * animSpeed;
      }
    }
    
    if (torusRef.current) {
      // Rotating around multiple axes - simplified on mobile
      torusRef.current.rotation.x = t * 0.2 * animSpeed;
      if (!isMobile) {
        // Skip secondary rotation on mobile
        torusRef.current.rotation.z = t * 0.1 * animSpeed;
      }
      // Slight position shift - smaller on mobile
      torusRef.current.position.y = Math.sin(t * 0.6 * animSpeed) * 0.2 * animSpeed;
    }
  });
  
  // Adjust geometry complexity based on device type
  const sphereDetail = isMobile ? 16 : isTablet ? 24 : 32;
  const torusRadialSegments = isMobile ? 12 : isTablet ? 14 : 16;
  const torusTubularSegments = isMobile ? 48 : isTablet ? 75 : 100;
  
  // Adjust spacing for different screen sizes
  const spacing = isMobile ? 1.2 : 1.5;
  
  // Create a heart shape
  const heartGeometry = useMemo(() => {
    // Create a simplified heart shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    
    // Draw a heart shape path (simplified)
    heartShape.moveTo(x, y + 0.5);
    heartShape.bezierCurveTo(x, y + 0.9, x + 0.5, y + 0.9, x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.9, x + 1, y + 0.9, x + 1, y + 0.5);
    heartShape.bezierCurveTo(x + 1, y, x + 0.5, y - 0.6, x + 0.25, y - 0.95);
    heartShape.bezierCurveTo(x, y - 0.6, x, y, x, y + 0.5);
    
    // Create a mesh from the path with device-optimized detail
    const geometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: isMobile ? 2 : 3,
      steps: isMobile ? 1 : 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });
    
    // Center the geometry
    geometry.center();
    
    return geometry;
  }, [isMobile]);
  
  return (
    <group position={position}>
      {/* Heart shape */}
      <mesh 
        ref={heartRef} 
        position={[spacing * 0.7, 0, 0]} 
        rotation={[0, 0, 0]}
        geometry={heartGeometry}
      >
        <meshStandardMaterial 
          color="#ff3366" 
          roughness={0.3}
          metalness={0.7}
          emissive="#ff3366"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Other decorative shapes with responsive detail levels */}
      <mesh ref={sphereRef} position={[-spacing, 0, 0]}>
        <sphereGeometry args={[0.7, sphereDetail, sphereDetail]} />
        <MeshDistortMaterial 
          color="#00ffff" 
          distort={isMobile ? 0.3 : 0.4} 
          speed={isMobile ? 1 : 2} 
          roughness={0.2}
          metalness={0.8}
          emissive="#00ffff" 
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh ref={torusRef} position={[0, 0, -spacing]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.3, torusRadialSegments, torusTubularSegments]} />
        <meshStandardMaterial 
          color="#ff00ff" 
          roughness={0.3}
          metalness={0.7}
          emissive="#ff00ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh position={[0, -spacing, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#8866ff" 
          roughness={0.3}
          metalness={0.7}
          emissive="#8866ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default FloatingModel;
