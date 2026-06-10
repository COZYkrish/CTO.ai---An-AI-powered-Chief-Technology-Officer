import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'

const lines = [
  { text: 'You have an idea.', delay: 0 },
  { text: 'A really good one.', delay: 1.2 },
  { text: 'Maybe the next Uber.', delay: 2.6 },
  { text: 'Maybe the next Stripe.', delay: 3.8 },
  { text: 'Maybe something nobody', delay: 5.0 },
  { text: 'has ever built.', delay: 5.6 },
]

export default function Scene01_Idea() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-20%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)
  const setCursor = useCinematicStore((s) => s.setCursor)

  useEffect(() => {
    if (isInView) setCoreState('dormant')
  }, [isInView, setCoreState])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setCursor(x, y)
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="scene min-h-screen flex flex-col items-center justify-center relative"
      style={{ background: '#050816' }}
    >
      {/* Aurora top light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Single dormant Core indicator */}
      <motion.div
        className="absolute"
        style={{ top: '38%', left: '50%', transform: 'translate(-50%,-50%)' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse-glow" />
          <div
            className="absolute rounded-full"
            style={{
              inset: '-12px',
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
              animation: 'neural-pulse 4s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>

      {/* Typography sequence */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="text-cinema text-white block"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.04em',
              color: i === 0 ? 'rgba(255,255,255,0.95)' : i < 3 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 1.4,
              delay: line.delay * 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.text}
          </motion.p>
        ))}

        <motion.p
          className="mt-16 text-lg text-white/30 tracking-widest uppercase font-inter"
          style={{ letterSpacing: '0.3em', fontSize: '0.75rem' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 2 }}
        >
          scroll to witness
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <div className="w-px h-16 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
            style={{ height: '40%' }}
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
