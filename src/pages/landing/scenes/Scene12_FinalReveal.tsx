import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../../../stores/uiStore'
import CTOCore from '../../../components/three/CTOCore'
import { ArrowRight } from 'lucide-react'

const floatingNodes = [
  { label: 'Requirements', x: '12%', y: '30%', color: '#3B82F6' },
  { label: 'Architecture', x: '80%', y: '25%', color: '#06B6D4' },
  { label: 'Database', x: '8%', y: '65%', color: '#8B5CF6' },
  { label: 'Security', x: '82%', y: '60%', color: '#F59E0B' },
  { label: 'APIs', x: '45%', y: '15%', color: '#6366F1' },
  { label: 'Infrastructure', x: '50%', y: '80%', color: '#10B981' },
  { label: 'Roadmap', x: '18%', y: '82%', color: '#3B82F6' },
  { label: 'Docs', x: '75%', y: '82%', color: '#8B5CF6' },
]

export default function Scene12_FinalReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-15%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)
  const navigate = useNavigate()
  const { isAuthenticated } = useUIStore()

  useEffect(() => {
    if (isInView) setCoreState('evolved')
  }, [isInView, setCoreState])

  const handleLaunch = () => {
    if (isAuthenticated) {
      navigate('/command-center')
    } else {
      navigate('/register')
    }
  }

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#050816' }}
    >
      {/* Maximum aurora */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 3 }}
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Full evolved CTO Core */}
      <div className="absolute inset-0 pointer-events-none">
        <CTOCore className="w-full h-full" />
      </div>

      {/* Floating blueprint nodes */}
      {floatingNodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute glass rounded-xl px-3 py-1.5 text-xs font-mono pointer-events-none"
          style={{
            left: node.x,
            top: node.y,
            color: node.color,
            border: `1px solid ${node.color}20`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? {
            opacity: [0, 0.8, 0.8],
            scale: 1,
            y: [0, -8, 0],
          } : {}}
          transition={{
            delay: i * 0.1 + 0.5,
            duration: 1.5,
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
          }}
        >
          {node.label}
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-blue-400/50 uppercase block mb-8">
            The future is architected
          </span>

          <h2
            className="font-geist font-black text-white"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)', lineHeight: '0.92', letterSpacing: '-0.04em' }}
          >
            Build Smarter
            <br />
            <span className="gradient-text-full">Before You</span>
            <br />
            <span className="text-white">Build Bigger.</span>
          </h2>

          <motion.p
            className="mt-8 font-inter text-white/40 text-xl max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 1 }}
          >
            The AI Chief Technology Officer.
            <br />
            Your idea deserves the right foundation.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleLaunch}
              id="launch-cto-ai-btn"
              className="btn-primary flex items-center gap-3 text-base"
            >
              Launch CTO.ai
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-ghost text-base">
              Watch Demo
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-8 text-white/20 font-inter text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.2 }}
          >
            No credit card required · Generate your first blueprint free
          </motion.p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-0 left-0 right-0 px-8 py-8 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
      >
        <span className="font-geist font-bold text-white/20 text-sm">CTO.ai</span>
        <div className="flex items-center gap-6 text-white/20 font-inter text-xs">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </motion.footer>
    </section>
  )
}
