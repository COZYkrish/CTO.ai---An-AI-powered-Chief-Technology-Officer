import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCinematicStore } from '../../stores/cinematicStore'
import { useUIStore } from '../../stores/uiStore'
import CursorSpotlight from '../../components/layout/CursorSpotlight'
import FadingVideo from '../../components/ui/FadingVideo'

import Section01_Manifesto from './sections/Section01_Manifesto'
import Section02_Reality from './sections/Section02_Reality'
import Section03_Cost from './sections/Section03_Cost'
import Section04_WhyCTOsExist from './sections/Section04_WhyCTOsExist'
import Section05_MeetCTO from './sections/Section05_MeetCTO'
import Section06_Transformation from './sections/Section06_Transformation'
import Section08_Philosophy from './sections/Section08_Philosophy'
import Section09_RealityCards from './sections/Section09_RealityCards'
import Section10_Execution from './sections/Section10_Execution'
import Section11_FinalManifesto from './sections/Section11_FinalManifesto'
import Section12_FinalCTA from './sections/Section12_FinalCTA'

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

  const navLinks = [
    { label: 'Manifesto', id: 'manifesto' },
    { label: 'Blueprints', id: 'blueprints' },
    { label: 'Philosophy', id: 'philosophy' }
  ]

  const scrollTo = (id: string) => {
    // Just a basic scroll for now
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative bg-black" style={{ background: '#000' }}>
      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* ── Sticky Editorial Navbar ── */}
      <motion.nav
        className="fixed top-8 left-0 right-0 z-50 px-8 lg:px-16 mix-blend-difference"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-bebas text-3xl tracking-widest cursor-pointer" onClick={() => scrollTo('top')}>
            CTO.ai
          </div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <span
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-white/70 font-inter cursor-pointer hover:text-white uppercase tracking-widest transition-colors"
              >
                {link.label}
              </span>
            ))}
          </div>

          {/* Right Action */}
          <button
            onClick={() => navigate(isAuthenticated ? '/command-center' : '/login')}
            className="text-sm font-bold text-white font-inter cursor-pointer hover:text-blue-400 uppercase tracking-widest transition-colors"
          >
            Launch CTO.ai
          </button>
        </div>
      </motion.nav>

      {/* ── Fixed Background Videos ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <FadingVideo
          src={HERO_VIDEO}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top opacity-30"
          style={{ width: '120%', height: '120%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black" />
      </div>

      {/* ── Cinematic Manifesto Sections ── */}
      <div className="relative z-10">
        <Section01_Manifesto />
        <Section02_Reality />
        <Section03_Cost />
        <Section04_WhyCTOsExist />
        <Section05_MeetCTO />
        <Section06_Transformation />
        <Section08_Philosophy />
        <Section09_RealityCards />
        <Section10_Execution />
        <Section11_FinalManifesto />
        <Section12_FinalCTA />
      </div>
    </div>
  )
}
