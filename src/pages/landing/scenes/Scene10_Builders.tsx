import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const personas = [
  {
    type: 'Founders',
    headline: 'Go from idea to investable blueprint.',
    description: 'Show investors you\'ve thought through the technical architecture, not just the business model. CTO.ai gives you the technical credibility to lead.',
    points: ['Architecture decisions made', 'Tech stack validated', 'Cost projections ready', 'Hiring plan defined'],
    color: '#3B82F6',
  },
  {
    type: 'Developers',
    headline: 'Design systems, not just features.',
    description: 'Think beyond the feature. CTO.ai helps you plan scalable architectures, choose the right database patterns, and design APIs that last.',
    points: ['Architecture patterns selected', 'Scalability planned', 'API contracts defined', 'Security reviewed'],
    color: '#06B6D4',
  },
  {
    type: 'Students',
    headline: 'Learn by building complete systems.',
    description: 'Stop guessing how your project should be structured. CTO.ai generates real engineering blueprints that teach you how production systems are designed.',
    points: ['Learn system design', 'Understand architecture', 'Visualize components', 'Build with confidence'],
    color: '#8B5CF6',
  },
  {
    type: 'Startups',
    headline: 'Build the right thing first.',
    description: 'Avoid the technical debt that kills early-stage companies. Get your architecture right before you hire, before you build, before you launch.',
    points: ['Debt prevented upfront', 'Scale paths defined', 'Team structure planned', 'Runway protected'],
    color: '#6366F1',
  },
  {
    type: 'Agencies',
    headline: 'Win more proposals. Deliver more value.',
    description: 'Generate technical blueprints for client projects in minutes. Scope with precision, price with confidence, deliver with clarity.',
    points: ['Proposals generated fast', 'Scope defined clearly', 'Cost estimates accurate', 'Clients impressed'],
    color: '#10B981',
  },
]

export default function Scene10_Builders() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-10%' })
  const [active, setActive] = useState(0)
  const persona = personas[active]

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-32 relative"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0A0F1F 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-blue-400/60 uppercase block mb-4">
            Built for builders
          </span>
          <h2
            className="font-geist font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Whoever you are.
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {personas.map((p, i) => (
            <button
              key={p.type}
              onClick={() => setActive(i)}
              className="px-5 py-2 rounded-full text-sm font-geist font-medium transition-all duration-300"
              style={{
                background: active === i ? `${personas[i].color}20` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active === i ? personas[i].color + '40' : 'rgba(255,255,255,0.08)'}`,
                color: active === i ? personas[i].color : 'rgba(255,255,255,0.5)',
              }}
            >
              {p.type}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h3
                className="font-geist font-black mb-6"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
                  letterSpacing: '-0.03em',
                  color: persona.color,
                  lineHeight: 1.1,
                }}
              >
                {persona.headline}
              </h3>
              <p className="font-inter text-white/50 text-lg leading-relaxed mb-8">
                {persona.description}
              </p>
              <ul className="space-y-3">
                {persona.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-3 font-inter text-sm text-white/60">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: persona.color }}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-2xl p-8" style={{ border: `1px solid ${persona.color}15` }}>
              <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: persona.color, opacity: 0.7 }}>
                Generated for {persona.type}
              </div>
              <div className="space-y-4">
                {['Architecture Design', 'Database Schema', 'API Specification', 'Sprint Roadmap'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: persona.color }} />
                    <span className="text-white/50 font-inter text-sm">{item}</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-16 h-1.5 rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${70 + i * 8}%`, background: persona.color, opacity: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
