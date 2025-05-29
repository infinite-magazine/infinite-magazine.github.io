import React from 'react';
import DecryptedText from './DecryptedText';

interface TextBlockProps {
  textNodes: string[];
  className?: string;
  hasBackdrop?: boolean;
  decryptsOnView?: boolean;
}

export default function TextBlock({ textNodes, className, hasBackdrop, decryptsOnView }: TextBlockProps) {
  return (
    
    <div className={`max-w-[300px] ${className}`}>
      <div className="font-medium font-mono text-zinc-800 text-sm mt-2 relative ">
        {hasBackdrop && <span className="absolute left-0 top-0 w-full h-[calc(100%-8px)] translate-y-[4px] -translate-x-5 bg-[#F2F1EB]/10 backdrop-blur-[1px]"></span>}
        <span className="absolute left-0 w-4 -translate-x-5 h-[calc(100%-8px)] top-[4px] border-2 border-[#E15858]/75 border-r-0" />
        <div
          className={`relative flex flex-col gap-2 pointer-events-auto select-text selection:bg-zinc-700 selection:text-white p-2 `}
          style={{
            textShadow:
              '0 0 4px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {textNodes.map((text, index) => (
            decryptsOnView ? (
              <DecryptedText key={index} text={text} animateOn={['view']} />
            ) : (
              <span key={index}>{text}</span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
