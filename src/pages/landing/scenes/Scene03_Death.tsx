import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'

const stats = [
  { value: '68%', label: 'of software projects fail or overrun significantly' },
  { value: '4 months', label: 'average wasted on poor architecture decisions' },
  { value: '$260B', label: 'lost annually to failed IT projects worldwide' },
]

const quotes = [
  '"We rebuilt our entire database after 8 months of users."',
  '"We didn\'t know we needed a message queue until we were at 10,000 users."',
  '"We hired the wrong team because we didn\'t know what skills we needed."',
]

export default function Scene03_Death() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-15%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)

  useEffect(() => {
    if (isInView) setCoreState('still')
  }, [isInView, setCoreState])

  return (
    <section
      ref={ref}
      className="scene min-h-screen flex flex-col items-center justify-center relative py-32"
      style={{ background: '#050816' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          className="font-geist font-black text-white"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: '0.92', letterSpacing: '-0.04em' }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Most ideas
          <br />
          <span className="text-red-500/70">die here.</span>
        </motion.h2>

        <motion.p
          className="mt-10 text-xl text-white/40 font-inter max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          Not because the idea was wrong.
          <br />
          <span className="text-white/60">Because nobody knew how to build it.</span>
        </motion.p>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="glass-panel rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="font-geist font-black text-red-400/80 mb-3"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </div>
              <div className="text-white/40 font-inter text-sm leading-relaxed">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Founder quotes */}
        <div className="mt-24 space-y-10">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              className="border-l-2 border-red-500/20 pl-8 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2 + i * 0.2, duration: 1 }}
            >
              <p className="font-inter text-lg text-white/35 italic leading-relaxed">{q}</p>
              <cite className="mt-2 block text-xs text-white/20 not-italic tracking-widest uppercase">
                — Anonymous Founder
              </cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
