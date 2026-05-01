"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function OrbMesh({ score }: { score: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const sphereScale = useMemo(() => {
    return 0.5 + (score / 500) * 1.5; // Scale from 0.5 to 2
  }, [score]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group scale={sphereScale}>
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
      </group>
    </Float>
  );
}

export default function AuraOrb({ score }: { score: number }) {
  const baseSize = 200;
  const scaleFactor = Math.min(1 + (score / 500) * 2, 2.5);
  const size = Math.max(baseSize, baseSize * scaleFactor);
  const sphereScale = 0.5 + (score / 500) * 1.5;

  const textScale = 1 + (score / 500) * 0.5;

  return (
    <div
      className="relative mx-auto flex items-center justify-center transition-all duration-700 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center">
          <div
            className="font-light serif leading-none"
            style={{
              fontSize: `${56 * textScale}px`,
              color: "#F4E6E0",
              textShadow: "0 2px 8px rgba(40,20,20,0.35)",
              transform: "translateX(-4px)",
            }}
          >
            {score}
          </div>

          <div
            className="text-aura-label mt-2 tracking-[4px]"
            style={{
              color: "#D8C4BE",
              textShadow: "0 1px 4px rgba(40,20,20,0.2)",
              fontSize: `${12 * Math.min(textScale, 1.3)}px`,
            }}
          >
            THIS MONTH
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        <Suspense
          fallback={
            <div className="w-full h-full rounded-full bg-aura-surface animate-pulse" />
          }
        >
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={1} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            <OrbMesh score={score} />
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.4}
              scale={10 * sphereScale}
              blur={2}
              far={4.5}
            />
            <Environment preset="studio" />
          </Canvas>
        </Suspense>
      </div>

      {/* Ghost Rings - scale with size */}
      <div
        className="absolute border border-aura-rose/10 rounded-full animate-pulse z-0"
        style={{
          inset: `${size * 0.1}px`,
        }}
      />
      <div
        className="absolute border border-aura-rose/5 rounded-full animate-pulse z-0 [animation-delay:1s]"
        style={{
          inset: 0,
        }}
      />
    </div>
  );
}
