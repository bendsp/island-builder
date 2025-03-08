import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

interface IslandProps {
  waterLevel: number;
}

const Island: React.FC<IslandProps> = ({ waterLevel }) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const islandRef = useRef<THREE.Group>(null);
  const gridSize = 50;

  // Load textures
  const grassTexture = useTexture("/textures/grass.jpg");

  // Set texture repeat
  useEffect(() => {
    if (grassTexture) {
      grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
      grassTexture.repeat.set(8, 8);
    }
  }, [grassTexture]);

  // Create a proper 3D island
  const Island3D = useMemo(() => {
    return (
      <group ref={islandRef}>
        {/* Main island mound */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <sphereGeometry args={[10, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            map={grassTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Additional terrain features */}
        <mesh position={[5, 2, 3]} castShadow receiveShadow>
          <coneGeometry args={[3, 4, 16]} />
          <meshStandardMaterial
            map={grassTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[-4, 3, -2]} castShadow receiveShadow>
          <coneGeometry args={[2, 3, 16]} />
          <meshStandardMaterial
            map={grassTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 4, -5]} castShadow receiveShadow>
          <coneGeometry args={[2.5, 5, 16]} />
          <meshStandardMaterial
            map={grassTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>
    );
  }, [grassTexture]);

  // Update water level
  useEffect(() => {
    if (waterRef.current) {
      // Scale the water level to better interact with the island
      waterRef.current.position.y = waterLevel * 10;
    }
  }, [waterLevel]);

  // Animate the sphere to verify Three.js is working
  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.position.y =
        Math.sin(state.clock.elapsedTime) * 0.5 + 5;
      sphereRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Ground plane for reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* 3D island */}
      {Island3D}

      {/* Test sphere to verify Three.js is working */}
      <mesh ref={sphereRef} position={[0, 5, 0]} castShadow>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          map={grassTexture}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Water */}
      <mesh
        ref={waterRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, waterLevel * 5, 0]}
      >
        <planeGeometry args={[gridSize + 30, gridSize + 30]} />
        <meshStandardMaterial
          color="#0077be"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};

export default Island;
