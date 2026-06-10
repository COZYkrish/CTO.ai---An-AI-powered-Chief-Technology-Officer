import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let mouseX = -200
    let mouseY = -200
    let currentX = -200
    let currentY = -200

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.08)
      currentY = lerp(currentY, mouseY, 0.08)
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <motion.div
      ref={spotRef}
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      style={{
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  )
}
