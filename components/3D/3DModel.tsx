'use client';

import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import type { Group } from 'three';
interface ModelProps {
  scale?: number;
  rotation?: [number, number, number];
  path?: string;
}

export default function Model({
  scale = 0.34,
  rotation = [-Math.PI / 2, 0, 0],
  path = '/models/mit.small.glb',
}: ModelProps) {
  
  const ref = useRef<Group>(undefined);
  const gltf = useLoader(GLTFLoader, path);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.75;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.2;
    }
  });

  return (
    <group dispose={null}>
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={scale}
        rotation={rotation}
      />
    </group>
  );
}
