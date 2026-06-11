import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  as?: keyof HTMLElementTagNameMap
}

export default function BlurText({ text, className = '', style, as: Tag = 'p' }: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  const refCallback = useCallback((el: HTMLElement | null) => {
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
  }, [])

  const words = text.split(' ')

  const El = Tag as React.ElementType

  return (
    <El
      ref={refCallback}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isVisible
            ? {
                filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                opacity: [0, 0.5, 1],
                y: [50, -5, 0],
              }
            : {}}
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: 'easeOut',
            delay: (i * 100) / 1000,
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </El>
  )
}
