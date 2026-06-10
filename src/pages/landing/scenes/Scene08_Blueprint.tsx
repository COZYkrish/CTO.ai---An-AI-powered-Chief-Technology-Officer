import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const artifacts = [
  { label: 'Requirements', icon: '📋', color: '#3B82F6', desc: 'Functional · Non-functional · User Stories' },
  { label: 'Architecture', icon: '🏗️', color: '#06B6D4', desc: 'System design · Component map · Patterns' },
  { label: 'Database', icon: '🗄️', color: '#8B5CF6', desc: 'Schema · Relationships · Indexes' },
  { label: 'APIs', icon: '🔌', color: '#6366F1', desc: 'Endpoints · Auth · Validation' },
  { label: 'Security', icon: '🔒', color: '#F59E0B', desc: 'OWASP · Threats · Score' },
  { label: 'Infrastructure', icon: '☁️', color: '#10B981', desc: 'Cloud · Scaling · Monitoring' },
  { label: 'Cost Estimate', icon: '💰', color: '#3B82F6', desc: '100 → 100k user scaling model' },
  { label: 'Sprint Roadmap', icon: '🗓️', color: '#06B6D4', desc: 'Milestones · Sprints · Tasks' },
  { label: 'Documentation', icon: '📄', color: '#8B5CF6', desc: 'PRD · SRS · API Docs · README' },
]

export default function Scene08_Blueprint() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-10%' })

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-32 relative"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0A0F1F 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-blue-400/60 uppercase block mb-4">
            Before you build
          </span>
          <h2
            className="font-geist font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Everything you need.
            <br />
            <span className="gradient-text-blue">Connected.</span>
          </h2>
          <p className="mt-6 font-inter text-white/40 text-lg">
            Nine engineering artifacts generated simultaneously. All linked. All production-grade.
          </p>
        </motion.div>

        {/* Artifact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artifacts.map((art, i) => (
            <motion.div
              key={art.label}
              className="glass-panel rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300 cursor-default"
              style={{ border: `1px solid rgba(255,255,255,0.05)` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderColor: `${art.color}30` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${art.color}15` }}
                >
                  {art.icon}
                </div>
                <div>
                  <div className="font-geist font-semibold text-white text-sm">{art.label}</div>
                  <div className="text-white/30 text-xs mt-0.5 font-mono" style={{ color: art.color, opacity: 0.7 }}>
                    Generated
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-xs font-inter leading-relaxed">{art.desc}</p>

              {/* Connection dot */}
              <div
                className="mt-4 w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: art.color }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-12 font-inter text-white/25 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          Before you write a single line of code.
        </motion.p>
      </div>
    </section>
  )
}
