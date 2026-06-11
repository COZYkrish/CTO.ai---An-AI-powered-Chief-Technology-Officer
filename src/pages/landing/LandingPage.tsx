import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCinematicStore } from '../../stores/cinematicStore'
import { useUIStore } from '../../stores/uiStore'
import CursorSpotlight from '../../components/layout/CursorSpotlight'
import FadingVideo from '../../components/ui/FadingVideo'
import Scene01_TheWeight from './scenes/Scene01_TheWeight'
import Scene02_Fragmentation from './scenes/Scene02_Fragmentation'
import Scene03_BreakingPoint from './scenes/Scene03_BreakingPoint'
import Scene04_ParadigmShift from './scenes/Scene04_ParadigmShift'
import Scene05_MasterBlueprint from './scenes/Scene05_MasterBlueprint'
import Scene06_AutonomousExecution from './scenes/Scene06_AutonomousExecution'
import Scene07_NewReality from './scenes/Scene07_NewReality'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'
const DEEP_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4'

export default function LandingPage() {
  const setCursor = useCinematicStore((s) => s.setCursor)
  const navigate = useNavigate()
  const { isAuthenticated } = useUIStore()

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
    <div className="relative" style={{ background: '#000' }}>
      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* ── Sticky Navbar ── */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center">
            <span className="font-heading text-white text-xl leading-none">a</span>
          </div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center">
            <div className="liquid-glass rounded-full px-1.5 py-1.5 flex items-center gap-1">
              {['How it works', 'Use cases', 'Pricing'].map((label, i) => (
                <span
                  key={i}
                  className="px-3 py-2 text-sm font-medium text-white/90 font-body cursor-pointer hover:text-white transition-colors rounded-full"
                  onClick={label === 'Pricing' ? () => navigate('/pricing') : undefined}
                >
                  {label}
                </span>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/command-center')}
                  className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-medium text-white font-body ml-1 whitespace-nowrap cursor-pointer"
                >
                  Command Center
                </button>
              ) : (
                <button
                  onClick={() => navigate('/register')}
                  className="bg-white text-black rounded-full px-5 py-2 text-sm font-semibold font-body ml-1 whitespace-nowrap cursor-pointer hover:bg-white/90 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          {/* Right spacer (balance) */}
          {isAuthenticated ? (
            <div className="w-12 h-12 opacity-0" />
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="liquid-glass rounded-full px-4 py-2 text-sm font-medium text-white/80 font-body cursor-pointer hover:text-white transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </motion.nav>

      {/* ── Hero video (Scenes 01–04) — 120% scaled, top-focal ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <FadingVideo
          src={HERO_VIDEO}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
          style={{ width: '120%', height: '120%' }}
        />
        {/* Subtle dark vignette so text remains legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* ── Scenes 01–03 (Hero video bg) ── */}
      <div className="relative z-10">
        <Scene01_TheWeight />
        <Scene02_Fragmentation />
        <Scene03_BreakingPoint />
      </div>

      {/* ── Capabilities video (Scenes 04–07) — full-bleed ── */}
      <div className="relative">
        {/* The capabilities video sits fixed behind scenes 04–07 */}
        <div className="sticky top-0 z-0 h-0 overflow-visible pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-screen">
            <FadingVideo
              src={DEEP_VIDEO}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
          </div>
        </div>

        {/* Scenes stacked on top of capabilities video */}
        <div className="relative z-10">
          <Scene04_ParadigmShift />
          <Scene05_MasterBlueprint />
          <Scene06_AutonomousExecution />
          <Scene07_NewReality />
        </div>
      </div>
    </div>
  )
}
