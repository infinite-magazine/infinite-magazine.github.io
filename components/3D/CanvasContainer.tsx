"use client";

import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('./3DCanvas'), {
  ssr: false,
});

export default function CanvasContainer() {
  return (
    <div className="max-w-[1000px] pointer-events-none mx-auto relative -translate-x-[80px] md:-translate-x-[300px]">
      <ThreeCanvas />
    </div>
  );
}