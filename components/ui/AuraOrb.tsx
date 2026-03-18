'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh({ score }: { score: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#7a5a5a"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#7a5a5a"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

export default function AuraOrb({ score }: { score: number }) {
  return (
    <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center">
          <div className="text-8xl font-light serif text-aura-rose leading-none drop-shadow-sm">
            {score}
          </div>
          <div className="text-aura-label text-aura-rose-dim mt-2">
            this month
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="w-full h-full rounded-full bg-aura-surface animate-pulse" />}>
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            <OrbMesh score={score} />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
            <Environment preset="studio" />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Ghost Rings */}
      <div className="absolute inset-4 border border-aura-rose/10 rounded-full animate-pulse z-0" />
      <div className="absolute inset-0 border border-aura-rose/5 rounded-full animate-pulse [animation-delay:1s] z-0" />
    </div>
  );
}
