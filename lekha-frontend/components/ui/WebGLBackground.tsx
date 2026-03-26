"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleGrid() {
  const { mouse, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null!);
  
  const count = 40;
  const separation = 2;
  
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    const initial = new Float32Array(count * count * 3);
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i - count / 2) * separation;
        const z = (j - count / 2) * separation;
        const index = (i * count + j) * 3;
        
        pos[index] = x;
        pos[index + 1] = 0;
        pos[index + 2] = z;
        
        initial[index] = x;
        initial[index + 1] = 0;
        initial[index + 2] = z;
      }
    }
    return [pos, initial];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const index = (i * count + j) * 3;
          
          // Original positions
          const x = initialPositions[index];
          const z = initialPositions[index + 2];
          
          // Mouse influence
          const mouseX = (mouse.x * viewport.width) / 2;
          const mouseZ = (mouse.y * viewport.height) / -2;
          
          const dx = x - mouseX;
          const dz = z - mouseZ;
          const dist = Math.sqrt(dx * dx + dz * dz);
          
          // Wave & Mouse warping
          const wave = Math.sin(x * 0.5 + time) * 0.2 + Math.cos(z * 0.5 + time) * 0.2;
          const warping = Math.max(0, 2 - dist) * 0.5;
          
          positionsAttr.setY(i * count + j, wave + warping);
        }
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#000000]">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <fog attach="fog" args={['#000000', 5, 20]} />
        <ParticleGrid />
        <ambientLight intensity={0.5} />
      </Canvas>
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#000000_80%)]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
