"use client";

import { useEffect, useState, useRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
    text: string
    sequential?: boolean
    revealDirection?: 'start' | 'end' | 'center'
    useOriginalCharsOnly?: boolean
    characters?: string
    className?: string
    encryptedClassName?: string
    parentClassName?: string
    animateOn?: ('view' | 'hover')[] | 'view' | 'hover'
    viewSpeed?: number
    viewMaxIterations?: number
    hoverSpeed?: number
    hoverMaxIterations?: number
    mixLightChars?: boolean
}

export default function DecryptedText({
    text,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = ['hover'],
    viewSpeed = 100,
    viewMaxIterations = 15,
    hoverSpeed = 100,
    hoverMaxIterations = 7,
    mixLightChars = true,
    ...props
}: DecryptedTextProps) {
    type DisplayChar = { char: string; isLight: boolean }
    const [displayText, setDisplayText] = useState<DisplayChar[]>(text.split('').map(char => ({ char, isLight: false })))
    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [isInView, setIsInView] = useState<boolean>(false)
    const [isScrambling, setIsScrambling] = useState<boolean>(false)
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
    const [hasAnimated, setHasAnimated] = useState<boolean>(false)
    const containerRef = useRef<HTMLSpanElement>(null)
    const currentIterationRef = useRef<number>(0)
    const animationTypeRef = useRef<'hover' | 'view' | null>(null)

    const getAnimationParams = () => {
        const triggers = Array.isArray(animateOn) ? animateOn : [animateOn]
        
       
        if (triggers.includes('hover') && isHovering) {
            animationTypeRef.current = 'hover'
            return { speed: hoverSpeed, maxIterations: hoverMaxIterations }
        }
        
       
        if (triggers.includes('view') && isInView) {
            animationTypeRef.current = 'view'
            return { speed: viewSpeed, maxIterations: viewMaxIterations }
        }
        
        animationTypeRef.current = null
        return { speed: hoverSpeed, maxIterations: hoverMaxIterations } 
    }

    const shouldAnimate = () => {
        const triggers = Array.isArray(animateOn) ? animateOn : [animateOn]
        return (triggers.includes('hover') && isHovering) || (triggers.includes('view') && isInView)
    }

    const getRandomChar = (availableChars: string[]) => {
        if (mixLightChars && Math.random() < 0.3) { // 30% chance of light char
            return {
                char: availableChars[Math.floor(Math.random() * availableChars.length)],
                isLight: true
            }
        }
        return {
            char: availableChars[Math.floor(Math.random() * availableChars.length)],
            isLight: false
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout

        const getNextIndex = (revealedSet: Set<number>): number => {
            const textLength = text.length
            switch (revealDirection) {
                case 'start':
                    return revealedSet.size
                case 'end':
                    return textLength - 1 - revealedSet.size
                case 'center': {
                    const middle = Math.floor(textLength / 2)
                    const offset = Math.floor(revealedSet.size / 2)
                    const nextIndex =
                        revealedSet.size % 2 === 0
                            ? middle + offset
                            : middle - offset - 1

                    if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
                        return nextIndex
                    }
                    for (let i = 0; i < textLength; i++) {
                        if (!revealedSet.has(i)) return i
                    }
                    return 0
                }
                default:
                    return revealedSet.size
            }
        }

        const availableChars = useOriginalCharsOnly
            ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
            : characters.split('')

        const shuffleText = (originalText: string, currentRevealed: Set<number>): Array<{ char: string, isLight: boolean }> => {
            if (useOriginalCharsOnly) {
                const positions = originalText.split('').map((char, i) => ({
                    char,
                    isSpace: char === ' ',
                    index: i,
                    isRevealed: currentRevealed.has(i),
                }))

                const nonSpaceChars = positions
                    .filter((p) => !p.isSpace && !p.isRevealed)
                    .map((p) => p.char)

                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                        ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
                }

                let charIndex = 0
                return positions.map((p) => {
                    if (p.isSpace) return { char: ' ', isLight: false }
                    if (p.isRevealed) return { char: originalText[p.index], isLight: false }
                    return { char: nonSpaceChars[charIndex++], isLight: false }
                })
            } else {
                return originalText.split('').map((char, i) => {
                    if (char === ' ') return { char: ' ', isLight: false }
                    if (currentRevealed.has(i)) return { char: originalText[i], isLight: false }
                    return getRandomChar(availableChars)
                })
            }
        }

        const startAnimation = () => {
            const { speed: currentSpeed, maxIterations: currentMaxIterations } = getAnimationParams()
            currentIterationRef.current = 0
            setIsScrambling(true)

            interval = setInterval(() => {
                setRevealedIndices((prevRevealed) => {
                    if (sequential) {
                        if (prevRevealed.size < text.length) {
                            const nextIndex = getNextIndex(prevRevealed)
                            const newRevealed = new Set(prevRevealed)
                            newRevealed.add(nextIndex)
                            const newText = shuffleText(text, newRevealed)
                            setDisplayText(newText)
                            return newRevealed
                        } else {
                            clearInterval(interval)
                            setIsScrambling(false)
                            return prevRevealed
                        }
                    } else {
                        const newText = shuffleText(text, prevRevealed)
                        setDisplayText(newText)
                        currentIterationRef.current++
                        
                        if (currentIterationRef.current >= currentMaxIterations) {
                            clearInterval(interval)
                            setIsScrambling(false)
                            setDisplayText(text.split('').map(char => ({ char, isLight: false })))
                        }
                        return prevRevealed
                    }
                })
            }, currentSpeed)
        }

        const stopAnimation = () => {
            if (interval) {
                clearInterval(interval)
            }
            setDisplayText(text.split('').map(char => ({ char, isLight: false })))
            setRevealedIndices(new Set())
            setIsScrambling(false)
            currentIterationRef.current = 0
            animationTypeRef.current = null
        }

        if (shouldAnimate() && !hasAnimated) {
            // Only start animation if we haven't animated yet
            const newAnimationType = isHovering ? 'hover' : 'view'
            
            if (animationTypeRef.current !== newAnimationType) {
                stopAnimation()
                startAnimation()
            }
        } else if (!shouldAnimate()) {
            stopAnimation()
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [
        isHovering,
        isInView,
        hasAnimated,
        text,
        viewSpeed,
        viewMaxIterations,
        hoverSpeed,
        hoverMaxIterations,
        sequential,
        revealDirection,
        characters,
        useOriginalCharsOnly,
        animateOn,
        mixLightChars,
    ])

    useEffect(() => {
        const triggers = Array.isArray(animateOn) ? animateOn : [animateOn]
        if (!triggers.includes('view')) return

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                } else {
                    setIsInView(false)
                    setHasAnimated(false)
                }
            })
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        const currentRef = containerRef.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef)
        }
    }, [animateOn])

    const hoverProps = {
        onMouseEnter: () => {
            setIsHovering(true)
            setHasAnimated(false)
        },
        onMouseLeave: () => {
            setIsHovering(false)
            setIsInView(false)
            setDisplayText(text.split('').map(char => ({ char, isLight: false })))
            setRevealedIndices(new Set())
            setIsScrambling(false)
            currentIterationRef.current = 0
            animationTypeRef.current = null
        },
    }

    return (
        <motion.span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            {...hoverProps}
            {...props}
        >
            <span className="sr-only">{text}</span>

            <span aria-hidden="true">
                {(Array.isArray(displayText) ? displayText : text.split('').map(char => ({ char, isLight: false }))).map((item, index) => {
                    const isRevealedOrDone =
                        revealedIndices.has(index) || !isScrambling || !shouldAnimate()

                    return (
                        <span
                            key={index}
                            className={isRevealedOrDone ? className : encryptedClassName}
                            style={!isRevealedOrDone && item.isLight ? { color: '#E15858' } : undefined}
                        >
                            {item.char}
                        </span>
                    )
                })}
            </span>
        </motion.span>
    )
}
