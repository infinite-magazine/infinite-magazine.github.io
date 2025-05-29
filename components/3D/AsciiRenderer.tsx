'use client';

import { useMemo, useEffect, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AsciiEffect } from 'three-stdlib';

export default function AsciiRenderer({
  renderIndex = 1,
  characters = ' :-+*=%@#',
  bgColor = 'transparent',
  fgColor = 'black',
  invert = true,
  color = false,
  resolution = 0.28,
}) {
  const { size, gl, scene, camera } = useThree();
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    });
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.width = '100%';
    effect.domElement.style.height = '100%';
    effect.domElement.style.pointerEvents = 'none';
    return effect;
  }, [characters, invert, color, resolution]);

  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [fgColor, bgColor]);

  useEffect(() => {
    gl.domElement.style.opacity = '0';
    gl.domElement.parentNode?.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = '1';
      gl.domElement.parentNode?.removeChild(effect.domElement);
    };
  }, [effect]);

  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  useFrame(() => {
    effect.render(scene, camera);
  }, renderIndex);

  return null;
}
