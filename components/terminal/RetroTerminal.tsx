'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { issues } from '@/data/issues';
import Link from 'next/link';
import { InfiniteLogo } from './InfiniteLogo';

interface TerminalProps {
  backgroundColor?: string;
  textColor?: string;
  cursorColor?: string;
  glowColor?: string;
  className?: string;
  initialText?: string;
  onCommand?: (command: string) => void;
}

interface AnimatedWord {
  word: string;
  index: number;
  issueIndex: number;
}

export const RetroTerminal: React.FC<TerminalProps> = ({
  backgroundColor = 'bg-[#0f140a]',
  className = '',
  initialText = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [scanDelay] = useState(() => Math.random() * 5);
  const [animationStep, setAnimationStep] = useState(0);
  const [maskHeight, setMaskHeight] = useState(0);
  const [animatedWords, setAnimatedWords] = useState<AnimatedWord[]>([]);

  useEffect(() => {
    const words: AnimatedWord[] = [];
    issues.forEach((issue, issueIndex) => {
      issue.title.split(' ').forEach((word, wordIndex) => {
        words.push({
          word,
          index: wordIndex,
          issueIndex,
        });
      });
    });
    setAnimatedWords(words);
  }, []);

  // animate words + content step by step
  useEffect(() => {
    const sequence = async () => {
      const wordsPerIssue = issues.map(issue => issue.title.split(' ').length);

      // Animate each issue's words and timestamp before moving to next issue
      for (let issueIndex = 0; issueIndex < issues.length; issueIndex++) {
        for (let wordIndex = 0; wordIndex < wordsPerIssue[issueIndex]; wordIndex++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setAnimationStep(prev => prev + 1);
        }

        // Animate timestamp for current issue
        await new Promise(resolve => setTimeout(resolve, 100));
        setAnimationStep(prev => prev + 1);
      }

      // Show navigation instructions
      await new Promise(resolve => setTimeout(resolve, 400));
      setAnimationStep(prev => prev + 1);

      // Show logo
      setAnimationStep(prev => prev + 1);

      // Show description and prompt immediately after
      setAnimationStep(prev => prev + 1);
    };

    if (animatedWords.length > 0) {
      sequence();
    }
  }, [animatedWords]);

  // keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        } else {
          setSelectedIndex(issues.length - 1);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedIndex < issues.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        } else {
          setSelectedIndex(0);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const handleIssueClick = (index: number) => {
    if (index === selectedIndex) {
      window.open(issues[index].link, '_blank');
    } else {
      setSelectedIndex(index);
    }
  };

  // mask anim
  useEffect(() => {
    const totalHeight = 440;
    const stepSize = 20;
    const interval = 50;

    const animateMask = () => {
      setMaskHeight(0);
      let currentHeight = 0;

      const maskInterval = setInterval(() => {
        currentHeight += stepSize;
        if (currentHeight >= totalHeight) {
          clearInterval(maskInterval);
          setMaskHeight(totalHeight);
        } else {
          setMaskHeight(currentHeight);
        }
      }, interval);
    };
    animateMask();
  }, []);

  return (
    <>
      <div className="max-w-[900px] relative z-10 mt-20 md:min-h-[600px] pointer-events-none mx-auto flex md:flex-row flex-col gap-20 items-end md:items-start">
        <Image
          src="/microcontr.webp"
          alt="infinite"
          width={350}
          height={440}
          priority
          className="object-contain absolute select-none scale-[0.75] -translate-y-[100px] md:translate-y-0 md:scale-100 z-50 md:z-0 translate-x-[100px] md:-translate-x-[11px] transition-opacity duration-300"
        />
        <div className="flex pointer-events-auto scale-[0.75] md:scale-100 flex-col -translate-y-[82px] gap-4 z-50 absolute md:relative w-fit translate-x-[5px] md:translate-x-0 md:translate-y-1">
          <motion.a
            href={issues[selectedIndex].link}
            target="_blank"
            className="absolute z-50 top-[76px] -left-[20%] w-[140%] h-[318px] opacity-0 hover:opacity-100 transition-opacity duration-300"
            whileHover="visible"
            initial="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.3,
                },
              },
            }}
          >
            <motion.div
              className="absolute left-0 w-3 h-full border-r-0 border-2 border-[#E15858]"
              variants={{
                hidden: { x: 0 },
                visible: {
                  x: [0, -20, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                },
              }}
            />
            <motion.div
              className="absolute right-0 w-3 h-full border-l-0 border-2 border-[#E15858]"
              variants={{
                hidden: { x: 0 },
                visible: {
                  x: [0, 20, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                },
              }}
            />
            <motion.div
              className="absolute text-[#E15858] select-none text-lg font-mono bottom-0 left-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textShadow: '0 0 4px #E15858, 0 0 6px #E15858',
              }}
              transition={{ duration: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  scale: [1, 2, 1],
                  transition: {
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
            >
              view issue -{'>'}
            </motion.div>
          </motion.a>
          <div className="w-full select-none pointer-events-auto aspect-[232/318] overflow-hidden h-[318px] top-[76px] z-20 shrink-0 relative ">
            <img
              src={issues[selectedIndex].imageSrc}
              alt={issues[selectedIndex].title}
              className="object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-300 "
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 100%)',
                maskSize: `100% ${maskHeight}px`,
                WebkitMaskSize: `100% ${maskHeight}px`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'top',
                WebkitMaskPosition: 'top',
              }}
            />
            {/* Pixel Grid Lines Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(transparent 50%, rgba(0,0,0,0.21) 0)',
                backgroundSize: '100% 2px',
              }}
            />
          </div>
        </div>

        <div className="z-10 w-full pointer-events-auto">
          <div
            className={`${backgroundColor} ${className} p-4 min-h-[520px] px-0 md:px-4 rounded-lg font-mono relative overflow-hidden`}
            style={{}}
          >

            <div
              className="top-0 left-0 z-0 animate-pulse w-full h-full absolute"
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, #4B2121 0, #0f140a 100%)',
              }}
            ></div>
            {/* CRT Scan Line Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute w-full left-0 top-0 h-full"
                style={{
                  opacity: 0.25,
                  background:
                    'linear-gradient(180deg, transparent 0, rgb(252, 139, 139) 85%, rgb(252, 139, 139) 0, transparent)',
                }}
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                  repeatDelay: scanDelay,
                }}
              />
            </div>

            {/* RGB Noise Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,0,0,0.055), rgba(0,255,0,0.03), rgba(0,0,255,0.055))',
              }}
            />

            {/* Pixel Lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(transparent 50%, rgba(0,0,0,0.21) 0)',
                backgroundSize: '100% 2px',
              }}
            />

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className={`h-full text-[#E15858] selection:bg-white selection:text-[#0f140a] text-xs leading-relaxed relative font-mono font-light`}
              style={{
                textShadow: '0 0 4px #E15858, 0 0 6px #E15858',
              }}
            >
              <div className="relative z-10 grid grid-cols-2 gap-4 md:p-6 p-2">
                <div>
                  {initialText && <div className="mb-4">{initialText}</div>}

                  <div className="space-y-2 flex min-h-[300px] flex-col">
                    <div>
                      {issues
                        .sort(
                          (a, b) =>
                            b.releaseDate.getTime() - a.releaseDate.getTime()
                        )
                        .map((issue, issueIndex) => (
                          <AnimatePresence key={issueIndex}>
                            {animationStep >= 0 && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                onMouseDown={() => handleIssueClick(issueIndex)}
                                className={`cursor-pointer active:outline-white focus:outline-white relative w-full group hover:bg-[#E15858]/10 transition-colors duration-200 ${issueIndex === selectedIndex
                                    ? 'bg-gradient-to-r from-[#E15858]/20 hover:from-[#E15858]/50 hover:text-white'
                                    : ''
                                  }`}
                              >
                                <div
                                  className={`px-2 py-1 relative border rounded-[2px] ${issueIndex === selectedIndex ? 'border-[#E15858]/10' : 'border-[#E15858]/2'
                                    }`}
                                >
                                  <div className="w-fit relative flex items-center gap-2">
                                    <span>
                                      <span className='text-white/50 -translate-y-[1px] inline-block' style={{

                                      }}>
                                        {issueIndex === selectedIndex ?
                                          <span className='inline-block mr-1'
                                            style={{
                                              textShadow: '0 0 2px white, 0 0 4px rgba(255, 255, 255, 0.5)',
                                            }}
                                          >
                                            {">"}
                                          </span>
                                          : null}
                                      </span>
                                      {issue.title.split(' ').map((word, wordIndex) => {
                                        const wordAnimationIndex = animatedWords.findIndex(
                                          w => w.word === word && w.issueIndex === issueIndex && w.index === wordIndex
                                        );
                                        return (
                                          <motion.span
                                            key={`${issueIndex}-${wordIndex}`}
                                            initial={{ opacity: 0 }}
                                            animate={{
                                              opacity: animationStep >= wordAnimationIndex ? 1 : 0
                                            }}
                                            transition={{ duration: 0.15 }}
                                            className="inline-block mr-1"
                                            style={{
                                              textShadow: '0 0 10px rgba(225, 88, 88, 1), 0 0 4px rgba(225, 88, 88, 0.5)',
                                            }}
                                          >
                                            {word}
                                          </motion.span>
                                        );
                                      })}
                                    </span>
                                    <motion.span
                                      initial={{ opacity: 0 }}
                                      animate={{
                                        opacity: animationStep >= (issueIndex * 2) + issue.title.split(' ').length ? 1 : 0
                                      }}
                                      transition={{ duration: 0.2 }}
                                      className={`text-[10px]  ${issueIndex === selectedIndex ? 'text-white/50 font-light hidden md:block' : 'text-white/20'
                                        }`}
                                      style={{
                                        fontSize: '10px',
                                        textShadow: '0 0 1px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)',
                                      }}
                                    >

                                      {issue.releaseDate.toLocaleDateString()}
                                    </motion.span>

                                    {issueIndex === selectedIndex && (
                                      <div className="block text-white/75 group-hover:md:block md:hidden md:absolute md:-right-20 top-0">
                                        <span className="inline-block mr-1 underline-offset-4">
                                          view -{'>'}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.button>
                            )}
                          </AnimatePresence>
                        ))}

                     
                    </div>


                  </div>
                  
                  <div className='text-white h-4 font-light opacity-50 mt-2 md:mt-4 md:pl-0 pl-2 relative inline-block' style={{
                        fontSize: '11px',
                        textShadow: '0 0 2px white, 0 0 4px white',
                      }}>
                        {animationStep >= issues.length * 2 &&
                          <div className="flex items-center">
                            root@MIT:~$
                            <span className="inline-block w-[8px] h-[14px] -translate-y-[1px] ml-[5px] bg-[#E15858] animate-blink" style={{
                              boxShadow: '0 0 2px rgba(225, 88, 88, 0.5), 0 0 4px rgba(225, 88, 88, 0.3)',
                              verticalAlign: 'middle',
                            }}></span>
                          </div>
                        }
                      </div>

                </div>
                <div className=" md:translate-x-3 flex flex-col justify-end md:justify-start">
                  <InfiniteLogo className="hidden md:block" />
                <div className="mt-[280px] min-h-[200px] md:min-h-0 md:mt-10">
                  <AnimatePresence>
                    {animationStep >= 8 && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs relative mr-2 md:mr-0 "
                      >
                        <div className="min-h-[200px] md:min-h-[110px]">
                          <div className="relative p-3 opacity-80 border border-[#E15858]/75 rounded-[1px] ">

                            {issues[selectedIndex].description}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-end md:justify-between w-full gap-0 pl-6 pb-2">
                <AnimatePresence>
                  {animationStep >= issues.length * 2 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] opacity-70 hidden md:block"
                      >
                        Use ↑↓ or click to navigate <br /> click again to open issue
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] opacity-70 hidden md:block"
                      >
                        <Link href="https://adlerlagune.com" target="_blank" className="hidden md:flex opacity-75 mt-10 md:mt-0 items-center gap-1 pl-4 border border-transparent hover:bg-[#E15858]/10 hover:border-[#E15858]/20 hover:opacity-100 transition-colors duration-200">
                          <span className="text-[11px] underline underline-offset-3">built by adlerlagune</span>
                          <Image unoptimized src="/adler.gif" alt="infinite" className="blur-[0.5px]" width={35} height={35} />
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                <div className="md:hidden">
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[10px] opacity-70 hidden md:block"
                    >
                      Use ↑↓ or click to navigate <br /> click again to open issue
                    </motion.div>
                    <div className="md:hidden">
                      <div className="flex absolute bottom-4 left-4">
                        <div className="relative">
                          <InfiniteLogo size={160} />
                        </div>
                      </div>
                    </div>
                    <Link href="https://adlerlagune.com" target="_blank" className="flex opacity-75 mt-10 md:mt-0 items-center gap-1 pl-4 border border-transparent hover:bg-[#E15858]/10 hover:border-[#E15858]/20 hover:opacity-100 transition-colors duration-200">
                      <span className="text-[11px] underline underline-offset-3">built by adlerlagune</span>
                      <Image src="/adler.gif" alt="infinite" className="blur-[0.5px]" width={35} height={35} />
                    </Link>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
