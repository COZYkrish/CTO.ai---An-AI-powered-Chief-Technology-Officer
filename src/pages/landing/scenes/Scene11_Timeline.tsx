import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  { label: 'Idea', desc: 'A vision in your head', icon: '💡', owned: false },
  { label: 'Blueprint', desc: 'Complete engineering plan', icon: '📐', owned: true, highlight: true },
  { label: 'Architecture', desc: 'System designed and validated', icon: '🏗️', owned: true },
  { label: 'Development', desc: 'Build with confidence', icon: '⚙️', owned: false },
  { label: 'Deployment', desc: 'Ship to production', icon: '🚀', owned: false },
]

export default function Scene11_Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-15%' })

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-32 relative"
      style={{ background: '#050816' }}
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-blue-400/60 uppercase block mb-4">
            The journey
          </span>
          <h2
            className="font-geist font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            From idea to execution.
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Spine line */}
          <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ background: 'linear-gradient(180deg, #3B82F6, #8B5CF6)', originY: 0 }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                className="flex items-start gap-8 pl-0"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2 + 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: step.highlight
                        ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))'
                        : 'rgba(255,255,255,0.04)',
                      border: step.highlight
                        ? '1px solid rgba(59,130,246,0.4)'
                        : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: step.highlight ? '0 0 30px rgba(59,130,246,0.2)' : 'none',
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-3 flex-1">
                  <div className="flex items-center gap-4">
                    <h3
                      className="font-geist font-bold"
                      style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        letterSpacing: '-0.02em',
                        color: step.highlight ? '#3B82F6' : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {step.label}
                    </h3>
                    {step.owned && (
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full"
                        style={{
                          background: 'rgba(59,130,246,0.1)',
                          border: '1px solid rgba(59,130,246,0.3)',
                          color: '#3B82F6',
                        }}
                      >
                        CTO.ai
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-inter text-white/35 text-sm">{step.desc}</p>

                  {step.highlight && (
                    <p className="mt-3 font-inter text-blue-400/70 text-xs leading-relaxed max-w-sm">
                      This is where most ideas fail. CTO.ai makes it instant.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
