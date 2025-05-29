"use client";

import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/data/team-members';

interface PolaroidCardProps {
  initialBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  className?: string;
  initialRotation?: number;
  tapeStyle?: 'default' | 'style1' | 'style2' | 'style3';
  member: TeamMember;
}

const PolaroidPicResizeHandle = ({ direction }: { direction: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left' }) => {
  return (
    <div
      className="flex items-center justify-center absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 4, position: 'relative' }}
    >
      <div
        className={`w-4 h-4 ${direction === 'top-right' ? "border-r-2 border-t-2" :
          direction === 'bottom-right' ? "border-r-2 border-b-2" :
            direction === 'bottom-left' ? "border-l-2 border-b-2" :
              "border-l-2 border-t-2"
          } border-primary`}
      ></div>
    </div>
  );
};

export const PolaroidCard = ({ 
  initialBox = { x: 25, y: 25, width: 170, height: 170 },
  initialRotation = 10,
  tapeStyle = 'default',
  className,
  member
}: PolaroidCardProps) => {
  const [box, setBox] = useState(initialBox);

  const PARENT_WIDTH = 250;  // Width of the parent container
  const PARENT_HEIGHT = 250; // Height of the parent container

  const constrainPosition = (x: number, y: number, width: number, height: number) => {
    // Ensure the box stays within parent bounds
    const constrainedX = Math.max(0, Math.min(x, PARENT_WIDTH - width));
    const constrainedY = Math.max(0, Math.min(y, PARENT_HEIGHT - height));
    return { x: constrainedX, y: constrainedY };
  };

  const constrainSize = (width: number, height: number, x: number, y: number) => {
    // Ensure the box doesn't exceed parent bounds
    const maxWidth = PARENT_WIDTH - x;
    const maxHeight = PARENT_HEIGHT - y;
    return {
      width: Math.min(Math.max(width, 40), maxWidth),
      height: Math.min(Math.max(height, 40), maxHeight)
    };
  };

  const clipPath = `polygon(
        ${box.x}px ${box.y}px,
        ${box.x + box.width}px ${box.y}px,
        ${box.x + box.width}px ${box.y + box.height}px,
        ${box.x}px ${box.y + box.height}px
    )`;

  const getTapeStyle = () => {
    switch (tapeStyle) {
      case 'style1':
        return (
          <>
            <Image src="/tape/clear-tape-03.webp" alt="clear tape" width={200} height={400} className="z-50 -rotate-[45deg] absolute -left-8 top-4" />
            <Image src="/tape/clear-tape-07.webp" alt="clear tape" width={200} height={400} className="z-50 rotate-[30deg] absolute right-[-5px] bottom-[-10px]" />
          </>
        );
      case 'style2':
        return (
          <>
            <Image src="/tape/clear-tape-09.webp" alt="clear tape" width={200} height={400} className="z-50 -rotate-[15deg] absolute -left-12 top-[-2px]" />
            <Image src="/tape/clear-tape-02.webp" alt="clear tape" width={200} height={400} className="z-50 rotate-[0deg] absolute right-10 bottom-[-32px]" />
          </>
        );
      case 'style3':
        return (
          <>
            <Image src="/tape/clear-tape-04.webp" alt="clear tape" width={200} height={400} className="z-50 rotate-[35deg] absolute -right-10 top-[-8px]" />
            <Image src="/tape/clear-tape-10.webp" alt="clear tape" width={200} height={400} className="z-50 rotate-[20deg] absolute -left-12 bottom-[-50px]" />
          </>
        );
      default:
        return (
          <>
            <Image src="/tape/clear-tape-01.webp" alt="clear tape" width={200} height={400} className="z-50 -rotate-[20deg] absolute -left-10 -top-4" />
            <Image src="/tape/clear-tape-05.webp" alt="clear tape" width={200} height={400} className="z-50 rotate-[12deg] absolute -right-10 -bottom-8" />
          </>
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute bottom-[-30px] left-[-10px] w-[300px] rounded-xl  h-[300px] bg-gradient-to-t from-black/0 to-black/0 blur-xl "></div>

      <motion.div 
        animate={{ rotate: initialRotation }} 
        transition={{ duration: 0 }} 
        className="w-[280px] pb-[60px] z-10 bg-zinc-100 rounded-[4px] shadow-[0_0.2rem_1.2rem_rgba(0,0,0,0.2)] border border-black/5 rounded-[1px] flex flex-col items-center pt-[10px] relative"
      >
      <Image src="/noise.webp" alt="noise" fill className="object-cover absolute inset-0 z-4 opacity-50" />

      
      <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full z-50 overflow-hidden">
      <div className="from-white/25 to-white/0 h-[100%] -left-[25%] -bottom-[50%] w-[100%] z-50 rounded-full blur-xl absolute bg-radial "></div>
      </div>
      {getTapeStyle()}
        <div className="h-[250px] w-[250px] shadow-sm relative z-10 ">



          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover absolute inset-0 z-5"
            style={{ WebkitClipPath: clipPath, clipPath }}
          />


          <Image
            src={member.asciiImage}
            alt={`${member.name} ascii`}
            fill
            className="object-cover absolute inset-0 z-3"
          />

          <Rnd
            size={{ width: box.width, height: box.height }}
            position={{ x: box.x, y: box.y }}
            minWidth={40}
            minHeight={40}
            bounds=""
            resizeHandleComponent={{
              topRight: <PolaroidPicResizeHandle direction="top-right" />,
              topLeft: <PolaroidPicResizeHandle direction="top-left" />,
              bottomRight: <PolaroidPicResizeHandle direction="bottom-right" />,
              bottomLeft: <PolaroidPicResizeHandle direction="bottom-left" />,
            }}
            onDrag={(e, d) => {
              const constrained = constrainPosition(d.x, d.y, box.width, box.height);
              setBox({ ...box, x: constrained.x, y: constrained.y });
            }}
            onDragStop={(e, d) => {
              const constrained = constrainPosition(d.x, d.y, box.width, box.height);
              setBox({ ...box, x: constrained.x, y: constrained.y });
            }}
            onResize={(e, d, ref, delta, position) => {
              const newWidth = parseInt(ref.style.width);
              const newHeight = parseInt(ref.style.height);
              const constrainedSize = constrainSize(newWidth, newHeight, position.x, position.y);
              const constrainedPos = constrainPosition(position.x, position.y, constrainedSize.width, constrainedSize.height);

              setBox({
                width: constrainedSize.width,
                height: constrainedSize.height,
                x: constrainedPos.x,
                y: constrainedPos.y,
              });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const newWidth = parseInt(ref.style.width);
              const newHeight = parseInt(ref.style.height);
              const constrainedSize = constrainSize(newWidth, newHeight, position.x, position.y);
              const constrainedPos = constrainPosition(position.x, position.y, constrainedSize.width, constrainedSize.height);

              setBox({
                width: constrainedSize.width,
                height: constrainedSize.height,
                x: constrainedPos.x,
                y: constrainedPos.y,
              });
            }}
            style={{
              border: '2px solid #E15858',
              zIndex: 10,
              background: 'transparent',

            }}
          />
        </div>
        <div className="absolute left-4 bottom-5 z-10">
        <div className="text-[35px] text-zinc-800 font-semibold font-sharpie rotate-[-2deg] whitespace-nowrap" style={{ textShadow: '0 0 1px rgba(0, 0, 0, 1)' }}>{member.name}</div>

        </div>
        <p className="text-sm bottom-3 right-0 pr-4 text-end font-mono absolute text-zinc-800 left-0 whitespace-nowrap">{member.position}</p>

      </motion.div>
     
    </div>
  );
};
