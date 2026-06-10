import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface BlueprintExplosionProps {
  isVisible: boolean
  projectName: string
  onComplete: () => void
}

const artifacts = [
  { label: 'Requirements', color: '#3B82F6', x: -220, y: -140 },
  { label: 'Architecture', color: '#06B6D4', x: 220, y: -140 },
  { label: 'Database', color: '#8B5CF6', x: -280, y: 0 },
  { label: 'APIs', color: '#6366F1', x: 280, y: 0 },
  { label: 'Security', color: '#F59E0B', x: -220, y: 140 },
  { label: 'Infrastructure', color: '#10B981', x: 220, y: 140 },
  { label: 'Cost Plan', color: '#3B82F6', x: -80, y: 200 },
  { label: 'Roadmap', color: '#06B6D4', x: 80, y: 200 },
  { label: 'Docs', color: '#8B5CF6', x: 0, y: -220 },
]

export default function BlueprintExplosion({ isVisible, projectName, onComplete }: BlueprintExplosionProps) {
  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(onComplete, 4500)
      return () => clearTimeout(t)
    }
  }, [isVisible, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Radial burst */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, delay: 0.3 }}
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 60%)',
            }}
          />

          {/* Center core */}
          <div className="relative z-10">
            {/* Expanding rings */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-blue-400/20 pointer-events-none"
                style={{
                  width: `${i * 120}px`,
                  height: `${i * 120}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5], opacity: [0, 0.6, 0] }}
                transition={{ duration: 1.8, delay: i * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* Artifact nodes exploding outward */}
            {artifacts.map((art, i) => (
              <motion.div
                key={art.label}
                className="absolute pointer-events-none"
                style={{ top: '50%', left: '50%' }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: art.x,
                  y: art.y,
                  opacity: [0, 1, 1, 0.8],
                  scale: [0, 1.2, 1],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.08 + 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="glass-panel rounded-xl px-3 py-2 text-xs font-mono whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
                  style={{
                    border: `1px solid ${art.color}40`,
                    color: art.color,
                    boxShadow: `0 0 20px ${art.color}20`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full mb-1 mx-auto animate-pulse" style={{ background: art.color }} />
                  {art.label}
                </div>
              </motion.div>
            ))}

            {/* Central checkmark */}
            <motion.div
              className="relative z-20 w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
                border: '2px solid rgba(59,130,246,0.5)',
                boxShadow: '0 0 60px rgba(59,130,246,0.4)',
              }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle2 className="w-10 h-10 text-blue-400" />
            </motion.div>

            {/* Text below */}
            <motion.div
              className="absolute top-32 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-2">
                Blueprint Complete
              </p>
              <h3
                className="font-geist font-black text-white"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}
              >
                {projectName}
              </h3>
              <p className="text-white/40 font-inter text-sm mt-2">9 artifacts generated · Ready to build</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
