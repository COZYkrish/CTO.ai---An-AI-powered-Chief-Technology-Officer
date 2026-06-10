import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'

const consequences = [
  {
    statement: 'A database decision made today can cost six months tomorrow.',
    detail: 'Choosing the wrong schema structure means migrating millions of records under live traffic.',
    color: '#dc2626',
  },
  {
    statement: 'A missing security layer can destroy user trust overnight.',
    detail: 'A single unprotected endpoint exposed to the world. One breach. Zero second chances.',
    color: '#f59e0b',
  },
  {
    statement: 'A bad architecture becomes impossible to scale.',
    detail: 'A monolith that works at 100 users becomes a nightmare at 100,000.',
    color: '#ef4444',
  },
]

export default function Scene07_Consequences() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-15%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)

  useEffect(() => {
    if (isInView) setCoreState('architecting')
  }, [isInView, setCoreState])

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-32 relative"
      style={{ background: '#050816' }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="font-geist font-black text-white text-center mb-20"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          Software has
          <span className="text-red-500/80"> consequences.</span>
        </motion.h2>

        <div className="space-y-16">
          {consequences.map((c, i) => (
            <motion.div
              key={i}
              className="border-l-2 pl-10"
              style={{ borderColor: `${c.color}40` }}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-geist font-bold mb-4"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.9rem)',
                  color: c.color,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {c.statement}
              </p>
              <p className="font-inter text-white/35 text-base leading-relaxed">{c.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Resolution */}
        <motion.div
          className="mt-24 text-center glass-panel rounded-2xl p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-geist font-black gradient-text-blue"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            CTO.ai eliminates
            <br />
            the guesswork.
          </p>
          <p className="mt-6 font-inter text-white/40 text-lg">
            Every decision documented. Every risk identified.
            <br />
            Before you write a single line of code.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
