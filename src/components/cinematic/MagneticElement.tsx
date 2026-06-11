import React, { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticElementProps {
  children: React.ReactNode
  intensity?: number
  className?: string
}

export default function MagneticElement({ children, intensity = 0.5, className = '' }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    // Calculate distance from center of the element
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Move element slightly towards the cursor
    x.set(distanceX * intensity)
    y.set(distanceY * intensity)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
