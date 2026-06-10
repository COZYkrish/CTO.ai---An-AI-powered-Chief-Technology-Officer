import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'

const agents = [
  { id: 'pm', name: 'Product Manager', role: 'Requirements · User Stories', color: '#3B82F6', angle: 270, radius: 180 },
  { id: 'arch', name: 'Architect', role: 'System Design · Tech Stack', color: '#06B6D4', angle: 330, radius: 180 },
  { id: 'db', name: 'Database Engineer', role: 'Schema · Relationships', color: '#8B5CF6', angle: 30, radius: 180 },
  { id: 'sec', name: 'Security Agent', role: 'Threats · OWASP · Risk', color: '#F59E0B', angle: 90, radius: 180 },
  { id: 'devops', name: 'DevOps Engineer', role: 'Infrastructure · CI/CD', color: '#10B981', angle: 150, radius: 180 },
  { id: 'lead', name: 'Tech Lead', role: 'Roadmap · Planning', color: '#6366F1', angle: 210, radius: 180 },
]

const connections = [
  ['pm', 'arch'], ['arch', 'db'], ['db', 'sec'], ['sec', 'devops'], ['devops', 'lead'], ['lead', 'pm'],
  ['pm', 'db'], ['arch', 'sec'], ['db', 'devops'],
]

export default function Scene06_Agents() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-20%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)

  useEffect(() => {
    if (isInView) setCoreState('networked')
  }, [isInView, setCoreState])

  const cx = 50 // center x %
  const cy = 50 // center y %

  const getPos = (agent: typeof agents[0]) => {
    const rad = (agent.angle * Math.PI) / 180
    return {
      x: cx + (agent.radius / 6) * Math.cos(rad),
      y: cy + (agent.radius / 6) * Math.sin(rad),
    }
  }

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative py-24"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0A0F1F 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-purple-400/60 uppercase block mb-4">
            Multi-Agent Intelligence
          </span>
          <h2
            className="font-geist font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            The architects behind
            <br />
            <span className="gradient-text-purple">the architecture.</span>
          </h2>
        </motion.div>

        {/* Network diagram */}
        <div className="relative w-full" style={{ height: '520px' }}>
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {connections.map(([fromId, toId], i) => {
              const from = agents.find((a) => a.id === fromId)!
              const to = agents.find((a) => a.id === toId)!
              const fp = getPos(from)
              const tp = getPos(to)
              return (
                <g key={i}>
                  <motion.line
                    x1={`${fp.x}%`} y1={`${fp.y}%`}
                    x2={`${tp.x}%`} y2={`${tp.y}%`}
                    stroke="rgba(139,92,246,0.15)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: i * 0.1 + 0.5 }}
                  />
                  {/* Data pulse dot */}
                  <motion.circle
                    r="2"
                    fill="#8B5CF6"
                    opacity={0.8}
                    animate={isInView ? {
                      cx: [`${fp.x}%`, `${tp.x}%`],
                      cy: [`${fp.y}%`, `${tp.y}%`],
                      opacity: [0, 1, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: i * 0.3 + 1,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2 + 1,
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Center CTO Core node */}
          <motion.div
            className="absolute"
            style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
              />
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center glass-strong"
                style={{ border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <span className="text-blue-400 font-geist font-bold text-xs">CTO</span>
              </div>
            </div>
          </motion.div>

          {/* Agent nodes */}
          {agents.map((agent, i) => {
            const pos = getPos(agent)
            return (
              <motion.div
                key={agent.id}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%,-50%)',
                  zIndex: 5,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: i * 0.12 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="glass-panel rounded-2xl px-4 py-3 text-center"
                  style={{ border: `1px solid ${agent.color}25`, minWidth: '130px' }}
                >
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-2 animate-pulse-glow"
                    style={{ background: agent.color }}
                  />
                  <div className="font-geist font-semibold text-white text-xs">{agent.name}</div>
                  <div className="text-white/30 text-xs mt-0.5 font-inter leading-tight">{agent.role}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="text-center text-white/30 font-inter text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          Six specialized AI agents collaborating on every blueprint.
        </motion.p>
      </div>
    </section>
  )
}
