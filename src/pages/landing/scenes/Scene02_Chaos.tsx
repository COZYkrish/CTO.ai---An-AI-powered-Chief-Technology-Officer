import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'

const questions = [
  { text: 'What database?', x: '15%', y: '20%', rotation: -8, delay: 0 },
  { text: 'Monolith or\nmicroservices?', x: '65%', y: '15%', rotation: 5, delay: 0.15 },
  { text: 'How much\nwill it cost?', x: '80%', y: '55%', rotation: -3, delay: 0.3 },
  { text: 'Where do\nI start?', x: '10%', y: '65%', rotation: 7, delay: 0.45 },
  { text: 'Which cloud?', x: '45%', y: '75%', rotation: -5, delay: 0.6 },
  { text: 'What tech stack?', x: '30%', y: '25%', rotation: 3, delay: 0.75 },
  { text: 'How to scale?', x: '70%', y: '35%', rotation: -6, delay: 0.9 },
  { text: 'Who do I hire?', x: '20%', y: '45%', rotation: 4, delay: 1.05 },
  { text: 'REST or GraphQL?', x: '55%', y: '20%', rotation: -2, delay: 1.2 },
  { text: 'SQL or NoSQL?', x: '82%', y: '78%', rotation: 6, delay: 1.35 },
]

export default function Scene02_Chaos() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-15%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)

  useEffect(() => {
    if (isInView) setCoreState('disturbed')
  }, [isInView, setCoreState])

  return (
    <section
      ref={ref}
      className="scene min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0A0F1F 100%)' }}
    >
      {/* Red ambient — chaos signal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Floating chaos cards */}
      {questions.map((q, i) => (
        <motion.div
          key={i}
          className="absolute glass rounded-xl px-4 py-3 text-sm font-inter"
          style={{
            left: q.x,
            top: q.y,
            maxWidth: '160px',
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(220,38,38,0.15)',
            whiteSpace: 'pre-line',
          }}
          initial={{ opacity: 0, scale: 0.6, rotate: q.rotation - 15, y: 30 }}
          animate={isInView ? {
            opacity: [0, 1, 1],
            scale: 1,
            rotate: q.rotation,
            y: [30, 0, -8, 0],
          } : {}}
          transition={{
            duration: 2,
            delay: q.delay,
            ease: [0.16, 1, 0.3, 1],
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: q.delay + 0.5 },
          }}
        >
          <span className="text-red-400/60 text-xs block mb-1 font-mono">??</span>
          {q.text}
        </motion.div>
      ))}

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-6">
        <motion.h2
          className="text-display font-geist font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Then reality hits.
        </motion.h2>
        <motion.p
          className="mt-6 text-white/40 font-inter text-lg max-w-md"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          A hundred technical decisions appear overnight.
        </motion.p>
      </div>

      {/* Connection lines between some cards */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <motion.line
          x1="20%" y1="25%" x2="55%" y2="22%"
          stroke="rgba(220,38,38,0.12)" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <motion.line
          x1="70%" y1="37%" x2="85%" y2="58%"
          stroke="rgba(220,38,38,0.12)" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 1.8 }}
        />
      </svg>
    </section>
  )
}
