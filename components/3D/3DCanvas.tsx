import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Model from '@/components/3D/3DModel';
import AsciiRenderer from '@/components/3D/AsciiRenderer';

export default function ThreeCanvas() {
  return (
    <div
      className="relative select-none pointer-events-none w-[500px] md:w-[1000px] h-[500px] md:h-[1000px]"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      <div className="absolute top-[55%] left-[60%] -translate-x-[70%] -translate-y-1/2 blur-3xl w-[80%] h-[60%] bg-[#F2F1EB]/90"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Canvas
          camera={{ position: [0, 3, 0] }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={['black']} />
            <pointLight position={[28, 21, 9]} intensity={50} />
            <pointLight position={[2, 20, -5]} intensity={1000} />
            <pointLight position={[-16, 11, 11]} intensity={5000} />
            <Model />
          </Suspense>
          <AsciiRenderer />
        </Canvas>
      </motion.div>
    </div>
  );
}
