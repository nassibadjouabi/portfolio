import { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

interface DeveloperModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

const DeveloperModel = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0]
}: DeveloperModelProps) => {
  const { isMobile, isTablet } = useDeviceDetect();
  const modelRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Adjust scale based on device type
  const deviceScale = isMobile ? scale * 0.8 : isTablet ? scale * 0.9 : scale;
  
  // Load the 3D model
  const { scene, nodes } = useGLTF('/images/developer.glb', true, undefined, (error) => {
    console.error('Error loading developer model:', error);
    setLoadError(true);
  }) as unknown as { scene: THREE.Group; nodes: Record<string, THREE.Object3D> };
  
  // Clone the scene to use in this component
  const model = scene.clone();
  
  useEffect(() => {
    if (model) {
      // Set material properties for better rendering
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Make sure materials catch light correctly
          if (child.material) {
            child.material.needsUpdate = true;
            
            // If it's a MeshStandardMaterial
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.roughness = 0.5;
              child.material.metalness = 0.2;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        }
      });
      
      // Signal that the model is ready
      setModelLoaded(true);
    }
    
    // Cleanup
    return () => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
          if (child.geometry) child.geometry.dispose();
        }
      });
    };
  }, [model]);
  
  // Gentle animation to make the model float/breathe
  useFrame(({ clock }) => {
    if (modelRef.current && modelLoaded) {
      // Calculate animation speed based on device
      const animSpeed = isMobile ? 0.6 : isTablet ? 0.8 : 1.0;
      const t = clock.getElapsedTime();
      
      // Gentle rotation
      modelRef.current.rotation.y = Math.sin(t * 0.2 * animSpeed) * 0.1;
      
      // Subtle floating movement
      modelRef.current.position.y = position[1] + Math.sin(t * 0.5 * animSpeed) * 0.05;
    }
  });
  
  // Create a fallback 3D shape if the model fails to load
  const Fallback = useMemo(() => {
    if (!loadError) return null;
    
    return (
      <group
        position={[position[0], position[1], position[2]]}
        rotation={[rotation[0], rotation[1], rotation[2]]}
        scale={[deviceScale, deviceScale, deviceScale]}
      >
        {/* Create a stylized developer silhouette using basic geometry */}
        <group position={[0, 0, 0]}>
          {/* Head */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.2} />
          </mesh>
          
          {/* Body */}
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.4, 1, 16, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Glasses */}
          <mesh position={[0, 0.5, 0.35]}>
            <torusGeometry args={[0.25, 0.05, 16, 32, Math.PI]}  />
            <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>
    );
  }, [loadError, position, rotation, deviceScale]);
  
  // If there was an error loading the model, use the fallback
  if (loadError) {
    return Fallback;
  }
  
  return (
    <group
      ref={modelRef}
      position={[position[0], position[1], position[2]]}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={[deviceScale, deviceScale, deviceScale]}
    >
      <primitive object={model} />
    </group>
  );
};

export default DeveloperModel;
