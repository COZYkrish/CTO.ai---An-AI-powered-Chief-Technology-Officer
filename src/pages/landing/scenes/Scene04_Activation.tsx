import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'
import CTOCore from '../../../components/three/CTOCore'

export default function Scene04_Activation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-20%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)

  useEffect(() => {
    if (isInView) {
      setCoreState('activating')
    }
  }, [isInView, setCoreState])

  return (
    <section
      ref={ref}
      className="scene min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#050816' }}
    >
      {/* Aurora explosion on activation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          background: `
            radial-gradient(ellipse 70% 70% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 30% 70%, rgba(139,92,246,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 70% 30%, rgba(6,182,212,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* CTO Core — full canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <CTOCore className="w-full h-full" />
      </div>

      {/* Headline emerges */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-blue-400/60 uppercase block mb-4">
            Initializing
          </span>
          <h2
            className="font-geist font-black gradient-text-full"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', lineHeight: '0.92', letterSpacing: '-0.04em' }}
          >
            Meet
            <br />
            CTO.ai
          </h2>
        </motion.div>

        <motion.p
          className="text-white/50 font-inter text-xl max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Your Artificial Chief Technology Officer
        </motion.p>

        <motion.p
          className="mt-4 text-white/25 font-inter text-sm max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
        >
          Not an AI chatbot. Not another SaaS tool.
          <br />
          An intelligence that thinks like a CTO.
        </motion.p>

        {/* Activation rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-blue-400/10 pointer-events-none"
            style={{
              width: `${ring * 200}px`,
              height: `${ring * 200}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isInView ? { opacity: [0, 0.5, 0], scale: [0.3, 1.5] } : {}}
            transition={{
              duration: 3,
              delay: ring * 0.4,
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
