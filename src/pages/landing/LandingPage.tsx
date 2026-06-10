import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCinematicStore } from '../../stores/cinematicStore'
import { useUIStore } from '../../stores/uiStore'
import CursorSpotlight from '../../components/layout/CursorSpotlight'
import NeuralField from '../../components/three/NeuralField'
import Scene01_Idea from './scenes/Scene01_Idea'
import Scene02_Chaos from './scenes/Scene02_Chaos'
import Scene03_Death from './scenes/Scene03_Death'
import Scene04_Activation from './scenes/Scene04_Activation'
import Scene05_BlueprintEvolution from './scenes/Scene05_BlueprintEvolution'
import Scene06_Agents from './scenes/Scene06_Agents'
import Scene07_Consequences from './scenes/Scene07_Consequences'
import Scene08_Blueprint from './scenes/Scene08_Blueprint'
import Scene09_CaseStudies from './scenes/Scene09_CaseStudies'
import Scene10_Builders from './scenes/Scene10_Builders'
import Scene11_Timeline from './scenes/Scene11_Timeline'
import Scene12_FinalReveal from './scenes/Scene12_FinalReveal'

export default function LandingPage() {
  const setCursor = useCinematicStore((s) => s.setCursor)
  const navigate = useNavigate()
  const { isAuthenticated } = useUIStore()

  // Track cursor for parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor(
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2
      )
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [setCursor])

  return (
    <div className="relative" style={{ background: '#050816' }}>
      {/* Global ambient neural field */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <NeuralField density={600} className="opacity-30" />
      </div>

      {/* Dot grid — subtle depth layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 dot-grid"
        style={{ opacity: 0.4 }}
      />

      {/* Global aurora — top-left & bottom-right orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '70vw', height: '50vw',
            top: '-15vw', left: '-15vw',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '60vw', height: '50vw',
            bottom: '-10vw', right: '-10vw',
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* Sticky Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          background: 'linear-gradient(180deg, rgba(5,8,22,0.9) 0%, transparent 100%)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="font-geist font-black text-white text-lg tracking-tight">
          CTO<span className="gradient-text-blue">.ai</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-inter text-white/40">
          <span className="hover:text-white/70 cursor-pointer transition-colors">How it works</span>
          <span className="hover:text-white/70 cursor-pointer transition-colors">Use cases</span>
          <span
            className="hover:text-white/70 cursor-pointer transition-colors"
            onClick={() => navigate('/pricing')}
          >Pricing</span>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/command-center')}
              className="btn-primary py-2 px-5 text-sm"
            >
              Command Center
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="btn-ghost py-2 px-5 text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary py-2 px-5 text-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </motion.nav>

      {/* All 12 scenes in sequence */}
      <div className="relative z-10">
        <Scene01_Idea />
        <Scene02_Chaos />
        <Scene03_Death />
        <Scene04_Activation />
        <Scene05_BlueprintEvolution />
        <Scene06_Agents />
        <Scene07_Consequences />
        <Scene08_Blueprint />
        <Scene09_CaseStudies />
        <Scene10_Builders />
        <Scene11_Timeline />
        <Scene12_FinalReveal />
      </div>
    </div>
  )
}
