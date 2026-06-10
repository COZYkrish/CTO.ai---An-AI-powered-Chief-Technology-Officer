import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cases = [
  {
    persona: 'Aisha',
    role: 'Founder',
    project: 'AI Fitness Platform',
    problem: 'No software architecture experience. Couldn\'t evaluate tech proposals from developers.',
    outcome: 'Generated a complete blueprint in 4 minutes. Hired the right team with confidence.',
    color: '#3B82F6',
    initials: 'AK',
  },
  {
    persona: 'Marcus',
    role: 'Computer Science Student',
    project: 'Final Year Capstone Project',
    problem: 'Could not understand how system design concepts applied to his project idea.',
    outcome: 'Visualized the full architecture clearly. Received the highest grade in his cohort.',
    color: '#8B5CF6',
    initials: 'MT',
  },
  {
    persona: 'Bright Agency',
    role: 'Digital Agency',
    project: 'Client MVP · E-commerce Platform',
    problem: 'Struggling to estimate scope and cost for a complex client brief.',
    outcome: 'Generated roadmap and infrastructure plan. Closed the contract with confidence.',
    color: '#06B6D4',
    initials: 'BA',
  },
]

export default function Scene09_CaseStudies() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-10%' })

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-32 relative"
      style={{ background: '#050816' }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-cyan-400/60 uppercase block mb-4">
            Real Stories
          </span>
          <h2
            className="font-geist font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Builders like you.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.persona}
              className="glass-panel rounded-2xl p-8 flex flex-col"
              style={{ border: `1px solid ${c.color}15` }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-geist font-bold text-sm"
                  style={{ background: `${c.color}20`, color: c.color }}
                >
                  {c.initials}
                </div>
                <div>
                  <div className="font-geist font-semibold text-white text-sm">{c.persona}</div>
                  <div className="text-white/40 font-inter text-xs">{c.role}</div>
                </div>
              </div>

              <div
                className="text-xs font-mono uppercase tracking-widest mb-3"
                style={{ color: c.color, opacity: 0.7 }}
              >
                {c.project}
              </div>

              <div className="mb-4">
                <p className="text-xs text-white/30 font-inter uppercase tracking-wider mb-2">The challenge</p>
                <p className="text-white/50 font-inter text-sm leading-relaxed">{c.problem}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5">
                <p className="text-xs text-white/30 font-inter uppercase tracking-wider mb-2">The outcome</p>
                <p className="font-inter text-sm leading-relaxed" style={{ color: c.color, opacity: 0.9 }}>
                  {c.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
